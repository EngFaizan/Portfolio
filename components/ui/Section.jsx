'use client';

import { useEffect, useRef } from 'react';
import { revealSection } from '@/lib/animations';
import styles from './Section.module.css';

/**
 * Shared shell for every section below the hero: consistent rhythm, a quiet
 * eyebrow + display title, and the staggered ScrollTrigger reveal.
 *
 * Children opt into the stagger with `data-reveal`. Pair it with the global
 * `u-reveal-pending` class so nothing flashes at full opacity before GSAP
 * takes over.
 */
export default function Section({ id, eyebrow, title, children, wide = false }) {
  const ref = useRef(null);

  useEffect(() => revealSection(ref.current), []);

  return (
    <section
      id={id}
      ref={ref}
      className={styles.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={`${styles.inner} ${wide ? styles.wide : ''}`}>
        <header className={styles.header}>
          <p className="u-eyebrow u-reveal-pending" data-reveal>
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className={`${styles.title} u-reveal-pending`}
            data-reveal
          >
            {title}
          </h2>
        </header>

        {children}
      </div>
    </section>
  );
}
