import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
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
// SEO Metadata
// ========================================

export const metadata: Metadata = {
  title: 'Ayan Kumar — AI/ML Engineer | Reinforcement Learning & Intelligent Systems',
  description:
    'Portfolio of Ayan Kumar — AI/ML Engineer specializing in Reinforcement Learning, Deep Learning, and Autonomous Systems. Building intelligent systems at the intersection of research and production.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Reinforcement Learning',
    'Deep Learning',
    'PyTorch',
    'Autonomous Systems',
    'AI Portfolio',
  ],
  authors: [{ name: 'Ayan Kumar' }],
  openGraph: {
    title: 'Ayan Kumar — AI/ML Engineer',
    description:
      'Building intelligent systems at the intersection of research and production.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayan Kumar — AI/ML Engineer',
    description:
      'Building intelligent systems at the intersection of research and production.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain-overlay">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

