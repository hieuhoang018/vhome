import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 z-10 relative text-white">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Transform Your Space With Timeless Elegance
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
            Discover premium furniture crafted for comfort, style, and
            longevity. Curated collections to make your house feel like home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/products"}>
              <button className="border rounded-lg p-3 bg-white text-black font-semibold hover:bg-gray-200 cursor-pointer">
                Shop New Arrivals
              </button>
            </Link>
            <Link href={"/products"}>
              <button className="border rounded-lg p-3 bg-white text-black font-semibold hover:bg-gray-200 cursor-pointer">
                Explore Collections
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
