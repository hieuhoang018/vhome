"use client"

import api from "@/lib/axios"
import { User, UserResponse } from "@/types/users"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserDetailsSection() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id: _id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserResponse>(`/users/${_id}`)
        setUser(res.data.data.user)
      } catch (err) {
        setError("Failed to load user")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (error || !user) {
    return <p>Error while loading user</p>
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
          <h2>Name</h2>
          <h2 className="mb-4">
            {user.firstName} {user.lastName}
          </h2>
          <h2>Email</h2>
          <h2 className="mb-4">{user.email}</h2>
          <h2>Phone</h2>
          <h2 className="mb-4">{user.phone}</h2>
          <h2>Status</h2>
          <h2 className="mb-4">{user.active ? "Active" : "Inactive"}</h2>
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Account Details</h1>
          <h2>Join Date</h2>
          <h2 className="mb-4">
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "undefine"}
          </h2>
          <h2>Total Orders</h2>
          <h2 className="mb-4">15</h2>
          <h2>Total Spent</h2>
          <h2 className="mb-4">2000 eur</h2>
          <h2>Address</h2>
          <h2 className="mb-4">123 street</h2>
        </div>
      </div>
      <div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            type="button"
            disabled={loading}
          >
            Edit User
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            type="button"
            disabled={loading}
          >
            Delete User
          </button>
        </div>
      </div>
    </>
  )
}
