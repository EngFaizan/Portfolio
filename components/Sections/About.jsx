import Section from '@/components/ui/Section';
import { about } from '@/lib/content';
import styles from './About.module.css';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="What I build, and how.">
      <div className={styles.prose}>
        {about.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={`${styles.paragraph} ${i === 0 ? styles.lead : ''} u-reveal-pending`}
            data-reveal
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
