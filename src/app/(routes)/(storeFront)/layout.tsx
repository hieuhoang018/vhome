import Footer from "@/components/HomePage/footer"
import MainHeader from "@/components/HomePage/navbar"

export default function StoreFrontLayout({
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
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
