import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://philosophy.it.com'),
  title: {
    template: '%s | Critique of Pure Reason Interactive Reader',
    default: 'Critique of Pure Reason Interactive Reader'
  },
  description: 'An interactive trilingual reader for Kant\'s Critique of Pure Reason featuring German, English, and Chinese translations, with commentary, vocabulary tools, and concept visualizations.',
  keywords: ['Immanuel Kant', 'Critique of Pure Reason', 'philosophy', 'German philosophy', 'transcendental idealism', 'interactive reader', 'philosophy education'],
  authors: [{ name: 'Philosophy Learning Platform' }],
  creator: 'Philosophy Learning Platform',
  publisher: 'Philosophy Learning Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE', 'zh_CN'],
    title: 'Critique of Pure Reason Interactive Reader',
    description: 'An interactive trilingual reader for Kant\'s Critique of Pure Reason featuring German, English, and Chinese translations, with commentary, vocabulary tools, and concept visualizations.',
    siteName: 'Critique of Pure Reason Interactive Reader',
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Critique of Pure Reason Interactive Reader'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Critique of Pure Reason Interactive Reader',
    description: 'Interactive trilingual reader for Kant\'s Critique of Pure Reason with commentary and learning tools',
    images: ['/opengraph-image']
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://philosophy.it.com',
    languages: {
      'en-US': '/en',
      'de-DE': '/de',
      'zh-CN': '/zh',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://philosophy.it.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
