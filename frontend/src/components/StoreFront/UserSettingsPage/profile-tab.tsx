"use client"

import InputField from "../../input"
import api from "@/lib/axios"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { toast } from "sonner"

export default function ProfileTab() {
  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "",
      },
      onSubmit: async (data) => {
        await api.patch("/users/update-information", data)
        window.location.reload() // TODO
        toast.success("Information changed successfully")
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-medium mb-2">Personal Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <InputField
            label="First Name"
            placeholder="John"
            inputType="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <InputField
            label="Last Name"
            placeholder="Doe"
            inputType="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <h1 className="text-lg font-medium mb-2">Contact Information</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <InputField
            label="Email"
            placeholder="example@gmail.com"
            inputType="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <InputField
            label="Phone Number"
            placeholder="+358 01 234 5678"
            inputType="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <h1 className="text-lg font-medium mb-2">Address</h1>
      <InputField
        label="Street Address"
        placeholder="Opiskeljiankatu 123"
        inputType="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <InputField
            label="City"
            placeholder="Tampere"
            inputType="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <InputField
            label="Zip Code"
            placeholder="33720"
            inputType="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <InputField
            label="Country"
            placeholder="Finland"
            inputType="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          Save Information
        </button>
      </div>
    </form>
  )
}
