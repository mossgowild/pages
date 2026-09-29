"""Render the static event guide from content JSON and the HTML template."""
import argparse
from datetime import date, datetime, timedelta
from html import escape
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def link(url, label):
    assert urlsplit(url).scheme in ('https', 'http', 'weixin'), f'Unsupported link: {url}'
    return f'<a href="{escape(url, quote=True)}" target="_blank" rel="noopener noreferrer">{escape(label)}</a>'


def rich(parts):
    result = []
    for part in parts:
        kind = part['type']
        if kind == 'text':
            result.append(escape(part['text']))
        elif kind == 'break':
            result.append('<br>')
        elif kind == 'link':
            result.append(link(part['url'], part['label']))
        elif kind == 'mini-program':
            result.append('<details class="mini-program"><summary>' + escape(part['label'])
                          + '</summary><code>' + escape(part['code']) + '</code><small>'
                          + escape(part['note']) + '</small></details>')
        else:
            raise ValueError(f'Unknown content type: {kind}')
    return ''.join(result)


def lines(values):
    return '<br>'.join(escape(value) for value in values)


def artist_lineup(event):
    artists = event['artists']
    has_time = any(artist.get('time') for artist in artists)
    has_genres = any(artist.get('genres') for artist in artists)
    stages = list(dict.fromkeys(artist.get('stage', '') for artist in artists))
    grouped = not (has_time or has_genres) and len(stages) > 1 and all(stages)
    groups = {stage: [] for stage in stages} if grouped else {}
    rows = []
    previous_stage = ''
    for artist in artists:
        name = ''.join('<span class="artist-name">' + escape(name) + '</span>' for name in artist['names'])
        for key in (('stage',) if has_time or has_genres else ()) + ('format', 'note'):
            if artist.get(key):
                name += '<small class="artist-detail">' + escape(artist[key]) + '</small>'
        if has_time or has_genres:
            cells = ['<th scope="row">' + name + '</th>']
            if has_time:
                time = escape(artist.get('time', '尚不明确')).replace('–', '–<wbr>')
                cells.append('<td class="artist-time">' + time + '</td>')
            if has_genres:
                genres = lines(artist.get('genres', ['未知']))
                if artist.get('genre_note'):
                    genres += '<small class="artist-detail">' + escape(artist['genre_note']) + '</small>'
                cells.append('<td class="artist-genres">' + genres + '</td>')
            rows.append('<tr>' + ''.join(cells) + '</tr>')
        elif grouped:
            groups[artist['stage']].append('<li>' + name + '</li>')
        else:
            stage = artist.get('stage', '')
            heading = '<span class="artist-stage">' + escape(stage) + '</span>' if stage and stage != previous_stage else ''
            rows.append('<li>' + heading + name + '</li>')
            previous_stage = stage
    if has_time or has_genres:
        labels = ['艺人'] + (['时段'] if has_time else []) + (['风格'] if has_genres else [])
    elif grouped:
        labels = stages
        rows = ['<tr>' + ''.join('<td><ul class="artist-list">' + ''.join(groups[stage]) + '</ul></td>'
                                for stage in stages) + '</tr>']
    if has_time or has_genres or grouped:
        table_class = 'artist-table artist-stage-table' if grouped else 'artist-table'
        content = (f'<table class="{table_class}"><caption class="sr-only">' + escape(event['name'])
                   + ' · 艺人信息</caption><thead><tr>'
                   + ''.join('<th scope="col">' + escape(label) + '</th>' for label in labels)
                   + '</tr></thead><tbody>' + ''.join(rows) + '</tbody></table>')
    else:
        content = '<ul class="artist-list">' + ''.join(rows) + '</ul>'
    return content + ''.join('<p class="artist-note">' + escape(note) + '</p>' for note in event.get('artist_notes', []))


def more_info(info):
    sections = []
    for key, label in [('prices', '票价 / 票况'), ('booking', '购票 / 报名'), ('details', '活动详情'), ('notes', '入场说明')]:
        if not info[key]:
            continue
        if key == 'prices':
            content = '<ul class="ticket-prices">' + ''.join('<li>' + escape(price) + '</li>' for price in info[key]) + '</ul>'
        elif key == 'notes':
            content = ''.join('<p>' + escape(note) + '</p>' for note in info[key])
        else:
            content = '<div class="info-actions">' + ''.join(
                '<p>' + rich([part]) + '</p>' if part['type'] == 'text' else rich([part]) for part in info[key]) + '</div>'
        sections.append(f'<div class="info-section info-{key}"><span class="info-label">{label}</span>{content}</div>')
    return ''.join(sections)


