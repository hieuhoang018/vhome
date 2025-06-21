"use client"

import { useUser } from "@/context/userContext"
import InputField from "@/components/input"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { LoginRoleResponse } from "@/types/users"

export default function LoginForm() {
  const router = useRouter()
  const { refreshUser } = useUser()

  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        email: "",
        password: "",
      },
      onSubmit: async (data) => {
        const res = await api.post<LoginRoleResponse>("/users/login", data)
        const role = res.data.data.role
        refreshUser()
        if (role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/")
        }
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        placeholder="example@email.com"
        inputType="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label="Password"
        placeholder="••••••••"
        inputType="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
        Sign in
      </button>
    </form>
  )
}
