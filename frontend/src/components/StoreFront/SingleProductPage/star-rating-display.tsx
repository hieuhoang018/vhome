import { Star } from "lucide-react"

export default function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
  )
}
