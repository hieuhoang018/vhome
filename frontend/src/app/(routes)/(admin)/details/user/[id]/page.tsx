import DetailsTitleCard from "@/components/Admin/AdminDetailsPage/details-title-card"
import UserDetailsSection from "@/components/Admin/AdminDetailsPage/user-details-section"

export default function AdminUserDetailPage() {
  return (
    <>
      <DetailsTitleCard detailsType="User" />
      <UserDetailsSection />
    </>
  )
}
