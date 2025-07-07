"use client"

import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { User, UsersResponse } from "@/types/users"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>()
  const { formData, handleChange, handleSubmit, loading } =
    useFormSubmit({
      initialData: {
        prompt: "",
      },
      onSubmit: async (data) => {
        const res = await api.get<UsersResponse>(`/users?search=${data.prompt}`)
        if(res.data.data.docs.length === 0) {
          toast.info("No users found")
        }
        setUsers(res.data.data.docs)
      },
    })

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full mb-6">
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          placeholder="Search users by email..."
          className="flex-9 mr-2 p-2 border rounded-lg"
        />
        <button
          className="flex-1 border rounded-lg"
          type="submit"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Name
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Email
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Join Date
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600">{user._id}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-furniture-charcoal">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">{user.email}</td>
              <td className="py-3 px-4 font-semibold text-furniture-charcoal">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {user.active ? "Inactive" : "Active"}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button className="h-8 w-8">
                    <Link href={`/details/user/${user._id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
