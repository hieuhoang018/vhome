import Link from "next/link"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

export default async function IndividualProductListing(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const data = {
    id: 2,
    name: "Woxezu Table",
    category: "Dining Room",
    price: 169.98,
    description:
      "Give your dining room a fresh look with this smart and space-saving dining table.",
    stock: 32,
    imageUrl: "/images/bathroom.png",
    colors: ["Black", "Gray", "Beige", "Yellow", "Navy Blue"],
  }
  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-6">
            <nav className="flex items-center text-sm">
              <Link href="/" className="hover:text-red-500">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/#collections" className="hover:text-red-500">
                {data.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium">Aria Lounge Chair</span>
            </nav>
            <Link
              href="/"
              className="inline-flex items-center mt-4 hover:underline"
            >
              Back to shopping
            </Link>
            <div className="grid grid-cols-2 mt-5">
              <Image
                src={data.imageUrl}
                alt="image"
                width={610}
                height={1}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-7xl font-serif mb-5">{data.name}</h1>
                <h2 className="text-3xl mb-5">€ {data.price}</h2>
                <p className="text-xl mb-5">{data.description}</p>
                <h2 className="text-2xl font-serif mb-2">Select color</h2>
                <div className="flex gap-1 mb-5">
                  {data.colors.map((color) => {
                    return (
                      <button
                        className="border rounded-lg px-3.5 py-1"
                        key={color}
                      >
                        <p className="text-2xl font-serif">{color}</p>
                      </button>
                    )
                  })}
                </div>
                <div className="mb-5">
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-md w-32">
                    <button className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400">
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex-1 text-center font-medium">2</div>
                    <button className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-furniture-charcoal/70 mt-2">
                    2 in stock
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="flex-[2] rounded-lg px-4 py-2 w-full bg-navi-blue text-white">
                    Add to cart
                  </button>
                  <button className="flex-1 border rounded-lg px-4 py-2 w-full">
                    Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