def poster_path(value):
    assert value.startswith('assets/posters/') and '..' not in Path(value).parts
    assert (ROOT / value).is_file(), f'Missing poster: {value}'
    return escape(value, quote=True)


def event_card(event, images, genre_families):
    families = [name for name, members in genre_families.items() if set(members).intersection(event['genres'])]
    attrs = {'id': event['id'], 'data-families': json.dumps(families, ensure_ascii=False, separators=(',', ':'))}
    for key in ('date', 'city', 'venues', 'genres', 'starts', 'unknown'):
        value = event[key]
        attrs['data-' + key] = json.dumps(value, ensure_ascii=False, separators=(',', ':')) if isinstance(value, (list, bool)) else value
    attrs = ' '.join(f'{key}="{escape(value, quote=True)}"' for key, value in attrs.items())
    posters = []
    for poster in event['posters']:
        image = images[poster['image']]
        assert image['width'] > 0 and image['height'] > 0
        posters.append(
            f'<a href="{poster_path(poster["image"])}" aria-haspopup="dialog" aria-label="预览：{escape(poster["alt"], quote=True)}">'
            f'<img width="{image["width"]}" height="{image["height"]}" src="{poster_path(poster["image"])}"'
            f' loading="lazy" alt="{escape(poster["alt"], quote=True)}"></a>')
    poster_content = (posters[0] + ('<div class="poster-thumbnails">' + ''.join(posters[1:]) + '</div>' if len(posters) > 1 else '')
                      if posters else '<div class="poster-empty">暂无图片</div>')
    title_id = escape(event['id'] + '-title', quote=True)
    heading = (f'<header class="event-heading" data-field="name"><h4 id="{title_id}">'
               + escape(event['name']) + '</h4><span class="event-time">' + lines(event['time'])
               + '</span>' + ''.join('<small class="event-note">' + escape(note) + '</small>' for note in event['notes'])
               + '</header>')
    fields = [
        ('artists', '艺人', 'artist-cell', artist_lineup(event)),
        ('genres', '风格', 'genre-cell', lines(event['genre_lines'])
         + ''.join('<small>' + rich(note) + '</small>' for note in event['genre_notes'])),
        ('location', '地点', 'event-location', lines(event['location'])),
        ('info', '更多信息', 'event-info', more_info(event['more_info'])),
    ]
    content = ''.join(f'<section class="event-field {cls}" data-field="{key}"><h5>{label}</h5>{value}</section>'
                      for key, label, cls, value in fields)
    return (f'<article class="event-card" {attrs} aria-labelledby="{title_id}">'
            '<div class="event-posters" data-field="posters">'
            + poster_content + '</div>'
            + '<div class="event-body">' + heading + content + '</div></article>')


def day_id(day):
    return 'day-930' if day == date(2026, 9, 30) else f'day-{day.day}'


def option(value, label):
    return f'<option value="{escape(value, quote=True)}">{escape(label)}</option>'


