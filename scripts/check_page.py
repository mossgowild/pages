"""Check event cards, artist details, information order, links, and posters."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from build_page import render

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = []
        self.ids = set()
        self.anchors = []
        self.images = []
        self.tables = []
        self.stack = []
        self.card = self.field = self.table = self.row = self.cell = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get('class', '').split()
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append((tag, attrs.get('aria-hidden') == 'true', self.field))
        if tag == 'script' and attrs.get('src'):
            assert (ROOT / attrs['src']).is_file(), 'Missing script'
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'Duplicate HTML id'
            self.ids.add(attrs['id'])
        if tag == 'article':
            assert 'event-card' in classes
            self.card = {'attrs': attrs, 'fields': {}}
            self.cards.append(self.card)
        if 'data-field' in attrs:
            key = attrs['data-field']
            assert key not in self.card['fields'], 'Duplicate event field'
            self.field = {'text': '', 'links': [], 'images': [], 'artists': 0, 'info': [], 'tables': []}
            self.card['fields'][key] = self.field
        if tag == 'table':
            assert 'artist-table' in classes and self.table is None
            self.table = {'head': False, 'rows': []}
            self.tables.append(self.table)
            self.field['tables'].append(self.table)
        if tag == 'thead':
            self.table['head'] = True
        if tag == 'tr':
            self.row = []
        if tag in ('td', 'th'):
            self.cell = {'attrs': attrs, 'text': ''}
            self.row.append(self.cell)
            if tag == 'th':
                assert attrs.get('scope') == ('col' if self.table['head'] else 'row')
        if tag == 'span' and 'artist-name' in classes:
            self.field['artists'] += 1
        if tag == 'div' and 'info-section' in classes:
            self.field['info'].append(next(c.removeprefix('info-') for c in classes if c != 'info-section' and c.startswith('info-')))
        if tag == 'a':
            self.anchors.append(attrs['href'])
            if self.field is not None:
                self.field['links'].append(attrs['href'])
        if tag == 'img':
            assert 'alt' in attrs
            assert attrs['alt'] or any(hidden for _, hidden, _ in self.stack), 'Meaningful image needs alt text'
            self.images.append(attrs['src'])
            if self.field is not None:
                assert int(attrs['width']) > 0 and int(attrs['height']) > 0, 'Reserve image dimensions'
                self.field['images'].append(attrs['src'])

    def handle_data(self, text):
        if self.field is not None:
            self.field['text'] += text
        if self.cell is not None:
            self.cell['text'] += text

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1][0] == tag:
            _, _, self.field = self.stack.pop()
        if tag in ('td', 'th'):
            self.cell = None
        if tag == 'tr':
            rows = self.table['rows']
            assert len(self.row) == (len(rows[0]) if rows else len(self.row)), 'Inconsistent artist columns'
            rows.append(self.row)
            self.row = None
        if tag == 'thead':
            self.table['head'] = False
        if tag == 'table':
            self.table = None
        if tag == 'article':
            self.card = None


def check():
    source = (ROOT / 'index.html').read_text()
    assert source == render(), 'Generated page is stale; run scripts/build_page.py'
    data = json.loads((ROOT / 'data/events.json').read_text())
    events = {event['id']: event for event in data['events']}
    page = Page()
    page.feed(source)
    assert not page.stack and page.card is page.field is page.table is page.row is page.cell is None
    assert 'day-930' in page.ids and 'day-7' in page.ids
    assert all(link[1:] in page.ids for link in page.anchors if link.startswith('#'))
    assert len(page.cards) == len(events), 'Every event needs a card'
    assert {card['attrs']['id'] for card in page.cards} == set(events)
    dates = [card['attrs']['data-date'] for card in page.cards]
    assert dates == sorted(dates), 'Events must be ordered by date'
    illustrated_cards = 0
    daily_times = {}
    for card in page.cards:
        attrs, fields = card['attrs'], card['fields']
        event = events[attrs['id']]
        assert set(fields) == {'name', 'artists', 'genres', 'location', 'info', 'posters'}, 'Keep all six information categories'
        assert attrs['aria-labelledby'] in page.ids
        assert attrs['data-city'] == event['city']
        for key in ('venues', 'genres', 'starts', 'unknown'):
            assert json.loads(attrs['data-' + key]) == event[key], 'Preserve filter data'
        assert event['name'] in fields['name']['text']
        assert fields['info']['links'], 'Event must have a source or booking link'
        match = re.search(r'(\d{1,2}):(\d{2})', fields['name']['text'])
        daily_times.setdefault(attrs['data-date'], []).append(int(match[1]) * 60 + int(match[2]) if match else 9999)
        artists = event['artists']
        lineup = fields['artists']
        assert lineup['artists'] == sum(len(artist['names']) for artist in artists), 'Each artist needs a separate line'
        assert all(name in lineup['text'] for artist in artists for name in artist['names'])
        has_details = any(artist.get('time') or artist.get('genres') for artist in artists)
        stages = list(dict.fromkeys(artist.get('stage', '') for artist in artists))
        grouped = not has_details and len(stages) > 1 and all(stages)
        assert len(lineup['tables']) == int(has_details or grouped), 'Artist details/groups need a table'
        if grouped:
            table = lineup['tables'][0]
            assert len(table['rows']) == 2
            assert [cell['text'] for cell in table['rows'][0]] == stages, 'Stage names must be column headers'
            for stage, cell in zip(stages, table['rows'][1]):
                expected = [artist for artist in artists if artist['stage'] == stage]
                assert all(name in cell['text'] for artist in expected for name in artist['names']), 'Artist in wrong stage column'
                assert all(artist.get('format', '') in cell['text'] for artist in expected), 'Keep B2B/Live relationships'
        elif has_details:
            table = lineup['tables'][0]
            assert len(table['rows']) == len(artists) + 1
            assert 2 <= len(table['rows'][0]) <= 3
            for artist in artists:
                assert artist.get('time', '') in lineup['text']
                assert all(genre in lineup['text'] for genre in artist.get('genres', []))
        assert not re.search(r'（[^）]*[\u4e00-\u9fff]', fields['genres']['text']), 'Remove genre translations'
        info = event['more_info']
        assert fields['info']['info'] == [key for key in ('prices', 'booking', 'details', 'notes') if info[key]], 'Inconsistent information order'
        assert all(price in fields['info']['text'] for price in info['prices']), 'Missing price/status'
        poster = fields['posters']
        assert poster['images'] == [item['image'] for item in event['posters']], 'Use the full-size posters'
        if poster['images']:
            illustrated_cards += 1
            assert poster['links'] == poster['images'], 'Poster links must open their original images'
            assert all((ROOT / link).is_file() for link in poster['links']), 'Missing full-size poster'
        else:
            assert not poster['links'], 'Do not repeat event links in the poster area'
            assert '暂无图片' in poster['text']
    assert all(times == sorted(times) for times in daily_times.values()), 'Events must be ordered by start time'
    manifest = json.loads((ROOT / 'assets/posters/sources.json').read_text())
    paths = {image[key] for image in manifest['images'] for key in ('path', 'thumbnail')}
    for src in page.images:
        assert src in paths, f'Poster source missing: {src}'
        image_data = (ROOT / src).read_bytes()
        assert image_data.startswith((b'\xff\xd8\xff', b'\x89PNG', b'GIF8', b'RIFF')), src
    assert not re.search(r'wxid_|@chatroom|localhost|file://|/Users/', source)
    print(f'OK: {len(events)} event cards, {len(page.tables)} artist tables, '
          f'{illustrated_cards} illustrated cards, {len(page.images)} image elements, '
          f'{len(set(page.images))} unique image files; artist lines and information order checked')


if __name__ == '__main__':
    check()
