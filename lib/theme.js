/**
 * Theme plumbing.
 *
 * Dark is the default and stays the default. It is the composition — the
 * avatar's room, the two practical lights, the whole reason the palette looks
 * the way it does — not a preference we inherited from the OS. Light is an
 * explicit choice the reader makes, and we remember it.
 *
 * That is a deliberate departure from the usual `prefers-color-scheme`
 * default. If you would rather honour the system setting on a first visit,
 * change DEFAULT_THEME and add a matchMedia check to themeInitScript.
 */

export const THEME_KEY = 'theme';
export const DEFAULT_THEME = 'dark';

/** Kept in step with --ink in styles/globals.css, for the mobile browser chrome. */
export const THEME_COLOR = {
  dark: '#0a0c0f',
  light: '#f5f1ea',
};

const isTheme = (value) => value === 'light' || value === 'dark';

/**
 * Runs synchronously in <head> while the browser is still parsing the HTML —
 * before the first paint, and long before React exists.
 *
 * Nothing later is early enough. useEffect runs after paint, so the wrong
 * theme is visible and then corrected. Even useLayoutEffect runs after
 * hydration, which on a slow connection is well after the server HTML has
 * already been painted.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)});if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

/** Storage can throw outright in private modes, not merely return null. */
export function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme) {
  const next = isTheme(theme) ? theme : DEFAULT_THEME;

  document.documentElement.setAttribute('data-theme', next);

  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private mode, or storage disabled. The theme still applies for this
    // page view; it just will not survive a reload.
  }

  // The <meta> is static, so update it here or the phone's browser chrome
  // stays the other theme's colour.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[next]);

  return next;
}
