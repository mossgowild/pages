// Run with: node scripts/check_preview.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor() {
    this.listeners = {};
    this.attrs = {};
    this.style = {};
    this.classes = new Set();
    this.classList = {
      add: name => this.classes.add(name),
      remove: name => this.classes.delete(name),
      toggle: (name, force) => {
        const on = force ?? !this.classes.has(name);
        if (on) this.classes.add(name); else this.classes.delete(name);
        return on;
      }
    };
  }
  addEventListener(name, fn) { this.listeners[name] = fn; }
  emit(type, values = {}) {
    const event = { type, target: this, button: 0, detail: 1, preventDefault() { this.prevented = true; }, ...values };
    this.listeners[type](event);
    return event;
  }
  setAttribute(name, value) { this.attrs[name] = value; }
  getAttribute(name) { return this.attrs[name]; }
  removeAttribute(name) { delete this.attrs[name]; }
  replaceChildren(child) { this.image = child; }
  focus(options) { this.focusOptions = options; }
  setPointerCapture(id) { this.capture = id; }
  getBoundingClientRect() {
    const [x, y, scale] = this.transform();
    const left = this.rect.left + x + this.rect.width * (1 - scale) / 2, top = this.rect.top + y + this.rect.height * (1 - scale) / 2;
    const width = this.rect.width * scale, height = this.rect.height * scale;
    return { left, top, width, height, right: left + width, bottom: top + height };
  }
  transform() {
    const match = /translate\(([-\d.e]+)px, ([-\d.e]+)px\) scale\(([\d.e]+)\)/.exec(this.style.transform);
    return match ? match.slice(1).map(Number) : [0, 0, 1];
  }
  cloneNode() {
    const image = new Element();
    image.attrs = { ...this.attrs };
    const height = 400 * Number(this.attrs.height) / Number(this.attrs.width);
    image.rect = { left: 300, top: (800 - height) / 2, width: 400, height };
    return image;
  }
  animate(frames, options) {
    this.animation = { frames, options, finished: Promise.resolve(), cancel() { this.cancelled = true; } };
    return this.animation;
  }
}

