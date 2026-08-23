'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Ambient bokeh field on a transparent canvas — above the avatar plate, below
 * the text. Warm ember and soft bone particles, additive, very defocused.
 *
 * Self-contained: builds its own sprite texture, owns its rAF loop, and
 * disposes every geometry, material, texture and the renderer on unmount.
 *
 * It is the caller's job not to mount this under `prefers-reduced-motion`.
 */

const COUNT_DESKTOP = 90;
const COUNT_MOBILE = 40;
const FIELD_DEPTH = 16;

/** A soft radial gradient drawn once to an offscreen canvas. No asset needed. */
function createSpriteTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(0.55, 'rgba(255,255,255,0.14)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function CinematicLayer({ className = '' }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Bail out cleanly if WebGL is unavailable rather than throwing.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 10;

    // --- Particles --------------------------------------------------------
    // Depth is the organising idea: near particles are large and blown out,
    // far ones are small and sharp. Size attenuation does the rest.
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    // Per-particle drift parameters, kept out of the render loop's hot path.
    const phases = new Float32Array(count * 2);
    const speeds = new Float32Array(count * 2);
    const amplitudes = new Float32Array(count * 2);

    const ember = new THREE.Color(0xff8a3d);
    const bone = new THREE.Color(0xefe9e1);
    const tint = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const z = -Math.random() * FIELD_DEPTH;
      // Spread wider the further back, so the field fills the frustum evenly.
      const spread = 9 + (-z / FIELD_DEPTH) * 12;

      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.75;
      positions[i * 3 + 2] = z;

      // Mostly ember, a minority of cool bone highlights.
      tint.copy(Math.random() < 0.68 ? ember : bone);
      // Vary luminance so they do not read as one flat colour.
      tint.multiplyScalar(0.55 + Math.random() * 0.45);
      colors[i * 3] = tint.r;
      colors[i * 3 + 1] = tint.g;
      colors[i * 3 + 2] = tint.b;

      // Near particles get big; far ones stay small.
      const nearness = 1 - -z / FIELD_DEPTH;
      scales[i] = 0.25 + nearness * nearness * 1.5 + Math.random() * 0.3;

      phases[i * 2] = Math.random() * Math.PI * 2;
      phases[i * 2 + 1] = Math.random() * Math.PI * 2;
      speeds[i * 2] = 0.06 + Math.random() * 0.1;
      speeds[i * 2 + 1] = 0.05 + Math.random() * 0.09;
      amplitudes[i * 2] = 0.25 + Math.random() * 0.5;
      amplitudes[i * 2 + 1] = 0.2 + Math.random() * 0.45;
    }

    // Keep the untouched origins; drift is applied as an offset each frame so
    // error cannot accumulate.
    const origins = positions.slice();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const sprite = createSpriteTexture();

    const material = new THREE.PointsMaterial({
      size: 1,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    // PointsMaterial has no per-point size, so patch one in. This keeps the
    // built-in material's texture/fog/tonemapping handling intact.
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aScale;')
        .replace('gl_PointSize = size;', 'gl_PointSize = size * aScale;');
    };

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const positionAttr = geometry.getAttribute('position');

    // --- Sizing -----------------------------------------------------------
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // --- Mouse parallax ---------------------------------------------------
    // Refs only. Nothing here touches React state.
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- Loop -------------------------------------------------------------
    let frame = 0;
    let running = false;
    let onScreen = true;

    // Hand-rolled clock rather than THREE.Clock: `Clock` is deprecated, and its
    // `start()` zeroes elapsedTime, which would snap every particle back to its
    // starting phase each time the hero scrolled into view. Accumulating only
    // while running means a pause is invisible — the field resumes mid-drift.
    let elapsed = 0;
    let lastStamp = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const now = performance.now();
      elapsed += (now - lastStamp) / 1000;
      lastStamp = now;
      const t = elapsed;

      for (let i = 0; i < count; i += 1) {
        const ix = i * 3;
        const ip = i * 2;
        // Sine-driven only — smooth, no jitter, fully deterministic.
        positionAttr.array[ix] =
          origins[ix] + Math.sin(t * speeds[ip] + phases[ip]) * amplitudes[ip];
        positionAttr.array[ix + 1] =
          origins[ix + 1] + Math.cos(t * speeds[ip + 1] + phases[ip + 1]) * amplitudes[ip + 1];
      }
      positionAttr.needsUpdate = true;

      // Damped camera drift — eases toward the pointer rather than snapping.
      eased.x += (pointer.x * 0.55 - eased.x) * 0.025;
      eased.y += (pointer.y * 0.35 - eased.y) * 0.025;
      camera.position.x = eased.x;
      camera.position.y = -eased.y;
      camera.lookAt(0, 0, -FIELD_DEPTH * 0.4);

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      // Swallow the gap so particles resume exactly where they left off.
      lastStamp = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    /** Only run while on screen AND the tab is visible. */
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(host);

    document.addEventListener('visibilitychange', sync);
    sync();

    // --- Teardown ---------------------------------------------------------
    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onPointerMove);

      scene.remove(points);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
