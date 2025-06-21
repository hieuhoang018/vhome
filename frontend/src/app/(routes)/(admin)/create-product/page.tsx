import Link from "next/link"
import CreateProductForm from "@/components/AdminCreateProductPage/create-product-form"

export default function CreateProductPage() {

  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16">
          <div className="container mx-auto px-4">
            {/* TITLE CARD */}
            <div>
              <Link
                href={"/dashboard"}
                className="text-lg text-red-500 hover:underline underline-offset-4"
              >
                Back to Dashboard
              </Link>
              <h1 className="mt-5 text-5xl font-serif">Create New Product</h1>
              <h2 className="mt-3 text-2xl font-serif text-gray-400">
                Add a new product to inventory
              </h2>
            </div>

            {/* FORM */}
            <CreateProductForm />
          </div>
        </main>
      </div>
    </>
  )
}
