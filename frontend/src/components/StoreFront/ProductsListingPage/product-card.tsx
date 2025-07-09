import { Product } from "@/types/products"
import Image from "next/image"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <div className="w-80 h-100 rounded-md shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1">
        <Image
          src={product.imageCoverUrl}
          alt={product.name}
          width={1920}
          height={1080}
          className="h-65 w-full object-cover"
        />
        <Link href={`/products/${product._id}`}>
          <div className="p-3 cursor-pointer">
            <h1 className="font-serif text-2xl mb-2">{product.name}</h1>
            <h2 className="text-navi-blue font-bold text-xl mb-3">
              €{product.price}
            </h2>
            <h2 className="text-gray-400">{product.category}</h2>
          </div>
        </Link>
      </div>
    </>
  )
}
