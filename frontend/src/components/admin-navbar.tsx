"use client"

import { LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AdminHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-5"
        }
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src={"/images/logo.png"}
              alt="VHome logo"
              width={80}
              height={80}
            />
            <span className="text-xl font-semibold text-furniture-charcoal">
              Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-20">
            <Link
              href="/dashboard"
              className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/create-product"
              className="text-furniture-charcoal hover:red font-medium transition-colors"
            >
              Create Product
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href={"/"}>
              <button className="border cursor-pointer px-4 py-2 rounded-sm">
                View Store
              </button>
            </Link>
            <Link href={"/login"}>
              <LogOut />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
