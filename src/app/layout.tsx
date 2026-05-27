import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// ========================================
// Font System — Google Fonts with CSS variable binding
// ========================================

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-family',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif-family',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-family',
  display: 'swap',
  weight: ['400', '500'],
});

// ========================================
// Constants
// ========================================

const BASE_URL = 'https://portfolio-ayan-kumar.vercel.app';
const FULL_NAME = 'Ayan Kumar';
const TITLE = `${FULL_NAME} — Full Stack Developer & AI/ML Enthusiast`;
const DESCRIPTION =
  'Portfolio of Ayan Kumar — Full Stack Developer and AI/ML enthusiast building production-grade web apps, CLI tooling, and LLM-powered systems. Proficient in TypeScript, Next.js, Node.js, and Python with hands-on experience in RAG pipelines and vector databases.';

// ========================================
// SEO Metadata (canonical, OG, Twitter, social)
// ========================================

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Full Stack Developer',
    'AI Engineer',
    'Machine Learning',
    'Next.js Developer',
    'TypeScript',
    'RAG Pipeline',
    'LLM',
    'Open Source',
    'Ayan Kumar',
    'Portfolio',
  ],
  authors: [{ name: FULL_NAME, url: BASE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // Canonical URL
  alternates: {
    canonical: BASE_URL,
  },

  // Open Graph — social share card
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: `${FULL_NAME} — Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Full Stack Developer & AI/ML Enthusiast`,
        type: 'image/png',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    site: '@ayan_kumar_',
    creator: '@ayan_kumar_',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },

  // LinkedIn, Discord, etc. pick up OG tags automatically — no extra tags needed.

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification placeholders — add tokens from Search Console / Bing when ready
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  //   yandex: 'YOUR_YANDEX_TOKEN',
  // },

  // PWA manifest
  manifest: '/manifest.json',
};

// ========================================
// JSON-LD Structured Data
// ========================================

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: FULL_NAME,
  url: BASE_URL,
  email: 'ayan.1236176@gmail.com',
  jobTitle: 'Full Stack Developer & AI/ML Enthusiast',
  description: DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Patiala',
    addressRegion: 'Punjab',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/in/ayan-kumar-',
    'https://github.com/kumar-ayan',
    BASE_URL,
  ],
  knowsAbout: [
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'RAG Pipelines',
    'LLMs',
    'Full Stack Development',
    'Machine Learning',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Punjabi University, Patiala',
    url: 'https://punjabiuniversity.ac.in',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${FULL_NAME} — Portfolio`,
  url: BASE_URL,
  description: DESCRIPTION,
  author: { '@type': 'Person', name: FULL_NAME },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${BASE_URL}/#projects` },
    { '@type': 'ListItem', position: 3, name: 'Experience', item: `${BASE_URL}/#experience` },
    { '@type': 'ListItem', position: 4, name: 'Contact', item: `${BASE_URL}/#contact` },
  ],
};

// ========================================
// Root Layout
// ========================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="grain-overlay">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
        {/* Service Worker registration */}
        <Script id="sw-register" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
              navigator.serviceWorker.register('/sw.js').catch(function (err) {
                console.warn('SW registration failed:', err);
              });
            });
          }
        `}</Script>
      </body>
    </html>
  );
}
