'use strict';

// Custom pickers for the filter form. A shared shell draws a pill trigger (or adopts a given one) and a top-layer
// popover (a dropdown under the trigger on wide screens, a bottom sheet below 769px). Three contents use it: a
// searchable multi-select list over a hidden <select multiple data-multi-select> (venues), the same list for each
// genre family's sub-genres behind the arrow of its split chip, and a date-range calendar over the hidden #from/#to
// inputs. The native controls stay in the form as the source of values, so filters.js keeps reading them unchanged.
(() => {
  const narrow = matchMedia('(max-width: 768px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // GSAP eases: power3.out (cubic) for the Card Nav timeline, power4.out (quint) for the sheet springing back after a drag.
  const EASE = 'cubic-bezier(.215,.61,.355,1)';
  const OUT = 'cubic-bezier(.22,1,.36,1)';
  let openPicker = null;
  const icon = path => `<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"`
    + ` stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const chevron = icon('<path d="m3 6 5 5 5-5"/>');
  const calendar = icon('<rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 7h12M5 1.5v3M11 1.5v3"/>');
  const magnifier = icon('<circle cx="7" cy="7" r="5"/><path d="m11 11 3.5 3.5"/>');

  // The shell: a pill trigger after `anchor` (or the given `trigger`), popover in <body>, positioning, header with 清除,
  // 完成 button, open/close and focus. The popover is manual so that closing can animate: this shell dismisses it on an
  // outside press, Esc, 完成, its trigger or another picker opening, and on a downward drag of the sheet's grip (phones).
  // Motion (questions 196–198): the rhythm of the filter panel's React Bits Card Nav — the sheet comes in over 0.4s
  // (power3.out) with the veil, phones from the bottom edge and wide screens wiping down from the trigger, and the
  // title row, the list and 完成 rise 50px and fade in 0.08s apart from 0.3s; closing plays it backwards. A sheet let go
  // past the drag threshold leaves from where it was dropped. Reduced motion shows and hides at once.
  function createPicker({ anchor, trigger: given, id, title, labelledBy, glyph, onClear }) {
    const trigger = given ?? document.createElement('button');
    if (!given) {
      trigger.type = 'button';
      trigger.className = 'picker-trigger';
      trigger.setAttribute('aria-labelledby', `${labelledBy} ${id}-value`);
      trigger.innerHTML = `<span class="picker-value" id="${id}-value"></span><span class="picker-count" hidden></span>${glyph}`;
      anchor.after(trigger);
    }
    trigger.setAttribute('aria-expanded', 'false');

    const pop = document.createElement('div');
    pop.id = `${id}-popover`;
    pop.className = 'picker-pop';
    pop.popover = 'manual';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-labelledby', `${id}-title`);
    pop.innerHTML = '<div class="picker-sheet"><div class="picker-handle" aria-hidden="true"></div>'
      + `<div class="picker-head"><strong id="${id}-title">${title}</strong><button type="button" class="picker-clear">清除</button></div>`
      + '<div class="picker-body"></div><button type="button" class="picker-done"></button></div>';
    document.body.append(pop);
    trigger.setAttribute('aria-controls', pop.id);
    const sheet = pop.querySelector('.picker-sheet');
    const body = pop.querySelector('.picker-body');

    const value = trigger.querySelector('.picker-value');
    const count = trigger.querySelector('.picker-count');
    const done = pop.querySelector('.picker-done');
    const listeners = { open: [], close: [] };

    function place() {
      if (narrow.matches) {
        for (const property of ['left', 'top', 'width', '--picker-room']) pop.style.removeProperty(property);
        return;
      }
      const box = trigger.getBoundingClientRect();
      const width = Math.max(box.width, 300);
      // Wider than its trigger near the right edge: align the right edges instead.
      const left = box.left + width > innerWidth - 12 ? box.right - width : box.left;
      pop.style.left = `${Math.max(12, left)}px`;
      pop.style.top = `${box.bottom + 8}px`;
      pop.style.width = `${width}px`;
      pop.style.setProperty('--picker-room', `${Math.max(160, innerHeight - box.bottom - 24)}px`);
    }
    const replace = () => { if (pop.matches(':popover-open')) place(); };

    // In: from below the screen on phones, a downward wipe from the trigger's side on wide screens.
    const away = () => (narrow.matches ? [{ transform: 'translateY(100%)' }, { transform: 'none' }]
      : [{ clipPath: 'inset(0 0 100% 0 round 24px)' }, { clipPath: 'inset(0 round 24px)' }]);
    let motion = [];
    const stop = () => {
      motion.forEach(animation => animation.cancel());
      motion = [];
    };
    // The Card Nav timeline over the parts in view (the title row and 完成 only show on phones). Closing plays it
    // backwards: the parts leave last one first, then the sheet and the veil.
    function play(closing) {
      const parts = [pop.querySelector('.picker-head'), body, done].filter(part => part.getClientRects().length);
      const timing = delay => ({ duration: 400, easing: EASE, delay, fill: closing ? 'forwards' : 'backwards', direction: closing ? 'reverse' : 'normal' });
      const lead = closing ? 300 + (parts.length - 1) * 80 : 0;
      return [
        sheet.animate(away(), timing(lead)),
        pop.animate([{ '--veil': 0 }, { '--veil': 1 }], timing(lead)),
        ...parts.map((part, index) => part.animate([{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
          timing(closing ? (parts.length - 1 - index) * 80 : 300 + index * 80))),
      ];
    }
    function open() {
      if (openPicker && openPicker !== api) openPicker.close();
      openPicker = api;
      stop();
      place();
      pop.showPopover();
      if (!reducedMotion.matches) motion = play(false);
    }
    function close({ from = 0 } = {}) {
      if (!pop.matches(':popover-open') || pop.classList.contains('is-closing')) return;
      if (openPicker === api) openPicker = null;
      stop();
      const finish = () => {
        pop.classList.remove('is-closing');
        sheet.style.removeProperty('transform');
        pop.style.removeProperty('--veil');
        pop.hidePopover();
      };
      if (reducedMotion.matches) return finish();
      pop.classList.add('is-closing');
      // A dropped sheet runs the sheet's part of the timeline backwards from where it was let go.
      const dropped = { duration: 400, easing: EASE, fill: 'forwards', direction: 'reverse' };
      motion = from
        ? [sheet.animate([{ transform: 'translateY(100%)' }, { transform: `translateY(${from}px)` }], dropped),
          pop.animate([{ '--veil': 0 }, { '--veil': 1 - from / sheet.offsetHeight }], dropped)]
        : play(true);
      Promise.all(motion.map(animation => animation.finished)).then(finish, () => {});
    }
    trigger.addEventListener('click', () => (pop.matches(':popover-open') && !pop.classList.contains('is-closing') ? close() : open()));
    document.addEventListener('pointerdown', event => {
      if (pop.matches(':popover-open') && !pop.contains(event.target) && !trigger.contains(event.target)) close();
    }, true);
    // Esc closes the open picker wherever focus is (phones do not move focus into the sheet), before the filter panel
    // sees it.
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || openPicker !== api) return;
      event.stopPropagation();
      close();
    }, true);

    // Phones: drag the grip (handle and title row) down; the sheet follows and the veil thins. Past a third of the
    // sheet or a quick flick (0.5px/ms) it closes from there, otherwise it springs back.
    let drag = null;
    const grip = [pop.querySelector('.picker-handle'), pop.querySelector('.picker-head')];
    for (const part of grip) {
      part.addEventListener('pointerdown', event => {
        if (!narrow.matches || event.target.closest('button') || event.button > 0) return;
        drag = { id: event.pointerId, start: event.clientY, y: 0, time: event.timeStamp, speed: 0 };
        part.setPointerCapture(event.pointerId);
      });
      part.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.id) return;
        const y = Math.max(0, event.clientY - drag.start);
        drag.speed = (y - drag.y) / Math.max(1, event.timeStamp - drag.time);
        drag.y = y;
        drag.time = event.timeStamp;
        stop();
        sheet.style.transform = `translateY(${y}px)`;
        pop.style.setProperty('--veil', String(1 - y / sheet.offsetHeight));
      });
      const release = event => {
        if (!drag || event.pointerId !== drag.id) return;
        const { y, speed } = drag;
        drag = null;
        if (!y) return;
        if (y > sheet.offsetHeight / 3 || speed > 0.5) return close({ from: y });
        sheet.style.removeProperty('transform');
        pop.style.removeProperty('--veil');
        if (reducedMotion.matches) return;
        motion = [sheet.animate([{ transform: `translateY(${y}px)` }, { transform: 'none' }], { duration: 300, easing: OUT }),
          pop.animate([{ '--veil': 1 - y / sheet.offsetHeight }, { '--veil': 1 }], { duration: 300, easing: OUT })];
      };
      part.addEventListener('pointerup', release);
      part.addEventListener('pointercancel', release);
    }

    pop.addEventListener('toggle', event => {
      const open = event.newState === 'open';
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        addEventListener('scroll', replace, { passive: true });
        addEventListener('resize', replace);
      } else {
        removeEventListener('scroll', replace);
        removeEventListener('resize', replace);
        if (pop.contains(document.activeElement) || document.activeElement === document.body) trigger.focus({ preventScroll: true });
      }
      for (const listener of listeners[open ? 'open' : 'close']) listener();
    });
    narrow.addEventListener('change', replace);
    pop.querySelector('.picker-clear').addEventListener('click', onClear);
    done.addEventListener('click', () => close());

    const api = {
      trigger, pop, body, close,
      on: (name, listener) => listeners[name].push(listener),
      show({ text, placeholder, badge, doneText }) {
        if (value) value.textContent = text || placeholder;
        trigger.classList.toggle('has-value', Boolean(text));
        if (count) {
          count.hidden = !badge;
          count.textContent = badge || '';
        }
        done.textContent = doneText ? `完成 · ${doneText}` : '完成';
      },
    };
    return api;
  }

  // A search box and a multi-select listbox in a picker body. `groups()` returns [{ label, rows }] (label null for no
  // heading); each row is { text, selected(), toggle() }. Rows rebuild with build(), selection marks refresh with sync().
  function multiList(picker, { id, labelId, search: placeholder, groups }) {
    picker.body.innerHTML = `<label class="ms-search">${magnifier}<input type="search" placeholder="${placeholder}"`
      + ` autocomplete="off" aria-controls="${id}-listbox"></label>`
      + `<ul class="ms-list" id="${id}-listbox" role="listbox" aria-multiselectable="true" aria-labelledby="${labelId}"></ul>`
      + '<p class="ms-empty" hidden>没有匹配的选项</p>';
    const search = picker.body.querySelector('input');
    const list = picker.body.querySelector('.ms-list');
    const empty = picker.body.querySelector('.ms-empty');

    const rowItem = row => {
      const li = document.createElement('li');
      li.className = 'ms-option';
      li.setAttribute('role', 'option');
      li.tabIndex = -1;
      li.textContent = row.text;
      li.row = row;
      return li;
    };
    function build() {
      list.replaceChildren(...groups().flatMap(({ label, rows }) => {
        if (!label) return rows.map(rowItem);
        const group = document.createElement('li');
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', label);
        group.innerHTML = `<span class="ms-group" aria-hidden="true">${label}</span>`;
        const options = document.createElement('ul');
        options.setAttribute('role', 'presentation');
        options.append(...rows.map(rowItem));
        group.append(options);
        return [group];
      }));
      filter();
      sync();
    }
    function sync() {
      for (const li of list.querySelectorAll('.ms-option')) li.setAttribute('aria-selected', String(li.row.selected()));
    }
    function filter() {
      const query = search.value.trim().toLowerCase();
      let shown = 0;
      for (const li of list.querySelectorAll('.ms-option')) {
        li.hidden = Boolean(query) && !li.textContent.toLowerCase().includes(query);
        if (!li.hidden) shown++;
      }
      for (const group of list.querySelectorAll('[role="group"]')) group.hidden = !group.querySelector('.ms-option:not([hidden])');
      empty.hidden = shown > 0;
    }
    const visibleOptions = () => [...list.querySelectorAll('.ms-option:not([hidden])')];

    picker.on('open', () => {
      if (!narrow.matches) search.focus({ preventScroll: true });
      list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'center' });
    });
    picker.on('close', () => {
      search.value = '';
      filter();
    });
    list.addEventListener('click', event => event.target.closest('.ms-option')?.row.toggle());
    list.addEventListener('keydown', event => {
      const li = event.target.closest('.ms-option');
      if (!li) return;
      const options = visibleOptions();
      const index = options.indexOf(li);
      const moves = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: options.length - 1 };
      if (event.key in moves) {
        event.preventDefault();
        if (event.key === 'ArrowUp' && index === 0) search.focus();
        else options[Math.min(Math.max(moves[event.key], 0), options.length - 1)].focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        li.row.toggle();
      }
    });
    search.addEventListener('input', filter);
    search.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        visibleOptions()[0]?.focus();
      }
    });
    return { build, sync };
  }

  // Multi-select over a hidden select (venues, grouped by city); options toggle the select's options.
  function enhanceSelect(select) {
    const id = select.id;
    const labelId = select.getAttribute('aria-labelledby');
    select.hidden = true;
    const notify = () => select.dispatchEvent(new Event('change', { bubbles: true }));
    const picker = createPicker({
      anchor: select, id, title: document.getElementById(labelId).textContent, labelledBy: labelId, glyph: chevron,
      onClear() {
        for (const option of select.selectedOptions) option.selected = false;
        notify();
      },
    });
    picker.trigger.setAttribute('aria-haspopup', 'listbox');
    const optionRow = option => ({
      text: option.textContent, selected: () => option.selected,
      toggle() {
        option.selected = !option.selected;
        notify();
      },
    });
    const list = multiList(picker, { id, labelId, search: select.dataset.search, groups: () => [...select.children].map(child =>
      child.tagName === 'OPTGROUP' ? { label: child.label, rows: [...child.children].map(optionRow) } : { label: null, rows: [optionRow(child)] }) });
    function sync() {
      const selected = [...select.selectedOptions];
      picker.show({ text: selected.map(option => option.textContent).join('、'), placeholder: select.dataset.placeholder,
        badge: selected.length, doneText: selected.length ? `${selected.length} 项` : '' });
      list.sync();
    }

    // Selections also change from the filter tags, 清空 and the empty state; the venue list follows the chosen cities.
    select.form.addEventListener('change', sync);
    select.form.addEventListener('reset', () => setTimeout(sync));
    new MutationObserver(() => {
      list.build();
      sync();
    }).observe(select, { childList: true, subtree: true });
    list.build();
    sync();
  }

  // A split family chip (questions 176, 179): the name is the 全部 X checkbox, the small round button opens the family's
  // sub-genres (options of the shared hidden #genre select; no 全部 row, the name already is that). The whole family
  // shows every sub-genre ticked; unticking one leaves the others as a partial choice, and ticking the last one turns
  // them back into the whole family. A partial choice shows its number on the button.
  function enhanceFamily(chip, index) {
    const all = chip.querySelector('input');
    const more = chip.querySelector('.family-more');
    const count = more.querySelector('.family-count');
    const select = document.getElementById('genre');
    const family = all.value;
    const members = JSON.parse(chip.dataset.members).map(value => [...select.options].find(option => option.value === value));
    const notify = () => select.dispatchEvent(new Event('change', { bubbles: true }));
    const clearMembers = () => members.forEach(option => { option.selected = false; });
    const id = `family-${index}-picker`;
    more.hidden = false;
    const picker = createPicker({
      trigger: more, id, title: family, glyph: chevron,
      onClear() {
        all.checked = false;
        clearMembers();
        notify();
      },
    });
    more.setAttribute('aria-haspopup', 'listbox');
    const list = multiList(picker, { id, labelId: `${id}-title`, search: `搜索 ${family} 小类`, groups: () => [{ label: null,
      rows: members.map(option => ({ text: option.textContent, selected: () => all.checked || option.selected, toggle() {
        if (all.checked) {
          all.checked = false;
          members.forEach(member => { member.selected = member !== option; });
        } else {
          option.selected = !option.selected;
          if (members.every(member => member.selected)) {
            all.checked = true;
            clearMembers();
          }
        }
        notify();
      } })) }] });
    // Ticking the name selects the whole family, so it clears the sub-genres first.
    all.addEventListener('change', () => { if (all.checked) clearMembers(); });
    function sync() {
      const chosen = members.filter(option => option.selected).length;
      chip.classList.toggle('is-partial', chosen > 0);
      count.hidden = !chosen;
      count.textContent = chosen || '';
      picker.show({ text: '', badge: 0, doneText: all.checked ? '全部' : chosen ? `${chosen} 项` : '' });
      list.sync();
    }
    all.form.addEventListener('change', sync);
    all.form.addEventListener('reset', () => setTimeout(sync));
    list.build();
    sync();
  }

  // Date range: a Monday-first calendar of the weeks covering the guide's dates; only those dates can be picked.
  // A tap picks a single day; with a single day picked, a later day ends the range, an earlier day starts over,
  // and the same day clears the dates.
  function enhanceDates(host) {
    const from = host.querySelector('#from');
    const to = host.querySelector('#to');
    const labelId = host.dataset.labelledby;
    for (const input of [from, to]) input.hidden = true;
    const notify = () => to.dispatchEvent(new Event('change', { bubbles: true }));
    const set = (start, end) => {
      from.value = start;
      to.value = end;
      notify();
    };
    const picker = createPicker({
      anchor: to, id: 'dates', title: document.getElementById(labelId).textContent, labelledBy: labelId, glyph: calendar,
      onClear: () => set('', ''),
    });
    picker.trigger.setAttribute('aria-haspopup', 'dialog');

    const day = value => new Date(`${value}T00:00:00`);
    const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const short = value => `${Number(value.slice(5, 7))}/${Number(value.slice(8))}`;
    const first = from.min;
    const last = from.max;
    const start = day(first);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const end = day(last);
    end.setDate(end.getDate() + (6 - ((end.getDay() + 6) % 7)));
    const months = [...new Set([first, last].map(value => Number(value.slice(5, 7))))].join('—');

    let cells = '';
    for (const date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const value = iso(date);
      cells += value < first || value > last
        ? `<span class="dr-day" aria-hidden="true">${date.getDate()}</span>`
        : `<button type="button" class="dr-day" data-date="${value}" aria-label="${date.getMonth() + 1} 月 ${date.getDate()} 日">${date.getDate()}</button>`;
    }
    picker.body.innerHTML = `<p class="dr-caption">${first.slice(0, 4)} 年 ${months} 月 · 可选 ${short(first)}—${short(last)}</p>`
      + '<div class="dr-grid" role="group" aria-label="选择日期">'
      + ['一', '二', '三', '四', '五', '六', '日'].map(name => `<span class="dr-weekday" aria-hidden="true">${name}</span>`).join('')
      + cells + '</div>';
    const days = [...picker.body.querySelectorAll('button.dr-day')];

    function sync() {
      const [a, b] = [from.value, to.value];
      const text = a && b ? (a === b ? short(a) : `${short(a)} – ${short(b)}`) : a ? `${short(a)} 起` : b ? `至 ${short(b)}` : '';
      picker.show({ text, placeholder: '全部日期', badge: 0, doneText: text });
      for (const button of days) {
        const value = button.dataset.date;
        const picked = value === a || value === b;
        button.setAttribute('aria-pressed', String(picked));
        button.classList.toggle('is-start', Boolean(a && b && a !== b && value === a));
        button.classList.toggle('is-end', Boolean(a && b && a !== b && value === b));
        button.classList.toggle('is-between', Boolean(a && b && value > a && value < b));
      }
    }
    picker.body.addEventListener('click', event => {
      const value = event.target.closest('button.dr-day')?.dataset.date;
      if (!value) return;
      const single = from.value && from.value === to.value;
      if (single && value === from.value) set('', '');
      else if (single && value > from.value) set(from.value, value);
      else set(value, value);
    });
    picker.body.addEventListener('keydown', event => {
      const index = days.indexOf(event.target);
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
      if (index < 0 || !step) return;
      event.preventDefault();
      // Move by calendar position: one day sideways, one week up or down, staying within the selectable dates.
      const target = iso(new Date(day(days[index].dataset.date).getTime() + step * 864e5));
      days.find(button => button.dataset.date === target)?.focus();
    });
    picker.on('open', () => {
      if (!narrow.matches) (days.find(button => button.getAttribute('aria-pressed') === 'true') ?? days[0]).focus({ preventScroll: true });
    });

    from.form.addEventListener('change', sync);
    from.form.addEventListener('reset', () => setTimeout(sync));
    sync();
  }

  for (const select of document.querySelectorAll('select[data-multi-select]')) enhanceSelect(select);
  document.querySelectorAll('.family-chip').forEach(enhanceFamily);
  for (const host of document.querySelectorAll('[data-date-range]')) enhanceDates(host);
})();
