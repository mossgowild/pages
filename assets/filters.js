'use strict';

function validRange(filters) {
  return !filters.from || !filters.to || filters.from <= filters.to;
}

// Events with an unknown start match neither period (question 182: unknown details are not filters).
const PERIOD_MATCHERS = {
  day: event => event.starts.some(time => time < 1080),
  night: event => event.starts.some(time => time >= 1080),
};

// Each facet holds a list: an event matches any value within a facet and every facet that has values.
// Genre families and specific genres form one facet.
function matchesEvent(event, filters) {
  if (!validRange(filters)) return false;
  const { city = [], venue = [], families = [], genres = [], period = [] } = filters;
  if (city.length && !city.includes(event.city)) return false;
  if (venue.length && !event.venues.some(name => venue.includes(`${event.city}|${name}`))) return false;
  if (filters.from && event.date < filters.from) return false;
  if (filters.to && event.date > filters.to) return false;
  if ((families.length || genres.length)
    && !event.families.some(name => families.includes(name)) && !event.genres.some(name => genres.includes(name))) return false;
  if (period.length && !period.some(name => PERIOD_MATCHERS[name](event))) return false;
  return true;
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('filters');
  const dock = document.querySelector('.filter-dock');
  const sentinel = document.querySelector('.filter-sentinel');
  const bar = dock.querySelector('.filter-bar');
  const fields = { venue: form.elements.namedItem('venue'), genre: form.elements.namedItem('genre'),
    from: form.elements.namedItem('from'), to: form.elements.namedItem('to') };
  const chipsOf = name => [...form.querySelectorAll(`input[name="${name}"]`)];
  const events = [...document.querySelectorAll('.event-row[data-date]')].map(row => ({
    row, date: row.dataset.date, city: row.dataset.city,
    venues: JSON.parse(row.dataset.venues), genres: JSON.parse(row.dataset.genres),
    families: JSON.parse(row.dataset.families),
    starts: JSON.parse(row.dataset.starts)
  }));
  const groups = [...document.querySelectorAll('.day-group')];
  const error = document.getElementById('filter-error');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('result-count');

  const checkedValues = name => chipsOf(name).filter(input => input.checked).map(input => input.value);
  const selectedValues = select => [...select.selectedOptions].map(option => option.value);
  function readFilters() {
    return { city: checkedValues('city'), families: checkedValues('family'), period: checkedValues('period'),
      genres: selectedValues(fields.genre), venue: selectedValues(fields.venue), from: fields.from.value, to: fields.to.value };
  }

  function updateVenues() {
    const selected = new Set(selectedValues(fields.venue));
    const chosenCities = checkedValues('city');
    fields.venue.replaceChildren();
    const cities = [...new Set(events.map(event => event.city))];
    for (const city of cities) {
      if (chosenCities.length && !chosenCities.includes(city)) continue;
      const group = document.createElement('optgroup');
      group.label = city;
      const venues = [...new Set(events.filter(event => event.city === city).flatMap(event => event.venues))];
      venues.sort((a, b) => a.localeCompare(b, 'zh-CN'));
      for (const venue of venues) {
        const value = `${city}|${venue}`;
        group.append(new Option(venue, value, false, selected.has(value)));
      }
      fields.venue.append(group);
    }
  }

  // power3.out, the ease of React Bits Card Nav, for the panel and the tags alike.
  const EASE = 'cubic-bezier(.215,.61,.355,1)';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // Selected conditions shown as removable tags on the bar, in panel order.
  const tags = bar.querySelector('.filter-tags');
  const clear = bar.querySelector('.filter-clear');
  const summary = document.getElementById('result-summary');
  // The tag strip fades only on a side with more tags beyond it (the fades live on its non-scrolling wrapper).
  const tagEdge = tags.parentElement;
  const markTagEdges = () => {
    tagEdge.classList.toggle('has-before', tags.scrollLeft > 1);
    tagEdge.classList.toggle('has-after', tags.scrollWidth - tags.clientWidth - tags.scrollLeft > 1);
  };
  tags.addEventListener('scroll', markTagEdges, { passive: true });
  // The strip's own width moves too (the result count changes after the tags, the bar docks), not only the window's.
  new ResizeObserver(markTagEdges).observe(tags);
  const shortDate = value => value.slice(5).replace('-', '/').replace(/^0/, '').replace('/0', '/');
  let tagsShown = false;
  function tagFor(key, label) {
    const li = document.createElement('li');
    li.dataset.key = key;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-tag';
    button.setAttribute('aria-label', `移除条件：${label}`);
    button.append(label, Object.assign(document.createElement('span'), { ariaHidden: 'true', textContent: '×' }));
    // Removing a tag goes through the same change path as the controls, so the custom dropdowns stay in sync.
    button.addEventListener('click', () => {
      li.item.remove();
      li.item.field.dispatchEvent(new Event('change', { bubbles: true }));
    });
    li.append(button);
    return li;
  }
  // Tags never clip (question 199, after the first version's width wipe read as cropped): a new tag appears at full size,
  // growing from 0.8 and fading in where it lands, while its neighbours glide to their new places; a leaving tag lifts
  // out of the row where it stood and shrinks back to 0.8 as it fades, and the others glide into the gap. Entering and
  // gliding take 0.4s power3.out, the Card Nav rhythm. A tag caught mid-way starts again from what it currently shows.
  const TAG_MOTION = { duration: 400, easing: EASE };
  const shown = li => ({ opacity: getComputedStyle(li).opacity, transform: getComputedStyle(li).transform.replace('none', 'scale(1)') });
  function enterTag(li) {
    li.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'scale(1)' }], TAG_MOTION).finished.then(markTagEdges, () => {});
  }
  function leaveTag(li, place, from) {
    li.getAnimations().forEach(animation => animation.cancel());
    Object.assign(li.style, { position: 'absolute', left: `${place.left}px`, top: `${place.top}px` });
    // Leaving eases in and out over 0.3s (power2.inOut, question 202), so the fade reads evenly from start to end.
    return li.animate([from, { opacity: 0, transform: 'scale(.8)' }], { duration: 300, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'forwards' })
      .finished.then(() => li.remove(), () => {});
  }
  function slideTag(li, dx) {
    li.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], TAG_MOTION).finished.then(markTagEdges, () => {});
  }
  // Where the strip must scroll for the tag to sit clear of the 24px edge fades; a tag wider than the strip (phones keep
  // only about 120px for tags) shows its start. Layout offsets: the strip is the tags' offset parent.
  function scrollFor(li) {
    const left = li.offsetLeft - 24;
    const right = li.offsetLeft + li.offsetWidth + 24;
    if (left < tags.scrollLeft || right - left > tags.clientWidth) return left;
    return right > tags.scrollLeft + tags.clientWidth ? right - tags.clientWidth : tags.scrollLeft;
  }
  // A new tag outside the strip's view brings the strip there: smoothly with motion, at once without.
  function revealTag(li, smooth) {
    const target = scrollFor(li);
    if (target !== tags.scrollLeft) tags.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'instant' });
  }
  function renderTags(filters) {
    const items = [];
    const chipTags = name => chipsOf(name).filter(input => input.checked)
      .map(input => ({ label: input.nextElementSibling.textContent, field: input, remove: () => { input.checked = false; } }));
    const optionTags = select => [...select.selectedOptions]
      .map(option => ({ label: option.textContent, field: select, remove: () => { option.selected = false; } }));
    items.push(...chipTags('city'), ...chipTags('family'), ...optionTags(fields.genre), ...chipTags('period'), ...optionTags(fields.venue));
    if (filters.from || filters.to) {
      const label = filters.from && filters.to ? (filters.from === filters.to ? shortDate(filters.from) : `${shortDate(filters.from)}–${shortDate(filters.to)}`)
        : filters.from ? `${shortDate(filters.from)} 起` : `至 ${shortDate(filters.to)}`;
      items.push({ label, field: fields.to, remove: () => { fields.from.value = fields.to.value = ''; } });
    }
    // Tags are kept per condition, so only the ones that come or go move (questions 199–200). A leaving tag stays in its
    // place, out of reach, until it has folded away; the others fall into panel order around it.
    const kept = new Map([...tags.children].filter(li => !li.classList.contains('is-leaving')).map(li => [li.dataset.key, li]));
    const wanted = items.map(item => {
      const key = `${item.field.name}|${item.label}`;
      const li = kept.get(key) ?? tagFor(key, item.label);
      li.item = item;
      return li;
    });
    const leaving = [...kept.values()].filter(li => !wanted.includes(li));
    const entering = wanted.filter(li => !li.isConnected);
    for (const li of leaving) {
      li.classList.add('is-leaving');
      li.inert = true;
    }
    const animate = tagsShown && !reducedMotion.matches;
    // Where every tag shows now (mid-glide included), before the row changes.
    const was = new Map([...tags.children].map(li => [li, li.getBoundingClientRect().left]));
    let gone = Promise.resolve();
    const scroll = tags.scrollLeft;
    if (animate) {
      // Every reading before any tag is lifted out of the row: a layout between two lifts would shrink the strip's
      // scroll range for a moment, and the browser would pull a scrolled strip back.
      const states = leaving.map(li => ({ place: { left: li.offsetLeft, top: li.offsetTop }, from: shown(li) }));
      gone = Promise.all(leaving.map((li, index) => leaveTag(li, states[index].place, states[index].from)));
    } else leaving.forEach(li => li.remove());
    const nextAfter = li => {
      let next = li ? li.nextElementSibling : tags.firstElementChild;
      while (next?.classList.contains('is-leaving')) next = next.nextElementSibling;
      return next;
    };
    let previous = null;
    for (const li of wanted) {
      const next = nextAfter(previous);
      if (li !== next) tags.insertBefore(li, next);
      previous = li;
    }
    if (animate) {
      for (const li of wanted) {
        if (entering.includes(li)) {
          enterTag(li);
          continue;
        }
        const before = was.get(li);
        li.getAnimations().filter(animation => animation.effect.getKeyframes().some(frame => frame.transform?.startsWith('translateX'))).forEach(animation => animation.cancel());
        const dx = before - li.getBoundingClientRect().left;
        if (Math.abs(dx) > 0.5) slideTag(li, dx);
      }
    }
    if (animate) tags.scrollLeft = scroll;
    if (entering.length && tagsShown) revealTag(entering[0], animate);
    tagsShown = true;
    // 清空 stays until the last tags have gone: hiding it at once widens the strip, and the browser then pulls a scrolled
    // strip back before the tags could fade where they were.
    if (items.length) clear.hidden = false;
    else gone.then(() => { if (!tags.querySelector('li:not(.is-leaving)')) clear.hidden = true; });
    markTagEdges();
    return items.length > 0;
  }

  // Where the bar docks: 2px past the sentinel (scroll positions round to whole pixels, and the observer counts a
  // sentinel within a pixel of the edge as still visible).
  const dockPoint = () => Math.ceil(sentinel.getBoundingClientRect().bottom + scrollY) + 2;
  // However few the results, the page keeps a screen below the dock point, so the bar can stay docked instead of
  // sliding down when a filter shortens the list. The room is space after the list (a margin), measured off the page.
  const schedule = document.getElementById('schedule');
  let dockRoom = 0;
  function keepDockRoom() {
    const natural = document.documentElement.scrollHeight - dockRoom;
    dockRoom = Math.max(0, Math.ceil(innerHeight - (natural - dockPoint())));
    schedule.style.marginBottom = dockRoom ? `${dockRoom}px` : '';
  }

  // Any change of conditions brings the page to the start of the results, right under the docked bar (questions 205,
  // 207): at once behind the open panel, smoothly otherwise.
  // The glide can be cut off as the list grows under it, so it ends with an exact placement.
  function showResults() {
    const settle = () => {
      if (Math.abs(scrollY - dockPoint()) >= 1) scrollTo({ top: dockPoint(), behavior: 'instant' });
    };
    if (isOpen()) settle();
    else if (Math.abs(scrollY - dockPoint()) >= 1) glideTo(dockPoint()).then(settle);
  }

  function apply() {
    const filters = readFilters();
    const valid = validRange(filters) && fields.from.validity.valid && fields.to.validity.valid;
    error.hidden = valid;
    error.textContent = validRange(filters)
      ? '日期需在 2026 年 9 月 30 日至 10 月 7 日之间。' : '结束日期需晚于或等于开始日期。';
    for (const field of [fields.from, fields.to]) field.setAttribute('aria-invalid', String(!valid));
    const active = renderTags(filters);
    let total = 0;
    for (const event of events) {
      event.row.hidden = valid && !matchesEvent(event, filters);
      if (!event.row.hidden) total++;
    }
    for (const group of groups) {
      const visible = events.filter(event => event.date === group.dataset.date && !event.row.hidden).length;
      group.querySelector('.day-count').textContent = visible;
      group.hidden = valid && active && visible === 0;
    }
    empty.hidden = !valid || total > 0;
    count.textContent = valid ? total : events.length;
    summary.textContent = !valid ? '日期条件无效，暂显示全部活动'
      : active ? `找到 ${total} / ${events.length} 场活动` : `全部 ${events.length} 场活动`;
    keepDockRoom();
  }

  // React Bits Card Nav: the panel (the form, an overlay below the bar like Card Nav's own) grows over 0.4s (power3.out)
  // while the page scrim fades in, and the cards rise 50px and fade in 0.08s apart, starting 0.1s before the growth
  // ends; closing plays the same timeline backwards.
  const toggle = bar.querySelector('.filter-toggle');
  const panel = form;
  const scrim = document.querySelector('.filter-scrim');
  const cards = [...panel.querySelectorAll('.filter-card')];
  let navAnimations = [];
  function playNav(open) {
    navAnimations.forEach(animation => animation.cancel());
    navAnimations = [];
    if (reducedMotion.matches) return Promise.resolve();
    const height = panel.getBoundingClientRect().height;
    const settle = open ? 'backwards' : 'forwards';
    const grow = panel.animate([{ height: '0px' }, { height: `${height}px` }],
      { duration: 400, easing: EASE, fill: settle, direction: open ? 'normal' : 'reverse',
        delay: open ? 0 : 300 + (cards.length - 1) * 80 });
    const fade = scrim.animate([{ opacity: 0 }, { opacity: 1 }],
      { duration: 400, easing: EASE, fill: settle, direction: open ? 'normal' : 'reverse',
        delay: open ? 0 : 300 + (cards.length - 1) * 80 });
    const rise = cards.map((card, index) => card.animate([{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: 400, easing: EASE, fill: settle, direction: open ? 'normal' : 'reverse',
        delay: open ? 300 + index * 80 : (cards.length - 1 - index) * 80 }));
    navAnimations = [grow, fade, ...rise];
    return Promise.all(navAnimations.map(animation => animation.finished)).catch(() => {});
  }
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  // Stuck once the sentinel has fully left the top (an edge-adjacent sentinel still counts as visible, as in the observer).
  const isStuck = () => dock.classList.contains('is-stuck');
  // The overlay drops from the docked bar, so a bar still in the page first scrolls up to dock (question 180). Resolves
  // when the scroll arrives or stops short (a page too short to reach that place).
  function dockBar() {
    const target = Math.min(dockPoint(), document.documentElement.scrollHeight - innerHeight);
    if (isStuck() || scrollY >= target - 0.5) return Promise.resolve();
    return glideTo(target);
  }
  // A smooth scroll that resolves when it arrives, stalls (a page too short, or the motion cut off by content changing
  // underneath) or runs past 1.5s.
  function glideTo(target) {
    scrollTo({ top: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    const start = performance.now();
    return new Promise(resolve => {
      let last = scrollY, still = 0;
      const watch = () => {
        still = Math.abs(scrollY - last) < 0.5 ? still + 1 : 0;
        last = scrollY;
        if (Math.abs(scrollY - target) < 1 || still > 8 || performance.now() - start > 1500) resolve();
        else requestAnimationFrame(watch);
      };
      requestAnimationFrame(watch);
    });
  }
  // The cards may use the screen below the bar and scroll inside when taller (question 164); a fade marks more below.
  function fitPanel() {
    const barBottom = isStuck() ? bar.offsetHeight : bar.getBoundingClientRect().bottom;
    panel.style.maxHeight = `${Math.max(0, innerHeight - barBottom)}px`;
  }
  const markMore = () => panel.classList.toggle('has-more', panel.scrollHeight - panel.clientHeight - panel.scrollTop > 1);
  panel.addEventListener('scroll', markMore, { passive: true });
  // While open the scrim covers the page below the bar and the page itself does not scroll.
  function setOpen(open) {
    if (open === isOpen()) return;
    toggle.setAttribute('aria-expanded', String(open));
    bar.classList.toggle('is-open', open);
    if (open) {
      dockBar().then(() => {
        if (!isOpen()) return;
        fitPanel();
        document.documentElement.classList.add('is-filtering');
        panel.hidden = scrim.hidden = false;
        playNav(true).then(markMore);
      });
    } else {
      document.documentElement.classList.remove('is-filtering');
      playNav(false).then(() => { if (!isOpen()) panel.hidden = scrim.hidden = true; });
    }
  }
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !isOpen()) return;
    if (!form.contains(event.target) && !bar.contains(event.target)) return;
    setOpen(false);
    toggle.focus();
  });
  // The scrim shows through the panel's gaps and margins, so a tap there closes it too; a click (not a pointer press)
  // so that a drag starting in a gap still scrolls the cards.
  panel.addEventListener('click', event => { if (event.target === panel) setOpen(false); });
  // A tap outside (on the scrim) closes the panel, unless it is the tap that dismisses an open picker popover.
  document.addEventListener('pointerdown', event => {
    if (!isOpen() || form.contains(event.target) || bar.contains(event.target)
      || event.target.closest('.picker-pop') || document.querySelector('.picker-pop:popover-open')) return;
    setOpen(false);
  }, true);

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', event => {
    if (event.target.name === 'city') updateVenues();
    apply();
    showResults();
  });
  form.addEventListener('reset', event => {
    event.preventDefault();
    for (const input of form.querySelectorAll('input[type="checkbox"]')) input.checked = false;
    for (const option of form.querySelectorAll('option')) option.selected = false;
    fields.from.value = fields.to.value = '';
    updateVenues();
    apply();
    if (!quietReset) showResults();
  });
  // Resets that lead somewhere else (an anchor, a spotlight card) leave the scrolling to that destination.
  let quietReset = false;
  const resetQuietly = () => {
    quietReset = true;
    form.reset();
    quietReset = false;
  };
  document.getElementById('reset-empty').addEventListener('click', () => {
    form.reset();
    toggle.focus();
  });
  function revealTarget() {
    const target = document.getElementById(location.hash.slice(1));
    if (target && (target.hidden || target.closest('.day-group')?.hidden)) {
      resetQuietly();
      target.scrollIntoView();
    }
  }
  for (const link of document.querySelectorAll('.spotlight-card')) link.addEventListener('click', () => {
    const target = document.querySelector(link.hash);
    if (target.hidden || target.closest('.day-group').hidden) resetQuietly();
  });
  window.addEventListener('hashchange', revealTarget);
  updateVenues();
  apply();
  dock.hidden = false;
  // is-stuck marks the dock while it is pinned to the top: a state switch (question 170), after which site.css eases the
  // bar into a flush full-width bar. --edge is how far the bar then reaches past the content column.
  // The root reaches far below the screen, so the sentinel only stops intersecting once it has passed the top: a jump
  // from below the screen to above it still crosses that edge and reports. A batch can hold several entries (a reload
  // restoring a deep scroll reports the first layout and then the restored place), so the latest one decides.
  new IntersectionObserver(entries => {
    const entry = entries.at(-1);
    dock.classList.toggle('is-stuck', !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }, { rootMargin: '0px 0px 100000px 0px' }).observe(sentinel);
  const setEdge = () => dock.style.setProperty('--edge', `${dock.getBoundingClientRect().left}px`);
  // The list also changes size after a filter (a row opening in the accordion, posters loading), so the room and, with
  // the panel open, the page's place at the start of the results follow its size.
  // Deferred a frame: adjusting the page inside the observer's own callback would re-trigger layout observers in WebKit.
  new ResizeObserver(() => requestAnimationFrame(() => {
    keepDockRoom();
    if (isOpen() && Math.abs(scrollY - dockPoint()) >= 1) scrollTo({ top: dockPoint(), behavior: 'instant' });
  })).observe(schedule);
  addEventListener('resize', () => {
    setEdge();
    keepDockRoom();
    if (isOpen() && !panel.hidden) {
      fitPanel();
      markMore();
    }
  });
  setEdge();
  revealTarget();
}
