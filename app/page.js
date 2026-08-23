import Hero from '@/components/Hero/Hero';
import Nav from '@/components/ui/Nav';
import About from '@/components/Sections/About';
import Skills from '@/components/Sections/Skills';
import Experience from '@/components/Sections/Experience';
import Projects from '@/components/Sections/Projects';
import Education from '@/components/Sections/Education';
import Contact from '@/components/Sections/Contact';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <a href="#about" className={styles.skip}>
        Skip to content
      </a>

      <Nav />

      {/* The signature element: the two practical lights from the avatar's room
          do not stop at the edge of the image. They sit fixed behind every
          section below the hero, so scrolling never leaves the room. */}
      <div className={styles.roomLight} aria-hidden="true">
        <span className={styles.lamp} />
        <span className={styles.screens} />
      </div>

      <main>
        <Hero />

        <div className={styles.below}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </div>
      </main>
    </>
  );
}
