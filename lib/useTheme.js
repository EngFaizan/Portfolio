'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_THEME } from './theme';

/**
 * The current theme, read off `data-theme` rather than held in React state.
 *
 * The attribute is the source of truth — the inline <head> script sets it
 * before React exists, and the toggle writes to it directly. Observing the
 * attribute means anything that changes it is picked up, without a context
 * provider threaded through the tree for one boolean.
 *
 * Starts at DEFAULT_THEME on both server and client so the first render
 * matches the server HTML; the effect corrects it immediately after mount.
 * Only JS that genuinely cannot be done in CSS needs this — everything else
 * should style off `:root[data-theme='light']` and never re-render at all.
 */
export function useTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    read();

    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
