'use client';

import { useEffect, useState } from 'react';
import { scrollToSection, prefersReducedMotion } from '@/lib/animations';
import { sections, profile } from '@/lib/content';
import styles from './Nav.module.css';

/**
 * Minimal fixed chrome: a wordmark top-left and a right-side dot rail with an
 * active-section indicator. The rail is desktop-only; on mobile the page is
 * short enough to just scroll.
 *
 * Active section is tracked with IntersectionObserver rather than a scroll
 * listener — no per-frame work, no layout reads.
 */
export default function Nav() {
  const [active, setActive] = useState(null);
  const [markHidden, setMarkHidden] = useState(false);

  useEffect(() => {
    const order = new Map(sections.map(({ id }, i) => [id, i]));
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return;

    // A persistent view of what is inside the band. IntersectionObserver only
    // reports targets whose state CHANGED, so deriving the active section from
    // a single callback's `entries` would clear the rail every time one section
    // left the band while another was already sitting inside it.
    const inBand = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });

        if (!inBand.size) {
          // Over the hero, or in the gap between two sections.
          setActive(null);
          return;
        }

        // When two sections overlap the band, the later one has just been
        // scrolled into — that is the one the reader is arriving at.
        let winner = null;
        inBand.forEach((id) => {
          if (winner === null || order.get(id) > order.get(winner)) winner = id;
        });
        setActive(winner);
      },
      // A band across the upper-middle of the viewport: a section is "active"
      // once its top passes 55% and until it leaves the top 20%.
      { rootMargin: '-20% 0px -45% 0px', threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Mobile: get the wordmark out of the content's way ------------------
  // Below 768px the content column runs the full width of the screen and
  // passes directly under this mark. A scrim only occludes the text — the
  // eyebrow still reads as chopped. So the mark retreats while the reader is
  // going down and returns the moment they scroll back up, which is also when
  // "back to top" is the thing they actually want. CSS applies this only at
  // the mobile breakpoint; desktop keeps the mark permanently.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;

      // Near the top there is nothing to collide with, and nothing to go back
      // to. Ignore sub-pixel jitter and rubber-banding either side of that.
      if (y < 120) setMarkHidden(false);
      else if (delta > 2) setMarkHidden(true);
      else if (delta < -2) setMarkHidden(false);

      if (Math.abs(delta) > 2) last = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  return (
    <>
      <button
        type="button"
        className={styles.wordmark}
        onClick={toTop}
        data-hidden={markHidden ? 'true' : undefined}
      >
        <span className={styles.mark}>FY</span>
        <span className="u-visually-hidden">
          {profile.fullName} — back to top
        </span>
      </button>

      <nav className={styles.rail} aria-label="Section navigation">
        <ul className={styles.list}>
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`${styles.item} ${isActive ? styles.active : ''}`}
                  onClick={() => scrollToSection(id)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={styles.itemLabel}>{label}</span>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className="u-visually-hidden">Go to {label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
