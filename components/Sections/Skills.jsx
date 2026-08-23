import Section from '@/components/ui/Section';
import { skills } from '@/lib/content';
import styles from './Skills.module.css';

/**
 * Deliberately quiet: grouped lists, no percentage bars, no invented
 * proficiency ratings. The resume states what he works with, not how well.
 */
export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="The toolkit.">
      <ul className={styles.groups}>
        {skills.map((group) => (
          <li key={group.category} className="u-reveal-pending" data-reveal>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
