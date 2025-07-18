"use client"

import { useUser } from "@/context/userContext"
import InputField from "@/components/input"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { LoginRoleResponse } from "@/types/users"
import { toast } from "sonner"

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

        toast.success("Login successful!")
        if (role === "admin") {
          router.push("/dashboard")
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
      <button
        disabled={loading}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
      >
        Sign in
      </button>
    </form>
  )
}
