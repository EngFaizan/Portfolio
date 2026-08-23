'use client';

import { scrollToSection } from '@/lib/animations';
import styles from './ScrollIndicator.module.css';

/**
 * Bottom-centre scroll cue: a vertical line with a pulse travelling down it.
 * Clicking scrolls smoothly to the next section.
 */
export default function ScrollIndicator({ targetId = 'about' }) {
  return (
    <button
      type="button"
      className={styles.indicator}
      onClick={() => scrollToSection(targetId)}
      aria-label="Scroll to the next section"
    >
      <span className={styles.label}>Scroll</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.pulse} />
      </span>
    </button>
  );
}
