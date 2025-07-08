import { XCircle } from "lucide-react"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-3">
      <div className="mb-8">
        <XCircle className="h-20 w-20 mx-auto text-red-500" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <h1 className="text-5xl font-bold text-center">Checkout Cancelled</h1>
        <p className="text-2xl text-center">
          Your payment was not processed and no charges were made to your
          account.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border rounded-lg min-w-[20px] md:min-w-[150px] p-5">
        <h1 className="text-3xl font-semibold">Your Cart is Saved</h1>
        <div className="flex flex-col items-center justify-center rounded-lg min-w-[10px] md:min-w-[135px] p-5 bg-gray-300">
          <h2 className="text-xl mb-2">
            Don&apos;t worry! All your selected items are still in your shopping
            cart.
          </h2>
          <h3 className="text-1/2xl">
            You can continue shopping or try checking out again whenever
            you&apos;re ready.
          </h3>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Link href={"/cart"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Return To Cart
          </button>
        </Link>
        <Link href={"/products"}>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
