"use client"

import InputField from "@/components/AuthenticationPage/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import api from "@/lib/axios"

export default function LoginForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      })

      router.push("/")
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Something went wrong")
      }
    }
  }

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
      <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
        Sign in
      </button>
    </form>
  )
}
