"use client"

import { Product } from "@/types/products"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <div className="w-80 h-100 rounded-md shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1">
        <div className="h-65 bg-red-600"></div>
        <div
          className="p-3"
          onClick={() => (window.location.href = `/products/${product.id}`)}
        >
          <h1 className="font-serif text-2xl mb-2">{product.name}</h1>
          <h2 className="text-navi-blue font-bold text-xl mb-3">
        €{product.price}
          </h2>
          <h2 className="text-gray-400">{product.category}</h2>
        </div>
      </div>
    </>
  )
}
