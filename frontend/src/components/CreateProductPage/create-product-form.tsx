"use client"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"

export default function CreateProductForm() {
  const [colors, setColors] = useState<string[]>([])

  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        colors: [],
        imageUrl: "",
      },
      onSubmit: async (data) => {
        await api.post("/products", data)
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Product Information</h2>
          <h3 className="mb-1">Product Name</h3>
          <input
            type="text"
            name="name"
            placeholder="Example Sofa"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-sm px-3 py-1 w-full mb-3"
          />
          <h3 className="mb-1">Description</h3>
          <input
            type="text"
            name="description"
            placeholder="Describe the product"
            value={formData.description}
            onChange={handleChange}
            className="min-h-[120px] border rounded-sm px-3 py-1 w-full mb-3"
          />

          <div>
            <h3 className="mb-1">Category</h3>
            <input
              type="text"
              name="category"
              placeholder="Living Room"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-sm px-3 py-1 w-full"
            />
          </div>
        </div>
        <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Pricing & Stock</h2>
          <h3 className="mb-1">Price (€)</h3>
          <input
            type="text"
            name="price"
            placeholder="799.99"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-sm px-3 py-1 w-full mb-3"
          />
          <h3 className="mb-1">Stock Quantity</h3>
          <input
            type="text"
            name="stock"
            placeholder="36"
            value={formData.stock}
            onChange={handleChange}
            className="border rounded-sm px-3 py-1 w-full mb-3"
          />
          <div className="space-y-2">
            <h3 className="mb-1">Available Colors</h3>
            <div className="flex gap-2">
              <input
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                className="border rounded-sm px-3 py-1 w-full mb-3"
                placeholder="Enter color name"
              />
                <Plus className="h-4 w-4"/>
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

      <div className="rounded-lg bg-amber-100 border shadow-sm px-4 py-7 mt-4">
        <h2 className="font-bold text-2xl mb-4">Product Image</h2>
        <h3 className="mb-1">Image URL or Upload</h3>
        <input
          type="text"
          name="imageUrl"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border rounded-sm px-3 py-1 w-full mb-3"
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end gap-2 mt-6">
        <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded ">
          Create Product
        </button>
      </div>
    </form>
  )
}
