import Section from '@/components/ui/Section';
import GlassButton from '@/components/ui/GlassButton';
import { contact, resumeFile, profile } from '@/lib/content';
import styles from './Contact.module.css';

const isExternal = (href) => href.startsWith('http');

export default function Contact() {
  // Keep content.js the only place the address is written down.
  const email = contact.channels.find((c) => c.label === 'Email');

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something.">
      <p className={`${styles.intro} u-reveal-pending`} data-reveal>
        {contact.intro}
      </p>

      <ul className={styles.channels}>
        {contact.channels.map((channel) => (
          <li
            key={channel.label}
            className={`${styles.channel} u-reveal-pending`}
            data-reveal
          >
            <a
              className={styles.link}
              href={channel.href}
              {...(isExternal(channel.href)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <span className={styles.label}>{channel.label}</span>
              <span className={styles.value}>{channel.value}</span>
              <span className={styles.rule} aria-hidden="true" />
              {isExternal(channel.href) && (
                <span className="u-visually-hidden"> (opens in a new tab)</span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className={`${styles.cta} u-reveal-pending`} data-reveal>
        {email && (
          <GlassButton variant="primary" href={email.href}>
            Send an email
          </GlassButton>
        )}
        <GlassButton href={resumeFile} download>
          Download resume
        </GlassButton>
      </div>

      <footer className={`${styles.footer} u-reveal-pending`} data-reveal>
        <span>{profile.fullName}</span>
        <span className={styles.year}>&copy; {new Date().getFullYear()}</span>
      </footer>
    </Section>
  );
}
