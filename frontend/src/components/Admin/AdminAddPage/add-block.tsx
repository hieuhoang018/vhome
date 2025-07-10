import Link from "next/link"
import { Package, User } from "lucide-react"
import React from "react"

export default function AddBlock({
  title,
  subtitle,
  linkTo
}: {
  title: string
  subtitle: string
  linkTo: string
}) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center gap-3 min-w-100 bg-beige-yellow">
      {title === "Add Product" ? (
        <button className="rounded-full flex items-center justify-center bg-blue-500 text-white p-6 mb-4">
          <Package className="h-10 w-10" />
        </button>
      ) : title === "Add User" ? (
        <button className="rounded-full flex items-center justify-center bg-green-500 text-white p-6 mb-4">
          <User className="h-10 w-10" />
        </button>
      ) : null}
      <h1 className="font-bold text-2xl">{title}</h1>
      <h2 className="mb-7">{subtitle}</h2>
      <Link className="w-full" href={linkTo}>
        <button className="border rounded-lg p-2 w-full bg-navi-blue text-white hover:bg-navi-blue/90">
          {title}
        </button>
      </Link>
    </div>
  )
}
