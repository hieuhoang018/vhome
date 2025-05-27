import Footer from "@/components/footer"
import MainHeader from "@/components/navbar"

export default function StoreFrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  )
}
