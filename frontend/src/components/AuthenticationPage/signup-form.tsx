"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import api from "@/lib/axios"
import InputField from "./input"
import Link from "next/link"

export default function SignupForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const res = await api.post("/users/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputField
          label="First Name"
          placeholder="First name"
          inputType="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          placeholder="Last name"
          inputType="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
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
      <InputField
        label="Confirm Password"
        placeholder="••••••••"
        inputType="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <div className="my-4">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="mr-2"
          required
        />
        I agree to the{" "}
        <Link
          href={"/terms"}
          className="text-red-500 underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={"/policy"}
          className="text-red-500 underline underline-offset-4"
        >
          Privacy Policy
        </Link>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
      >
        Create Account
      </button>
    </form>
  )
}
