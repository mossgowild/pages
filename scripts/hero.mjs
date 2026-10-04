// Poster wall adapted from React Bits Drift Wall (MIT + Commons Clause, see assets/react-bits.LICENSE.txt).

// Drift Wall defaults, except tiles without dimming or the dark tile overlay (hero-mobile questions 5 and 7; the mask
// lives in assets/hero.css), square tiles of mixed sizes (questions 11–12 and Q14): column widths cycle through WIDTHS
// times the base width, the whole wall turns ROTATE degrees in the screen plane (Q14), and each poster pans inside its
// tile as the tile drifts down the stage (Q14 and the L1 changes): uncropped at the tile's width (a landscape poster at its
// height), it shows its top (left) edge at the top of the stage and its bottom (right) edge at the bottom, so one pass
// across the stage shows the whole poster.
const GAP = 18;
const WIDTHS = [1.3, 0.85, 1.15, 0.75, 1.4, 0.95, 1.1, 0.8];
const ROTATE = 15;
const MIN_COLUMNS = 5;
const SPEED = 42;
const VARIANCE = 0.45;
const PARALLAX = 0.6;
const TILT = 16;
const TURN = -14;
const DEPTH = 120;
const SCALE = 1.18;
// The plane spans 1.6 times the stage's reach along the turned columns, the span the original sizes its copies for
// (1.6 stage heights before the turn); the stage shows its middle.
const PLANE_SPAN = 1.6;
// Above this width the wall keeps its composition and scales up instead of adding columns.
const REFERENCE_WIDTH = 1440;

// The scaled, turned and pushed-back wall projects to about 1.04 times its own width (1.18 · cos 14° · 1200 / 1320).
const PROJECTION = SCALE * Math.cos((TURN * Math.PI) / 180) * (1200 / (1200 + DEPTH));
export const baseWidth = width => (width > 700 ? 270 : 200);
export const wallZoom = width => Math.max(1, width / REFERENCE_WIDTH);
const columnWidth = (column, base) => base * WIDTHS[column % WIDTHS.length];
// The fewest columns (at least five) whose projected wall reaches a base width past the stage ("占满宽度", question 3).
export function columnCount(width) {
  const base = baseWidth(width);
  let columns = 0, span = 0;
  while (columns < MIN_COLUMNS || span * PROJECTION < width + base) span += columnWidth(columns++, base) + GAP;
  return columns;
}
// How far a stage of this size reaches across the wall once the wall turns ROTATE degrees, in projected pixels.
export function turnedReach(width, height) {
  const turn = (ROTATE * Math.PI) / 180;
  return { across: width * Math.cos(turn) + height * Math.sin(turn), along: width * Math.sin(turn) + height * Math.cos(turn) };
}

const columnFactor = index => 1 + VARIANCE * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1);

// Every column loops the whole poster list like an endless carousel, starting where the list splits evenly into the
// columns (Q19: the first column from poster 1, the second from poster 8 when 41 posters fill six). Each track repeats
// its list and keeps its middle at the plane's middle; drift offsets stay within half a list of 0, so the track covers
// the plane above and below at every offset. One copy of every poster is focusable: in the column whose starting
// stretch holds it, the copy that a drift offset can bring to the plane's middle.
export const planeHeight = (width, height) => PLANE_SPAN * turnedReach(width, height).along;

export function wallLayout(count, width, height) {
  const plane = planeHeight(width, height);
  const columns = columnCount(width), base = baseWidth(width);
  const first = column => Math.round((column * count) / columns);
  return Array.from({ length: columns }, (_, column) => {
    const posters = Array.from({ length: count }, (_, j) => (first(column) + j) % count);
    const own = first(column + 1) - first(column);
    const tileWidth = columnWidth(column, base);
    const heights = posters.map(() => tileWidth + GAP);
    const tops = heights.map((_, k) => heights.slice(0, k).reduce((sum, h) => sum + h, 0));
    const copyHeight = tops.at(-1) + heights.at(-1);
    const copies = Math.ceil(plane / copyHeight) + 1;
    const trackHeight = copies * copyHeight;
    const middle = k => tops[k] + heights[k] / 2;
    const focusCopy = posters.map((_, k) => Math.round((trackHeight / 2 - middle(k)) / copyHeight));
    const wrap = offset => offset - copyHeight * Math.round(offset / copyHeight);
    const top = (plane - trackHeight) / 2;
    return {
      posters, tileWidth, heights, copyHeight, copies, wrap,
      base: top,
      // The column opens on its starting poster at the top of the stage.
      start: wrap(top - (plane - height) / 2),
      velocity: SPEED * columnFactor(column) * (column % 2 === 0 ? 1 : -1),
      // Drift offset that puts poster k's focusable copy at the plane's middle; within half a list of 0.
      centre: k => focusCopy[k] * copyHeight + middle(k) - trackHeight / 2,
      // Middle of tile k in copy `copy`, measured from the top of the track.
      middle: (k, copy) => copy * copyHeight + middle(k),
      focusable: (k, copy) => k < own && copy === focusCopy[k]
    };
  });
}

