import type { Metadata } from "next"
import { Geist, Noto_Serif, Public_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chess Tournaments",
  description:
    "Browse chess tournaments, filter by time control or status, and join open events.",
}

const publicSansHeading = Public_Sans({subsets:['latin'],variable:'--font-heading'});

const notoSerif = Noto_Serif({subsets:['latin'],variable:'--font-serif'});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        fontSans.variable,
        "font-sans",
        notoSerif.variable,
        publicSansHeading.variable,
      )}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
