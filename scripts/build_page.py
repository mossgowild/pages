"""Render the static event guide from content JSON and the HTML template."""
import argparse
from datetime import date, datetime, timedelta
from html import escape
import json
from pathlib import Path
import re
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
            # The code itself copies on tap (assets/copy-share.js); without the script it stays selectable text.
            result.append('<div class="mini-program"><span class="mini-program-label">' + escape(part['label']) + '</span>'
                          + f'<button type="button" class="copy-target" data-copy-text="{escape(part["code"], quote=True)}" disabled>'
                          + '<code>' + escape(part['code']) + '</code>' + COPY_ICON + '<span class="copy-status" aria-live="polite"></span></button>'
                          + '<small>' + escape(part['note']) + '</small></div>')
        else:
            raise ValueError(f'Unknown content type: {kind}')
    return ''.join(result)


SHARE_ICON = '<svg class="action-icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5v8M5 4.5l3-3 3 3M3.5 7.5v6h9v-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
COPY_ICON = '<svg class="action-icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 3.5v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'


def lines(values):
    return '<br>'.join(escape(value) for value in values)


def stage_heading(stage):
    # A stage's name with the genres and note that belong to the whole stage (the `stages` field), never to each artist.
    info = stage.get('info', {})
    return (escape(stage['name'])
            + (f'<span class="stage-genres">{escape(" · ".join(info["genres"]))}</span>' if info.get('genres') else '')
            + (f'<small class="stage-note">{escape(info["note"])}</small>' if info.get('note') else ''))


def artist_label(artist):
    # An artist's name(s) with the performance form and note in small print.
    names = ['<span class="artist-name">' + escape(name) + '</span>' for name in artist['names']]
    # A B2B pairing reads as one line, “KK B2B ROCKEY” (question 187); other forms follow the names in small print.
    pair = artist.get('format') == 'B2B' and len(names) > 1
    name = ('<span class="artist-pair">' + '<small class="artist-b2b">B2B</small>'.join(names) + '</span>') if pair else ''.join(names)
    for key in ('format', 'note'):
        if artist.get(key) and not (key == 'format' and pair):
            name += '<small class="artist-detail">' + escape(artist[key]) + '</small>'
    return name


def artist_table(event):
    # The lineup table shown in the details: per-artist times and/or genres, or stage columns for a grouped lineup.
    # Artists of one stage sit under a stage heading row; crew (Deco, VJ) follow as rows of their own.
    # Lineups without times, genres or stages are already complete in the row summary, so they get no table.
    artists = event['artists']
    has_time = any(artist.get('time') for artist in artists)
    has_genres = any(artist.get('genres') for artist in artists)
    stages = list(dict.fromkeys(artist.get('stage', '') for artist in artists))
    grouped = not (has_time or has_genres) and len(stages) > 1 and all(stages)
    if not (has_time or has_genres or grouped):
        return ''
    stage_info = {stage['name']: stage for stage in event.get('stages', [])}
    groups = {stage: [] for stage in stages}
    labels = (['时段'] if has_time else []) + ['艺人'] + (['风格'] if has_genres else [])
    rows, current = [], None
    for artist in artists:
        name = artist_label(artist)
        if grouped:
            groups[artist['stage']].append('<li>' + name + '</li>')
            continue
        stage = artist.get('stage', '')
        if stage and stage != current:
            heading = stage_heading({'name': stage, 'info': stage_info.get(stage, {})})
            rows.append(f'<tr class="stage-row"><th scope="colgroup" colspan="{len(labels)}">{heading}</th></tr>')
        current = stage
        cells = []
        if has_time:
            time = escape(artist.get('time', '')).replace('–', '–<wbr>')
            cells.append('<td class="artist-time">' + time + '</td>')
        if has_genres:
            genres = escape(' · '.join(artist.get('genres', [])))
            # Narrow screens hide the genre column and show the same genres under the name instead; unknown stays blank.
            if genres:
                name += '<span class="artist-genres-inline">' + genres + '</span>'
            cells.append('<th scope="row">' + name + '</th><td class="artist-genres">' + genres + '</td>')
        else:
            cells.append('<th scope="row">' + name + '</th>')
        rows.append('<tr>' + ''.join(cells) + '</tr>')
    if grouped:
        heads = [stage_heading({'name': stage, 'info': stage_info.get(stage, {})}) for stage in stages]
        rows = ['<tr>' + ''.join('<td><ul class="artist-list">' + ''.join(groups[stage]) + '</ul></td>'
                                for stage in stages) + '</tr>']
    else:
        heads = [escape(label) for label in labels]
        for member in event.get('crew', []):
            # The role takes the time column (or the name column's place before it), so crew read like lineup rows.
            names = ''.join('<span class="artist-name">' + escape(name) + '</span>' for name in member['names'])
            role = f'<td class="artist-time crew-role">{escape(member["role"])}</td>'
            rows.append('<tr class="crew-row">' + (role if has_time else '') + f'<th scope="row">{names}</th>'
                        + ('<td class="artist-genres"></td>' if has_genres else '') + '</tr>')
    table_class = 'artist-table artist-stage-table' if grouped else 'artist-table'
    header_class = {'时段': ' class="artist-time"', '风格': ' class="artist-genres"'} if not grouped else {}
    return (f'<table class="{table_class}"><caption class="sr-only">' + escape(event['name'])
            + ' · 艺人信息</caption><thead><tr>'
            + ''.join(f'<th scope="col"{header_class.get(label, "")}>' + head + '</th>' for label, head in zip(
                stages if grouped else labels, heads))
            + '</tr></thead><tbody>' + ''.join(rows) + '</tbody></table>')


