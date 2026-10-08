// Run with: node scripts/check_preview.cjs
// The full image preview (assets/poster-preview.js, docs/event-browsing.md Q25, Q27–Q36) against a small stand-in DOM
// with a manual clock: opening from the detail sheet's poster (alignment with the stage's crop, its fade, the light then
// the original image, the fitted size, the back button), the gestures (pull and pinch to close, inertia, stretching past
// the edges and the zoom limit), zoom steps and their limits, taps, the wheel and the keys, the mouse toolbar and its
// idle fade, and reduced motion.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const BASE = 'https://events.example/';
// The poster files the browser has finished downloading.
const downloaded = new Set(['assets/posters/playx-golden-week.thumb.webp']);
// A manual clock: animation frames every 16ms and timers, run by `advance`.
let clock = 0, frameId = 0, timerId = 0;
const frames = new Map(), timers = new Map();
function advance(ms) {
  const end = clock + ms;
  while (clock < end) {
    clock = Math.min(end, clock + 16);
    const due = [...frames.values()];
    frames.clear();
    due.forEach(fn => fn(clock));
    for (const [id, task] of [...timers]) if (task.at <= clock) { timers.delete(id); task.fn(); }
  }
}
// Pixel lists compared to a tolerance (the frames are computed in floating point).
const near = (actual, expected) => assert.deepEqual(actual.match(/-?[\d.e]+(?=px)/g).map(value => Math.round(Number(value) * 1000) / 1000),
  expected.match(/-?[\d.e]+(?=px)/g).map(Number), `${actual} ≈ ${expected}`);
const style = () => ({ setProperty(name, value) { this[name] = value; }, removeProperty(name) { delete this[name]; }, getPropertyValue(name) { return this[name] ?? ''; } });

class Element {
  constructor() {
    this.listeners = {};
    this.attrs = {};
    this.style = style();
    this.classes = new Set();
    this.classList = {
      add: name => this.classes.add(name),
      remove: name => this.classes.delete(name),
      contains: name => this.classes.has(name),
      toggle: (name, force) => {
        const on = force ?? !this.classes.has(name);
        if (on) this.classes.add(name); else this.classes.delete(name);
        return on;
      }
    };
  }
  addEventListener(name, fn, options) { (this.listeners[name] ??= []).push({ fn, once: options?.once }); }
  emit(type, values = {}) {
    const event = { type, target: this, button: 0, detail: 1, pointerType: 'touch', preventDefault() { this.prevented = true; }, ...values };
    const listeners = this.listeners[type] ?? [];
    this.listeners[type] = listeners.filter(listener => !listener.once);
    listeners.forEach(listener => listener.fn(event));
    return event;
  }
  setAttribute(name, value) { this.attrs[name] = value; }
  getAttribute(name) { return this.attrs[name]; }
  removeAttribute(name) { delete this.attrs[name]; }
  matches(selector) { return selector === ':hover' && Boolean(this.hovered); }
  closest(selector) { return this.selectors?.some(item => selector.includes(item)) ? this : null; }
  // Posters: the light version in src, the original in data-full and, once switched, in srcset (which wins).
  get dataset() { return { full: this.attrs['data-full'], zoom: this.attrs['data-zoom'] }; }
  get srcset() { return this.attrs.srcset ?? ''; }
  set srcset(value) { this.attrs.srcset = value; }
  get complete() { return downloaded.has(this.attrs.srcset ?? this.attrs.src); }
  get naturalWidth() { return this.complete ? 720 : 0; }
  get currentSrc() { return new URL(this.attrs.srcset ?? this.attrs.src, BASE).href; }
  replaceChildren(child) { this.image = child; }
  focus(options) { this.focusOptions = options; }
  setPointerCapture(id) { this.capture = id; }
  getBoundingClientRect() {
    const [x, y, scale] = this.transform();
    // An image sized inline sits centred in the 1000×800 preview view.
    const box = this.style.width ? { width: parseFloat(this.style.width), height: parseFloat(this.style.height) } : this.rect;
    const at = this.style.width ? { left: 500 - box.width / 2, top: 400 - box.height / 2 } : this.rect;
    const left = at.left + x + box.width * (1 - scale) / 2, top = at.top + y + box.height * (1 - scale) / 2;
    const width = box.width * scale, height = box.height * scale;
    return { left, top, width, height, right: left + width, bottom: top + height };
  }
  transform() {
    const match = /translate\(([-\d.e]+)px, ([-\d.e]+)px\) scale\(([\d.e]+)\)/.exec(this.style.transform);
    return match ? match.slice(1).map(Number) : [0, 0, 1];
  }
  cloneNode() {
    const image = new Element();
    image.attrs = { ...this.attrs };
    image.rect = this.rect;
    return image;
  }
  animate(keyframes, options) {
    this.animation = { frames: keyframes, options, finished: Promise.resolve(), cancel() { this.cancelled = true; } };
    return this.animation;
  }
}

