import { Instrument_Serif, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { profile } from '@/lib/content';
import { themeInitScript, THEME_COLOR } from '@/lib/theme';
import ThemeToggle from '@/components/ui/ThemeToggle';
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

const SITE_URL = 'https://engineer-faizan-yousaf.vercel.app';
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
  // Dark is the served default; ThemeToggle rewrites this meta tag when the
  // reader switches, so the phone's browser chrome tracks the page.
  themeColor: THEME_COLOR.dark,
  colorScheme: 'dark light',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // Dark is what the server renders. The script below corrects it during
      // parsing when the reader has chosen otherwise, which is a deliberate
      // server/client difference rather than a bug.
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable}`}
    >
      <head>
        {/* Must stay inline and in <head>: it runs while the HTML is being
            parsed, so the right theme is in place before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeToggle />
        {children}
        {/* Vercel Web Analytics and Speed Insights. Both render nothing; they
            inject their scripts and report per route — pageviews for the
            first, real-user Core Web Vitals for the second. Both are no-ops
            outside a Vercel deployment. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
