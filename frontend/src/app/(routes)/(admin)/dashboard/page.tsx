import QuickActionsSection from "@/components/AdminDashboardPage/quick-actions-section"
import RecentProductsSection from "@/components/AdminDashboardPage/recent-products-section"
import StatisticsPanel from "@/components/AdminDashboardPage/statistics-panel"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
              Admin Dashboard
            </h1>
            <h2 className="text-2xl md:text-2xl font-serif text-furniture-charcoal mt-4">
              Manage Store
            </h2>
          </div>
          <StatisticsPanel />
          <QuickActionsSection />
          <RecentProductsSection />
        </div>
      </main>
    </div>
  )
}
