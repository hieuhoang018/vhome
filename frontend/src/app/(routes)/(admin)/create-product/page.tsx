"use client"

import Link from "next/link"
import { Plus, X } from "lucide-react"
import { useState } from "react"

export default function CreateProductPage() {
  const [colors, setColors] = useState<string[]>([])

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
            <form>
              <div className="grid grid-cols-2 mt-6">
                <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7">
                  <h2>Product Information</h2>
                  <h3>Product Name</h3>
                  <input
                    type="text"
                    placeholder="Example Sofa"
                    className="border rounded-sm px-3 py-1"
                  />
                  <h3>Description</h3>
                  <input
                    type="text"
                    placeholder="Describe the product"
                    className="min-h-[120px] border rounded-sm px-3 py-1"
                  />

                  <div>
                    <h3>Category</h3>
                    <input
                      type="text"
                      placeholder="Living Room"
                      className="border rounded-sm px-3 py-1"
                    />
                  </div>
                </div>
                <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7">
                  <h2>Pricing & Stock</h2>
                  <h3>Price (€)</h3>
                  <input
                    type="text"
                    placeholder="799.99"
                    className="border rounded-sm px-3 py-1"
                  />
                  <h3>Stock Quantity</h3>
                  <input
                    type="text"
                    placeholder="36"
                    className="border rounded-sm px-3 py-1"
                  />
                  <div className="space-y-2">
                    <h3>Available Colors</h3>
                    <div className="flex gap-2">
                      <input
                        className="border rounded-sm px-3 py-1"
                        placeholder="Enter color name"
                      />
                      <button>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    {colors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {colors.map((color, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-furniture-navy/10 text-furniture-navy px-2 py-1 rounded-md text-sm"
                          >
                            {color}
                            <button className="hover:bg-furniture-navy/20 rounded-full p-0.5">
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7">
                <h2>Product Image</h2>
                <h3>Image URL or Upload</h3>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="border rounded-sm px-3 py-1"
                />
              </div>
                <div className="flex justify-end gap-2 mt-6">
                <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button className="px-4 py-2 rounded ">Create Product</button>
                </div>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
