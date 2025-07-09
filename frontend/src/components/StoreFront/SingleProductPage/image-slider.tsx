"use client"

import { Product } from "@/types/products"
import Image from "next/image"
import { useState } from "react"

export default function ImageSlider({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  return (
    <div className="flex-1 flex flex-col gap-2">
      {/* Main product image */}
      <Image
        src={selectedImage || product.imageCoverUrl}
        alt={product.name}
        width={1920}
        height={1080}
        className="w-full h-130 object-cover rounded-lg"
      />
      {/* Thumbnails */}
      <div className="flex flex-row gap-2 mt-2">
        <Image
          src={product.imageCoverUrl}
          alt={product.name}
          width={1920}
          height={1080}
          onClick={() => setSelectedImage(product.imageCoverUrl)}
          className={`w-30 h-30 object-cover rounded-md cursor-pointer border-2 ${
            selectedImage === product.imageCoverUrl
              ? "border-navi-blue"
              : "border-transparent"
          } hover:border-gray-500 transition`}
        />
        {product.imagesUrl?.map((imgUrl, idx) => (
          <Image
            key={idx}
            src={imgUrl}
            width={1920}
            height={1080}
            alt={`${product.name} thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(imgUrl)}
            className={`w-30 h-30 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === imgUrl
                ? "border-navi-blue"
                : "border-transparent"
            } hover:border-gray-500 transition`}
          />
        ))}
      </div>
    </div>
  )
}
