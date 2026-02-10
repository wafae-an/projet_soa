import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CityProvider } from '@/context/CityContext'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Transport Admin - Gestion du Réseau',
  description: 'Interface admin pour la gestion du réseau de transport urbain',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={`font-sans antialiased`}>
        <CityProvider>
          {children}
          <Analytics />
        </CityProvider>
      </body>
    </html>
  )
}