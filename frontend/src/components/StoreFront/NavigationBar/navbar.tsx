"use client"
import { Heart, ShoppingCart, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavUserButton from "./user-button"
import { useUser } from "@/context/userContext"

export default function MainHeader() {
  const { user } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-20">
            <Link
              href="/"
              className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
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

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-8">
            <NavUserButton isMobile={false} />
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            {user?.role === "admin" && (
              <Link href="/dashboard">
                <button className="border cursor-pointer px-4 py-2 rounded-sm">
                  Back to Admin
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-furniture-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col p-4 space-y-4">
              <Link className="font-medium" href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link className="font-medium" href="/products" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
              <Link className="font-medium" href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link className="font-medium" href="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist
              </Link>
              <Link className="font-medium" href="/cart" onClick={() => setMenuOpen(false)}>
                My Cart
              </Link>
              <NavUserButton isMobile={true} />
              {user?.role === "admin" && (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <button className="border px-4 py-2 rounded-sm w-full text-left">
                    Back to Admin
                  </button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
