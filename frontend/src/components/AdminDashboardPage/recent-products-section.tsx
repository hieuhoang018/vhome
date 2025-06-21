import RecentProductsListing from "./recent-products-listing"

export default function RecentProductsSection() {
  return (
    <div className="border rounded-lg bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Recent Products</h1>
      <RecentProductsListing />
    </div>
  )
}
