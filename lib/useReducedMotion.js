'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * The JS-side motion gate. Three.js and the GSAP timelines both check this.
 *
 * Starts `null` so the first client render matches the server render — callers
 * treat `null` as "not decided yet" and hold off mounting anything expensive
 * until after hydration.
 *
 * @returns {boolean|null}
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const onChange = (event) => setReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * True once the browser has painted at least once.
 * Used to lazy-mount the Three.js canvas so it never competes with LCP.
 */
export function useAfterPaint() {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    let raf2 = 0;
    // Two frames: one to finish this commit, one to let the browser actually paint.
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPainted(true));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return painted;
}
