"""Check event rows, artist details, information order, links, and posters."""
import html
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
            assert 'event-row' in classes
            self.card = {'attrs': attrs, 'fields': {}, 'tables': [], 'lineup': None, 'toggle': None}
            self.cards.append(self.card)
        if 'data-field' in attrs:
            key = attrs['data-field']
            assert key not in self.card['fields'], 'Duplicate event field'
            self.field = {'text': '', 'links': [], 'images': [], 'originals': [], 'items': 0, 'info': [], 'headings': ''}
            self.card['fields'][key] = self.field
        if tag == 'section' and 'event-lineup' in classes:
            assert self.card['lineup'] is None, 'Duplicate lineup section'
            self.field = self.card['lineup'] = {'text': '', 'links': [], 'images': [], 'originals': [], 'items': 0, 'info': [], 'headings': ''}
        if tag == 'button' and 'event-toggle' in classes:
            self.card['toggle'] = attrs
        if tag == 'table':
            assert 'artist-table' in classes and self.table is None and self.field is self.card['lineup']
            self.table = {'head': False, 'rows': []}
            self.tables.append(self.table)
            self.card['tables'].append(self.table)
        if tag == 'thead':
            self.table['head'] = True
        if tag == 'tr':
            self.row = []
            # Stage heading and crew rows are not artist rows; they are checked separately.
            self.row_kind = next((kind for kind in ('stage-row', 'crew-row') if kind in classes), '')
        if tag in ('td', 'th'):
            self.cell = {'attrs': attrs, 'text': ''}
            self.row.append(self.cell)
            if tag == 'th':
                assert attrs.get('scope') == ('col' if self.table['head'] else 'colgroup' if self.row_kind == 'stage-row' else 'row')
        if tag == 'li' and self.field is not None and self.field is self.card['fields'].get('artists'):
            self.field['items'] += 1
        if tag == 'div' and 'info-section' in classes:
            self.field['info'].append(next(c.removeprefix('info-') for c in classes if c != 'info-section' and c.startswith('info-')))
        if tag == 'a':
            self.anchors.append(attrs['href'])
            if self.field is not None:
                self.field['links'].append(attrs['href'])
                if self.field is self.card['fields'].get('posters'):
                    assert attrs.get('aria-haspopup') == 'dialog', 'Posters must open the image preview'
                    assert 'target' not in attrs, 'Do not open posters in a new tab'
        if tag == 'img':
            assert 'alt' in attrs
            assert attrs['alt'] or any(hidden for _, hidden, _ in self.stack), 'Meaningful image needs alt text'
            self.images.append(attrs['src'])
            if self.field is not None:
                assert int(attrs['width']) > 0 and int(attrs['height']) > 0, 'Reserve image dimensions'
                self.field['images'].append(attrs['src'])
                self.field['originals'].append(attrs.get('data-full'))

    def handle_data(self, text):
        if self.field is not None:
            self.field['text'] += text
        if self.cell is not None:
            self.cell['text'] += text
        if self.field is not None and any(tag == 'h5' for tag, *_ in self.stack):
            self.field['headings'] += text

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1][0] == tag:
            _, _, self.field = self.stack.pop()
        if tag in ('td', 'th'):
            self.cell = None
        if tag == 'tr':
            rows = self.table['rows']
            if self.row_kind:
                self.table.setdefault(self.row_kind, []).append(self.row)
            else:
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
    manifest = json.loads((ROOT / 'assets/posters/sources.json').read_text())
    # Every poster's light version (scripts/build_posters.py), a WebP beside the original.
    lights = {image['path']: image['thumbnail'] for image in manifest['images']}
    assert all(light.endswith('.thumb.webp') and (ROOT / light).is_file() for light in lights.values()), 'Run scripts/build_posters.py'
    # And the wall's 400px version, which low-density screens show instead (docs/motion-performance.md).
    smalls = {image['thumbnail']: image['thumbnail_small'] for image in manifest['images']}
    assert all(small.endswith('.thumb-400.webp') and (ROOT / small).is_file() for small in smalls.values()), 'Run scripts/build_posters.py'
    assert not page.stack and page.card is page.field is page.table is page.row is page.cell is None
    visible = re.sub(r'<[^>]+>', ' ', re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', source, flags=re.S))
    assert not re.search(r'尚不明确|未知|其它场地|其它时段|其它风格|TBA', visible), 'No unknown or vague placeholders on the page'
    assert 'date-nav' not in source and not any(ident.startswith('day-') for ident in page.ids), 'The date axis and day anchors are removed'
    assert all(link[1:] in page.ids for link in page.anchors if link.startswith('#'))
    chips = re.findall(r'name="family" value="([^"]+)"', source)
    assert chips == data['genre_order']['families'] == list(data['genre_families']), 'Family chips follow genre_order'
    assert len(page.cards) == len(events), 'Every event needs a row'
    assert {card['attrs']['id'] for card in page.cards} == set(events)
    dates = [card['attrs']['data-date'] for card in page.cards]
    assert dates == sorted(dates), 'Events must be ordered by date'
    illustrated_cards = 0
    daily_times = {}
    for card in page.cards:
        attrs, fields = card['attrs'], card['fields']
        event = events[attrs['id']]
        # Six categories; an unknown lineup or genre is left out rather than shown as unknown (question 183).
        known = {'name', 'location', 'info', 'posters'} | ({'artists'} if event['artists'] else set()) | ({'genres'} if event['genres'] else set())
        assert set(fields) == known, 'Keep the known information categories'
        assert attrs['aria-labelledby'] in page.ids and attrs['id'] + '-details' in page.ids, 'Rows need a title and a details region'
        # The title opens the event's detail sheet (docs/event-browsing.md Q20–Q25); rows no longer expand in place.
        toggle = card['toggle']
        assert toggle and toggle.get('aria-haspopup') == 'dialog' and toggle.get('aria-controls') == 'event-detail' in page.ids and 'aria-expanded' not in toggle, \
            'The event title must open the detail sheet'
        assert attrs['data-city'] == event['city']
        for key in ('venues', 'genres', 'starts'):
            assert json.loads(attrs['data-' + key]) == event[key], 'Preserve filter data'
        families = [name for name, members in data['genre_families'].items()
                    if set(members).intersection(event['genres'])]
        assert json.loads(attrs['data-families']) == families, 'Preserve genre family membership'
        assert event['name'] in fields['name']['text']
        assert fields['info']['links'], 'Event must have a source or booking link'
        match = re.search(r'(\d{1,2}):(\d{2})', fields['name']['text'])
        daily_times.setdefault(attrs['data-date'], []).append(int(match[1]) * 60 + int(match[2]) if match else 9999)
        artists = event['artists']
        if artists:
            summary = fields['artists']
            assert summary['items'] == len(artists), 'Each lineup entry needs a separate line'
            assert all(name in summary['text'] for artist in artists for name in artist['names'])
        assert all(genre in fields['genres']['text'] for genre in event['genres']), 'Show every genre'
        has_details = any(artist.get('time') or artist.get('genres') for artist in artists)
        stages = list(dict.fromkeys(artist.get('stage', '') for artist in artists))
        grouped = not has_details and len(stages) > 1 and all(stages)
        assert len(card['tables']) == int(has_details or grouped), 'Artist details/groups need a table'
        lineup = card['lineup']
        timed = any(artist.get('time') for artist in artists)
        # Rooms the sources name without placing any artist in them (question 203).
        rooms = [stage for stage in event.get('stages', []) if not any(a.get('stage') == stage['name'] for a in artists)]
        info = event['more_info']
        expected_sections = [name for name, keys in (('tickets', ('prices', 'booking')), ('links', ('details',)), ('entry', ('notes',)))
                             if any(info[key] for key in keys)]
        rendered = re.findall(rf'<section class="event-field event-(tickets|links|entry)">', re.search(
            rf'id="{attrs["id"]}-details".*?</article>', source, re.S)[0])
        assert rendered == expected_sections, 'Each 更多信息 section appears only with content, in order'
        assert '未知' not in ''.join(cell['text'] for table in card['tables'] for row in table['rows'][1:] for cell in row[1:]), 'Leave unknown genres blank'
        for artist in artists:
            assert not artist.get('genre_sources') or len(artist['genre_sources']) == len(artist['genres']), 'One source per genre line'
        assert not lineup or not lineup['links'], 'The lineup has no reference links'
        assert all(text in lineup['headings'] for text in event.get('lineup_caption', [])), 'Captions sit beside the lineup title'
        for stage in (stage for stage in event.get('stages', []) if any(a.get('stage') == stage['name'] for a in artists)):
            assert all(genre in lineup['text'] for genre in stage.get('genres', [])) and stage.get('note', '') in lineup['text'], 'Show stage genres and notes'
        for member in event.get('crew', []):
            assert any(member['role'] in row[0]['text'] and all(name in ''.join(c['text'] for c in row) for name in member['names'])
                       for table in card['tables'] for row in table.get('crew-row', [])), 'Crew rows carry role and names'
        assert '<p class="lineup-note">' not in source, 'No small print under the lineup'
        for artist in artists:
            if artist.get('format') == 'B2B' and len(artist['names']) > 1 and card['tables']:
                pair = '<small class="artist-b2b">B2B</small>'.join(f'<span class="artist-name">{html.escape(n, quote=False)}</span>' for n in artist['names'])
                assert f'<span class="artist-pair">{pair}</span>' in source, 'A B2B pairing reads as one line'
        venue_html = re.search(rf'id="{attrs["id"]}-details".*?<section class="event-field event-location"[^>]*>(.*?)</section>', source, re.S)[1]
        city, _, place = event['location'][0].partition(' · ')
        assert f'<span class="venue-name"><span class="venue-city">{city}</span>{html.escape(place, quote=False)}</span>' in venue_html, 'The city label leads the place on one line'
        share = re.search(r'<button type="button" class="copy-target venue-target" data-share-text="([^"]*)"[^>]*>\s*<span class="venue-lines">', venue_html)
        if not place:
            assert 'copy-target' not in venue_html, 'A city without a known place stays plain text'
        else:
            assert share and html.unescape(share[1]) == ' '.join([city, *event['location'][1:], place]), 'Share city, address, then place'
        assert '分享地址' not in venue_html and '复制地址' not in venue_html, 'No separate action line'
        if lineup:
            assert lineup['headings'].startswith('TIMETABLE时间表' if timed else 'LINEUP阵容'), 'Lineup heading must match its content'
        if lineup and not card['tables']:
            # Without a table the area still lists the lineup, never small print alone (question 203).
            assert artists and all(name in lineup['text'] for artist in artists for name in artist['names']), 'List every artist in the lineup area'
            assert all(artist.get(key, '') in lineup['text'] for artist in artists for key in ('format', 'note')), 'Keep forms in the lineup list'
            assert all(stage['name'] in lineup['text'] and all(genre in lineup['text'] for genre in stage.get('genres', [])) for stage in rooms), 'Show unplaced rooms with their genres'
        if grouped:
            table = card['tables'][0]
            assert len(table['rows']) == 2
            assert all(cell['text'].startswith(stage) for cell, stage in zip(table['rows'][0], stages, strict=True)), 'Stage names must be column headers'
            for stage, cell in zip(stages, table['rows'][1]):
                expected = [artist for artist in artists if artist['stage'] == stage]
                assert all(name in cell['text'] for artist in expected for name in artist['names']), 'Artist in wrong stage column'
                assert all(artist.get('format', '') in cell['text'] for artist in expected), 'Keep B2B/Live relationships'
        elif has_details:
            table = card['tables'][0]
            assert len(table['rows']) == len(artists) + 1
            assert 2 <= len(table['rows'][0]) <= 3
            assert [cell['text'] for cell in table['rows'][0]][:2] == (['时段', '艺人'] if timed else ['艺人', '风格']), 'Set times lead the timetable'
            for artist in artists:
                assert artist.get('time', '') in lineup['text']
                assert all(genre in lineup['text'] for genre in artist.get('genres', []))
        assert not re.search(r'（[^）]*[\u4e00-\u9fff]', fields.get('genres', {}).get('text', '')), 'Remove genre translations'
        assert fields['info']['info'] == [key for key in ('prices', 'booking', 'details', 'notes') if info[key]], 'Inconsistent information order'
        assert all(price[key] in fields['info']['text'] for price in info['prices'] for key in ('label', 'amount', 'note')), 'Missing price/status'
        assert all(price['label'] or price['amount'] for price in info['prices']), 'A price needs a tier or an amount'
        for part in info['booking'] + info['details']:
            if part['type'] == 'mini-program':
                assert f'data-copy-text="{html.escape(part["code"], quote=True)}"' in source, 'Mini-program codes copy on tap'
        poster = fields['posters']
        # Rows show the light version and name the original for the screen, the detail sheet and the preview (Q34).
        originals = [item['image'] for item in event['posters']]
        assert poster['images'] == [lights[original] for original in originals], 'Rows show the light posters'
        assert poster['originals'] == originals, 'Rows name their original posters (data-full)'
        if poster['images']:
            illustrated_cards += 1
            assert not poster['text'].strip(), 'Remove the poster link label strip'
            assert poster['links'] == originals, 'Poster links must open their original images'
            assert all((ROOT / link).is_file() for link in poster['links']), 'Missing full-size poster'
        else:
            assert not poster['links'], 'Do not repeat event links in the poster area'
            assert '暂无图片' in poster['text']
    assert all(times == sorted(times) for times in daily_times.values()), 'Events must be ordered by start time'
    # The page itself (hero wall and rows) only loads light versions; the originals come on demand.
    for src in page.images:
        assert src in lights.values(), f'Not a light poster: {src}'
        image_data = (ROOT / src).read_bytes()
        assert image_data.startswith((b'\xff\xd8\xff', b'\x89PNG', b'GIF8', b'RIFF')), src
    # Every wall poster names its 400px version; the wall's styles are inlined, and its script runs before the terrain's
    # so its posters start downloading first (docs/motion-performance.md).
    reel = re.findall(r'class="hero-poster[^>]*><img src="([^"]+)"[^>]* data-small="([^"]+)" data-small-width="(\d+)"', source)
    assert len(reel) == len(data['featured']) and all(smalls[light] == small for light, small, _ in reel), 'Wall posters name their 400px versions'
    assert 'assets/hero.css' not in source and '.drift-wall' in source.split('</head>')[0], 'The wall styles are inlined'
    assert source.index('src="assets/hero.js"') < source.index('src="assets/topography.js"'), 'The wall script runs before the terrain'
    assert not re.search(r'wxid_|@chatroom|localhost|file://|/Users/', source)
    print(f'OK: {len(events)} event rows, {len(page.tables)} artist tables, '
          f'{illustrated_cards} illustrated rows, {len(page.images)} image elements, '
          f'{len(set(page.images))} unique image files; artist lines and information order checked')


if __name__ == '__main__':
    check()
