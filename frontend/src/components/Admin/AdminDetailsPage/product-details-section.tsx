"use client"

import InputField from "@/components/input"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import {
  Product,
  ProductResponse,
  UpdatedProductResponse,
} from "@/types/products"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ProductDetailsSection() {
  const [product, setProduct] = useState<Product>()
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  const { id: _id } = useParams<{ id: string }>()

  const { formData, handleChange, handleSubmit, error, loading, setFormData } =
    useFormSubmit({
      initialData: product
        ? {
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
          }
        : {},
      onSubmit: async (data) => {
        if (!product) {
          toast.error("User undefined")
          return
        }
        const res = await api.patch<UpdatedProductResponse>(
          `/products/${product._id}`,
          data
        )
        const updatedProduct = res.data.data.data
        setProduct(updatedProduct)
        toast.success("Successfully edited product")
        setEditMode(false)
      },
    })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<ProductResponse>(`/products/${_id}`)
        setProduct(res.data.data.product)
        setFormData({
          name: res.data.data.product.name,
          category: res.data.data.product.category,
          price: res.data.data.product.price,
          stock: res.data.data.product.stock,
          description: res.data.data.product.description,
        })
      } catch (err) {
        console.log(err)
        toast.error("Error while fetching product")
      }
    }

    fetchProduct()
  }, [_id, setFormData])

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/products/${_id}`)
      toast.success("Product deleted")
      router.push("/lookup")
    } catch (error) {
      console.log(error)
      toast.error("Error while deleting product")
    }
  }

  if (error || !product) {
    return <p>Error while loading product</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
          {editMode ? (
            <>
              <InputField
                label="Name"
                placeholder="Product Name"
                name="name"
                inputType="text"
                value={formData.name ?? ""}
                onChange={handleChange}
              />
              <InputField
                label="Category"
                placeholder="Living Room"
                name="category"
                inputType="text"
                value={formData.category ?? ""}
                onChange={handleChange}
              />
              <InputField
                label="Price"
                placeholder="136.99"
                name="price"
                inputType="number"
                value={formData.price ?? ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2 className="font-medium">Name</h2>
              <h2 className="mb-4">{product.name}</h2>
              <h2 className="font-medium">Category</h2>
              <h2 className="mb-4">{product.category}</h2>
              <h2 className="font-medium">Price</h2>
              <h2 className="mb-4">€{product.price}</h2>
            </>
          )}
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Inventory & Status</h1>
          <h2 className="font-medium">Created At</h2>
          <h2 className="mb-4">
            {product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "undefine"}
          </h2>
          {editMode ? (
            <>
              <InputField
                label="Stock"
                placeholder="36"
                name="stock"
                inputType="number"
                value={formData.stock ?? ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2 className="font-medium">Stock</h2>
              <h2 className="mb-4">{product.stock}</h2>
            </>
          )}
          <h2 className="font-medium">Status</h2>
          <h2 className="mb-4">
            {product.stock === 0 ? "Out of Stock" : "In Stock"}
          </h2>
        </div>
      </div>
      <div className="border rounded-lg bg-gray-100 p-5">
        {editMode ? (
          <InputField
            label="Description"
            placeholder="Product Description"
            name="description"
            inputType="description"
            value={formData.description ?? ""}
            onChange={handleChange}
          />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-8">Description</h1>
            <h2 className="mb-4">{product.description}</h2>
          </>
        )}
      </div>
      <div>
        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                type="button"
                disabled={loading}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition"
                type="submit"
                disabled={loading}
              >
                Confirm
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                type="button"
                disabled={loading}
                onClick={() => setEditMode(true)}
              >
                Edit Product
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                type="button"
                disabled={loading}
                onClick={handleDeleteProduct}
              >
                Delete Product
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
