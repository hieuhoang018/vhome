import AdminTitleCard from "@/components/Admin/admin-title-card"
import LookUpSection from "@/components/Admin/AdminLookupPage/look-up-section"

export default function AdminLookupPage() {
  return (
    <>
      <AdminTitleCard
        header="Admin Lookup"
        subtitle="Search products, users and orders"
      />
      <LookUpSection />
    </>
  )
}
