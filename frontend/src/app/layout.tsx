import type { Metadata } from "next"
import "./globals.css"
import { UserProvider } from "@/context/userContext"
import { Toaster } from "sonner"

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <UserProvider>
          {children}
          <Toaster />  
        </UserProvider>
      </body>
    </html>
  )
}
