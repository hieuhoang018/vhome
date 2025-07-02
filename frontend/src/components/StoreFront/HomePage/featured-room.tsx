import Image from "next/image"
import type { FeatureRoom } from "@/types/featured-category"
import Link from "next/link"

export default function FeaturedRoom({ room }: { room: FeatureRoom }) {
  return (
    <>
      <div className="group relative rounded-md overflow-hidden hover-lift w-80">
        <div className="aspect-[3/4] relative">
          <Image
            src={room.imageSrc}
            alt={room.name}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-2xl font-serif text-white font-semibold mb-2">
              {room.name}
            </p>
            <p className=" text-white/80 mb-4 text-sm">{room.description}</p>
            <Link
              href={"/products"}
              className="inline-flex items-center text-white hover:text-furniture-terracotta transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
