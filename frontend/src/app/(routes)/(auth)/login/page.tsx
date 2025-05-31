"use client"

import InputField from "@/components/AuthenticationPage/input"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-beige-yellow">
        <div className="flex flex-col justify-center items-center mb-6">
          <Image src={"/images/logo.png"} alt="logo" width={200} height={1} />
          <h2 className="font-serif text-4xl mb-3">Sign in to your account</h2>
          <h3 className="font-serif text-1xl">
            Or{" "}
            <Link
              href={"/register"}
              className="text-red-500 underline underline-offset-4"
            >
              create a new account
            </Link>
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <form>
            <InputField
              label="Email"
              placeholder="example@email.com"
              inputType="text"
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              inputType="password"
            />
            <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">
              Sign in
            </button>
            <div className="flex items-center justify-between mt-4">
              <label htmlFor="remember" className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-2"
                />
                Remember me
              </label>
              <span>
                <Link href={"/forgot"} className="text-red-500">
                  Forgot your password?
                </Link>
              </span>
            </div>
          </form>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </>
  )
}
