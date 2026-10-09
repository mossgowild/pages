// The full image of the poster at the top of an event's detail sheet (docs/event-browsing.md Q25, Q27–Q33). It grows
// out of the sheet's poster and shrinks back into it. Touch: a pull down while the image fits follows the finger and
// closes past a quarter of the screen or on a quick flick; a pinch below the fit closes below 0.75 or when quick; a zoomed
// image pans with inertia and stretches past its edges and zoom limits, springing back on release. A double tap toggles
// between the fit and 2.5× the fit (never past the original's pixels); pinch and the wheel stop at twice the original's
// pixels. A single tap on the image does nothing; the backdrop, Esc, Enter and the back button close. With a mouse a
// toolbar (− ＋ fit) and a × appear while the mouse moves and fade after 2s of rest. Reduced motion skips every
// transition, the inertia and the springs.
//
// The gestures run frame by frame on the image itself, so the dialog's behaviour is one effect over its elements; React
// draws the dialog and leaves the image inside the view to it.
// @ts-nocheck -- ported unchanged from the page's own script; typing it adds nothing until it is reworked.
import { useEffect, useRef } from 'react'
import { CLOSE_BUTTON } from './EventDetail'

// A full-screen dialog over a dark, blurred veil, the image centred within the safe area; the image itself (a copy of the
// sheet's poster) takes its look from the view.
const PREVIEW = 'poster-preview fixed inset-0 w-full h-dvh max-w-none max-h-none m-0 p-0 [border:0] [background:transparent] text-(--ink) open:grid open:grid-rows-[minmax(0,1fr)] backdrop:[background:#05050bea] backdrop:[backdrop-filter:blur(12px)] backdrop:[opacity:var(--veil,1)] backdrop:[animation:preview-backdrop_.26s_ease-out] [&.is-closing]:backdrop:[animation:preview-backdrop_.22s_ease-in_reverse_forwards] print:open:hidden'
const VIEW = 'poster-preview-view flex items-center justify-center min-w-0 min-h-0 overflow-hidden overscroll-contain touch-none select-none [padding:max(16px,env(safe-area-inset-top))_max(16px,env(safe-area-inset-right))_max(16px,env(safe-area-inset-bottom))_max(16px,env(safe-area-inset-left))] focus:[outline:none] [&.is-keyboard]:focus:[outline:2px_solid_var(--focus)] [&.is-keyboard]:focus:[outline-offset:-4px] [&_img]:block [&_img]:flex-none [&_img]:w-auto [&_img]:h-auto [&_img]:max-w-full [&_img]:max-h-full [&_img]:object-contain [&_img]:[transform-origin:center] [&_img]:cursor-default [&_img]:[-webkit-user-drag:none] [&_img]:[box-shadow:0_16px_64px_#0008] [&_img]:[transition:opacity_.3s_ease-out] [&_img.is-pending]:opacity-0 [&.is-zoomed_img]:cursor-grab [&.is-dragging_img]:cursor-grabbing'
// With a mouse, the toolbar and the × show while the mouse moves and fade after 2s of rest (has-tools); touch screens never
// show them.
const MOUSE_ONLY = 'hidden mouse:opacity-0 mouse:pointer-events-none mouse:[transition:opacity_.3s_ease-out] mouse:[.poster-preview.has-tools:not(.is-closing)_&]:opacity-100 mouse:[.poster-preview.has-tools:not(.is-closing)_&]:pointer-events-auto'
const TOOLS = `poster-preview-tools ${MOUSE_ONLY} mouse:[.poster-preview[open]_&]:flex absolute left-[50%] bottom-[max(24px,calc(env(safe-area-inset-bottom)_+_16px))] [translate:-50%_0] h-[calc(var(--control)_+_16px)] items-center gap-2 [padding:0_7px] [border:1px_solid_var(--glass-edge)] rounded-[calc(var(--control)/2_+_8px)] [background:rgb(10_10_16/.55)] [-webkit-backdrop-filter:blur(12px)] [backdrop-filter:blur(12px)]`
// A control-size round button with the pills' specular rim (app.css); at a zoom limit it greys out.
const BUTTON = 'poster-preview-button specular-rim press relative grid place-items-center w-(--control) h-(--control) p-0 [border:0] rounded-[999px] [background:rgb(255_255_255/.06)] text-white cursor-pointer [--spec-base:rgb(255_255_255/.3)] [&_svg]:block aria-disabled:text-[rgb(255_255_255/.32)] aria-disabled:cursor-default hover:not-aria-disabled:[--spec-base:#fff] focus-visible:[outline:2px_solid_var(--focus)] focus-visible:[outline-offset:3px]'

