'use strict';

// Event details (docs/event-browsing.md Q20–Q25). A list row (the whole row, poster included), a poster on the hero wall
// or an #event-id address opens the event in one page-level <dialog>: a full-screen sheet on phones, a centred card up to
// 760px wide elsewhere, with the row's poster stage on top and its lineup, tickets, details, entry notes and venue below.
// App Store style, the sheet grows out of where it was opened — a row, or the wall poster turned with the wall — while
// its parts rise in, and shrinks back there when it closes. It closes on the round × button, a pull down from the top of
// the sheet (touch), Esc, the backdrop (wide screens) and the browser's back button: opening pushes #event-id, so the
// address can be shared. Reduced motion shows and hides at once. Without the script the rows keep their details.
(() => {
  const root = document.documentElement;
  const dialog = document.getElementById('event-detail');
  const sheet = dialog.querySelector('.event-detail-sheet');
  const scroller = dialog.querySelector('.event-detail-scroll');
  const closer = dialog.querySelector('.event-detail-close');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // The site's GSAP eases: power4.out for the sheet coming in, power3.out for the Card Nav rise of its parts.
  const OUT = 'cubic-bezier(.22,1,.36,1)';
  const EASE = 'cubic-bezier(.215,.61,.355,1)';
  const BACK = 'cubic-bezier(.65,0,.35,1)';
  const OPEN = 500, CLOSE = 420;
  let current = null;

  const motion = () => !reducedMotion.matches;
  const rowById = id => {
    const row = id ? document.getElementById(id) : null;
    return row?.classList.contains('event-row') ? row : null;
  };
  const onScreen = box => box.width > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth;
  // A poster shows its light version until its original (data-full) has downloaded (docs/event-browsing.md Q34).
  const showsOriginal = image => image.complete && image.naturalWidth > 0
    && image.currentSrc === new URL(image.dataset.full, document.baseURI).href;
  const parts = () => [...scroller.querySelectorAll('.event-details .event-field'), closer];

  // Where the sheet comes from and returns to, in viewport pixels: a row's own box, or the wall poster's square, which the
  // wall turns by --wall-turn (its bounding box is that square's turned outline). Null when it is not on the screen.
  function sourceOf(origin) {
    if (!origin.isConnected || origin.closest('[hidden]')) return null;
    if (origin.classList.contains('event-row')) {
      const box = origin.getBoundingClientRect();
      return onScreen(box) ? { left: box.left, top: box.top, width: box.width, height: box.height, radius: 24, turn: 0,
        open: origin.classList.contains('is-active') } : null;
    }
    const inner = origin.querySelector('.drift-wall__inner');
    const box = inner.getBoundingClientRect();
    const turn = parseFloat(getComputedStyle(origin).getPropertyValue('--wall-turn')) || 0;
    const radians = Math.abs(turn) * Math.PI / 180;
    const side = box.width / (Math.cos(radians) + Math.sin(radians));
    const x = box.left + box.width / 2, y = box.top + box.height / 2;
    return onScreen(box) ? { left: x - side / 2, top: y - side / 2, width: side, height: side, radius: 14 * side / inner.offsetWidth,
      turn, open: false } : null;
  }

  // The sheet's box as keyframe values: left/top/right/bottom inside the full-screen dialog, so its contents lay out at
  // every size instead of stretching.
  const frame = box => ({
    left: `${box.left}px`, top: `${box.top}px`,
    right: `${dialog.clientWidth - box.left - box.width}px`, bottom: `${dialog.clientHeight - box.top - box.height}px`,
    borderRadius: `${box.radius}px`, rotate: `${box.turn}deg`
  });

  // The sheet shows a copy of the row's stage (ids dropped, the title as plain text) and the row's own details, which go
  // back into the row on close; the stage's poster opens the full image (assets/poster-preview.js). The copy's poster
  // loads at once and first, and starts as the version the row shows: the original only once it has downloaded, else the
  // light version, which the hero wall has usually downloaded already.
  function fill(row) {
    const stage = row.querySelector('.event-stage').cloneNode(true);
    stage.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    stage.querySelector('.event-posters').inert = false;
    const image = stage.querySelector('.event-posters img');
    if (image) {
      if (!showsOriginal(row.querySelector('.event-posters img'))) image.removeAttribute('srcset');
      image.fetchPriority = 'high';
      image.loading = 'eager';
    }
    const title = stage.querySelector('h4');
    title.id = 'event-detail-title';
    title.replaceChildren(row.querySelector('.event-toggle').textContent);
    const details = row.querySelector('.event-details');
    scroller.replaceChildren(stage, details);
    scroller.scrollTop = 0;
    // A poster that has not downloaded yet starts hidden and fades in whole when it arrives (assets/site.css).
    if (image && !image.complete) {
      const posters = stage.querySelector('.event-posters');
      posters.classList.add('is-pending');
      image.addEventListener('load', () => posters.classList.remove('is-pending'), { once: true });
    }
    return stage;
  }

  // How a wall poster shows its image right now (assets/hero.css, scripts/hero.mjs): uncropped across the square tile and
  // panned along its length. As an object-position it is the same view of the poster in the sheet's stage.
  function panOf(origin) {
    const image = origin.querySelector('img');
    const ratio = Number(image.getAttribute('height')) / Number(image.getAttribute('width'));
    if (Math.abs(ratio - 1) < .01) return '50% 50%';
    const [x, y] = (image.style.translate || '0 0').split(' ').map(value => Math.abs(parseFloat(value)) || 0);
    const place = value => `${Math.min(100, Math.max(0, value)).toFixed(2)}%`;
    return ratio < 1 ? `${place(x / (1 - ratio))} 50%` : `50% ${place(y * ratio / (ratio - 1))}`;
  }

  function open(row, origin, { push = true, animate = true } = {}) {
    // A close still shrinking back finishes at once, so a tap on another event meanwhile is not lost.
    if (current?.closing) current.finish();
    if (current) return;
    const from = animate && motion() ? sourceOf(origin) : null;
    if (from?.turn) from.pan = panOf(origin);
    const stage = fill(row);
    // An entry this script pushed (also when returned to with the forward button) is left with the back button.
    current = { row, origin, pushed: push || history.state?.event === row.id, closing: false, pan: from?.pan };
    if (push) history.pushState({ event: row.id }, '', `#${row.id}`);
    // The details stay out of the layout until the sheet has landed: the opening frame and every frame of the flight
    // then lay out the poster stage alone (docs/event-browsing.md F42).
    if (from) dialog.classList.add('is-flying', 'is-arriving');
    root.classList.add('is-detail');
    document.dispatchEvent(new Event('detail-toggle'));
    dialog.showModal();
    scroller.focus({ preventScroll: true });
    origin.classList.add('event-detail-origin');
    if (from) flyIn(from, stage);
    else sharpen(stage.querySelector('.event-posters img'));
  }

  // The original replaces the light version once the sheet has settled, so it does not compete with the flight; the light
  // version stays on screen until the original has downloaded.
  function sharpen(image) {
    if (!image?.dataset.full || image.getAttribute('srcset') === image.dataset.full) return;
    if (image.complete) image.srcset = image.dataset.full;
    else for (const type of ['load', 'error']) image.addEventListener(type, () => sharpen(image), { once: true });
  }

  // A wall poster's look in the sheet's stage: the whole poster as the wall pans it, without the stage's downward fade.
  const wallLook = pan => ({ objectPosition: pan, scale: '1', translate: '0px 0px' });
  const unfaded = { maskSize: '100% 1000%, 100% 100%', webkitMaskSize: '100% 1000%, 100% 100%' };

  // The sheet's box eases from the source's to its own while the poster stage grows from the source's height into the
  // sheet's: a collapsed row's poster takes the open look, a wall poster turns from its view on the wall into the stage's
  // crop, and their text fades in. The flight holds its first frame until a downloaded poster has decoded (at most 0.15s),
  // so the poster never appears halfway; one still downloading does not hold it. Once the sheet lands, the details and the
  // × rise in on the Card Nav rhythm (50px, 0.08s apart) and the poster takes its original.
  function flyIn(from, stage) {
    const to = sheet.getBoundingClientRect();
    const height = stage.getBoundingClientRect().height;
    const radius = parseFloat(getComputedStyle(sheet).borderTopLeftRadius);
    const image = stage.querySelector('.event-posters img');
    const timing = { duration: OPEN, easing: OUT };
    const flight = [
      sheet.animate([frame(from), frame({ left: to.left, top: to.top, width: to.width, height: to.height, radius, turn: 0 })], timing),
      stage.animate([{ minHeight: `${from.height}px` }, { minHeight: `${height}px` }], timing)
    ];
    if (!from.open) {
      flight.push(stage.querySelector('.event-summary').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 150, easing: EASE, fill: 'backwards' }));
      if (from.pan) {
        flight.push(stage.querySelector('.event-posters').animate([{ offset: 0, ...unfaded }], timing));
        if (image) flight.push(image.animate([{ offset: 0, ...wallLook(from.pan) }], timing));
      } else {
        flight.push(stage.animate([{ '--open': 0 }, { '--open': 1 }], timing));
        if (image) flight.push(image.animate([{ filter: 'grayscale(.3)' }, { filter: 'grayscale(0)' }], timing));
      }
    }
    flight.forEach(animation => animation.pause());
    const play = () => flight.forEach(animation => animation.play());
    if (image?.complete) Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 150))]).then(play);
    else play();
    flight[0].finished.then(() => {
      dialog.classList.remove('is-flying', 'is-arriving');
      sharpen(image);
      parts().forEach((part, index) => part.animate(
        part === closer ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, translate: '0 50px' }, { opacity: 1, translate: '0 0' }],
        { duration: 400, delay: index * 80, easing: EASE, fill: 'backwards' }));
    }, () => {});
  }

  // Back to the source: the parts fade, the content glides back to the top as the sheet shrinks into the source's box,
  // and the stage takes the source's look again. A source that has left the screen gets a short shrink and fade in place.
  function flyOut(to) {
    const box = sheet.getBoundingClientRect();
    const radius = parseFloat(getComputedStyle(sheet).borderTopLeftRadius);
    sheet.style.removeProperty('transform');
    sheet.style.removeProperty('border-radius');
    dialog.classList.add('is-flying');
    parts().forEach(part => part.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-out', fill: 'forwards' }));
    if (!to) return sheet.animate([{ opacity: 1, scale: 1 }, { opacity: 0, scale: .92 }], { duration: 250, easing: BACK, fill: 'forwards' }).finished;
    const stage = scroller.querySelector('.event-stage');
    const offset = scroller.scrollTop;
    scroller.scrollTop = 0;
    if (offset) scroller.animate([{ translate: `0 ${-offset}px` }, { translate: '0 0' }], { duration: CLOSE, easing: BACK, fill: 'forwards' });
    const timing = { duration: CLOSE, easing: BACK, fill: 'forwards' };
    const shrinking = sheet.animate([frame({ left: box.left, top: box.top, width: box.width, height: box.height, radius, turn: 0 }), frame(to)], timing);
    stage.animate([{ minHeight: `${stage.getBoundingClientRect().height}px` }, { minHeight: `${to.height}px` }], timing);
    if (!to.open) {
      stage.querySelector('.event-summary').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' });
      const image = stage.querySelector('.event-posters img');
      if (to.turn) {
        stage.querySelector('.event-posters').animate([{ offset: 1, ...unfaded }], timing);
        if (image && current.pan) image.animate([{ offset: 1, ...wallLook(current.pan) }], timing);
      } else {
        stage.animate([{ '--open': 1 }, { '--open': 0 }], timing);
        image?.animate([{ filter: 'grayscale(0)' }, { filter: 'grayscale(.3)' }], timing);
      }
    }
    return shrinking.finished;
  }

  function close({ fromHistory = false } = {}) {
    if (!current || current.closing) return;
    current.closing = true;
    const { row, origin, pushed } = current;
    // Leave the pushed entry; an opened address (a shared link) drops its #event-id so a reload shows the list.
    if (pushed && !fromHistory) history.back();
    else if (!pushed && location.hash === `#${row.id}`) history.replaceState(history.state, '', location.pathname + location.search);
    let done = false;
    const finish = current.finish = () => {
      if (done) return;
      done = true;
      sheet.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      dialog.close();
      dialog.classList.remove('is-flying', 'is-arriving', 'is-leaving');
      sheet.style.removeProperty('transform');
      sheet.style.removeProperty('border-radius');
      dialog.style.removeProperty('--veil');
      row.querySelector('.event-stage').after(scroller.querySelector('.event-details'));
      scroller.replaceChildren();
      origin.classList.remove('event-detail-origin');
      root.classList.remove('is-detail');
      document.dispatchEvent(new Event('detail-toggle'));
      (origin.classList.contains('event-row') ? origin.querySelector('.event-toggle') : origin).focus({ preventScroll: true });
      current = null;
    };
    if (!motion()) return finish();
    // While it shrinks back the page is live again: the sheet leaves the top layer for an ordinary, click-through layer
    // above the page (assets/site.css), so a tap on another event during the flight opens it.
    dialog.close();
    dialog.show();
    dialog.classList.add('is-leaving');
    flyOut(sourceOf(origin)).then(finish, finish);
  }

  // A row, its title button or a wall poster opens its event; links and buttons of a row's own (none while the details
  // are in the sheet) keep their behaviour.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (dialog.contains(event.target)) return;
    const poster = event.target.closest('.spotlight-card');
    const row = poster ? rowById(poster.hash.slice(1)) : event.target.closest('.event-row');
    if (!row || (!poster && event.target.closest('a, button:not(.event-toggle)'))) return;
    event.preventDefault();
    open(row, poster ?? row);
  });
  closer.addEventListener('click', () => close());
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  // Wide screens: the dialog fills the screen around the card, so a press beside the card lands on the dialog itself.
  dialog.addEventListener('click', event => {
    if (event.target === dialog) close();
  });

  // Touch: a pull down while the sheet is scrolled to its top follows the finger — the sheet shrinks and the veil thins —
  // and closes past a third of the sheet or on a quick flick (0.5px/ms), as the filter sheets; otherwise it springs back.
  let pull = null;
  sheet.addEventListener('touchstart', event => {
    if (!current || current.closing || event.touches.length !== 1) return;
    pull = { start: event.touches[0].clientY, y: 0, time: event.timeStamp, speed: 0, active: false, top: scroller.scrollTop <= 0 };
  }, { passive: true });
  sheet.addEventListener('touchmove', event => {
    if (!pull?.top || event.touches.length !== 1) return;
    const y = event.touches[0].clientY - pull.start;
    if (!pull.active) {
      // Moving up scrolls the sheet as usual; only a pull down from the top takes over.
      if (y < 0 || scroller.scrollTop > 0) pull = null;
      if (!pull || y < 6) return;
      pull.active = true;
    }
    event.preventDefault();
    pull.speed = (y - pull.y) / Math.max(1, event.timeStamp - pull.time);
    pull.y = y;
    pull.time = event.timeStamp;
    const progress = Math.min(1, Math.max(0, y) / sheet.offsetHeight);
    sheet.style.transform = `translateY(${(Math.max(0, y) * .5).toFixed(1)}px) scale(${(1 - progress * .25).toFixed(3)})`;
    sheet.style.borderRadius = `${Math.min(24, Math.max(0, y) / 4).toFixed(1)}px`;
    dialog.style.setProperty('--veil', (1 - progress).toFixed(3));
  }, { passive: false });
  const release = () => {
    if (!pull?.active) {
      pull = null;
      return;
    }
    const { y, speed } = pull;
    pull = null;
    if (y > sheet.offsetHeight / 3 || speed > .5) return close();
    const from = sheet.style.transform, radius = sheet.style.borderRadius;
    sheet.style.removeProperty('transform');
    sheet.style.removeProperty('border-radius');
    dialog.style.removeProperty('--veil');
    if (motion()) sheet.animate([{ transform: from, borderRadius: radius }, { transform: 'none' }], { duration: 300, easing: OUT });
  };
  sheet.addEventListener('touchend', release);
  sheet.addEventListener('touchcancel', release);

  // The address: back and forward close and reopen; an address naming an event (a shared link) opens it from its row.
  function reveal(row, animate) {
    if (!row.closest('[hidden]')) row.scrollIntoView({ block: 'center', behavior: 'instant' });
    open(row, row, { push: false, animate });
  }
  addEventListener('popstate', () => {
    const row = rowById(location.hash.slice(1));
    if (current) {
      if (!current.closing && row !== current.row) close({ fromHistory: true });
    } else if (row) reveal(row, true);
  });
  const linked = rowById(location.hash.slice(1));
  if (linked) reveal(linked, false);
})();
