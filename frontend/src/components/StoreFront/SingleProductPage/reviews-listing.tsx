import { Product } from "@/types/products"
import ReviewCard from "./review-card"
import StarRatingDisplay from "./star-rating-display"

export default function ReviewListing({ product }: { product: Product }) {
  return (
    <div className="">
      <h1 className="mb-3 text-3xl font-bold">Customers Reviews</h1>
      <div className="flex flex-row gap-5 mb-4">
        <StarRatingDisplay rating={product.rating} />
        <h2 className="font-medium">{product.rating} out of 5</h2>
        <h2 className="text-gray-400">
          Based on {product.ratingQuantity} reviews
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {product.reviews.map((review) => {
          return <ReviewCard key={review._id} review={review} />
        })}
      </div>
    </div>
  )
}
