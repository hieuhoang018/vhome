"use client"

import { Plus } from "lucide-react"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import InputField from "../../input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateProductForm() {
  const router = useRouter()
  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        colors: "",
        imageCoverUrl: "",
      },
      onSubmit: async (data) => {
        await api.post("/products", data)
        toast.success("Product created")
        router.push("/dashboard")
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg bg-gray-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Product Information</h2>
          <InputField
            label="Product Name"
            placeholder="Example Sofa"
            inputType="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Description"
            placeholder="Describe the product"
            inputType="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <InputField
            label="Category"
            placeholder="Living Room"
            inputType="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="rounded-lg bg-gray-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Pricing & Stock</h2>
          <InputField
            label="Price"
            placeholder="799.99"
            inputType="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <InputField
            label="Stock Quantity"
            inputType="text"
            name="stock"
            placeholder="36"
            value={formData.stock}
            onChange={handleChange}
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
              <Plus className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-100 border shadow-sm px-4 py-7 mt-4">
        <div className="mb-4">
          <h2 className="font-bold text-2xl ">Product Image</h2>
          <h3 className="text-gray-500">Please enter URL or upload file</h3>
        </div>
        <InputField
          label="Cover Image"
          placeholder="https://example.com"
          inputType="text"
          name="imageCoverUrl"
          value={formData.imageCoverUrl}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="border px-4 bg-navi-blue text-white py-2 rounded hover:bg-navi-blue/90 disabled:bg-gray-400 "
        >
          Create Product
        </button>
      </div>
    </form>
  )
}
