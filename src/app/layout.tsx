import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VHome",
  description: "VHome Furniture Store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpg" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
