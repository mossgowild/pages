"""Check event tables, chronological ordering, links, and bundled posters."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows = []
        self.cells = None
        self.ids = set()
        self.anchors = []
        self.images = []
        self.tables = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'Duplicate HTML id'
            self.ids.add(attrs['id'])
        if tag == 'table':
            self.tables += 1
        if tag == 'tr':
            self.cells = 0
        if tag in ('td', 'th'):
            self.cells += 1
        if tag == 'th':
            assert attrs.get('scope') == 'col'
        if tag == 'a':
            self.anchors.append(attrs['href'])
        if tag == 'img':
            assert attrs.get('alt')
            self.images.append(attrs['src'])

    def handle_endtag(self, tag):
        if tag == 'tr':
            assert self.cells == 6, f'Expected six columns, got {self.cells}'
            self.rows.append(self.cells)
            self.cells = None


def check():
    source = (ROOT / 'index.html').read_text()
    page = Page()
    page.feed(source)
    assert 'day-930' in page.ids and 'day-7' in page.ids
    assert all(link[1:] in page.ids for link in page.anchors if link.startswith('#'))
    for table in re.findall(r'<tbody>(.*?)</tbody>', source, re.S):
        times = []
        for row in re.findall(r'<tr>.*?</tr>', table, re.S):
            assert 'href=' in row, 'Event must have a source or booking link'
            cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S)
            assert not re.search(r'（[^）]*[\u4e00-\u9fff]', cells[2]), 'Remove genre translations'
            poster = cells[5]
            if '<img' in poster:
                links = re.findall(r'href="([^"]+)"', poster)
                assert links and all(link.startswith('assets/posters/') for link in links), 'Poster links must open bundled images'
                assert all((ROOT / link).is_file() for link in links), 'Missing full-size poster'
            else:
                assert 'href=' not in poster, 'Do not repeat event links in the poster column'
            time = re.search(r'class="event-time">(.*?)</span>', row, re.S)[1]
            match = re.search(r'(\d{1,2}):(\d{2})', time)
            times.append(int(match[1]) * 60 + int(match[2]) if match else 9999)
        assert times == sorted(times), 'Events must be ordered by start time'
    manifest = json.loads((ROOT / 'assets/posters/sources.json').read_text())
    paths = {image[key] for image in manifest['images'] for key in ('path', 'thumbnail')}
    for src in page.images:
        assert src in paths, f'Poster source missing: {src}'
        data = (ROOT / src).read_bytes()
        assert data.startswith((b'\xff\xd8\xff', b'\x89PNG', b'GIF8', b'RIFF')), src
    assert not re.search(r'wxid_|@chatroom|localhost|file://|/Users/', source)
    print(f'OK: {len(page.rows) - page.tables} events, {page.tables} tables, '
          f'{len(page.images)} illustrated rows, {len(set(page.images))} bundled images')


if __name__ == '__main__':
    check()