def lineup_content(event):
    # The lineup area: the table when the lineup has one. Otherwise, when the area still shows (a caption, or rooms whose
    # artists the sources do not place), it lists the rooms as stage heading lines and every artist on a line of their own,
    # forms kept, so it is never small print alone (question 203).
    table = artist_table(event)
    if table:
        return table
    placed = {artist.get('stage') for artist in event['artists']}
    rooms = [stage for stage in event.get('stages', []) if stage['name'] not in placed]
    if not (rooms or event.get('lineup_caption')) or not event['artists']:
        return ''
    heads = ''.join('<li>' + stage_heading({'name': stage['name'], 'info': stage}) + '</li>' for stage in rooms)
    return ((f'<ul class="stage-rooms">{heads}</ul>' if rooms else '')
            + '<ul class="artist-list">' + ''.join('<li>' + artist_label(artist) + '</li>' for artist in event['artists']) + '</ul>')


def ticket_price(price):
    # Tier and note on the left, the amount on the right; each part only when the source has it.
    tier = escape(price['label']) + ('<small>' + escape(price['note']) + '</small>' if price['note'] else '')
    return ('<li>' + (f'<span class="price-tier">{tier}</span>' if tier else '')
            + (f'<b class="price-amount">{escape(price["amount"])}</b>' if price['amount'] else '') + '</li>')


def venue(location):
    # 城市 · 场地 then address lines; an unknown place leaves the city alone. With a known place, the place and address
    # themselves are the action (assets/copy-share.js): the system share sheet with “城市 地址 场地”, or copying it where
    # sharing is unavailable. Without the script the button is inert.
    city, _, place = location[0].partition(' · ')
    # The city label leads the place on one line.
    lines_html = ('<span class="venue-name"><span class="venue-city">' + escape(city) + '</span>' + escape(place) + '</span>'
                  + ''.join('<span class="venue-address">' + escape(line) + '</span>' for line in location[1:]))
    if place:
        text = escape(' '.join([city, *location[1:], place]), quote=True)
        lines_html = (f'<button type="button" class="copy-target venue-target" data-share-text="{text}" data-copy-text="{text}" disabled>'
                      f'<span class="venue-lines">{lines_html}</span>{SHARE_ICON}{COPY_ICON}'
                      '<span class="copy-status" aria-live="polite"></span></button>')
    return lines_html


def info_part(key, items):
    if key == 'prices':
        content = '<ul class="ticket-prices">' + ''.join(ticket_price(price) for price in items) + '</ul>'
    elif key == 'notes':
        content = ''.join('<p>' + escape(note) + '</p>' for note in items)
    else:
        content = '<div class="info-actions">' + ''.join(
            '<p>' + rich([part]) + '</p>' if part['type'] == 'text' else rich([part]) for part in items) + '</div>'
    return f'<div class="info-section info-{key}">{content}</div>'


# The 更多信息 fields split into strictly separate detail sections, in field order; empty sections are left out.
INFO_SECTIONS = [('tickets', 'TICKETS', '票务', ('prices', 'booking')),
                 ('links', 'DETAILS', '活动详情', ('details',)),
                 ('entry', 'ENTRY', '入场须知', ('notes',))]


