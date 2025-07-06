import RecentOrdersListing from "./recent-orders-listing";

export default function RecentOrdersSection() {
  return (
    <div className="border rounded-lg bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Recent Orders</h1>
      <RecentOrdersListing />
    </div>
  )
}
