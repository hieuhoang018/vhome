import Link from "next/link"

export default function CancelPage() {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>
        Your payment was not completed. Feel free to try again whenever you're
        ready.
      </p>
      <Link href="/cart">Return to cart</Link>
    </div>
  )
}
