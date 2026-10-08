// Run with: node scripts/check_detail.cjs
// The event detail sheet's routing (assets/event-detail.js, docs/event-browsing.md Q20–Q25) against a small stand-in DOM:
// what opens it, the #event-id address and the back button, every way to close it, focus, reduced motion, and which
// version of the poster flies (the light one until the original has downloaded, docs/event-browsing.md Q34).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Node {
  constructor(name = '', { classes = [], id = '', rect = { left: 0, top: 0, width: 0, height: 0 } } = {}) {
    this.name = name;
    this.id = id;
    this.classes = new Set(classes);
    this.classList = {
      add: (...names) => names.forEach(item => this.classes.add(item)),
      remove: (...names) => names.forEach(item => this.classes.delete(item)),
      contains: item => this.classes.has(item),
      toggle: (item, force) => (force ?? !this.classes.has(item)) ? (this.classes.add(item), true) : (this.classes.delete(item), false)
    };
    this.children = [];
    this.listeners = {};
    this.styles = {};
    this.style = { setProperty: (key, value) => { this.styles[key] = value; }, removeProperty: key => { delete this.styles[key]; } };
    this.rect = rect;
    this.animations = [];
    this.isConnected = true;
  }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  emit(type, values = {}) {
    const event = { type, target: this, button: 0, preventDefault() { this.defaultPrevented = true; }, ...values };
    for (const fn of this.listeners[type] ?? []) fn(event);
    return event;
  }
  matches(selector) { return selector.split(',').some(part => part.trim().split('.').filter(Boolean).every(name => this.classes.has(name))); }
  closest(selector) {
    for (let node = this; node; node = node.parent) if (selector !== '[hidden]' && node.matches(selector)) return node;
    return null;
  }
  contains(node) { for (; node; node = node.parent) if (node === this) return true; return false; }
  append(...nodes) { for (const node of nodes) { node.parent?.children.splice(node.parent.children.indexOf(node), 1); node.parent = this; this.children.push(node); } }
  replaceChildren(...nodes) {
    this.children.forEach(child => { child.parent = null; });
    this.children = [];
    if (typeof nodes[0] === 'string') this.text = nodes[0];
    else this.append(...nodes);
  }
  after(node) { this.parent.append(node); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  getBoundingClientRect() { const { left, top, width, height } = this.rect; return { left, top, width, height, right: left + width, bottom: top + height }; }
  animate(frames, options) {
    // Held flights finish only when the test lets them (`landing`).
    const finished = holding ? new Promise(resolve => landing.push(resolve)) : Promise.resolve();
    const animation = { frames, options, cancelled: false, paused: false, played: false, finished,
      cancel() { this.cancelled = true; }, pause() { this.paused = true; }, play() { this.paused = false; this.played = true; } };
    this.animations.push(animation);
    return animation;
  }
  getAttribute(name) { return this.attrs?.[name]; }
  // Posters: the light version in src, the original in data-full and, once switched, in srcset (which wins).
  get dataset() { return { full: this.attrs?.['data-full'] }; }
  get srcset() { return this.attrs?.srcset ?? ''; }
  set srcset(value) { this.attrs.srcset = value; }
  get complete() { return downloaded.has(this.attrs.srcset ?? this.attrs.src); }
  get naturalWidth() { return this.complete ? 720 : 0; }
  get currentSrc() { return new URL(this.attrs.srcset ?? this.attrs.src, BASE).href; }
  getAnimations() { return this.querySelectorAll('*').concat(this).flatMap(node => node.animations); }
  focus(options) { focused = this; this.focusOptions = options; }
  removeAttribute(name) { if (name === 'id') this.id = ''; else delete this.attrs?.[name]; }
  get textContent() { return this.text ?? ''; }
  cloneNode() {
    const copy = new Node(this.name, { classes: [...this.classes], id: this.id, rect: this.rect });
    copy.text = this.text;
    copy.inert = this.inert;
    copy.decode = this.decode;
    copy.attrs = this.attrs && { ...this.attrs };
    this.children.forEach(child => copy.append(child.cloneNode()));
    return copy;
  }
}
Node.prototype.querySelectorAll = function querySelectorAll(selector) {
  const found = [];
  const last = selector.split(' ').at(-1);
  const walk = node => node.children.forEach(child => {
    if (selector === '*' || (selector === '[id]' ? child.id : child.matches(last))) found.push(child);
    walk(child);
  });
  walk(this);
  return found;
};
let focused = null, holding = false;
const landing = [], BASE = 'https://events.example/';
// The poster files the browser has finished downloading.
const downloaded = new Set();