(async () => {
  const document = new Element(), window = new Element(), dialog = new Element(), view = new Element();
  const tools = new Element(), closer = new Element();
  const buttons = Object.fromEntries(['out', 'in', 'fit'].map(zoom => {
    const button = new Element();
    button.attrs['data-zoom'] = zoom;
    button.selectors = ['[data-zoom]', '.poster-preview-tools'];
    return [zoom, button];
  }));
  closer.selectors = ['.poster-preview-close'];
  tools.querySelectorAll = () => Object.values(buttons);
  document.baseURI = BASE;
  const source = new Element(), original = new Element();
  // A 2048×3072 original: fitted at 512×768 in the 968×768 area, its own pixels sit at 4× the fit (Q28).
  original.attrs = { src: 'assets/posters/playx-golden-week.thumb.webp', 'data-full': 'assets/posters/playx-golden-week.jpg',
    srcset: 'assets/posters/playx-golden-week.jpg', alt: 'PLAY X', loading: 'eager', width: '2048', height: '3072' };
  original.rect = { left: 20, top: 100, width: 200, height: 120 };
  source.rect = original.rect; // Without parallax the link frame and the cover share one box.
  view.clientWidth = 1000; view.clientHeight = 800;
  view.rect = { left: 0, top: 0, width: 1000, height: 800 };
  source.querySelector = () => original;
  // The source sits in the detail sheet's faded stage (assets/site.css): two mask layers on its frame.
  const stage = new Element(), posters = new Element();
  const fade = 'linear-gradient(rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0) 70%), linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0))';
  source.closest = selector => selector === '.event-stage' ? stage : null;
  source.parentElement = posters;
  const entries = [];
  const history = {
    state: { event: 'event-2' },
    pushState(state) { entries.push('push'); this.state = state; },
    back() { entries.push('back'); this.state = { event: 'event-2' }; window.emit('popstate'); }
  };
  // The full image opens from the poster at the top of an event's detail sheet (docs/event-browsing.md Q25).
  const target = { closest: selector => selector === '.event-detail .event-posters a' ? source : null };
  const reduced = { matches: false }, fine = { matches: true };
  document.querySelector = () => dialog;
  dialog.querySelector = selector => ({ '.poster-preview-view': view, '.poster-preview-tools': tools, '.poster-preview-close': closer }[selector] ?? null);
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  vm.runInNewContext(fs.readFileSync(new URL('../public/assets/poster-preview.js', `file://${__filename}`), 'utf8'), {
    document, window, history, URL,
    matchMedia: query => query.includes('reduced-motion') ? reduced : fine,
    getComputedStyle: node => ({ clipPath: 'inset(0%)', paddingLeft: '16', paddingRight: '16', paddingTop: '16', paddingBottom: '16',
      maskImage: node === posters ? fade : 'none', maskComposite: 'intersect', webkitMaskComposite: 'source-in', objectPosition: '50% 25%' }),
    performance: { now: () => clock },
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    setTimeout: (fn, delay) => { timers.set(++timerId, { fn, at: clock + delay }); return timerId; },
    clearTimeout: id => timers.delete(id)
  });
  const pointer = (type, id, x, y, background = false) => view.emit(type, {
    pointerId: id, clientX: x, clientY: y, target: background ? view : view.image
  });
  const tap = (id, x = 500, y = 400, background = false) => {
    pointer('pointerdown', id, x, y, background); pointer('pointerup', id, x, y, background);
  };
  // One finger from `from` to `to` in `ms` (6 moves), then a rest of `rest` ms before it lifts.
  const drag = (id, from, to, ms, rest = 0) => {
    pointer('pointerdown', id, ...from);
    for (let step = 1; step <= 6; step++) {
      advance(ms / 6);
      pointer('pointermove', id, from[0] + (to[0] - from[0]) * step / 6, from[1] + (to[1] - from[1]) * step / 6);
    }
    advance(rest);
    pointer('pointerup', id, ...to);
  };
  const pinch = (distance, ms, rest = 150) => {
    pointer('pointerdown', 1, 500 - 50, 400); pointer('pointerdown', 2, 500 + 50, 400);
    for (let step = 1; step <= 6; step++) {
      advance(ms / 6);
      const half = (100 + (distance - 100) * step / 6) / 2;
      pointer('pointermove', 1, 500 - half, 400); pointer('pointermove', 2, 500 + half, 400);
    }
    advance(rest);
    pointer('pointerup', 1, 500 - distance / 2, 400); pointer('pointerup', 2, 500 + distance / 2, 400);
  };
  const state = () => view.image.transform().map(value => Math.round(value * 1000) / 1000);
  const key = key => view.emit('keydown', { key });
  const wheel = (deltaY, clientX = 550, clientY = 450) => view.emit('wheel', { deltaY, deltaMode: 0, clientX, clientY });
  const press = zoom => tools.emit('click', { target: buttons[zoom] });
  const open = () => document.emit('click', { target });
  const settle = async () => { advance(1000); await Promise.resolve(); };

  assert(!document.emit('click', { target, ctrlKey: true }).prevented);
  assert(!dialog.open);
  assert(open().prevented);
  assert(dialog.open && source.classes.has('poster-preview-origin'));
  assert(stage.classes.has('is-previewing'), 'The text over the stage fades while the image is open');
  assert.deepEqual(entries, ['push'], 'Opening records an entry for the back button');
  assert.equal(history.state.preview, true);
  assert.equal(history.state.event, 'event-2', 'The entry keeps the event’s address');
  // Fitted from the original's size, the box does not move when the original replaces the light version.
  assert.equal(view.image.style.width, '512px');
  assert.equal(view.image.style.height, '768px');
  // The stage still shows the light version (its original is downloading), so the preview opens as that and takes the
  // original at once, first in line.
  assert.equal(view.image.srcset, 'assets/posters/playx-golden-week.jpg');
  assert.equal(view.image.fetchPriority, 'high');
  assert(!view.image.classes.has('is-pending'));
  // The stage's fade travels with the flying image, sized to the visible frame, and grows away by the end.
  const [first, last] = view.image.animation.frames;
  assert.equal(first.maskImage, fade);
  assert.equal(first.maskComposite, 'intersect', 'The layers combine as on the stage');
  // The visible frame in the image's own pixels (15%–55% of the poster); the whole image ends in the masks' opaque top.
  near(first.maskSize, '512px 307.2px, 512px 307.2px');
  near(first.maskPosition, '0px 115.2px, 0px 115.2px');
  near(last.maskSize, '512px 7680px, 512px 7680px');
  assert(!view.classes.has('is-keyboard'), 'Pointer interaction keeps the preview free of focus chrome');
  assert.equal(view.image.attrs.src, original.attrs.src, 'The light version stays the fallback source');
  assert.equal(view.image.attrs.alt, original.attrs.alt);
  assert(!('loading' in view.image.attrs));
  assert.equal(view.image.draggable, false);
  // The first frame sits on the poster as the stage draws it: covering its box at object-position 50% 25% (F48).
  near(view.image.animation.frames[0].transform, 'translate(-380px, -195px)');
  assert.match(view.image.animation.frames[0].transform, /scale\(0\.390625, 0\.390625\)$/);
  assert.equal(view.image.animation.frames[0].clipPath, 'inset(15% 0% 45% 0%)');
  // With a mouse the toolbar shows at once; at the fit only ＋ is available.
  assert(dialog.classes.has('has-tools'), 'The toolbar and × show on opening with a mouse');
  assert.deepEqual(['out', 'in', 'fit'].map(zoom => buttons[zoom].attrs['aria-disabled']), ['true', 'false', 'true']);
  advance(2100);
  assert(!dialog.classes.has('has-tools'), 'They fade after 2s of rest');
  dialog.emit('pointermove', { pointerType: 'mouse' });
  assert(dialog.classes.has('has-tools'), 'A mouse move brings them back');
  tools.hovered = true;
  advance(4500);
  assert(dialog.classes.has('has-tools'), 'They stay while the mouse rests on them');
  tools.hovered = false;
  advance(2100);
  assert(!dialog.classes.has('has-tools'));
  dialog.emit('pointermove', { pointerType: 'touch' });
  assert(!dialog.classes.has('has-tools'), 'A finger never shows them');

  // A pinch follows its midpoint; lifting one finger continues panning without a jump.
  pointer('pointerdown', 1, 450, 400);
  pointer('pointerdown', 2, 550, 400);
  advance(100);
  pointer('pointermove', 1, 300, 400);
  pointer('pointermove', 2, 700, 400);
  assert.deepEqual(state(), [0, 0, 4]);
  pointer('pointerup', 2, 700, 400);
  advance(100);
  pointer('pointermove', 1, 400, 480);
  assert.deepEqual(state(), [100, 80, 4]);
  advance(150);
  pointer('pointerup', 1, 400, 480);
  advance(400);
  assert.deepEqual(state(), [100, 80, 4], 'A finger that rested before lifting leaves the image where it is');
  assert(dialog.open, 'Pinch and drag do not close');
  assert(!view.classes.has('is-dragging'));
  // Past the edge it follows a third of the finger's travel and springs back on release (bounds 540 × 1152 at 4×).
  drag(3, [500, 400], [1500, 1400], 200, 150);
  assert(Math.abs(state()[0] - (540 + (100 + 1000 - 540) / 3)) < 0.01 && state()[1] === 1080, 'Past the edge it stretches');
  advance(400);
  assert.deepEqual(state(), [540, 1080, 4], 'Released past the edge, it springs back to it');
  pointer('pointerdown', 4, 500, 400);
  advance(200);
  pointer('pointermove', 4, 1500, 1400);
  const [stretchedX, stretchedY] = state();
  assert(Math.abs(stretchedX - (540 + 1000 / 3)) < 0.01 && Math.abs(stretchedY - (1152 + (1080 + 1000 - 1152) / 3)) < 0.01, 'Past both edges it stretches');
  pointer('pointercancel', 4, 1500, 1400);
  advance(400);
  assert.deepEqual(state(), [540, 1152, 4], 'An interrupted gesture also springs back');
  // Inertia: a quick swipe keeps going after the finger lifts, slows down and stops at the edge.
  drag(5, [500, 400], [200, 400], 60);
  assert.equal(state()[0], 240);
  advance(1000);
  assert.deepEqual(state(), [-540, 1152, 4], 'The swipe carries on, slowing down, and stops at the edge');

  // Zoom steps ease (about 0.25s): the keys, a double tap, the wheel and the toolbar.
  key('0');
  advance(120);
  assert(state()[2] > 1 && state()[2] < 4, 'A zoom step eases');
  advance(200);
  assert.deepEqual(state(), [0, 0, 1]);
  tap(6); advance(100); tap(7);
  advance(300);
  assert.deepEqual(state(), [0, 0, 2.5], 'A double tap zooms to 2.5× the fit');
  advance(400);
  assert(dialog.open, 'A single tap on the image never closes');
  tap(8); advance(100); tap(9);
  advance(300);
  assert.deepEqual(state(), [0, 0, 1], 'A second double tap returns to the fit');
  assert(wheel(-Math.log(4) / .002).prevented);
  advance(300);
  assert.deepEqual(state(), [-150, -150, 4], 'Wheel zoom keeps the cursor over the same image point');
  wheel(-10000);
  advance(300);
  assert.equal(state()[2], 8, 'Wheel and pinch stop at twice the original’s pixels');
  assert.equal(buttons.in.attrs['aria-disabled'], 'true', '＋ is unavailable at the limit');
  press('in');
  advance(300);
  assert.equal(state()[2], 8);
  wheel(10000);
  advance(300);
  assert.deepEqual(state(), [0, 0, 1], 'Zoom limits keep the full image recoverable');
  assert(key('+').prevented);
  assert(view.classes.has('is-keyboard'), 'Keyboard interaction retains a visible focus indicator');
  advance(300);
  assert.equal(state()[2], 1.25);
  key('-');
  advance(300);
  assert.equal(state()[2], 1);
  press('in');
  advance(300);
  assert.equal(state()[2], 1.25, '＋ zooms 1.25×');
  assert.deepEqual(['out', 'in', 'fit'].map(zoom => buttons[zoom].attrs['aria-disabled']), ['false', 'false', 'false']);
  press('fit');
  advance(300);
  assert.deepEqual(state(), [0, 0, 1], 'Fit returns to the fitted image');
  wheel(-1000);
  advance(300);
  window.emit('resize');
  assert.deepEqual(state(), [0, 0, 1], 'Viewport changes restore the fit');

  // A pull down while the image fits follows the finger, shrinks it and thins the backdrop, and springs back when short.
  pointer('pointerdown', 10, 500, 300);
  for (let step = 1; step <= 4; step++) { advance(50); pointer('pointermove', 10, 500, 300 + step * 50); }
  assert.deepEqual(state().slice(1), [200, Math.round((1 - 200 / 768 * 0.5) * 1000) / 1000], 'The image follows the pull and shrinks');
  assert.equal(dialog.style.getPropertyValue('--veil'), (1 - 200 / 768 * 2).toFixed(3), 'The backdrop thins');
  pointer('pointermove', 10, 500, 400);
  advance(200);
  pointer('pointerup', 10, 500, 400);
  advance(400);
  assert(dialog.open, 'A short, slow pull does not close');
  assert.deepEqual(state(), [0, 0, 1]);
  assert.equal(dialog.style.getPropertyValue('--veil'), '1.000');
  // Below the fit a pinch follows and springs back unless it ends below 0.75 or quick.
  pinch(90, 300);
  assert(dialog.open, 'A mild pinch below the fit springs back');
  advance(400);
  assert.deepEqual(state(), [0, 0, 1]);
  pinch(60, 300);
  await settle();
  assert(!dialog.open, 'A pinch below 0.75 closes');
  assert.deepEqual(entries, ['push', 'back'], 'Closing leaves the recorded entry once');
  assert(!stage.classes.has('is-previewing'));
  open();
  pinch(85, 60, 0);
  await settle();
  assert(!dialog.open, 'A quick pinch closes');
  open();
  drag(11, [500, 300], [500, 560], 600, 150);
  await settle();
  assert(!dialog.open, 'A pull past a quarter of the screen closes');
  open();
  drag(12, [500, 300], [500, 380], 60);
  await settle();
  assert(!dialog.open, 'A quick flick down closes');
  open();
  tap(13, 10, 10, true);
  await settle();
  assert(!dialog.open, 'A tap on the backdrop closes');

  // The × and the keyboard close; the back button closes the image without going back a second time.
  open();
  closer.emit('click');
  await settle();
  assert(!dialog.open, 'The × closes');
  open();
  assert(dialog.emit('cancel').prevented);
  await settle();
  assert(!dialog.open);
  open();
  history.state = { event: 'event-2' };
  window.emit('popstate');
  await settle();
  assert(!dialog.open, 'Back closes the image first');
  assert.equal(entries.filter(entry => entry === 'back').length, entries.filter(entry => entry === 'push').length - 1, 'A close by the back button does not go back again');
  assert.equal(source.focusOptions.preventScroll, true);
  open(); key('Enter'); await settle();
  assert(!dialog.open, 'Enter closes');

  // A stage already showing its original opens the preview as the original.
  downloaded.add('assets/posters/playx-golden-week.jpg');
  open();
  assert.equal(view.image.srcset, 'assets/posters/playx-golden-week.jpg');
  assert(view.image.complete && !view.image.classes.has('is-pending'));
  key('Enter'); await settle();
  // Nothing downloaded yet: the image stays hidden, fades in whole with the light version, then takes the original.
  downloaded.clear();
  open();
  assert(view.image.classes.has('is-pending') && !view.image.srcset, 'A poster still downloading stays hidden');
  downloaded.add('assets/posters/playx-golden-week.thumb.webp');
  view.image.emit('load');
  assert(!view.image.classes.has('is-pending'), 'It fades in once downloaded');
  assert.equal(view.image.srcset, 'assets/posters/playx-golden-week.jpg', 'Then the original takes over');
  key('Enter'); await settle();

  // A poster no larger than the fit has no double-tap zoom; pinch and the wheel still reach twice its pixels.
  original.attrs.width = '300'; original.attrs.height = '450';
  open();
  tap(14); advance(100); tap(15);
  advance(300);
  assert.deepEqual(state(), [0, 0, 1], 'No double-tap zoom when the original is not larger than the fit');
  wheel(-10000);
  advance(300);
  assert.equal(state()[2], 2);
  key('Enter'); await settle();
  // The stage's crop decides where the flight starts: a landscape poster centred, a parallaxed cover clipped to its frame.
  original.attrs.width = '600'; original.attrs.height = '300'; original.rect.height = 300;
  open();
  assert.equal(view.image.animation.frames[0].clipPath, 'inset(0% 33.33333333333333% 0% 33.33333333333333%)', 'Landscape hero transition preserves the original crop');
  key('Enter'); await settle();
  // Parallax enlarges the cover 10% from its top edge and shifts it up 24px inside the fixed frame
  // (the stub scales about the centre, so -18px here lands on the same box).
  original.attrs.height = '900'; original.rect.height = 120;
  original.style.transform = 'translate(0px, -18px) scale(1.1)';
  open();
  const inset = view.image.animation.frames[0].clipPath.match(/[\d.]+(?=%)/g).map(Number);
  [22.2727, 4.5455, 41.3636, 4.5455].forEach((expected, index) => assert(Math.abs(inset[index] - expected) < 1e-3, 'Parallax transition clips to the visible frame'));
  key('Enter'); await settle();
  original.style.transform = '';
  original.attrs.width = '2048'; original.attrs.height = '3072';

  // Reduced motion: no flight, no eased steps, no inertia; the toolbar still shows with a mouse.
  reduced.matches = true;
  open();
  assert(!view.image.animation, 'Reduced motion skips spatial transitions');
  tap(16); advance(100); tap(17);
  assert.deepEqual(state(), [0, 0, 2.5], 'Steps apply at once');
  drag(18, [500, 400], [380, 400], 60);
  advance(1000);
  assert.deepEqual(state(), [-120, 0, 2.5], 'No inertia');
  tap(19, 10, 10, true);
  assert(!dialog.open, 'Reduced motion closes at once');
  open(); view.emit('click', { detail: 0 });
  assert(!dialog.open, 'Assistive-technology activation can dismiss without pointer events');
  reduced.matches = false;
  // On touch screens the toolbar never shows.
  fine.matches = false;
  open();
  assert(!dialog.classes.has('has-tools'));
  key('Enter'); await settle();

  // The toolbar, × and help text in the page itself: test/page.test.tsx.
  console.log('OK: opening aligned with the stage crop, light then original image, fitted size, pinch, pan, stretch and spring back, inertia, eased zoom steps and limits, double and single tap, pull, pinch and flick to close, wheel, keys, toolbar and its idle fade, back, × and reduced motion');
})().catch(error => { console.error(error); process.exitCode = 1; });
