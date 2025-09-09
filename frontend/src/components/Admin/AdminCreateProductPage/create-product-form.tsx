"use client"

import { Plus } from "lucide-react"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import InputField from "../../input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateProductForm() {
  const [colors, setColors] = useState<string[]>([])
  const [colorInput, setColorInput] = useState("")
  const router = useRouter()

  const addColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput.trim())) {
      setColors([
        ...colors,
        colorInput
          .trim()
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      ])
      setColorInput("")
    }
  }

  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        colors: colors,
        imageCoverUrl: "",
      },
      onSubmit: async (data) => {
        const submitData = { ...data, colors }
        await api.post("/products", submitData)
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
            <h3 className="mb-1 font-semibold">Available Colors</h3>
            <div className="flex gap-2">
              <input
                className="border rounded-lg px-3 py-1 w-full"
                placeholder="Enter color name"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addColor}
                className="flex items-center justify-center border px-2 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, index) => (
                  <span
                    key={index}
                    className="border bg-blue-100 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() =>
                        setColors(colors.filter((_, i) => i !== index))
                      }
                      className="text-red-600 hover:text-red-800 ml-1 cursor-pointer"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
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
