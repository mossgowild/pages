(() => {
  const dialog = document.querySelector('.poster-preview');
  const view = dialog.querySelector('.poster-preview-view');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointers = new Map();
  let source, image, base, area, animation, gesture, tap, lastTap, tapTimer;
  let scale = 1, x = 0, y = 0, moved = false, closing = false;
  const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));
  const center = rect => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

  function render() {
    x = clamp(x, Math.max(0, (base.width * scale - area.width) / 2));
    y = clamp(y, Math.max(0, (base.height * scale - area.height) / 2));
    image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    view.classList.toggle('is-zoomed', scale > 1);
  }

  function reset() {
    animation?.cancel();
    scale = 1; x = y = 0;
    image.style.transform = 'none';
    base = image.getBoundingClientRect();
    const css = getComputedStyle(view);
    area = { width: view.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight),
      height: view.clientHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom) };
    render();
  }

  function zoomAt(nextScale, point = center(base)) {
    animation?.cancel();
    const next = Math.max(1, Math.min(8, nextScale));
    const origin = center(base), ratio = next / scale;
    x = point.x - origin.x - (point.x - origin.x - x) * ratio;
    y = point.y - origin.y - (point.y - origin.y - y) * ratio;
    scale = next;
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
    const from = { left: box.left + (box.width - width * cover) / 2, top: box.top, width: width * cover, height: height * cover };
    const sideClip = (from.width - box.width) / from.width * 50;
    const clipPath = `inset(0 ${sideClip}% ${(from.height - box.height) / from.height * 100}% ${sideClip}%)`;
    const origin = center(base);
    const frame = rect => ({ transform: `translate(${center(rect).x - origin.x}px, ${center(rect).y - origin.y}px) scale(${rect.width / base.width}, ${rect.height / base.height})` });
    const thumbnailFrame = { ...frame(from), clipPath };
    animation = image.animate(reverse ? [{ ...frame(current), clipPath: currentClip }, thumbnailFrame] : [thumbnailFrame, { transform: 'none', clipPath: 'inset(0%)' }], {
      duration: reverse ? 220 : 300, easing: 'cubic-bezier(.22,.68,.18,1)', fill: 'both'
    });
    const running = animation;
    if (!reverse) running.finished.then(() => running.cancel(), () => {});
    return running;
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('.event-posters a');
    if (!link || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (dialog.open) return;
    source = link;
    image = source.querySelector('img').cloneNode();
    image.removeAttribute('loading');
    image.draggable = false;
    view.replaceChildren(image);
    view.classList.toggle('is-keyboard', event.detail === 0);
    dialog.showModal();
    view.focus({ preventScroll: true });
    reset();
    source.classList.add('poster-preview-origin');
    animateFromSource();
  });

  function closePreview() {
    if (closing || !dialog.open) return;
    closing = true;
    clearTimeout(tapTimer);
    pointers.clear();
    gesture = tap = lastTap = undefined;
    view.classList.remove('is-dragging');
    dialog.classList.add('is-closing');
    const finish = () => {
      dialog.close();
      dialog.classList.remove('is-closing');
      animation?.cancel();
      source.classList.remove('poster-preview-origin');
      source.focus({ preventScroll: true });
      closing = false;
    };
    const exit = animateFromSource(true);
    if (exit) exit.finished.then(finish, finish);
    else finish();
  }

  function pointerPosition() {
    const [a, b = a] = [...pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
  }

  function startGesture() {
    gesture = pointers.size ? { ...pointerPosition(), scale, xOffset: x, yOffset: y } : undefined;
    view.classList.toggle('is-dragging', pointers.size > 0 && scale > 1);
  }

  view.addEventListener('pointerdown', event => {
    if (closing || event.button !== 0) return;
    view.classList.remove('is-keyboard');
    animation?.cancel();
    clearTimeout(tapTimer);
    const point = { x: event.clientX, y: event.clientY };
    pointers.set(event.pointerId, point);
    view.setPointerCapture(event.pointerId);
    if (pointers.size === 1) {
      tap = { ...point, time: Date.now(), background: event.target === view };
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
    if (Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 6) {
      moved = true;
      lastTap = undefined;
    }
    const point = pointerPosition(), origin = center(base);
    scale = Math.max(1, Math.min(8, gesture.scale * (gesture.distance > 0 ? point.distance / gesture.distance : 1)));
    const ratio = scale / gesture.scale;
    x = point.x - origin.x - (gesture.x - origin.x - gesture.xOffset) * ratio;
    y = point.y - origin.y - (gesture.y - origin.y - gesture.yOffset) * ratio;
    render();
  });

  function finishPointer(event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    startGesture();
    if (event.type !== 'pointerup' || moved || pointers.size || Date.now() - tap.time > 300) return;
    const point = { x: event.clientX, y: event.clientY };
    if (tap.background) closePreview();
    else if (lastTap && Date.now() - lastTap.time < 300 && Math.hypot(point.x - lastTap.x, point.y - lastTap.y) < 24) {
      lastTap = undefined;
      zoomAt(scale > 1 ? 1 : 2.5, point);
    } else {
      lastTap = { ...point, time: Date.now() };
      tapTimer = setTimeout(closePreview, 300);
    }
  }
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) view.addEventListener(type, finishPointer);

  view.addEventListener('wheel', event => {
    event.preventDefault();
    if (closing || pointers.size) return;
    view.classList.remove('is-keyboard');
    clearTimeout(tapTimer);
    lastTap = undefined;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? area.height : 1);
    zoomAt(scale * Math.exp(-delta * (event.ctrlKey ? .01 : .002)), { x: event.clientX, y: event.clientY });
  }, { passive: false });

  view.addEventListener('keydown', event => {
    if (closing || event.metaKey || event.ctrlKey || event.altKey) return;
    view.classList.add('is-keyboard');
    if (event.key === '+' || event.key === '=') zoomAt(scale * 1.25);
    else if (event.key === '-') zoomAt(scale / 1.25);
    else if (event.key === '0' || event.key === 'Home') reset();
    else if (event.key === 'Enter' || event.key === ' ') closePreview();
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      animation?.cancel();
      x += event.key === 'ArrowLeft' ? 60 : event.key === 'ArrowRight' ? -60 : 0;
      y += event.key === 'ArrowUp' ? 60 : event.key === 'ArrowDown' ? -60 : 0;
      render();
    } else return;
    clearTimeout(tapTimer);
    lastTap = undefined;
    event.preventDefault();
  });
  view.addEventListener('click', event => {
    if (event.detail === 0) closePreview();
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closePreview();
  });
  window.addEventListener('resize', () => {
    if (!dialog.open || closing) return;
    clearTimeout(tapTimer);
    pointers.clear();
    gesture = tap = lastTap = undefined;
    view.classList.remove('is-dragging');
    reset();
  });
})();
