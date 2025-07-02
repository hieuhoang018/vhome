import DetailsTitleCard from "@/components/Admin/AdminDetailsPage/details-title-card"
import OrderDetailsSection from "@/components/Admin/AdminDetailsPage/order-details-section"

export default function AdminOrderDetailPage() {
  return (
    <>
      <DetailsTitleCard detailsType="Order" />
      <OrderDetailsSection />
    </>
  )
}
