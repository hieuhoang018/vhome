import UserDetailsSection from "@/components/AdminDetailsPage/user-details-section"
import Link from "next/link"

export default function AdminUserDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/lookup"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow transition"
          >
            ← Back to Look Up
          </Link>
          <div className="mb-8 mt-8">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
              User Details
            </h1>
            <h2 className="text-2xl md:text-2xl font-serif text-furniture-charcoal mt-4">
              Viewing details for user
            </h2>
          </div>
          <UserDetailsSection />
        </div>
      </main>
    </div>
  )
}
