'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import avatarImg from '@/public/avatar.jpg';
import { profile, resumeFile } from '@/lib/content';
import { heroTimeline, scrollToSection } from '@/lib/animations';
import { useReducedMotion, useAfterPaint } from '@/lib/useReducedMotion';
import GlassButton from '@/components/ui/GlassButton';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import styles from './Hero.module.css';

// Three.js never reaches the server bundle, and never blocks first paint.
const CinematicLayer = dynamic(
  () => import('@/components/CinematicLayer/CinematicLayer'),
  { ssr: false }
);

/** Parallax depths, in px. Kept inside the spec's 8–15px ceiling. */
const DEPTH = {
  backdrop: 15,
  plate: 10,
  text: -6, // Opposite direction, so the text sits "in front".
};

export default function Hero() {
  const reduced = useReducedMotion();
  const painted = useAfterPaint();

  const sectionRef = useRef(null);
  const backdropRef = useRef(null);
  const plateRef = useRef(null);
  const plateInnerRef = useRef(null);
  const textRef = useRef(null);
  const linesRef = useRef([]);
  const controlsRef = useRef(null);
  const chromeRef = useRef(null);

  linesRef.current = [];
  const addLine = (el) => {
    if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
  };

  // --- Entrance -----------------------------------------------------------
  useEffect(() => {
    if (reduced === null) return; // Wait until the preference is known.

    const tl = heroTimeline(
      {
        backdrop: backdropRef.current,
        plate: plateInnerRef.current,
        lines: linesRef.current,
        controls: controlsRef.current,
        chrome: chromeRef.current,
      },
      { reduced }
    );

    return () => tl.kill();
  }, [reduced]);

  // --- 2.5D depth parallax ------------------------------------------------
  // Refs and rAF only — mouse movement never touches React state, so this
  // causes zero re-renders.
  useEffect(() => {
    if (reduced !== false) return;

    const layers = [
      [backdropRef.current, DEPTH.backdrop],
      [plateRef.current, DEPTH.plate],
      [textRef.current, DEPTH.text],
    ].filter(([el]) => el);

    if (!layers.length) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let idle = false;

    const tick = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Ease, then park the loop once the movement is imperceptible.
      current.x += dx * 0.045;
      current.y += dy * 0.045;

      layers.forEach(([el, depth]) => {
        el.style.transform = `translate3d(${(current.x * depth).toFixed(2)}px, ${(
          current.y * depth
        ).toFixed(2)}px, 0)`;
      });

      if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
        idle = true;
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!idle && frame) return;
      idle = false;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
      wake();
    };

    const onTilt = (event) => {
      if (event.gamma == null || event.beta == null) return;
      // gamma: left/right (-90..90), beta: front/back (-180..180).
      target.x = Math.max(-1, Math.min(1, event.gamma / 35));
      target.y = Math.max(-1, Math.min(1, (event.beta - 45) / 35));
      wake();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('deviceorientation', onTilt, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('deviceorientation', onTilt);
      if (frame) cancelAnimationFrame(frame);
      layers.forEach(([el]) => {
        el.style.transform = '';
      });
    };
  }, [reduced]);

  const showCinematicLayer = reduced === false && painted;

  return (
    <section className={styles.hero} ref={sectionRef} aria-label="Introduction">
      {/* 1 — Ambient backdrop: the same frame, blown up and defocused, so the
             room's colour bleeds past the edges of the plate. */}
      <div className={styles.backdropWrap} ref={backdropRef} aria-hidden="true">
        <div className={styles.backdrop}>
          <Image
            src={avatarImg}
            alt=""
            fill
            sizes="100vw"
            quality={35}
            priority
            className={styles.backdropImg}
          />
        </div>
      </div>

      {/* 2 — The avatar plate. Feathered so it dissolves into the page. */}
      <div className={styles.plateWrap} ref={plateRef}>
        <div className={styles.plate} ref={plateInnerRef}>
          <Image
            src={avatarImg}
            alt={`${profile.fullName}, ${profile.role}, at his desk — warm lamp to one side, code and dashboards on the monitors behind him.`}
            priority
            placeholder="blur"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 60vw, 46vw"
            className={styles.plateImg}
          />
          {/* 5 — Slow warm light sweep, once every ~12s. */}
          <span className={styles.sweep} aria-hidden="true" />
        </div>
      </div>

      {/* 3 — Vignette and scrim, so text stays readable over any part of the
             image no matter how the plate crops. */}
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      {/* 4 — Three.js bokeh: above the plate, below the text. */}
      {showCinematicLayer && <CinematicLayer className={styles.canvasLayer} />}

      {/* 6 — Fine film grain. */}
      <GrainOverlay />

      {/* 7 — Content. */}
      <div className={styles.contentWrap} ref={textRef}>
        <div className={styles.content}>
          <p className={styles.tagline} ref={addLine}>
            {profile.tagline}
          </p>

          <h1 className={styles.name}>
            <span className={styles.nameLine} ref={addLine}>
              {profile.firstName}
            </span>
            {/* The lines are block-level, so this space collapses visually but
                keeps the accessible name "Faizan Yousaf" rather than one word. */}
            {' '}
            <span className={styles.nameLine} ref={addLine}>
              {profile.lastName}
            </span>
          </h1>

          <p className={styles.role} ref={addLine}>
            {profile.role}
            <span className={styles.roleDivider} aria-hidden="true" />
            <span className={styles.roleSpec}>{profile.specialisation}</span>
          </p>

          <p className={styles.location} ref={addLine}>
            <span className={styles.pin} aria-hidden="true" />
            Based in {profile.location}
          </p>

          <div className={styles.controls} ref={controlsRef}>
            <GlassButton variant="primary" onClick={() => scrollToSection('work')}>
              View work
            </GlassButton>
            <GlassButton href={resumeFile} download>
              Download resume
            </GlassButton>
          </div>
        </div>
      </div>

      <div className={styles.chrome} ref={chromeRef}>
        <ScrollIndicator targetId="about" />
      </div>
    </section>
  );
}

/**
 * Film grain generated inline via feTurbulence — no image asset, no request.
 */
function GrainOverlay() {
  return (
    <svg className={styles.grain} aria-hidden="true" focusable="false">
      <filter id="hero-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}
