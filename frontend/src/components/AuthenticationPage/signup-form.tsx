"use client"

import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import InputField from "../input"
import Link from "next/link"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useUser } from "@/context/userContext"

export default function SignupForm() {
  const router = useRouter()
  const { refreshUser } = useUser()

  const { formData, handleChange, handleSubmit, error } =
    useFormSubmit({
      initialData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: async (data) => {
        await api.post("/users/signup", data)
        refreshUser()
        router.push("/")
      },
    })

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
