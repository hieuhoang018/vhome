"use client"

import InputField from "@/components/input"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { UpdatedUserResponse, User, UserResponse } from "@/types/users"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function UserDetailsSection() {
  const [user, setUser] = useState<User>()
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  const { id: _id } = useParams<{ id: string }>()

  const { formData, handleChange, handleSubmit, error, loading, setFormData } =
    useFormSubmit({
      initialData: user
        ? {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          }
        : {},
      onSubmit: async (data) => {
        if (!user) {
          toast.error("User undefined")
          return
        }

        const res = await api.patch<UpdatedUserResponse>(
          `/users/${user._id}`,
          data
        )
        const updatedUser = res.data.data.data
        setUser(updatedUser)
        toast.success("Successfully edited user")
        setEditMode(false)
      },
    })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserResponse>(`/users/${_id}`)
        setUser(res.data.data.user)
        setFormData({
          firstName: res.data.data.user.firstName,
          lastName: res.data.data.user.lastName,
          email: res.data.data.user.email,
          phone: res.data.data.user.phone,
        })
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.message)
        }
      }
    }

    fetchUser()
  }, [_id, setFormData])

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/${_id}`)
      toast.success("User deleted")
      router.push("/lookup")
    } catch (error) {
      console.log(error)
      toast.error("Error while deleting user")
    }
  }

  if (error || !user) {
    return <p>Error while loading user</p>
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
          {editMode ? (
            <form id="editUserForm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  placeholder="John"
                  name="firstName"
                  inputType="text"
                  value={formData.firstName ?? ""}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  name="lastName"
                  inputType="text"
                  value={formData.lastName ?? ""}
                  onChange={handleChange}
                />
              </div>
              <InputField
                label="Email"
                placeholder="example@gmail.com"
                name="email"
                inputType="text"
                value={formData.email ?? ""}
                onChange={handleChange}
              />
              <InputField
                label="Phone Number"
                placeholder="+358 46 123 4567"
                name="phone"
                inputType="tel"
                value={formData.phone ?? ""}
                onChange={handleChange}
              />
            </form>
          ) : (
            <>
              <h2 className="font-medium">Name</h2>
              <h2 className="mb-4">
                {user.firstName} {user.lastName}
              </h2>
              <h2 className="font-medium">Email</h2>
              <h2 className="mb-4">{user.email}</h2>
              <h2 className="font-medium">Phone</h2>
              <h2 className="mb-4">{user.phone}</h2>
            </>
          )}
          <h2 className="font-medium">Status</h2>
          <h2 className="mb-4">{user.active ? "Active" : "Inactive"}</h2>
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Account Details</h1>
          <h2 className="font-medium">Join Date</h2>
          <h2 className="mb-4">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "undefine"}
          </h2>
          <h2 className="font-medium">Total Orders</h2>
          <h2 className="mb-4">15</h2>
          <h2 className="font-medium">Total Spent</h2>
          <h2 className="mb-4">2000 eur</h2>
          <h2 className="font-medium">Address</h2>
          <h2 className="mb-4">123 street</h2>
        </div>
      </div>
      <div>
        {error && <p>{error}</p>}
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
                form="editUserForm"
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
                Edit User
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                type="button"
                disabled={loading}
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
