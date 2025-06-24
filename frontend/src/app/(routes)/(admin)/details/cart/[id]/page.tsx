import CartDetailsSection from "@/components/Admin/AdminDetailsPage/cart-details-section"
import DetailsTitleCard from "@/components/Admin/AdminDetailsPage/details-title-card"

export default function AdminCartDetailPage() {
  return (
    <>
      <DetailsTitleCard detailsType="Cart" />
      <CartDetailsSection />
    </>
  )
}
