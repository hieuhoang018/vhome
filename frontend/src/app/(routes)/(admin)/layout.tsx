import Footer from "@/components/footer"
import MainHeader from "@/components/navbar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
