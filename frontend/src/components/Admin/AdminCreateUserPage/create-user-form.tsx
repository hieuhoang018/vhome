"use client"

import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import InputField from "../../input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateUserForm() {
  const router = useRouter()
  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        role: "",
      },
      onSubmit: async (data) => {
        await api.post("/users", data)
        toast.success("User created")
        router.push("/dashboard")
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg bg-gray-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="First Name"
              placeholder="John"
              inputType="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              placeholder="Doe"
              inputType="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <InputField
            label="Email Address"
            placeholder="example@gmail.com"
            inputType="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            placeholder="+358 12 345 6789"
            inputType="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="rounded-lg bg-gray-100 border shadow-sm px-4 py-7">
          <h2 className="font-bold text-2xl mb-4">Security Settings</h2>
          <InputField
            label="Role"
            placeholder="user"
            inputType="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            inputType="text"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            label="Confirm Password"
            inputType="text"
            name="confirmPassword"
            placeholder="Confirm the password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="border px-4 bg-navi-blue text-white py-2 rounded hover:bg-navi-blue/90 disabled:bg-gray-400 "
        >
          Create User
        </button>
      </div>
    </form>
  )
}