def render():
    data = json.loads((ROOT / 'data/events.json').read_text())
    images = {image['path']: image for image in json.loads((ROOT / 'assets/posters/sources.json').read_text())['images']}
    events = data['events']
    genre_families = data['genre_families']
    for name, members in genre_families.items():
        assert name and members and len(members) == len(set(members)), 'Invalid genre family'
        assert 'TBA' not in members and 'Live' not in members, 'Unknown and performance formats are not genres'
    start, end = date.fromisoformat(data['start_date']), date.fromisoformat(data['end_date'])
    assert start <= end
    ids = [event['id'] for event in events]
    assert len(ids) == len(set(ids)), 'Duplicate event IDs'
    for event in events:
        assert start <= date.fromisoformat(event['date']) <= end
        assert event['venues'] and event['genres'] and event['city'] and event['name']
        assert isinstance(event['unknown'], bool)
        assert all(isinstance(time, int) and 0 <= time < 1440 for time in event['starts'])
    events = sorted(events, key=lambda e: (e['date'], min(e['starts']) if e['starts'] else 1440))
    days = [start + timedelta(days=n) for n in range((end - start).days + 1)]
    groups = []
    for day in days:
        daily = [event for event in events if event['date'] == day.isoformat()]
        title = f'{day.month} 月 {day.day} 日'
        heading = (f'<h3 class="day-heading" id="{day_id(day)}"><span class="day-number" aria-hidden="true">{day:%m.%d}</span>'
                   f'<span class="sr-only">{title} </span><small>{day:%a} / <span class="day-count">{len(daily)}</span> 场</small></h3>')
        if daily:
            content = ('<div class="event-grid">\n'
                       + '\n'.join(event_card(event, images, genre_families) for event in daily) + '\n</div>')
        else:
            content = '<p class="empty-day">当日暂无活动信息。</p>'
        groups.append(f'<section class="day-group" data-date="{day.isoformat()}">{heading}\n{content}</section>')
    cities = sorted({event['city'] for event in events})
    genres = {genre for event in events for genre in event['genres']}
    genre_order = data['genre_order']
    active_families = {name for name, members in genre_families.items() if set(members).intersection(genres)}
    for key, available in (('families', active_families), ('genres', genres - {'TBA'})):
        ordered = genre_order[key]
        assert len(ordered) == len(set(ordered)) and set(ordered) == available, f'Update genre_order.{key}'
    featured = [next(event for event in events if event['id'] == ident) for ident in data['featured']]
    assert len(featured) >= 3 and len(set(data['featured'])) == len(featured), 'Choose distinct featured events'
    cards, captions = [], []
    for index, event in enumerate(featured):
        poster = event['posters'][0]
        image = images[poster['image']]
        position = ('left', 'center', 'right')[index] if index < 3 else 'offstage'
        hidden = ' hidden' if position == 'offstage' else ''
        loading = 'lazy' if hidden else 'eager'
        cards.append(f'<a class="hero-poster" href="#{escape(event["id"])}" data-position="{position}" draggable="false"'
                     f' tabindex="{0 if index == 1 else -1}"{hidden}'
                     f' style="--poster-ratio:{image["width"] / image["height"]:.5f}"'
                     f' aria-label="{escape(event["name"], quote=True)} · 阵容与购票">'
                     f'<img src="{poster_path(poster["image"])}" width="{image["width"]}" height="{image["height"]}"'
                     f' loading="{loading}" decoding="async" draggable="false" alt="{escape(poster["alt"], quote=True)}"></a>')
        hidden = '' if index == 1 else ' hidden'
        captions.append(f'<div class="hero-detail"{hidden}>'
                        f'<p class="hero-event-meta">{event["date"][5:].replace("-", ".")} <span>·</span> {escape(event["city"])}</p>'
                        f'<a class="hero-event-link spotlight-card" href="#{escape(event["id"])}">阵容与购票 <span aria-hidden="true">↗</span></a>'
                        f'<h3>{escape(event["name"])}</h3>'
                        f'<p class="hero-genres">{escape(" · ".join(g for g in event["genres"] if g != "TBA"))}</p></div>')
    title, publisher = data['title'], data['publisher']
    values = {
        'title': escape(''.join(title[key] for key in ('region', 'topic', 'guide'))),
        'title_region': escape(title['region']), 'title_topic': escape(title['topic']), 'title_guide': escape(title['guide']),
        'publisher_name': escape(publisher['name']), 'publisher_latin': escape(publisher['latin']),
        'byline': escape('By ' + publisher['name'] + publisher['latin']),
        'edition_year': str(start.year), 'date_range': f'{start:%m.%d} — {end:%m.%d}',
        'schedule': '\n'.join(groups), 'event_count': str(len(events)), 'city_count': f'{len(cities):02}',
        'day_count': f'{len(days):02}', 'updated_iso': data['updated_at'],
        'updated_date': datetime.fromisoformat(data['updated_at']).strftime('%Y.%m.%d'),
        'updated_time': datetime.fromisoformat(data['updated_at']).strftime('%H:%M'),
        'start_date': start.isoformat(), 'end_date': end.isoformat(),
        'city_options': option('', '全部城市') + ''.join(option(city, city) for city in cities),
        'genre_options': option('', '全部风格') + '<optgroup label="风格大类 · 含子风格">'
        + ''.join(option('family:' + name, name) for name in genre_order['families'])
        + '</optgroup><optgroup label="具体风格">'
        + ''.join(option('genre:' + genre, genre) for genre in genre_order['genres'])
        + '</optgroup>' + option('genre:TBA', '风格未知'),
        'date_nav': '<button type="button" id="all-dates" hidden aria-pressed="true"><span>全部日期</span></button>'
        + ''.join(f'<a href="#{day_id(day)}" data-date="{day.isoformat()}"><span>{day:%m.%d}</span><small>{day:%a}</small></a>' for day in days),
        'hero_posters': ''.join(cards), 'hero_details': ''.join(captions),
    }
    output = (ROOT / 'templates/index.html').read_text()
    for key, value in values.items():
        output = output.replace('{{' + key + '}}', value)
    assert '{{' not in output, 'Unresolved template field'
    return output


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify committed output matches content and template')
    args = parser.parse_args()
    output = render()
    if args.check:
        assert (ROOT / 'index.html').read_text() == output, 'Run python3 scripts/build_page.py to update index.html'
        print('OK: index.html matches JSON and template')
    else:
        (ROOT / 'index.html').write_text(output)
        print('Built index.html from data/events.json and templates/index.html')
