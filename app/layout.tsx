import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const siteUrl = 'https://franciscobernardo.vercel.app'
const title = 'Francisco Bernardo — Engenheiro Informático'
const description =
  'Site pessoal de Francisco Bernardo, estudante de Engenharia Informática na Universidade de Coimbra. Apaixonado por código, sistemas e construir coisas bacanas.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ['engenharia informática', 'developer', 'portfolio', 'Francisco Bernardo', 'Universidade de Coimbra'],
  authors: [{ name: 'Francisco Bernardo' }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