def info_sections(info):
    # The sections with content and how many there are (the wide layout stacks that many beside the lineup).
    present = [(name, english, title, keys) for name, english, title, keys in INFO_SECTIONS if any(info[key] for key in keys)]
    html = ''.join(detail_section(name, english, title, ''.join(info_part(key, info[key]) for key in keys if info[key]))
                   for name, english, title, keys in present)
    return html, len(present)


def small_light(image):
    """The wall's 400px light version and its pixel width (scripts/build_posters.py scales the short side, never up):
    assets/hero.js shows it instead of the 720px one where it covers the tile on the screen (docs/motion-performance.md)."""
    width, height = image['width'], image['height']
    return poster_path(image['thumbnail_small']), round(width * min(1, 400 / min(width, height)))


def poster_path(value):
    assert value.startswith('assets/posters/') and '..' not in Path(value).parts
    assert (ROOT / value).is_file(), f'Missing poster: {value}'
    return escape(value, quote=True)


def artist_summary(event):
    # One line per lineup entry for the row summary: B2B and other pairings stay together, Live and the like follow the name.
    # An unknown lineup shows nothing.
    if not event['artists']:
        return ''
    items = []
    for artist in event['artists']:
        names, form = artist['names'], artist.get('format', '')
        text = f' {form or "&"} '.join(names) if len(names) > 1 else names[0] + (f' {form}' if form else '')
        items.append('<li>' + escape(text) + '</li>')
    return '<ul class="row-artists" data-field="artists" aria-label="艺人">' + ''.join(items) + '</ul>'


def detail_section(name, english, label, content, caption=''):
    attribute = f' data-field="{name}"' if name == 'location' else ''
    return (f'<section class="event-field event-{name or "lineup"}"{attribute}>'
            f'<h5><span lang="en">{english}</span>{label}{caption}</h5>{content}</section>')


def start_label(event):
    minutes = min(event['starts'])
    return f'{minutes // 60:02}:{minutes % 60:02}'


def event_row(event, images, genre_families):
    families = [name for name, members in genre_families.items() if set(members).intersection(event['genres'])]
    attrs = {'id': event['id'], 'data-families': json.dumps(families, ensure_ascii=False, separators=(',', ':'))}
    for key in ('date', 'city', 'venues', 'genres', 'starts'):
        value = event[key]
        attrs['data-' + key] = json.dumps(value, ensure_ascii=False, separators=(',', ':')) if isinstance(value, (list, bool)) else value
    attrs = ' '.join(f'{key}="{escape(value, quote=True)}"' for key, value in attrs.items())
    assert len(event['posters']) <= 1, f'{event["id"]}: one poster per event'
    poster_content = '<div class="poster-empty">暂无图片</div>'
    for poster in event['posters']:
        image = images[poster['image']]
        assert image['width'] > 0 and image['height'] > 0
        # The light version shows first; near the screen, in the detail sheet and in the preview the full-size version
        # takes over (data-full: the original, or its same-size WebP; scripts/build_posters.py, docs/event-browsing.md).
        full = poster_path(image['full'])
        poster_content = (
            f'<a href="{full}" aria-haspopup="dialog" aria-label="预览：{escape(poster["alt"], quote=True)}">'
            f'<img width="{image["width"]}" height="{image["height"]}" src="{poster_path(image["thumbnail"])}"'
            f' data-full="{full}" loading="lazy" fetchpriority="low" alt="{escape(poster["alt"], quote=True)}"></a>')
    ident = escape(event['id'], quote=True)
    # Unknown start, venue or genres leave their place empty rather than saying so.
    start = escape(start_label(event)) if event['starts'] else ''
    meta = ' · '.join(([escape('、'.join(event['venues']))] if event['venues'] else [])
                      + [f'<span class="event-time">{escape(" / ".join(event["time"]))}</span>'])
    heading = (f'<header class="event-heading" data-field="name"><p class="event-start">{start}'
               f'<small>{escape(event["city"])}</small></p>'
               f'<h4 id="{ident}-title"><button type="button" class="event-toggle" aria-haspopup="dialog" aria-controls="event-detail">{escape(event["name"])}</button></h4>'
               f'<p class="event-meta">{meta}</p>'
               + ''.join('<small class="event-note">' + escape(note) + '</small>' for note in event['notes'])
               + '</header>')
    # Details: the lineup table (时间表 when it has set times, otherwise 阵容) with its small print on a full row, then the
    # 更多信息 sections that have content (the 更多信息 field) and the venue side by side. With the script they open in the
    # event's detail sheet (assets/event-detail.js); without it they stay in the row.
    content, captions = lineup_content(event), event.get('lineup_caption', [])
    timed = any(artist.get('time') for artist in event['artists'])
    lineup = ('TIMETABLE', '时间表') if timed else ('LINEUP', '阵容')
    info, sections_count = info_sections(event['more_info'])
    columns = sections_count + 1
    caption = ''.join(f'<small class="lineup-caption">{escape(text)}</small>' for text in captions)
    sections = (([detail_section('', *lineup, content, caption)] if content or captions else [])
                + [f'<div class="event-info" data-field="info">{info}</div>',
                   detail_section('location', 'VENUE', '地点', venue(event['location']))])
    genres = ('<p class="row-genres" data-field="genres" aria-label="风格">'
              + ''.join(f'<span>{escape(genre)}</span>' for genre in event['genres']) + '</p>') if event['genres'] else ''
    summary = heading + artist_summary(event) + genres
    details = ''.join(sections)
    return (f'<article class="event-row" {attrs} aria-labelledby="{ident}-title">'
            '<div class="event-stage"><div class="event-posters" data-field="posters">' + poster_content + '</div>'
            '<div class="event-summary">' + summary + '</div></div>'
            f'<div class="event-details" id="{ident}-details" style="--columns:{columns}">' + details + '</div></article>')



