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
    const fetchProducts = async () => {
      try {
        const res = await api.get<UserResponse>(`/users/${_id}`)
        setUser(res.data.data.user)
      } catch (err) {
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex">
      <div className="flex-1 border rounded-lg bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
        <h2>Name</h2>
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <h2>Email</h2>
        <h2>{user?.email}</h2>
        <h2>Phone</h2>
        <h2>{user?.phone}</h2>
        <h2>Status</h2>
        <h2>{user?.active ? "Active" : "Inactive"}</h2>
      </div>
      <div className="flex-1">
        <h1>col2</h1>
      </div>
    </div>
  )
}
