import Section from '@/components/ui/Section';
import { projects } from '@/lib/content';
import styles from './Projects.module.css';

/**
 * Editorial rows rather than cards: a left rail carrying name/org/dates, and a
 * right column carrying the description, evidence, and tech.
 *
 * Only two of the six have public links — the four Kwick platforms are
 * internal, so those rows simply carry no link chip.
 */
export default function Projects() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I have shipped." wide>
      <ol className={styles.list}>
        {projects.map((project) => (
          <li
            key={project.name}
            className={`${styles.row} u-reveal-pending`}
            data-reveal
          >
            <div className={styles.rail}>
              <h3 className={styles.name}>{project.name}</h3>
              {project.subtitle && (
                <p className={styles.subtitle}>{project.subtitle}</p>
              )}
              <p className={styles.org}>{project.org}</p>
              <p className={styles.period}>{project.period}</p>

              {project.link && (
                <a
                  className={styles.link}
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link.label}
                  <span className={styles.arrow} aria-hidden="true">
                    &#8599;
                  </span>
                  <span className="u-visually-hidden">
                    {` — ${project.name} (opens in a new tab)`}
                  </span>
                </a>
              )}
            </div>

            <div className={styles.detail}>
              <p className={styles.description}>{project.description}</p>

              <ul className={styles.bullets}>
                {project.bullets.map((bullet, i) => (
                  <li key={i} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>

              <ul className={styles.tech} aria-label={`${project.name} technologies`}>
                {project.tech.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
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
