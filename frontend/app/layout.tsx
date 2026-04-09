import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DRS Lane Racing - Professional Motorsport Platform',
  description: 'Join the elite racing community. Track championships, climb the leaderboard, and compete with drivers worldwide.',
  keywords: 'racing, motorsports, championships, driver rankings, competitive racing',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: 'DRS Lane Racing',
    description: 'Professional Motorsport Racing Platform',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
