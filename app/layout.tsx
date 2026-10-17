import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Pinyon_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
})

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-script'
})

const SITE_URL = 'https://kithmi-reshan-weddinginvitation.vercel.app'
const SITE_TITLE = 'KITHMI & RESHAN Wedding'
const SITE_DESCRIPTION = 'Join us as we celebrate the wedding of Kithmi and Reshan on January 23, 2027.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'Kithmi & Reshan wedding invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/images/favicon-kr.png',
    apple: '/images/favicon-kr.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#eb81a9',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} ${pinyonScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