export function PosterPreview() {
  const root = useRef<HTMLDialogElement>(null)
  useEffect(() => {
  const dialog = root.current;
  const view = dialog.querySelector('.poster-preview-view');
  const tools = dialog.querySelector('.poster-preview-tools');
  const closer = dialog.querySelector('.poster-preview-close');
  const buttons = Object.fromEntries([...tools.querySelectorAll('[data-zoom]')].map(button => [button.dataset.zoom, button]));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const pointers = new Map();
  const STEP = 1.25, ZOOM = 250, SPRING = 300, IDLE = 2000;
  let source, image, base, area, animation, gesture, tap, lastTap, samples, midpoint, motion = 0, goal = null, idle;
  let scale = 1, x = 0, y = 0, veil = 1, moved = false, closing = false, pushed = false;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
  const center = rect => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  // A poster shows its light version until its original (data-full) has downloaded (docs/event-browsing.md Q34).
  const showsOriginal = poster => poster.complete && poster.naturalWidth > 0
    && poster.currentSrc === new URL(poster.dataset.full, document.baseURI).href;

  // Zoom levels against the fit (1): the original's pixels sit at `natural`; a double tap goes to 2.5× the fit but not
  // past them, and pinch and the wheel stop at twice them (Q28).
  function levels() {
    const natural = Number(image.getAttribute('width')) / base.width;
    return { natural, double: Math.min(2.5, natural), max: Math.max(1, natural * 2) };
  }
  // How far the image may move from the middle at a scale before it shows the backdrop.
  const bounds = level => ({ x: Math.max(0, (base.width * level - area.width) / 2), y: Math.max(0, (base.height * level - area.height) / 2) });
  // Past an edge the image follows at a third of the finger's travel.
  const stretch = (value, limit) => Math.abs(value) <= limit ? value : Math.sign(value) * (limit + (Math.abs(value) - limit) / 3);

  function render() {
    image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    dialog.style.setProperty('--veil', veil.toFixed(3));
    view.classList.toggle('is-zoomed', scale > 1.001);
    const { max } = levels();
    buttons.in.setAttribute('aria-disabled', String(scale >= max - 0.001));
    buttons.out.setAttribute('aria-disabled', String(scale <= 1.001));
    buttons.fit.setAttribute('aria-disabled', String(scale <= 1.001 && Math.abs(x) < 0.5 && Math.abs(y) < 0.5));
  }

  function stop() {
    cancelAnimationFrame(motion);
    motion = 0;
    goal = null;
  }

  // Eases the scale, the position and the veil to a target (ease-out cubic); a gesture or another step takes over.
  function ease(target, duration, done) {
    stop();
    const from = { scale, x, y, veil }, to = { ...from, ...target };
    if (reducedMotion.matches || duration <= 0) {
      ({ scale, x, y, veil } = to);
      render();
      done?.();
      return;
    }
    goal = to;
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, Math.max(0, now - start) / duration), e = 1 - (1 - t) ** 3;
      scale = from.scale + (to.scale - from.scale) * e;
      x = from.x + (to.x - from.x) * e;
      y = from.y + (to.y - from.y) * e;
      veil = from.veil + (to.veil - from.veil) * e;
      render();
      if (t < 1) motion = requestAnimationFrame(step);
      else {
        motion = 0;
        goal = null;
        done?.();
      }
    };
    motion = requestAnimationFrame(step);
  }

  // A zoom step to a level, keeping the image point under `point` in place, within the limits and the edges.
  function zoomTo(level, point = center(base), duration = ZOOM) {
    const next = Math.max(1, Math.min(levels().max, level));
    const origin = center(base), ratio = next / scale, edge = bounds(next);
    ease({ scale: next, veil: 1, x: clamp(point.x - origin.x - (point.x - origin.x - x) * ratio, edge.x),
      y: clamp(point.y - origin.y - (point.y - origin.y - y) * ratio, edge.y) }, duration);
  }
  // Steps build on the level a running step is heading to, so quick presses and wheel turns add up.
  const heading = () => goal?.scale ?? scale;
  const middle = () => center(view.getBoundingClientRect());

  function reset() {
    stop();
    animation?.cancel();
    scale = 1; x = y = 0; veil = 1;
    image.style.transform = 'none';
    const css = getComputedStyle(view);
    area = { width: view.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight),
      height: view.clientHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom) };
    // Fitted from the original's size, so the box stays put when the original replaces the light version.
    const width = Number(image.getAttribute('width')), height = Number(image.getAttribute('height'));
    const fit = Math.min(1, area.width / width, area.height / height);
    image.style.width = `${width * fit}px`;
    image.style.height = `${height * fit}px`;
    base = image.getBoundingClientRect();
    render();
  }

  function animateFromSource(reverse = false) {
    const current = image.getBoundingClientRect();
    const currentClip = getComputedStyle(image).clipPath;
    animation?.cancel();
    if (reducedMotion.matches) return;
    const thumbnail = source.querySelector('img');
    const box = thumbnail.getBoundingClientRect();
    const width = Number(thumbnail.getAttribute('width')), height = Number(thumbnail.getAttribute('height'));
    const cover = Math.max(box.width / width, box.height / height);
    // The poster as the stage draws it: covering its box at the stage's object-position (in percentages, F48).
    const [px, py] = getComputedStyle(thumbnail).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    const from = { left: box.left + (box.width - width * cover) * px, top: box.top + (box.height - height * cover) * py,
      width: width * cover, height: height * cover };
    // Clip to the link's visible frame: card covers may be enlarged and shifted for parallax.
    const visible = source.getBoundingClientRect();
    const clipPath = `inset(${(visible.top - from.top) / from.height * 100}% ${(from.left + from.width - visible.right) / from.width * 100}% `
      + `${(from.top + from.height - visible.bottom) / from.height * 100}% ${(visible.left - from.left) / from.width * 100}%)`;
    const origin = center(base);
    const frame = rect => ({ transform: `translate(${center(rect).x - origin.x}px, ${center(rect).y - origin.y}px) scale(${rect.width / base.width}, ${rect.height / base.height})` });
    const thumbnailFrame = { ...frame(from), clipPath, ...fadeFrame(from, visible) };
    const fullFrame = fadeFrame();
    animation = image.animate(reverse ? [{ ...frame(current), clipPath: currentClip, ...fullFrame }, thumbnailFrame] : [thumbnailFrame, { transform: 'none', clipPath: 'inset(0%)', ...fullFrame }], {
      duration: reverse ? 220 : 300, easing: 'cubic-bezier(.22,.68,.18,1)', fill: 'both'
    });
    const running = animation;
    if (!reverse) running.finished.then(() => running.cancel(), () => {});
    return running;
  }

  // A poster on a faded stage (the detail sheet's, poster-fade in app.css) keeps that fade on the flying image: the stage's masks,
  // sized to the visible frame in the image's own pixels, grow until the whole image lies in their opaque top, so the
  // fade melts away as the image flies out and returns as it flies back (docs/event-browsing.md F43).
  function fadeFrame(from, visible) {
    const stage = getComputedStyle(source.parentElement);
    const masks = stage.maskImage;
    if (!masks || masks === 'none') return {};
    const layers = masks.split(/,\s*(?=linear-gradient)/).length;
    const box = visible
      ? [(visible.left - from.left) / from.width * base.width, (visible.top - from.top) / from.height * base.height,
        visible.width / from.width * base.width, visible.height / from.height * base.height]
      : [0, 0, base.width, base.height * 10];
    const each = value => Array(layers).fill(value).join(', ');
    const size = each(`${box[2]}px ${box[3]}px`), position = each(`${box[0]}px ${box[1]}px`);
    // The layers combine as on the stage (intersected), or the opaque side layer would cancel the fade.
    return { maskImage: masks, webkitMaskImage: masks, maskSize: size, webkitMaskSize: size, maskPosition: position,
      webkitMaskPosition: position, maskRepeat: 'no-repeat', webkitMaskRepeat: 'no-repeat',
      maskComposite: stage.maskComposite, webkitMaskComposite: stage.webkitMaskComposite };
  }

  // With a mouse the toolbar and the × show while it moves and fade after 2s of rest, unless the pointer rests on them or
  // the keyboard is on them (Q31–Q33); touch screens never show them (MOUSE_ONLY).
  const held = () => tools.matches(':hover') || closer.matches(':hover') || Boolean(dialog.querySelector('.poster-preview-tools :focus-visible, .poster-preview-close:focus-visible'));
  function wake() {
    if (!finePointer.matches || closing) return;
    dialog.classList.add('has-tools');
    clearTimeout(idle);
    idle = setTimeout(() => (held() ? wake() : dialog.classList.remove('has-tools')), IDLE);
  }

  document.addEventListener('click', event => {
    // The full image opens from the poster at the top of an event's detail sheet (EventDetail.tsx).
    const link = event.target.closest('.event-detail .event-posters a');
    if (!link || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (dialog.open) return;
    source = link;
    const poster = source.querySelector('img');
    image = poster.cloneNode();
    // The copy takes the preview's look, not the stage's crop and parallax.
    image.removeAttribute('class');
    // It opens as the version the stage shows and takes the original at once: the light version stays on screen until
    // the original has downloaded; one not downloaded yet stays hidden and fades in whole (Q34).
    if (!showsOriginal(poster)) image.removeAttribute('srcset');
    image.removeAttribute('loading');
    image.fetchPriority = 'high';
    image.draggable = false;
    view.replaceChildren(image);
    const sharpen = () => { if (image.dataset.full) image.srcset = image.dataset.full; };
    if (image.complete) sharpen();
    else {
      image.classList.add('is-pending');
      image.addEventListener('load', () => image.classList.remove('is-pending'), { once: true });
      for (const type of ['load', 'error']) image.addEventListener(type, sharpen, { once: true });
    }
    view.classList.toggle('is-keyboard', event.detail === 0);
    dialog.showModal();
    view.focus({ preventScroll: true });
    reset();
    source.classList.add('poster-preview-origin');
    // The text over the stage fades while the image is open (EventRow.tsx).
    source.closest('.event-stage')?.classList.add('is-previewing');
    // The back button closes the image first: opening records an entry at the same address.
    history.pushState({ ...history.state, preview: true }, '');
    pushed = true;
    animateFromSource();
    wake();
  });

  function closePreview({ fromHistory = false } = {}) {
    if (closing || !dialog.open) return;
    closing = true;
    stop();
    if (pushed && !fromHistory && history.state?.preview) history.back();
    pushed = false;
    source.closest('.event-stage')?.classList.remove('is-previewing');
    clearTimeout(idle);
    dialog.classList.remove('has-tools');
    pointers.clear();
    gesture = tap = lastTap = undefined;
    view.classList.remove('is-dragging');
    dialog.classList.add('is-closing');
    const finish = () => {
      dialog.close();
      dialog.classList.remove('is-closing');
      dialog.style.removeProperty('--veil');
      animation?.cancel();
      source.classList.remove('poster-preview-origin');
      source.focus({ preventScroll: true });
      closing = false;
    };
    // It shrinks back into the sheet's poster from wherever a gesture left it.
    const exit = animateFromSource(true);
    if (exit) exit.finished.then(finish, finish);
    else finish();
  }

  function pointerPosition() {
    const [a, b = a] = [...pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
  }

  // A gesture starts from the current state: two fingers pinch; one pans a zoomed image or pulls a fitted one. A finger
  // left from a pinch carries on with the pinch's movement history, so a quick pinch still reads as quick on release.
  function startGesture(carry = false) {
    if (!pointers.size) {
      gesture = undefined;
      view.classList.remove('is-dragging');
      return;
    }
    const mode = pointers.size > 1 ? 'pinch' : scale > 1.001 ? 'pan' : 'pull';
    const at = pointerPosition();
    gesture = { x: at.x, y: at.y, distance: at.distance, mode, scale, veil, xOffset: x, yOffset: y };
    if (!carry) samples = [{ time: performance.now(), x, y, scale }];
    view.classList.toggle('is-dragging', mode === 'pan');
  }

  // Release speeds in px and scale per ms, over at least the last 50ms of movement; none when the finger rested before
  // lifting.
  function velocity() {
    const last = samples.at(-1);
    if (performance.now() - last.time > 100) return { x: 0, y: 0, scale: 0 };
    const from = samples.findLast(sample => last.time - sample.time >= 50) ?? samples[0];
    const time = Math.max(16, last.time - from.time);
    return { x: (last.x - from.x) / time, y: (last.y - from.y) / time, scale: (last.scale - from.scale) / time };
  }

  view.addEventListener('pointerdown', event => {
    if (closing || event.button !== 0) return;
    view.classList.remove('is-keyboard');
    stop();
    animation?.cancel();
    const point = { x: event.clientX, y: event.clientY };
    pointers.set(event.pointerId, point);
    view.setPointerCapture(event.pointerId);
    if (pointers.size === 1) {
      tap = { ...point, time: performance.now(), background: event.target === view };
      moved = false;
    } else {
      moved = true;
      lastTap = undefined;
    }
    startGesture();
  });

  view.addEventListener('pointermove', event => {
    if (closing || !pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (!moved && Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 6) {
      moved = true;
      lastTap = undefined;
    }
    if (!moved) return;
    const point = midpoint = pointerPosition(), origin = center(base);
    if (gesture.mode === 'pinch') {
      // Below the fit the image follows the fingers and the backdrop thins; past the limit it follows a third as far.
      const { max } = levels();
      const raw = gesture.scale * (gesture.distance > 0 ? point.distance / gesture.distance : 1);
      scale = raw > max ? max + (raw - max) / 3 : Math.max(0.3, raw);
      const ratio = scale / gesture.scale;
      x = point.x - origin.x - (gesture.x - origin.x - gesture.xOffset) * ratio;
      y = point.y - origin.y - (gesture.y - origin.y - gesture.yOffset) * ratio;
      veil = scale < 1 ? Math.max(0, Math.min(1, (scale - 0.5) / 0.5)) : 1;
    } else if (gesture.mode === 'pan') {
      const edge = bounds(scale);
      x = stretch(gesture.xOffset + point.x - gesture.x, edge.x);
      y = stretch(gesture.yOffset + point.y - gesture.y, edge.y);
    } else {
      // Pulled down, the image follows the finger, shrinks and the backdrop thins; pulled up it follows a third as far.
      const dx = point.x - gesture.x, dy = point.y - gesture.y;
      const progress = Math.min(1, Math.max(0, gesture.yOffset + dy) / area.height);
      x = gesture.xOffset + dx;
      y = gesture.yOffset + (dy > 0 ? dy : dy / 3);
      scale = gesture.scale * (1 - progress * 0.5);
      veil = Math.max(0, gesture.veil * (1 - progress * 2));
    }
    samples.push({ time: performance.now(), x, y, scale });
    if (samples.length > 12) samples.shift();
    render();
  });

  function finishPointer(event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    const ended = gesture;
    if (pointers.size) {
      // A finger lifted from a pinch: the other one carries on from here.
      startGesture(true);
      return;
    }
    startGesture();
    if (event.type === 'pointerup' && !moved && performance.now() - tap.time < 300) return tapped({ x: event.clientX, y: event.clientY });
    if (!ended || !moved) return;
    release(ended, velocity());
  }
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) view.addEventListener(type, finishPointer);

  // A tap on the backdrop closes; on the image only a double tap does something: it zooms in at the tap, or back out.
  function tapped(point) {
    if (tap.background) return closePreview();
    if (lastTap && performance.now() - lastTap.time < 300 && Math.hypot(point.x - lastTap.x, point.y - lastTap.y) < 24) {
      lastTap = undefined;
      const { double } = levels();
      if (scale > 1.001) zoomTo(1, point);
      else if (double > 1.001) zoomTo(double, point);
      return;
    }
    lastTap = { ...point, time: performance.now() };
  }

  function release(ended, speed) {
    const { max } = levels();
    if (scale < 0.999 || ended.mode === 'pull') {
      // Pulled a quarter of the screen down or flicked down, pinched below 0.75 or quickly: close from here. Fingers
      // seldom lift together, so a pinch may end as a one-finger pull and is judged by where it left the image.
      if (y > area.height / 4 || speed.y >= 0.5 || scale < 0.75 || speed.scale <= -0.0015) return closePreview();
      return ease({ scale: 1, x: 0, y: 0, veil: 1 }, SPRING);
    }
    if (scale > max) return zoomTo(max, midpoint ?? center(base), SPRING);
    const edge = bounds(scale);
    if (Math.abs(x) > edge.x || Math.abs(y) > edge.y) return ease({ x: clamp(x, edge.x), y: clamp(y, edge.y) }, SPRING);
    // Inertia: the image keeps the release speed and slows down, stopping at the edges (an ease-out matched to the speed).
    const travel = Math.hypot(speed.x, speed.y);
    if (ended.mode !== 'pan' || travel < 0.1 || reducedMotion.matches) return;
    const to = { x: clamp(x + speed.x * 325, edge.x), y: clamp(y + speed.y * 325, edge.y) };
    const distance = Math.hypot(to.x - x, to.y - y);
    if (distance < 1) return;
    ease(to, Math.min(900, Math.max(250, 3 * distance / travel)));
  }

  view.addEventListener('wheel', event => {
    event.preventDefault();
    if (closing || pointers.size) return;
    view.classList.remove('is-keyboard');
    lastTap = undefined;
    wake();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? area.height : 1);
    zoomTo(heading() * Math.exp(-delta * (event.ctrlKey ? .01 : .002)), { x: event.clientX, y: event.clientY });
  }, { passive: false });

  view.addEventListener('keydown', event => {
    if (closing || event.metaKey || event.ctrlKey || event.altKey) return;
    view.classList.add('is-keyboard');
    if (event.key === '+' || event.key === '=') zoomTo(heading() * STEP);
    else if (event.key === '-') zoomTo(heading() / STEP);
    else if (event.key === '0' || event.key === 'Home') zoomTo(1);
    else if (event.key === 'Enter' || event.key === ' ') closePreview();
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const edge = bounds(scale);
      ease({ x: clamp(x + (event.key === 'ArrowLeft' ? 60 : event.key === 'ArrowRight' ? -60 : 0), edge.x),
        y: clamp(y + (event.key === 'ArrowUp' ? 60 : event.key === 'ArrowDown' ? -60 : 0), edge.y) }, 150);
    } else return;
    lastTap = undefined;
    event.preventDefault();
  });
  view.addEventListener('click', event => {
    if (event.detail === 0) closePreview();
  });

  tools.addEventListener('click', event => {
    const button = event.target.closest('[data-zoom]');
    if (!button || button.getAttribute('aria-disabled') === 'true') return;
    const zoom = button.dataset.zoom;
    zoomTo(zoom === 'fit' ? 1 : zoom === 'in' ? heading() * STEP : heading() / STEP, middle());
  });
  closer.addEventListener('click', () => closePreview());
  dialog.addEventListener('pointermove', event => { if (event.pointerType === 'mouse') wake(); });
  dialog.addEventListener('focusin', event => { if (event.target.closest('.poster-preview-tools, .poster-preview-close')) wake(); });

  window.addEventListener('popstate', () => {
    if (dialog.open && !history.state?.preview) closePreview({ fromHistory: true });
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closePreview();
  });
  window.addEventListener('resize', () => {
    if (!dialog.open || closing) return;
    pointers.clear();
    gesture = tap = lastTap = undefined;
    view.classList.remove('is-dragging');
    reset();
  });
  }, [])
  return (
    <dialog ref={root} className={PREVIEW} aria-label="海报预览" aria-describedby="poster-preview-help">
      <p className="sr-only" id="poster-preview-help">双指或滚轮缩放，放大后拖动查看；双击切换缩放；下拉、捏小或点背景退出。键盘加减号缩放，方向键移动，0 恢复全图，Esc 退出。</p>
      <div className={VIEW} tabIndex={0} autoFocus aria-label="图片缩放与移动" />
      <div className={TOOLS} role="toolbar" aria-label="缩放">
        <button type="button" className={BUTTON} data-zoom="out" aria-label="缩小">
          <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <button type="button" className={BUTTON} data-zoom="in" aria-label="放大">
          <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M2 7h10M7 2v10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <button type="button" className={BUTTON} data-zoom="fit" aria-label="复位">
          <svg aria-hidden="true" viewBox="0 0 14 14" width="14" height="14"><path d="M1.75 5V1.75H5M9 1.75h3.25V5M12.25 9v3.25H9M5 12.25H1.75V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <button type="button" className={`poster-preview-close ${CLOSE_BUTTON} ${MOUSE_ONLY} mouse:[.poster-preview[open]_&]:block`} aria-label="关闭预览"><span aria-hidden="true" /></button>
    </dialog>
  )
}
