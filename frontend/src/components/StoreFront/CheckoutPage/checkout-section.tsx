"use client"

import InputField from "@/components/input"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { CheckoutSessionResponse } from "@/types/stripe"
import { loadStripe } from "@stripe/stripe-js"

export default function CheckoutSection() {
  const { formData, handleChange, handleSubmit, error, loading } =
    useFormSubmit({
      initialData: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        streetAddress: "",
        city: "",
        zip: "",
        deliveryNotes: "",
      },
      onSubmit: async (data) => {
        const response = await api.post<CheckoutSessionResponse>(
          "/orders/checkout-session",
          data,
          {
            withCredentials: true,
          }
        )
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        )
        await stripe?.redirectToCheckout({
          sessionId: response.data.session.id,
        })
      },
    })

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex gap-6">
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="border rounded-lg bg-gray-100 p-6 mb-6">
            <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
            <InputField
              label="Email Address"
              placeholder="your@email.com"
              inputType="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
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
            <InputField
              label="Phone Number"
              placeholder="+358 12 345 6789"
              inputType="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="border rounded-lg bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>
            <InputField
              label="Street Address"
              placeholder="Opiskelijankatu 123"
              inputType="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
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
                  label="ZIP Code"
                  placeholder="10000"
                  inputType="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <InputField
              label="Delivery Notes (Optional)"
              placeholder="Special delivery instructions..."
              inputType="text"
              name="deliveryNotes"
              value={formData.deliveryNotes}
              onChange={handleChange}
            />
          </div>
          {error && <p>{error}</p>}
          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Continue to Payment
          </button>
        </form>
        <div className="flex-1">
          <div className="border rounded-lg bg-gray-100 p-6 mb-6">
            <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
