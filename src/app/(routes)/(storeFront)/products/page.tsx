import ProductCard from "@/components/ProductsListingPage/product-card"
import Link from "next/link"

export default function ProductListing({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = parseInt(searchParams?.page || "1")

  const data = [
    {
      id: 43,
      name: "Ritefa Table",
      category: "Dining Room",
      price: 788.38,
      description:
        "This ergonomic dining table offers lasting support and contemporary flair for your dining room.",
      stock: 46,
      imageUrl: "https://via.placeholder.com/300x200?text=Ritefa+Table",
      colors: ["White", "Brown", "Gray"],
    },
    {
      id: 44,
      name: "Zihuwa Bookshelf",
      category: "Office",
      price: 190.42,
      description:
        "This stylish bookshelf is perfect for any modern office. Designed for both comfort and function.",
      stock: 9,
      imageUrl: "https://via.placeholder.com/300x200?text=Zihuwa+Bookshelf",
      colors: ["Natural Wood", "Gray", "Green", "Brown", "Yellow"],
    },
    {
      id: 45,
      name: "Nolabi Box",
      category: "Outdoor",
      price: 421.96,
      description:
        "Add elegance and utility to your outdoor with this beautifully crafted deck box.",
      stock: 5,
      imageUrl: "https://via.placeholder.com/300x200?text=Nolabi+Box",
      colors: ["White", "Beige", "Brown", "Green"],
    },
    {
      id: 46,
      name: "Gajika Rack",
      category: "Bathroom",
      price: 815.92,
      description:
        "Transform your bathroom space with this durable and sleek towel rack.",
      stock: 41,
      imageUrl: "https://via.placeholder.com/300x200?text=Gajika+Rack",
      colors: ["Gray", "Navy Blue", "Green", "Natural Wood"],
    },
    {
      id: 47,
      name: "Wonavu Box",
      category: "Outdoor",
      price: 50.98,
      description:
        "Perfect for small or large outdoor spaces, this deck box is built to maximize style and usability.",
      stock: 50,
      imageUrl: "https://via.placeholder.com/300x200?text=Wonavu+Box",
      colors: ["Natural Wood", "Navy Blue", "Brown", "White"],
    },
    {
      id: 48,
      name: "Juhoce Desk",
      category: "Office",
      price: 136.62,
      description:
        "Add elegance and utility to your office with this beautifully crafted office desk.",
      stock: 42,
      imageUrl: "https://via.placeholder.com/300x200?text=Juhoce+Desk",
      colors: ["Green", "Brown", "Black", "Red", "White"],
    },
    {
      id: 49,
      name: "Xarojo Bed",
      category: "Bedroom",
      price: 817.43,
      description:
        "Give your bedroom a fresh look with this smart and space-saving bed.",
      stock: 23,
      imageUrl: "https://via.placeholder.com/300x200?text=Xarojo+Bed",
      colors: ["Black", "Green", "Yellow", "Beige", "Gray"],
    },
    {
      id: 50,
      name: "Royuva Table",
      category: "Outdoor",
      price: 331.68,
      description:
        "This stylish outdoor table is perfect for any modern outdoor. Designed for both comfort and function.",
      stock: 16,
      imageUrl: "https://via.placeholder.com/300x200?text=Royuva+Table",
      colors: ["Gray", "Beige", "Green", "Red", "Brown"],
    },
    {
      id: 51,
      name: "Gagisi Bookshelf",
      category: "Living Room",
      price: 190.21,
      description:
        "This ergonomic bookshelf offers lasting support and contemporary flair for your living room.",
      stock: 43,
      imageUrl: "https://via.placeholder.com/300x200?text=Gagisi+Bookshelf",
      colors: ["Green", "Brown", "Natural Wood", "Gray"],
    },
    {
      id: 52,
      name: "Kevuxe Table",
      category: "Dining Room",
      price: 842.93,
      description:
        "Give your dining room a fresh look with this smart and space-saving buffet table.",
      stock: 27,
      imageUrl: "https://via.placeholder.com/300x200?text=Kevuxe+Table",
      colors: ["Natural Wood", "Beige", "Brown"],
    },
    {
      id: 53,
      name: "Viluru Table",
      category: "Living Room",
      price: 714.89,
      description:
        "Add elegance and utility to your living room with this beautifully crafted coffee table.",
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x200?text=Viluru+Table",
      colors: ["Yellow", "Brown", "White"],
    },
    {
      id: 54,
      name: "Jojequ Chair",
      category: "Office",
      price: 315.95,
      description:
        "Perfect for small or large office spaces, this office chair is built to maximize style and usability.",
      stock: 17,
      imageUrl: "https://via.placeholder.com/300x200?text=Jojequ+Chair",
      colors: ["Navy Blue", "White", "Black", "Green", "Yellow"],
    },
    {
      id: 55,
      name: "Xuzite Wardrobe",
      category: "Bedroom",
      price: 485.33,
      description:
        "Add elegance and utility to your bedroom with this beautifully crafted wardrobe.",
      stock: 41,
      imageUrl: "https://via.placeholder.com/300x200?text=Xuzite+Wardrobe",
      colors: ["Red", "Natural Wood", "Beige"],
    },
    {
      id: 56,
      name: "Sufiqi Wardrobe",
      category: "Bedroom",
      price: 701.59,
      description:
        "This versatile wardrobe enhances any bedroom, blending practicality with aesthetic charm.",
      stock: 35,
      imageUrl: "https://via.placeholder.com/300x200?text=Sufiqi+Wardrobe",
      colors: ["Black", "Navy Blue"],
    },
    {
      id: 57,
      name: "Zoduru Chair",
      category: "Outdoor",
      price: 812.67,
      description:
        "This versatile patio chair enhances any outdoor, blending practicality with aesthetic charm.",
      stock: 14,
      imageUrl: "https://via.placeholder.com/300x200?text=Zoduru+Chair",
      colors: ["Brown", "Yellow"],
    },
    {
      id: 58,
      name: "Zowadu Rack",
      category: "Bathroom",
      price: 261.25,
      description:
        "This stylish towel rack is perfect for any modern bathroom. Designed for both comfort and function.",
      stock: 11,
      imageUrl: "https://via.placeholder.com/300x200?text=Zowadu+Rack",
      colors: ["Brown", "Black"],
    },
    {
      id: 59,
      name: "Malujo Sideboard",
      category: "Dining Room",
      price: 859.39,
      description:
        "Perfect for small or large dining room spaces, this sideboard is built to maximize style and usability.",
      stock: 11,
      imageUrl: "https://via.placeholder.com/300x200?text=Malujo+Sideboard",
      colors: ["Green", "Red", "Gray"],
    },
    {
      id: 60,
      name: "Gidezu Bench",
      category: "Outdoor",
      price: 241.11,
      description:
        "The minimalist design of this garden bench makes it an excellent fit for contemporary outdoor interiors.",
      stock: 13,
      imageUrl: "https://via.placeholder.com/300x200?text=Gidezu+Bench",
      colors: ["Black", "Brown"],
    },
    {
      id: 61,
      name: "Ropini Sofa",
      category: "Living Room",
      price: 173.28,
      description:
        "The minimalist design of this sofa makes it an excellent fit for contemporary living room interiors.",
      stock: 13,
      imageUrl: "https://via.placeholder.com/300x200?text=Ropini+Sofa",
      colors: ["Natural Wood", "Red", "Navy Blue", "Green", "White"],
    },
  ]

  const itemsPerPage = 8
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data.slice(startIndex, endIndex)

  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16">
          <div className="bg-beige-yellow py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4">
                Our Collection
              </h1>
              <p className="text-furniture-charcoal/70 max-w-2xl">
                Discover our carefully curated selection of modern furniture
                pieces designed to transform your living space.
              </p>
            </div>
          </div>

          <div className="container flex mx-auto px-4 gap-3 mt-6">
            <input
              className="flex-[3] border border-gray-300 rounded-md px-3.5 py-1 bg-beige-yellow"
              type="text"
              placeholder="Search products..."
            />
            <select className="flex-1 border border-gray-300 rounded-md px-3.5 py-1">
              <option value="">All</option>
              <option value="bedroom">Bedroom</option>
              <option value="living-room">Living Room</option>
            </select>
            <select className="flex-1 border border-gray-300 rounded-md px-3.5 py-1">
              <option value="">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="container mx-auto px-4 mt-6">
            <p>
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
              {totalItems} products
            </p>
          </div>

          <div className="container mx-auto px-4 mt-6">
            <div className="grid grid-cols-4 gap-6">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1
              return (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}`}
                  className={`px-4 py-2 border rounded ${
                    page === pageNum ? "bg-navi-blue text-white" : "bg-white"
                  }`}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
