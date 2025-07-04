"use client"
import { Heart, ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavUserButton from "./user-button"
import { useUser } from "@/context/userContext"

export default function MainHeader() {
  const { user } = useUser()
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
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              alt="VHome logo"
              width={80}
              height={80}
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-20">
            <Link
              href="/"
              className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-furniture-charcoal hover:red font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-8">
            <NavUserButton />
            <Link href={"/wishlist"}>
              <Heart className="h-5 w-5" />
            </Link>
            <Link href={"/cart"}>
              <ShoppingCart className="h-5 w-5" />
            </Link>
            {user?.role === "admin" && (
              <Link href={"/dashboard"}>
                <button className="border cursor-pointer px-4 py-2 rounded-sm">
                  Back to Admin
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
