'use client';

/**
 * Shared GSAP tokens and timeline factories.
 *
 * All ScrollTrigger configuration lives here so components stay declarative
 * and the motion language stays consistent: slow, eased, never bouncy.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Register plugins exactly once, and only in the browser. */
export function registerGsap() {
  if (registered || typeof window === 'undefined') return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

/** Easing tokens. `cinematic` mirrors --ease-cinematic in globals.css. */
export const EASE = {
  cinematic: 'expo.out',
  soft: 'power2.out',
  glide: 'power3.inOut',
};

/** Duration tokens, in seconds. */
export const DUR = {
  fast: 0.4,
  base: 0.9,
  slow: 1.4,
  ambient: 2.2,
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Orchestrated hero entrance: backdrop → plate → text → controls.
 *
 * Under reduced motion this collapses to a single instant reveal of everything
 * at once — no tween, so nothing can be stranded mid-fade.
 *
 * @param {Object} refs - each value is an element or array of elements
 * @returns {gsap.core.Timeline}
 */
export function heroTimeline({ backdrop, plate, lines, controls, chrome }, { reduced = false } = {}) {
  const g = registerGsap();
  const targets = [backdrop, plate, lines, controls, chrome].filter(Boolean);

  if (reduced) {
    // Deliberately a set(), not a tween. A tween here would drive opacity from
    // 0, and anything that stops rAF before it finishes — a backgrounded tab on
    // load, a throttled frame budget — would strand the hero invisible. Under
    // reduced motion the content is simply present.
    return g.timeline().set(targets, { opacity: 1, y: 0, scale: 1 });
  }

  const tl = g.timeline({ defaults: { ease: EASE.cinematic } });

  tl.fromTo(
    backdrop,
    { opacity: 0, scale: 1.14 },
    { opacity: 1, scale: 1, duration: DUR.ambient },
    0
  )
    .fromTo(
      plate,
      { opacity: 0, scale: 1.06, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: DUR.slow },
      0.35
    )
    .fromTo(
      lines,
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: DUR.base, stagger: 0.11 },
      0.75
    )
    .fromTo(
      controls,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DUR.base, stagger: 0.08 },
      1.25
    )
    .fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: DUR.slow }, 1.5);

  return tl;
}

/**
 * Slow staggered scroll reveal for a section's children.
 *
 * @param {HTMLElement} root - the section element
 * @param {Object} [opts]
 * @param {string} [opts.selector] - children to stagger; defaults to [data-reveal]
 * @returns {Function} cleanup
 */
export function revealSection(root, { selector = '[data-reveal]', stagger = 0.09 } = {}) {
  if (!root) return () => {};

  const items = Array.from(root.querySelectorAll(selector));
  if (!items.length) return () => {};

  // Reduced motion: just make everything visible. No trigger, no transform.
  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.remove('u-reveal-pending'));
    return () => {};
  }

  const g = registerGsap();

  const ctx = g.context(() => {
    g.set(items, { opacity: 0, y: 26 });
    items.forEach((el) => el.classList.remove('u-reveal-pending'));

    g.to(items, {
      opacity: 1,
      y: 0,
      duration: DUR.base,
      ease: EASE.cinematic,
      stagger,
      scrollTrigger: {
        trigger: root,
        start: 'top 78%',
        once: true,
      },
    });
  }, root);

  return () => ctx.revert();
}

/**
 * Smooth-scrolls to a section id, honouring reduced motion.
 * Used by the scroll indicator, the nav rail, and the hero's "View work".
 */
export function scrollToSection(id) {
  if (typeof document === 'undefined') return;
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}