def option(value, label):
    return f'<option value="{escape(value, quote=True)}">{escape(label)}</option>'


def chip(name, value, label):
    return (f'<label class="filter-chip"><input type="checkbox" name="{name}" value="{escape(value, quote=True)}">'
            f'<span>{escape(label)}</span></label>')


CHEVRON = ('<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"'
           ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>')


def family_chip(index, name, members):
    # Split chip (question 176): the name is the 全部 X checkbox; the arrow opens the family's sub-genre picker
    # (assets/pickers.js), listing `members` in this order. Without the script only the name works.
    value = escape(name, quote=True)
    return (f'<div class="family-chip" data-members="{escape(json.dumps(members, ensure_ascii=False), quote=True)}">'
            f'<label class="family-all"><input type="checkbox" name="family" value="{value}" id="family-{index}">'
            f'<span>{escape(name)}</span></label>'
            f'<button type="button" class="family-more" hidden aria-label="选择 {value} 小类">'
            f'<span class="family-count" hidden></span>{CHEVRON}</button></div>')


def brand_logo():
    """The horizontal logo inline in the header byline; it fills with currentColor so site.css sets its colour."""
    svg = (ROOT / 'assets/brand/youyang-ravers-horizontal.svg').read_text().strip()
    return svg.replace('<svg ', '<svg class="title-logo" aria-hidden="true" focusable="false" ', 1)


def render():
    data = json.loads((ROOT / 'data/events.json').read_text())
    images = {image['path']: image for image in json.loads((ROOT / 'assets/posters/sources.json').read_text())['images']}
    events = data['events']
    genre_families = data['genre_families']
    for name, members in genre_families.items():
        assert name and members and len(members) == len(set(members)), 'Invalid genre family'
        assert 'TBA' not in members and 'Live' not in members, 'Unknown and performance formats are not genres'
    # Unknown or vague details are left out of the data entirely (questions 183, 185): no 尚不明确, 未知 or TBA, and no
    # unnamed stand-ins for a lineup.
    raw = json.dumps(events, ensure_ascii=False)
    assert not re.search(r'尚不明确|未知|"TBA"', raw), 'Leave unknown details out instead of writing a placeholder'
    assert not {'阵容尚不明确', '嘉宾尚不明确', 'DJ / MC 组合'} & {name for event in events for artist in event['artists'] for name in artist['names']}
    start, end = date.fromisoformat(data['start_date']), date.fromisoformat(data['end_date'])
    assert start <= end
    ids = [event['id'] for event in events]
    assert len(ids) == len(set(ids)), 'Duplicate event IDs'
    for event in events:
        assert start <= date.fromisoformat(event['date']) <= end
        assert event['city'] and event['name'] and event['time']
        assert bool(event['venues']) == (' · ' in event['location'][0]), f'{event["id"]}: venue and location disagree'
        assert all(isinstance(time, int) and 0 <= time < 1440 for time in event['starts'])
    events = sorted(events, key=lambda e: (e['date'], min(e['starts']) if e['starts'] else 1440))
    days = [start + timedelta(days=n) for n in range((end - start).days + 1)]
    groups = []
    for day in days:
        daily = [event for event in events if event['date'] == day.isoformat()]
        title = f'{day.month} 月 {day.day} 日'
        heading = (f'<h3 class="day-heading"><span class="day-number" aria-hidden="true">{day:%m.%d}</span>'
                   f'<span class="sr-only">{title} </span><small>{day:%a} / <span class="day-count">{len(daily)}</span> 场</small></h3>')
        if daily:
            content = ('<div class="event-accordion">\n'
                       + '\n'.join(event_row(event, images, genre_families) for event in daily) + '\n</div>')
        else:
            content = '<p class="empty-day">当日暂无活动信息。</p>'
        groups.append(f'<section class="day-group" data-date="{day.isoformat()}">{heading}\n{content}</section>')
    cities = sorted({event['city'] for event in events})
    genres = {genre for event in events for genre in event['genres']}
    genre_order = data['genre_order']
    # Broad source labels (Acid, Afro, EDM…) stay on the rows but are not filters; every other genre has a family.
    broad = set(data['broad_genres'])
    assert not broad & {genre for members in genre_families.values() for genre in members}, 'Broad labels are not family members'
    unassigned = genres - broad - {genre for members in genre_families.values() for genre in members}
    assert not unassigned, f'Assign every known genre to a family or to broad_genres: {sorted(unassigned)}'
    active_families = {name for name, members in genre_families.items() if set(members).intersection(genres)}
    for key, available in (('families', active_families), ('genres', genres - broad)):
        ordered = genre_order[key]
        assert len(ordered) == len(set(ordered)) and set(ordered) == available, f'Update genre_order.{key}'
    # Sub-genres in each family picker: most events this edition first, ties in the JSON member order (question 179).
    counts = {genre: sum(genre in event['genres'] for event in events) for genre in genres}
    family_members = {name: sorted((genre for genre in members if counts.get(genre)), key=lambda genre: -counts[genre])
                      for name, members in genre_families.items()}
    featured = [next(event for event in events if event['id'] == ident) for ident in data['featured']]
    assert len(featured) >= 3 and len(set(data['featured'])) == len(featured), 'Choose distinct featured events'
    cards = []
    for index, event in enumerate(featured):
        poster = event['posters'][0]
        image = images[poster['image']]
        small, small_width = small_light(image)
        # Each poster opens its event's details (assets/event-detail.js, docs/event-browsing.md Q24); without the script it
        # links to the event's row.
        cards.append(f'<li><a class="hero-poster spotlight-card" href="#{escape(event["id"])}" draggable="false"'
                     f' aria-label="{escape(event["name"], quote=True)} · 阵容与购票">'
                     f'<img src="{poster_path(image["thumbnail"])}" width="{image["width"]}" height="{image["height"]}"'
                     f' data-small="{small}" data-small-width="{small_width}" loading="lazy" decoding="async" draggable="false"'
                     f' alt="{escape(poster["alt"], quote=True)}"></a></li>')
    title, publisher = data['title'], data['publisher']
    values = {
        'title': escape(''.join(title[key] for key in ('region', 'topic', 'guide'))),
        'title_region': escape(title['region']), 'title_topic': escape(title['topic']), 'title_guide': escape(title['guide']),
        'byline': escape('By ' + publisher['name'] + publisher['latin']), 'brand_logo': brand_logo(),
        'edition_year': str(start.year), 'date_range': f'{start:%m.%d} — {end:%m.%d}',
        'schedule': '\n'.join(groups), 'event_count': str(len(events)), 'updated_iso': data['updated_at'],
        'updated_date': datetime.fromisoformat(data['updated_at']).strftime('%m.%d'),
        'updated_time': datetime.fromisoformat(data['updated_at']).strftime('%H:%M'),
        'start_date': start.isoformat(), 'end_date': end.isoformat(),
        'city_chips': ''.join(chip('city', city, city) for city in cities),
        'family_chips': ''.join(family_chip(index, name, family_members[name]) for index, name in enumerate(genre_order['families'])),
        'genre_options': ''.join(option(genre, genre) for genre in genre_order['genres']),
        'hero_posters': ''.join(cards),
        # Inlined so it does not block the first render as a second stylesheet (docs/motion-performance.md).
        'hero_css': (ROOT / 'assets/hero.css').read_text().strip(),
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
