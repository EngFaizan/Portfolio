import Section from '@/components/ui/Section';
import { education, certifications } from '@/lib/content';
import styles from './Education.module.css';

/**
 * Education and certifications kept together as one quiet section — both are
 * real resume content, and neither warrants a section of its own.
 */
export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Training and credentials.">
      <div className={styles.grid}>
        <div className={`${styles.degree} u-reveal-pending`} data-reveal>
          <h3 className={styles.degreeName}>{education.degree}</h3>
          <p className={styles.institution}>{education.institution}</p>
          <p className={styles.meta}>
            <span>{education.location}</span>
            <span className={styles.sep} aria-hidden="true" />
            <span>{education.year}</span>
            <span className={styles.sep} aria-hidden="true" />
            <span>CGPA {education.cgpa}</span>
          </p>
          <p className={styles.note}>{education.note}</p>
        </div>

        <div className={styles.certs}>
          <h3 className={`${styles.certsTitle} u-reveal-pending`} data-reveal>
            Certifications
          </h3>

          <ul className={styles.certList}>
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className={`${styles.cert} u-reveal-pending`}
                data-reveal
              >
                <p className={styles.certName}>{cert.name}</p>
                <p className={styles.certMeta}>
                  <span className={styles.issuer}>{cert.issuer}</span>
                  <span className={styles.sep} aria-hidden="true" />
                  <span>{cert.year}</span>
                </p>
                {cert.note && <p className={styles.certNote}>{cert.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