function row(id, top, { active = false } = {}) {
  const article = new Node('article', { classes: ['event-row', ...(active ? ['is-active'] : [])], id, rect: { left: 40, top, width: 1200, height: active ? 560 : 160 } });
  const stage = new Node('stage', { classes: ['event-stage'], rect: article.rect });
  const posters = new Node('posters', { classes: ['event-posters'] });
  posters.inert = true;
  const image = new Node('img', { classes: ['img'] });
  image.attrs = { src: `${id}.thumb.webp`, 'data-full': `${id}.png`, width: '1080', height: '1350' };
  image.decode = () => Promise.resolve();
  posters.append(image);
  const summary = new Node('summary', { classes: ['event-summary'] });
  const title = new Node('h4', { classes: ['h4'], id: `${id}-title` });
  const toggle = new Node('toggle', { classes: ['event-toggle'] });
  toggle.text = `活动 ${id}`;
  title.append(toggle);
  summary.append(title);
  stage.append(posters, summary);
  const details = new Node('details', { classes: ['event-details'], id: `${id}-details` });
  details.append(new Node('field', { classes: ['event-field'] }), new Node('field', { classes: ['event-field'] }));
  article.append(stage, details);
  return article;
}

(async () => {
  const rows = [row('event-1', 120, { active: true }), row('event-2', 700)];
  const tile = new Node('a', { classes: ['drift-wall__tile', 'spotlight-card'], rect: { left: 300, top: 200, width: 200, height: 200 } });
  tile.hash = '#event-2';
  const inner = new Node('inner', { classes: ['drift-wall__inner'], rect: { left: 300, top: 200, width: 245, height: 245 } });
  inner.offsetWidth = 200;
  // The wall pans a 4:5 poster 10% of its height up the tile (scripts/hero.mjs).
  const wallImage = new Node('img', { classes: ['img'] });
  wallImage.attrs = { width: '1080', height: '1350' };
  wallImage.style.translate = '0 -10%';
  inner.append(wallImage);
  tile.append(inner);
  const dialog = new Node('dialog', { id: 'event-detail' });
  const sheet = new Node('sheet', { classes: ['event-detail-sheet'], rect: { left: 340, top: 24, width: 760, height: 852 } });
  sheet.offsetHeight = 852;
  const scroller = new Node('scroll', { classes: ['event-detail-scroll'] });
  const closer = new Node('close', { classes: ['event-detail-close'] });
  sheet.append(scroller, closer);
  dialog.append(sheet);
  dialog.clientWidth = 1440; dialog.clientHeight = 900;
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; dialog.modal = false; };
  dialog.show = () => { dialog.open = true; };
  const showModal = dialog.showModal;
  dialog.showModal = () => { showModal(); dialog.modal = true; };

  const html = new Node('html');
  const document = new Node('document');
  document.documentElement = html;
  document.getElementById = id => id === 'event-detail' ? dialog : rows.find(item => item.id === id) ?? null;
  document.baseURI = BASE;
  const dispatched = [];
  document.dispatchEvent = event => dispatched.push(event.type);
  const window = new Node('window');
  const reduced = { matches: false };
  const entries = [];
  const location = { hash: '', pathname: '/', search: '' };
  const history = {
    state: null,
    pushState(state, _, url) { entries.push(['push', url]); this.state = state; location.hash = url; },
    replaceState(state, _, url) { entries.push(['replace', url]); this.state = state; location.hash = url.includes('#') ? url.slice(url.indexOf('#')) : ''; },
    back() { entries.push(['back']); this.state = null; location.hash = ''; }
  };
  const load = () => vm.runInNewContext(fs.readFileSync(new URL('../public/assets/event-detail.js', `file://${__filename}`), 'utf8'), {
    document, history, location, matchMedia: () => reduced, innerWidth: 1440, innerHeight: 900,
    getComputedStyle: node => ({ borderTopLeftRadius: '24px', getPropertyValue: name => name === '--wall-turn' && node === tile ? '15deg' : '' }),
    addEventListener: (type, fn) => window.addEventListener(type, fn), Event: class { constructor(type) { this.type = type; } }, setTimeout, URL
  });
  load();
  const click = (target, values) => document.emit('click', { target, ...values });

  // A row opens its own event, pushes its address and flies out of the row; the hero wall has downloaded the light posters.
  downloaded.add('event-1.thumb.webp').add('event-2.thumb.webp');
  assert(!click(rows[1].querySelector('event-summary') ?? rows[1].children[0], { metaKey: true }).defaultPrevented, 'Modified clicks keep the browser default');
  assert(click(rows[1].children[0]).defaultPrevented);
  assert(dialog.open && html.classes.has('is-detail') && rows[1].classes.has('event-detail-origin'));
  assert.deepEqual(entries.at(-1), ['push', '#event-2']);
  assert.equal(scroller.children.length, 2, 'The sheet holds the stage copy and the row’s details');
  const [stage, details] = scroller.children;
  assert.equal(details.id, 'event-2-details', 'The row’s own details move into the sheet');
  assert.equal(stage.querySelector('h4').id, 'event-detail-title');
  assert.equal(stage.querySelector('event-posters').inert, false, 'The sheet’s poster opens the full image');
  assert.equal(focused, scroller);
  const flight = sheet.animations.at(-1);
  assert.equal(flight.frames[0].left, '40px');
  assert.equal(flight.frames[0].top, '700px');
  assert.equal(flight.frames[1].right, '340px', 'The sheet lands centred');
  assert(stage.animations.some(item => item.frames[0]['--open'] === 0), 'A collapsed row’s poster takes the open look');
  assert(dispatched.includes('detail-toggle'), 'The poster wall pauses while the details are open');
  assert(flight.paused || flight.played, 'The flight is set up held');
  const poster = stage.querySelector('img');
  assert(poster.loading === 'eager' && poster.fetchPriority === 'high', 'The sheet’s poster loads at once and first');
  assert(!poster.srcset && poster.complete, 'It flies as the light version the row shows');
  await Promise.resolve();
  await new Promise(resolve => setTimeout(resolve));
  assert(flight.played && !flight.paused, 'The flight starts once the poster has decoded');
  assert.equal(poster.srcset, 'event-2.png', 'Once landed the poster takes its original');
  assert(!dialog.classes.has('is-arriving'), 'The details join the sheet once it lands');
  assert(details.children[0].animations.length, 'The details rise in after landing');

  // Clicks inside the sheet do not reopen anything; × goes back through the pushed entry and shrinks into the row.
  assert(!click(details.children[0]).defaultPrevented);
  closer.emit('click');
  assert.deepEqual(entries.at(-1), ['back']);
  window.emit('popstate');
  await new Promise(resolve => setTimeout(resolve));
  assert(!dialog.open && !html.classes.has('is-detail') && !rows[1].classes.has('event-detail-origin'));
  assert.equal(rows[1].children[1], details, 'The details return to their row');
  assert.equal(focused, rows[1].querySelector('event-toggle'), 'Focus returns to the row’s title');

  // A wall poster opens its event from the poster, turned with the wall; the back button closes it.
  holding = true;
  click(inner);
  assert(dialog.open && tile.classes.has('event-detail-origin'));
  assert(dialog.classes.has('is-arriving'), 'The details stay out of the layout during the flight');
  const wallStart = scroller.children[0].querySelector('img').animations.at(-1).frames[0];
  assert.equal(wallStart.objectPosition, '50% 50.00%', 'The sheet’s poster starts as the wall shows it');
  assert.equal(wallStart.scale, '1');
  holding = false;
  landing.splice(0).forEach(resolve => resolve());
  const turned = sheet.animations.at(-1).frames[0];
  assert.equal(turned.rotate, '15deg');
  assert(Math.abs(parseFloat(turned.left) - (300 + 245 / 2 - 100)) < 0.1, 'The square sits inside the turned poster’s outline');
  location.hash = '';
  history.state = null;
  window.emit('popstate');
  await new Promise(resolve => setTimeout(resolve));
  assert(!dialog.open && focused === tile, 'Back closes and returns focus to the poster');
  assert.equal(entries.at(-1)[0], 'push', 'Back does not go back twice');

  // A row already showing its original flies as the original.
  downloaded.add('event-1.png');
  rows[0].querySelector('img').srcset = 'event-1.png';
  click(rows[0].children[0]);
  assert.equal(scroller.children[0].querySelector('img').srcset, 'event-1.png', 'The original the row shows flies');
  closer.emit('click');
  await new Promise(resolve => setTimeout(resolve));
  // A poster not downloaded at all: the flight does not wait, the poster stays hidden and fades in whole when it arrives,
  // and the original is asked for only after that.
  downloaded.clear();
  holding = true;
  click(rows[1].children[0]);
  const waiting = scroller.children[0];
  const pending = waiting.querySelector('img');
  assert(waiting.querySelector('event-posters').classes.has('is-pending'), 'A poster still downloading stays hidden');
  assert(sheet.animations.at(-1).played, 'A poster still downloading does not hold the flight');
  holding = false;
  landing.splice(0).forEach(resolve => resolve());
  await new Promise(resolve => setTimeout(resolve));
  assert(!pending.srcset, 'The original waits for the light version');
  downloaded.add('event-2.thumb.webp');
  pending.emit('load');
  assert(!waiting.querySelector('event-posters').classes.has('is-pending'), 'It fades in once downloaded');
  assert.equal(pending.srcset, 'event-2.png', 'Then the original takes over');
  closer.emit('click');
  await new Promise(resolve => setTimeout(resolve));
  downloaded.add('event-1.thumb.webp');

  // Tapping another event while a close is still shrinking back opens it at once.
  click(rows[0].children[0]);
  holding = true;
  closer.emit('click');
  assert(dialog.open && !dialog.modal && dialog.classes.has('is-leaving'), 'Shrinking back, the sheet no longer blocks the page');
  click(rows[1].children[0]);
  assert(dialog.open && scroller.children[1].id === 'event-2-details', 'The tap during the close opens the other event');
  assert.equal(rows[0].children[1].id, 'event-1-details', 'The closed event’s details are back in their row');
  holding = false;
  landing.splice(0).forEach(resolve => resolve());
  await new Promise(resolve => setTimeout(resolve));
  assert(dialog.open, 'The finished close does not close the event opened since');
  closer.emit('click');
  await new Promise(resolve => setTimeout(resolve));
  assert(!dialog.open);

  // Esc and the space beside the card close; a press inside the card does not.
  click(rows[0].children[0]);
  assert(dialog.emit('cancel').defaultPrevented);
  await new Promise(resolve => setTimeout(resolve));
  assert(!dialog.open);
  click(rows[0].children[0]);
  dialog.emit('click', { target: sheet });
  assert(dialog.open);
  dialog.emit('click', { target: dialog });
  await new Promise(resolve => setTimeout(resolve));
  assert(!dialog.open);

  // Forward to a pushed entry reopens it; a shared address opens on load, and closing it drops the address.
  rows[1].scrollIntoView = options => { rows[1].scrolled = options; };
  rows[0].scrollIntoView = () => {};
  location.hash = '#event-1';
  history.state = { event: 'event-1' };
  window.emit('popstate');
  assert(dialog.open);
  closer.emit('click');
  assert.deepEqual(entries.at(-1), ['back'], 'An entry reopened with forward is left with back');
  await new Promise(resolve => setTimeout(resolve));
  location.hash = '#event-2';
  history.state = null;
  reduced.matches = true;
  sheet.animations = [];
  load();
  assert(dialog.open && rows[1].scrolled.block === 'center', 'A shared address opens its event in front of its row');
  closer.emit('click');
  assert(!dialog.open, 'Reduced motion closes at once');
  assert.deepEqual(entries.at(-1), ['replace', '/'], 'Closing a shared address drops it');
  assert.equal(sheet.animations.length, 0, 'Reduced motion has no flight');
  click(rows[0].children[0]);
  assert.equal(scroller.children[0].querySelector('img').srcset, 'event-1.png', 'Without a flight the original is asked for at once');
  closer.emit('click');
  console.log('OK: row and wall entries, held start and eager poster, light then original poster, no hold while downloading, wall look, reopening during a close, address and back/forward, ×, Esc, backdrop, focus return, shared links and reduced motion');
})().catch(error => { console.error(error); process.exitCode = 1; });
