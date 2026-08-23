import Section from '@/components/ui/Section';
import { experience } from '@/lib/content';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <ol className={styles.timeline}>
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}`}
            className={`${styles.entry} u-reveal-pending`}
            data-reveal
          >
            <span
              className={`${styles.node} ${job.current ? styles.nodeCurrent : ''}`}
              aria-hidden="true"
            />

            <div className={styles.body}>
              <div className={styles.head}>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.meta}>
                  <span className={styles.company}>{job.company}</span>
                  <span className={styles.sep} aria-hidden="true" />
                  <span>{job.location}</span>
                </p>
              </div>

              <p className={styles.period}>
                {job.period}
                {job.current && <span className={styles.badge}>Current</span>}
              </p>

              <ul className={styles.bullets}>
                {job.bullets.map((bullet, i) => (
                  <li key={i} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
