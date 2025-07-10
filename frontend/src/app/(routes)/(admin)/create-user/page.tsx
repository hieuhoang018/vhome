import CreateUserForm from "@/components/Admin/AdminCreateUserPage/create-user-form"
import AdminTitleCard from "@/components/Admin/admin-title-card"

export default function CreateUserPage() {
  return (
    <>
      <AdminTitleCard
        header="Create New User"
        subtitle="Add a new user to the system"
      />
      <CreateUserForm />
    </>
  )
}
