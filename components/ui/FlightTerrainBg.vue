<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
/*
 * Low-altitude flight over a wireframe contour map.
 * Terrain height, grid and contour lines are all computed in the shader, so the
 * CPU only updates a few uniforms per frame. Scroll raises altitude (matches the
 * ALTITUDE readout in the top bar), the pointer banks the camera, and NVG mode
 * switches the palette to phosphor green.
 */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useThemeStore } from '~/composables/useThemeStore';

const canvasRef = ref(null);
const { isDarkMode, isLightMode } = useThemeStore();

const PALETTES = {
  day: { grid: '#10b981', contour: '#0ea5e9', stars: '#cbd5e1' },
  nvg: { grid: '#4ade80', contour: '#22c55e', stars: '#bbf7d0' },
  // Daylight: faint grey lines on white, no stars
  light: { grid: '#a1a1aa', contour: '#cbd5e1', stars: '#0f172a', starOpacity: 0, strength: 0.35 },
};

const VERT = /* glsl */ `
  uniform float uOffset;
  varying vec2 vWorld;
  varying float vHeight;
  varying float vDepth;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
  // Canyon: flat-ish valley along the flight path, ridges rising either side
  float terrain(vec2 s) {
    float ridge = smoothstep(5.0, 38.0, abs(s.x));
    return fbm(s * 0.03) * 22.0 * ridge + fbm(s * 0.11) * 1.4 - 2.0;
  }

  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vec2 s = vec2(w.x, w.z - uOffset);
    float h = terrain(s);
    w.y += h;
    vWorld = s;
    vHeight = h;
    vec4 mv = viewMatrix * w;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uGrid;
  uniform vec3 uContour;
  uniform float uTime;
  uniform float uFar;
  uniform float uStrength;
  varying vec2 vWorld;
  varying float vHeight;
  varying float vDepth;

  // Anti-aliased line mask for a repeating coordinate
  float lines(vec2 coord) {
    vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }
  float line1(float coord) {
    float g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - min(g, 1.0);
  }

  void main() {
    float grid = lines(vWorld / 4.0);
    float contour = line1(vHeight / 1.6);
    // Radar sweep band rolling out to the horizon
    float sweepPos = mod(uTime * 26.0, uFar * 1.2);
    float sweep = smoothstep(6.0, 0.0, abs(vDepth - sweepPos)) * 0.6;
    float fade = 1.0 - smoothstep(uFar * 0.35, uFar, vDepth);
    float near = smoothstep(2.0, 14.0, vDepth); // keep the closest lines from strobing

    vec3 col = uGrid * grid * 0.5 + uContour * contour * 0.55 + uGrid * sweep;
    float a = (grid * 0.5 + contour * 0.55 + sweep * (grid + contour + 0.15)) * fade * near;
    gl_FragColor = vec4(col, a * uStrength); // stay behind the content, not over it
  }
`;

let cleanup = () => {};

onMounted(async () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const small = window.innerWidth < 768;

  let THREE;
  try {
    THREE = await import('three');
  } catch {
    return; // background is decorative; the CSS background remains
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    return; // no WebGL
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const FAR = 200;
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, FAR * 1.5);

  // Terrain
  const seg = small ? 90 : 160;
  const geo = new THREE.PlaneGeometry(260, FAR + 20, seg, seg);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, -FAR / 2 + 10);
  const uniforms = {
    uOffset: { value: 0 },
    uTime: { value: 0 },
    uFar: { value: FAR },
    uStrength: { value: 0.75 },
    uGrid: { value: new THREE.Color() },
    uContour: { value: new THREE.Color() },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(geo, mat));

  // Sparse starfield above the horizon
  const STAR_COUNT = small ? 250 : 500;
  const starPos = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 600;
    starPos[i * 3 + 1] = 15 + Math.random() * 160;
    starPos[i * 3 + 2] = -FAR - Math.random() * 100;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.55, depthWrite: false });
  scene.add(new THREE.Points(starGeo, starMat));

  const applyPalette = () => {
    const p = isDarkMode.value ? PALETTES.nvg : isLightMode.value ? PALETTES.light : PALETTES.day;
    uniforms.uGrid.value.set(p.grid);
    uniforms.uContour.value.set(p.contour);
    starMat.color.set(p.stars);
    starMat.opacity = p.starOpacity ?? 0.55;
    // Lines glow on dark backgrounds but read as ink on paper, so light mode is fainter
    uniforms.uStrength.value = p.strength ?? 0.75;
  };
  applyPalette();
  const stopWatch = watch([isDarkMode, isLightMode], () => {
    applyPalette();
    if (!running) renderer.render(scene, camera);
  });

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };

  // Flight state (lerped toward targets for smooth, physical motion)
  let scrollP = 0;
  let pointerX = 0;
  let alt = 6;
  let bank = 0;
  let sway = 0;
  let lastScrollY = window.scrollY;
  let boost = 0;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollP = max > 0 ? window.scrollY / max : 0;
    boost = Math.min(boost + Math.abs(window.scrollY - lastScrollY) * 0.02, 3);
    lastScrollY = window.scrollY;
  };
  const onPointer = (e) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
  };

  const placeCamera = () => {
    camera.position.set(sway, alt, 6);
    camera.rotation.set(-0.12 - scrollP * 0.18, 0, bank);
  };

  let raf = null;
  let running = false;
  let last = performance.now();

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const k = 1 - Math.exp(-dt * 2.5); // frame-rate independent smoothing

    alt += (6 + scrollP * 16 - alt) * k;
    sway += (pointerX * 4 - sway) * k;
    bank += (-pointerX * 0.06 - bank) * k;
    boost *= Math.exp(-dt * 1.5);

    uniforms.uOffset.value += dt * (9 + boost * 6);
    uniforms.uTime.value += dt;
    placeCamera();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || reduceMotion || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  };
  const onVisibility = () => (document.hidden ? stop() : start());

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  onScroll();
  alt = 6 + scrollP * 16;
  placeCamera();
  resize();
  if (reduceMotion) renderer.render(scene, camera); // single still frame
  start();

  cleanup = () => {
    stop();
    stopWatch();
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    geo.dispose();
    mat.dispose();
    starGeo.dispose();
    starMat.dispose();
    renderer.dispose();
  };
});

onBeforeUnmount(() => cleanup());
</script>
