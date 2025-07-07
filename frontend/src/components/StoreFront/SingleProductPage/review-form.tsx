import InputField from "@/components/input"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { useState } from "react"
import { toast } from "sonner"

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        rating: rating,
        review: "",
      },
      onSubmit: async (data) => {
        console.log("request: ", data)
        console.log(productId);
        await api.post(`/products/${productId}/reviews`, data)
        toast.success("Review submitted")
      },
    })

  return (
    <div className="mb-20">
      <h1 className="mb-3 text-3xl">Write a Review</h1>
      <form onSubmit={handleSubmit} className="border rounded-lg p-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="star-rating">
            Your Rating
          </label>
          <div
            id="star-rating"
            className="flex items-center space-x-1"
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className={`text-4xl focus:outline-none ${
                  star <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => {
                  setRating(star)
                  handleChange({
                    target: {
                      name: "rating",
                      value: star,
                    },
                  } as any)
                }}
                onMouseEnter={() => setHover(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <InputField
          label="Your Review"
          placeholder="Share your experience with this product..."
          inputType="text"
          value={formData.review}
          name="review"
          onChange={handleChange}
        />
        {error && <p>{error}</p>}
        <button className="border p-2 rounded-lg">Submit Review</button>
      </form>
    </div>
  )
}
