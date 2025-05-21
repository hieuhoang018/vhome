import Image from "next/image"
import type { FeatureRoom } from "@/app/types/featured-category"
import Link from "next/link"

export default function FeaturedRoom({ room }: { room: FeatureRoom }) {
  return (
    <>
      <div className="group relative rounded-md overflow-hidden hover-lift">
        <div className="aspect-[3/4] relative">
          <Image
            src={room.imageSrc}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-5xl text-white mb-4">{room.name}</p>
            <p className="text-xl text-white mb-7">{room.description}</p>
            <Link href={room.link} className="text-white text-2xl">Shop now</Link>
          </div>
        </div>
      </div>
    </>
  )
}
