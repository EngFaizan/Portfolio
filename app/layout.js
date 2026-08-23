import { Instrument_Serif, Inter } from 'next/font/google';
import { profile } from '@/lib/content';
import '@/styles/globals.css';

/** Display face — the stacked name and section titles. Used with restraint. */
const display = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

/** Body face — everything else. */
const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const SITE_URL = 'https://faizan-yousaf.vercel.app';
const description = profile.summary;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.fullName} — ${profile.role}`,
    template: `%s — ${profile.fullName}`,
  },
  description,
  keywords: [
    'Faizan Yousaf',
    'Software Engineer',
    'Full-Stack Developer',
    'MERN',
    'React',
    'Node.js',
    'Flutter',
    'Islamabad',
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: profile.fullName,
    title: `${profile.fullName} — ${profile.role}`,
    description,
    images: [
      {
        url: '/avatar.jpg',
        width: 768,
        height: 1376,
        alt: `${profile.fullName} at his desk`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.fullName} — ${profile.role}`,
    description,
    images: ['/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#0a0c0f',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
