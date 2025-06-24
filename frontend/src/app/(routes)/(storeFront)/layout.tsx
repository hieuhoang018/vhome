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
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16 px-4 md:px-8">{children}</main>
      </div>
      <Footer />
    </>
  )
}
