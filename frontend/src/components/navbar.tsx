"use client"

import { Heart, Search, ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function MainHeader() {
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
          <div className="hidden md:flex items-center space-x-4">
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              onClick={() => (window.location.href = "/login")}
            >
              <User className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
