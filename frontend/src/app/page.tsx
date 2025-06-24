import MainHeader from "@/components/StoreFront/NavigationBar/navbar"
import HeroSection from "@/components/StoreFront/HomePage/hero-section"
import ShopSection from "@/components/StoreFront/HomePage/shop-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <MainHeader />
      <HeroSection />
      <ShopSection />
      <Footer />
    </>
  )
}