function buildWall(stage, links, layout, span) {
  const wall = document.createElement('div');
  wall.className = 'drift-wall';
  const plane = document.createElement('div');
  plane.className = 'drift-wall__plane';
  plane.style.height = `${span}px`;
  const posters = [];
  const tracks = layout.map((column, c) => {
    const col = document.createElement('div');
    col.className = 'drift-wall__col';
    col.style.width = `${column.tileWidth + GAP}px`;
    const track = document.createElement('div');
    track.className = 'drift-wall__track';
    for (let copy = 0; copy < column.copies; copy++) {
      column.posters.forEach((poster, k) => {
        const tile = links[poster].cloneNode(false);
        tile.className = 'drift-wall__tile spotlight-card';
        tile.style.height = `${column.heights[k]}px`;
        tile.dataset.col = c;
        tile.dataset.k = k;
        if (!column.focusable(k, copy)) {
          tile.tabIndex = -1;
          tile.setAttribute('aria-hidden', 'true');
        }
        const inner = document.createElement('span');
        inner.className = 'drift-wall__inner';
        const image = links[poster].querySelector('img').cloneNode(false);
        // Height over width; assets/hero.css sizes the uncropped poster from it while motion is allowed.
        const ratio = Number(image.getAttribute('height')) / Number(image.getAttribute('width'));
        image.style.setProperty('--ratio', ratio);
        image.classList.toggle('is-wide', ratio < 1);
        inner.append(image);
        tile.append(inner);
        // The share of the poster that overflows the square tile, as a percentage of the poster along its pan.
        const pan = ratio < 1 ? (1 - ratio) * 100 : (1 - 1 / ratio) * 100;
        posters.push({ tile, image, column: c, middle: column.middle(k, copy), size: column.heights[k], pan, wide: ratio < 1, still: tile.tabIndex === -1 });
        track.append(tile);
      });
    }
    col.append(track);
    plane.append(col);
    return track;
  });
  wall.append(plane);
  stage.querySelector('.drift-wall')?.remove();
  stage.append(wall);
  return { wall, plane, tracks, posters };
}

