import Image from "next/image"
import Link from "next/link"
import SignupForm from "@/components/AuthenticationPage/signup-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-beige-yellow">
      <div className="flex flex-col justify-center items-center mb-6">
        <Image src={"/images/logo.png"} alt="logo" width={200} height={1} />
        <h2 className="font-serif text-4xl mb-3">Create a new account</h2>
        <h3 className="font-serif text-1xl">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-red-500 underline underline-offset-4"
          >
            Sign in
          </Link>
        </h3>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <SignupForm />

        <Link
          href="/"
          className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow transition"
        >
          ← Back
        </Link>
      </div>
    </div>
  )
}
