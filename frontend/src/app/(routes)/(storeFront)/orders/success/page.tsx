import SuccessContent from "@/components/StoreFront/OrderPage/checkout-success-content"
import { Suspense } from "react"

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
