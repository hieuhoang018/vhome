import AddBlock from "@/components/Admin/AdminAddPage/add-block";

export default function AddModelsPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold font-serif flex items-center gap-2 mb-4">
        Add New
      </h1>
      <h2 className="text-2xl mb-6">
        Choose what you'd like to add to your system
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <AddBlock title="Add Product" subtitle="Create a new product for your furniture store" linkTo="/create-product"/>
        <AddBlock title="Add User" subtitle="Create a new user account" linkTo="create-user"/>
      </div>
    </div>
  )
}
