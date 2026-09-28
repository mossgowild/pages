import {
  AmbientLight, DirectionalLight, Group, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Scene, TorusGeometry, WebGLRenderer
} from 'three';

export function posterPosition(index, active, count) {
  const offset = (index - active + count) % count;
  if (offset === 0) return 'center';
  if (offset === 1) return 'right';
  if (offset === count - 1) return 'left';
  return 'offstage';
}

export function initHero(root, makeScene = createScene) {
  const stage = root.querySelector('.hero-stage');
  const posters = [...root.querySelectorAll('.hero-poster')];
  const details = [...root.querySelectorAll('.hero-detail')];
  const controls = root.querySelector('.hero-controls');
  const counter = root.querySelector('.hero-counter');
  const status = root.querySelector('.hero-status');
  const autoplayButton = root.querySelector('.hero-autoplay');
  const page = root.ownerDocument;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let active = 1;
  let scene;
  let autoplay = !reducedMotion.matches;
  let hovered = false;
  let focused = false;
  let timer;

  function updatePlayback() {
    clearTimeout(timer);
    const playing = autoplay && !hovered && !focused && !page.hidden;
    autoplayButton.dataset.playing = String(autoplay);
    autoplayButton.setAttribute('aria-label', autoplay ? '暂停自动轮播' : '继续自动轮播');
    status.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing) timer = setTimeout(() => select(active + 1, false), 3000);
  }

  function select(index, announce = true) {
    active = (index + posters.length) % posters.length;
    posters.forEach((poster, i) => {
      poster.dataset.position = posterPosition(i, active, posters.length);
      poster.hidden = poster.dataset.position === 'offstage';
      poster.tabIndex = i === active ? 0 : -1;
      details[i].hidden = i !== active;
    });
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(posters.length).padStart(2, '0')}`;
    if (announce) status.textContent = `${active + 1} / ${posters.length} · ${details[active].querySelector('h3').textContent}`;
    updatePlayback();
  }

  posters.forEach((poster, index) => {
    poster.addEventListener('click', event => {
      if (active !== index) {
        event.preventDefault();
        select(index);
      }
    });
    poster.addEventListener('focus', () => {
      if (poster.matches(':focus-visible')) select(index);
    });
  });
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-step]');
    if (button) select(active + Number(button.dataset.step));
  });
  root.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    if (!event.target.closest('.hero-poster, .hero-controls')) return;
    event.preventDefault();
    select(active + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.closest('.hero-poster')) posters[active].focus({ preventScroll: true });
  });
  autoplayButton.addEventListener('click', () => {
    autoplay = !autoplay;
    if (autoplay) hovered = focused = false;
    updatePlayback();
  });
  root.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    hovered = true;
    updatePlayback();
  });
  root.addEventListener('pointerleave', () => {
    hovered = false;
    updatePlayback();
  });
  root.addEventListener('focusin', event => {
    if (event.target === autoplayButton) return;
    focused = true;
    updatePlayback();
  });
  root.addEventListener('focusout', event => {
    if (root.contains(event.relatedTarget)) return;
    focused = false;
    updatePlayback();
  });
  page.addEventListener('visibilitychange', updatePlayback);
  controls.hidden = false;
  select(active, false);

  function tilt(x, y) {
    stage.style.setProperty('--view-x', `${x * 3}deg`);
    stage.style.setProperty('--view-y', `${-y * 2}deg`);
    scene?.move(x, y);
  }
  stage.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !pointer.matches || event.pointerType !== 'mouse') return;
    const box = stage.getBoundingClientRect();
    tilt((event.clientX - box.left) / box.width * 2 - 1, (event.clientY - box.top) / box.height * 2 - 1);
  });
  stage.addEventListener('pointerleave', () => tilt(0, 0));
  reducedMotion.addEventListener('change', () => {
    tilt(0, 0);
    if (reducedMotion.matches) autoplay = false;
    updatePlayback();
  });
  scene = makeScene(stage);
}

function createScene(stage) {
  const canvas = stage.querySelector('canvas');
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    canvas.hidden = true;
    console.warn('Decorative 3D scene unavailable; event content remains accessible.', error);
    return;
  }
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 30);
  camera.position.set(0, 0.6, 10);
  camera.lookAt(0, 0, 0);
  const orbit = new Group();
  scene.add(orbit);
  const metal = new MeshStandardMaterial({ color: 0xc8bfce, metalness: 0.72, roughness: 0.26 });
  const ring = new Mesh(new TorusGeometry(3.7, 0.045, 12, 160), metal);
  ring.rotation.set(1.12, 0.12, -0.16);
  orbit.add(ring);
  const outer = new Mesh(new TorusGeometry(4.05, 0.012, 8, 160), metal);
  outer.rotation.set(1.25, -0.2, 0.13);
  orbit.add(outer);
  scene.add(new AmbientLight(0xd4ccdf, 1.2));
  for (const [color, strength, x, y, z] of [
    [0xffffff, 4, 0, 3, 5], [0xff269f, 8, -4, 0, 2], [0x13dbff, 8, 4, 1, 2]
  ]) {
    const light = new DirectionalLight(color, strength);
    light.position.set(x, y, z);
    scene.add(light);
  }

  let frame = 0;
  function requestRender() {
    if (frame || canvas.hidden || document.hidden) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      renderer.render(scene, camera);
    });
  }
  function resize() {
    const width = stage.clientWidth, height = stage.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 700 ? 16 : 10;
    camera.updateProjectionMatrix();
    requestRender();
  }
  new ResizeObserver(resize).observe(stage);
  document.addEventListener('visibilitychange', requestRender);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    canvas.hidden = true;
  });
  canvas.addEventListener('webglcontextrestored', () => {
    canvas.hidden = false;
    resize();
  });
  resize();
  return {
    move(x, y) {
      orbit.rotation.set(y * 0.07, x * 0.09, -x * 0.025);
      requestRender();
    }
  };
}

if (typeof document !== 'undefined') initHero(document.getElementById('spotlight'));
