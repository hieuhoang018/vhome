import AdminTitleCard from "@/components/Admin/admin-title-card"
import QuickActionsSection from "@/components/Admin/AdminDashboardPage/quick-actions-section"
import RecentOrdersSection from "@/components/Admin/AdminDashboardPage/recent-orders-section"
import RecentProductsSection from "@/components/Admin/AdminDashboardPage/recent-products-section"
import StatisticsPanel from "@/components/Admin/AdminDashboardPage/statistics-panel"

export default function AdminDashboardPage() {
  return (
    <>
      <AdminTitleCard header="Admin Dashboard" subtitle="Manage Store" />
      <StatisticsPanel />
      <QuickActionsSection />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentProductsSection />
        <RecentOrdersSection />
      </div>
    </>
  )
}
