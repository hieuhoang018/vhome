"use client"

import InputField from "../../input"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"

export default function PasswordTab() {
  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        passwordCurrent: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: async (data) => {
        await api.patch("/users/update-password", data)
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-medium mb-2">Update Password</h1>
      <InputField
        label="Current Password"
        placeholder="Enter your current password"
        inputType="password"
        name="passwordCurrent"
        value={formData.passwordCurrent}
        onChange={handleChange}
      />
      <InputField
        label="New Password"
        placeholder="Enter your new password"
        inputType="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        label="Confirm Password"
        placeholder="Confirm your new password"
        inputType="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <hr className="my-8 border-gray-200" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </div>
    </form>
  )
}
