import { Review } from "@/types/reviews"
import StarRatingDisplay from "./star-rating-display"

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border rounded-lg p-6 flex flex-col">
      <h1>{review.user.firstName}</h1>
      <div className="flex flex-row gap-3 mb-2">
        <StarRatingDisplay rating={review.rating} />
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
      <h2>{review.review}</h2>
    </div>
  )
}
