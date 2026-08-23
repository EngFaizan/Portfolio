'use client';

import { useLayoutEffect, useState } from 'react';
import { readStoredTheme, applyTheme, DEFAULT_THEME } from '@/lib/theme';
import styles from './ThemeToggle.module.css';

/**
 * Fixed top-right, above every other layer, and never hidden — the reader can
 * switch from anywhere on the page. (The wordmark opposite it does retreat on
 * mobile while scrolling down; this deliberately does not.)
 *
 * The icon itself is swapped in CSS off `:root[data-theme]`, not from React
 * state, so it is already correct in the very first painted frame — the
 * inline <head> script has set the attribute by then. React state here exists
 * only to label the control for assistive tech.
 */
export default function ThemeToggle() {
  // Same value on server and client, so there is no hydration mismatch to
  // suppress. The layout effect below corrects it before the browser paints.
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useLayoutEffect(() => {
    const stored = readStoredTheme();
    setTheme(stored);
    // Strict Mode's development remount resets <html> to the attributes React
    // manages from JSX, wiping the one the inline script set. Re-applying here
    // restores it before paint; in production this is a harmless no-op.
    applyTheme(stored);
  }, []);

  const isDark = theme === 'dark';

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={styles.icons} aria-hidden="true">
        {/* Both are always rendered and cross-faded; only one is visible. */}
        <svg
          className={styles.sun}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.3M12 19.3v2.3M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.4 12h2.3M19.3 12h2.3M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>

        <svg
          className={styles.moon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.2 14.4A8.4 8.4 0 0 1 9.6 3.8a8.4 8.4 0 1 0 10.6 10.6Z" />
        </svg>
      </span>
    </button>
  );
}
