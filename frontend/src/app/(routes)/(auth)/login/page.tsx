import Image from "next/image"
import Link from "next/link"
import LoginForm from "@/components/AuthenticationPage/login-form"
import {
  FormWrapper,
  TitleWrapper,
} from "@/components/AuthenticationPage/wrappers"

export default function LoginPage() {
  return (
    <div>
      <TitleWrapper>
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
      </TitleWrapper>
      <FormWrapper>
        <LoginForm />
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
      </FormWrapper>
      <Link
        href="/"
        className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow transition"
      >
        ← Back
      </Link>
    </div>
  )
}