(async () => {
  const document = new Element(), window = new Element(), dialog = new Element(), view = new Element();
  const source = new Element(), original = new Element();
  original.attrs = { src: 'assets/posters/playx-golden-week.jpg', alt: 'PLAY X', loading: 'lazy', width: '600', height: '900' };
  original.rect = { left: 20, top: 100, width: 200, height: 120 };
  source.rect = original.rect; // Without parallax the link frame and the cover share one box.
  view.clientWidth = 1000; view.clientHeight = 800;
  source.querySelector = () => original;
  const target = { closest: selector => selector === '.event-posters a' ? source : null };
  const reduced = { matches: false }, timers = new Map();
  let clock = 0, timerId = 0;
  const advance = ms => {
    clock += ms;
    for (const [id, task] of timers) if (task.at <= clock) { timers.delete(id); task.fn(); }
  };
  document.querySelector = () => dialog;
  dialog.querySelector = selector => selector === '.poster-preview-view' ? view : undefined;
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  vm.runInNewContext(fs.readFileSync(new URL('../assets/poster-preview.js', `file://${__filename}`), 'utf8'), {
    document, window, matchMedia: () => reduced,
    getComputedStyle: () => ({ clipPath: 'inset(0%)', paddingLeft: '16', paddingRight: '16', paddingTop: '16', paddingBottom: '16' }),
    Date: { now: () => clock },
    setTimeout: (fn, delay) => { timers.set(++timerId, { fn, at: clock + delay }); return timerId; },
    clearTimeout: id => timers.delete(id)
  });
  const pointer = (type, id, x, y, background = false) => view.emit(type, {
    pointerId: id, clientX: x, clientY: y, target: background ? view : view.image
  });
  const tap = (id, x = 500, y = 400, background = false) => {
    pointer('pointerdown', id, x, y, background); pointer('pointerup', id, x, y, background);
  };
  const key = key => view.emit('keydown', { key });
  const open = () => document.emit('click', { target });

  assert(!document.emit('click', { target, ctrlKey: true }).prevented);
  assert(!dialog.open);
  assert(open().prevented);
  assert(dialog.open && source.classes.has('poster-preview-origin'));
  assert(!view.classes.has('is-keyboard'), 'Pointer interaction keeps the preview free of focus chrome');
  assert.equal(view.image.attrs.src, original.attrs.src);
  assert.equal(view.image.attrs.alt, original.attrs.alt);
  assert(!('loading' in view.image.attrs));
  assert.equal(view.image.draggable, false);
  assert.equal(view.image.animation.frames[0].transform, 'translate(-380px, -150px) scale(0.5, 0.5)');
  assert.equal(view.image.animation.frames[0].clipPath, 'inset(0% 0% 60% 0%)');

  // A pinch follows its midpoint; lifting one finger continues panning without a jump.
  pointer('pointerdown', 1, 450, 400);
  pointer('pointerdown', 2, 550, 400);
  pointer('pointermove', 1, 300, 400);
  pointer('pointermove', 2, 700, 400);
  assert.deepEqual(view.image.transform(), [0, 0, 4]);
  pointer('pointerup', 2, 700, 400);
  pointer('pointermove', 1, 400, 480);
  assert.deepEqual(view.image.transform(), [100, 80, 4]);
  pointer('pointerup', 1, 400, 480);
  advance(400);
  assert(dialog.open, 'Pinch and drag must not dismiss the image');
  assert(!view.classes.has('is-dragging'));

  pointer('pointerdown', 3, 500, 400);
  pointer('pointermove', 3, 9000, 9000);
  assert.deepEqual(view.image.transform(), [316, 816, 4], 'Keep the image inside pan boundaries');
  pointer('pointercancel', 3, 9000, 9000);
  pointer('pointerdown', 4, 500, 400);
  pointer('lostpointercapture', 4, 500, 400);
  advance(400);
  assert(dialog.open && !view.classes.has('is-dragging'), 'Interrupted gestures release their state');

  key('0');
  assert.deepEqual(view.image.transform(), [0, 0, 1]);
  tap(5); advance(100); tap(6);
  assert.equal(view.image.transform()[2], 2.5, 'Double tap zooms');
  advance(400);
  assert(dialog.open, 'Double tap cancels single-tap dismissal');
  tap(7); advance(100); tap(8);
  assert.deepEqual(view.image.transform(), [0, 0, 1], 'Second double tap restores fit');

  const wheel = (deltaY, clientX = 550, clientY = 450) => view.emit('wheel', { deltaY, deltaMode: 0, clientX, clientY });
  assert(wheel(-Math.log(4) / .002).prevented);
  assert.deepEqual(view.image.transform(), [-150, -150, 4], 'Wheel zoom keeps the cursor over the same image point');
  wheel(-10000);
  assert.equal(view.image.transform()[2], 8);
  wheel(10000);
  assert.deepEqual(view.image.transform(), [0, 0, 1], 'Zoom limits keep the full image recoverable');
  assert(key('+').prevented);
  assert(view.classes.has('is-keyboard'), 'Keyboard interaction retains a visible focus indicator');
  assert.equal(view.image.transform()[2], 1.25);
  assert(key('ArrowUp').prevented);
  key('-');
  assert.equal(view.image.transform()[2], 1);
  wheel(-1000);
  window.emit('resize');
  assert.deepEqual(view.image.transform(), [0, 0, 1], 'Viewport changes restore fit');

  assert(dialog.emit('cancel').prevented);
  dialog.emit('cancel');
  await Promise.resolve();
  assert(!dialog.open && !source.classes.has('poster-preview-origin'));
  assert.equal(source.focusOptions.preventScroll, true);
  original.attrs.height = '300'; original.rect.height = 300;
  open();
  assert.equal(view.image.animation.frames[0].clipPath, 'inset(0% 33.33333333333333% 0% 33.33333333333333%)', 'Landscape hero transition preserves the original crop');
  key('Enter'); await Promise.resolve();
  assert(!dialog.open);

  // Parallax enlarges the cover 10% from its top edge and shifts it up 24px inside the fixed frame
  // (the stub scales about the centre, so -18px here lands on the same box).
  original.attrs.height = '900'; original.rect.height = 120;
  original.style.transform = 'translate(0px, -18px) scale(1.1)';
  open();
  const inset = view.image.animation.frames[0].clipPath.match(/[\d.]+(?=%)/g).map(Number);
  [7.2727, 4.5455, 56.3636, 4.5455].forEach((expected, index) => assert(Math.abs(inset[index] - expected) < 1e-3, 'Parallax transition clips to the visible frame'));
  key('Enter'); await Promise.resolve();
  original.style.transform = '';

  reduced.matches = true;
  open();
  assert(!view.image.animation, 'Reduced motion skips spatial transitions');
  tap(9); advance(301);
  assert(!dialog.open, 'Single tap on the image dismisses it');
  open(); tap(10, 10, 10, true);
  assert(!dialog.open, 'Backdrop tap dismisses immediately');
  open(); view.emit('click', { detail: 0 });
  assert(!dialog.open, 'Assistive-technology activation can dismiss without pointer events');
  const html = fs.readFileSync(new URL('../templates/index.html', `file://${__filename}`), 'utf8');
  assert(!/poster-preview-tools|data-preview-zoom|data-preview-close/.test(html), 'No visible title or buttons');
  assert(html.includes('aria-describedby="poster-preview-help"'));
  console.log('OK: pinch, focal zoom, drag limits, double/single tap, interruption, wheel, keyboard, resize, hero transition and focus');
})().catch(error => { console.error(error); process.exitCode = 1; });
