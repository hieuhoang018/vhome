import Footer from "@/components/footer"
import MainHeader from "@/components/StoreFront/NavigationBar/navbar"

export default function StoreFrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16">{children}</main>
      </div>
      <Footer />
    </>
  )
}
