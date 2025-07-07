import CreateProductForm from "@/components/Admin/AdminCreateProductPage/create-product-form"
import AdminTitleCard from "@/components/Admin/admin-title-card"

export default function CreateProductPage() {
  return (
    <>
      <AdminTitleCard
        header="Create New Product"
        subtitle="Add a new product to inventory"
      />
      <CreateProductForm />
    </>
  )
}
