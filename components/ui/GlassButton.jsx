'use client';

import styles from './GlassButton.module.css';

/**
 * Glassmorphism control: low-opacity fill, 1px light border, backdrop blur.
 * Hover is a slow warm-glow bloom — eased, never bouncy.
 *
 * Renders an <a> when `href` is passed, otherwise a <button>.
 */
export default function GlassButton({
  children,
  href,
  onClick,
  download = false,
  external = false,
  variant = 'default',
  className = '',
  ...rest
}) {
  const cls = [styles.button, variant === 'primary' && styles.primary, className]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(download ? { download: true } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