export function initHero(root) {
  const stage = root.querySelector('.hero-stage');
  const links = [...stage.querySelectorAll('.hero-poster')];
  if (!links.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = matchMedia('(hover: hover)');
  let layout, wall, plane, tracks, posters, offsets, velocities, span = 0, view = 0, reach = 0;
  let active = null, activeCol = -1, keyboard = false;
  let pointer = { x: 0, y: 0 }, tilt = { x: 0, y: 0 }, shift = 0, shiftGoal = 0, hover = null;
  let size = '', visible = false, raf = 0, last = null, zoom = 1;

  const paint = () => {
    plane.style.transform = `translate(-50%, -50%) rotate(${ROTATE}deg) scale(${SCALE * zoom}) rotateX(${TILT + tilt.y}deg) rotateY(${TURN + tilt.x}deg) `
      + `translateZ(${-DEPTH}px) translateX(${shift}px)`;
    tracks.forEach((track, c) => { track.style.transform = `translate3d(0, ${layout[c].base - offsets[c]}px, 0)`; });
    // The pan follows the tile's middle from the top of the stage (0) to its bottom (the whole overflow); none when still.
    for (const poster of posters) {
      const { image, column, middle, pan, wide } = poster;
      const y = layout[column].base - offsets[column] + middle;
      // Every column loops the whole list, so most copies sit far off the stage: skipping their rendering keeps the
      // frame rate of the shorter round-robin columns. Focusable copies always render, so Tab still reaches them.
      const away = poster.still && Math.abs(y - span / 2) > reach / 2 + poster.size;
      if (poster.away !== away) poster.tile.style.visibility = (poster.away = away) ? 'hidden' : '';
      const down = Math.min(Math.max((y - (span - view) / 2) / view, 0), 1);
      const move = (-pan * down).toFixed(2);
      const value = reduced.matches ? '' : wide ? `${move}% 0` : `0 ${move}%`;
      if (poster.value !== value) image.style.translate = poster.value = value;
    }
  };

  const frame = ts => {
    raf = 0;
    const dt = last === null ? 0 : Math.min(0.05, Math.max(0, ts - last) / 1000);
    last = ts;
    const damp = 1 - Math.exp(-dt / 0.12);
    tilt.x += (pointer.x * PARALLAX * 8 - tilt.x) * damp;
    tilt.y += (-pointer.y * PARALLAX * 8 - tilt.y) * damp;
    shift += (shiftGoal - shift) * damp;
    layout.forEach((column, c) => {
      const target = activeCol === c ? 0 : column.velocity;
      velocities[c] += (target - velocities[c]) * (1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28)));
      offsets[c] = column.wrap(offsets[c] + velocities[c] * dt);
    });
    paint();
    track();
    request();
  };
  // Frames run only while the wall is on screen, the page is shown and motion is allowed.
  const request = () => {
    if (!visible || document.hidden || reduced.matches) last = null;
    else if (!raf) raf = requestAnimationFrame(frame);
  };
  // Reduced motion keeps the wall still without parallax; focus changes jump instead of easing.
  const settle = () => {
    if (!reduced.matches) return request();
    tilt = { x: 0, y: 0 };
    shift = shiftGoal;
    paint();
  };

  // The highlight follows whatever poster is under the mouse, also while the columns drift beneath a still pointer.
  const track = () => {
    const tile = hover && document.elementFromPoint(hover.x, hover.y)?.closest('.drift-wall__tile');
    if (tile) activate(tile);
  };
  const activate = tile => {
    if (tile === active) return;
    active?.classList.remove('is-active');
    active = tile;
    activeCol = tile ? Number(tile.dataset.col) : -1;
    tile?.classList.add('is-active');
  };

  const build = () => {
    // The layout is computed at the reference width and scaled; height and width in the plane's own pixels.
    const box = stage.getBoundingClientRect();
    zoom = wallZoom(box.width);
    const width = box.width / zoom, height = box.height / zoom;
    const key = `${Math.round(width)}x${Math.round(height)}x${zoom.toFixed(3)}`;
    if (key === size || !height) return;
    size = key;
    active = null;
    activeCol = -1;
    keyboard = false;
    shift = shiftGoal = 0;
    layout = wallLayout(links.length, width, height);
    span = planeHeight(width, height);
    view = height;
    // The stage's reach along the turned columns, in plane pixels.
    reach = turnedReach(width, height).along;
    ({ wall, plane, tracks, posters } = buildWall(stage, links, layout, span));
    offsets = layout.map(column => column.start);
    velocities = layout.map(() => 0);
    // Highlighting, stopping a column and the parallax follow a hovering mouse only: on touch screens (also when a phone's
    // taps arrive as mouse events) the wall keeps drifting under a finger and a tap goes straight to the event (question 6).
    wall.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !canHover.matches) return;
      const rect = wall.getBoundingClientRect();
      if (!reduced.matches) pointer = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
      hover = { x: event.clientX, y: event.clientY };
      track();
    });
    wall.addEventListener('pointerleave', () => {
      pointer = { x: 0, y: 0 };
      hover = null;
      if (!keyboard) activate(null);
    });
    wall.addEventListener('focusin', event => {
      const tile = event.target.closest('.drift-wall__tile');
      if (!tile.matches(':focus-visible')) return;
      keyboard = true;
      activate(tile);
      // The column brings the poster to the middle height, and the wall slides sideways only as far as needed to keep it
      // inside the unfaded middle (the original mask is opaque within 40% of its 78%-wide ellipse).
      const c = Number(tile.dataset.col);
      offsets[c] = layout[c].centre(Number(tile.dataset.k));
      velocities[c] = 0;
      const box = tile.getBoundingClientRect(), view = stage.getBoundingClientRect();
      const reach = Math.max(0, 0.4 * 0.78 * view.width - box.width / 2);
      const off = box.left + box.width / 2 - (view.left + view.width / 2);
      shiftGoal = shift + (Math.min(Math.max(off, -reach), reach) - off) / (PROJECTION * zoom);
      settle();
    });
    wall.addEventListener('focusout', event => {
      if (!keyboard || wall.contains(event.relatedTarget)) return;
      keyboard = false;
      shiftGoal = 0;
      activate(null);
      settle();
    });
    stage.classList.add('is-wall');
    paint();
    settle();
  };

  // Focusing a tile must not scroll the clipped stage; the column brings the poster into view instead.
  stage.addEventListener('scroll', event => {
    if (event.target !== stage && event.target !== wall) return;
    event.target.scrollTop = 0;
    event.target.scrollLeft = 0;
  }, true);
  build();
  new ResizeObserver(build).observe(stage);
  // The latest entry of a batch decides (a reload restoring a deep scroll reports the first layout, then the real place).
  new IntersectionObserver(entries => {
    visible = entries.at(-1).isIntersecting;
    request();
  }).observe(stage);
  document.addEventListener('visibilitychange', request);
  reduced.addEventListener('change', settle);
}

if (typeof document !== 'undefined') initHero(document.getElementById('spotlight'));
