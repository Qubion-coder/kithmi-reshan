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

export const metadata: Metadata = {
  title: 'KITHMI & RESHAN Wedding',
  description: 'Join us as we celebrate the wedding of Kithmi and Reshan on January 23, 2027.',
  generator: 'v0.app',
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
