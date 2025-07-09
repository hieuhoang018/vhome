"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavUserButton from "./user-button"
import { Menu, X } from "lucide-react"

export default function AdminHeader() {
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

          {/* Hamburger button for mobile */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-furniture-charcoal border-furniture-charcoal"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-20">
            <button className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer font-medium transition-colors focus:outline-none p-2 rounded-sm">
              <Link
                href="/dashboard"
                className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
              >
                Dashboard
              </Link>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer font-medium transition-colors focus:outline-none p-2 rounded-sm">
              <Link
                href="/create-product"
                className="text-furniture-charcoal hover:red font-medium transition-colors"
              >
                Create Product
              </Link>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer font-medium transition-colors focus:outline-none p-2 rounded-sm">
              <Link
                href="/lookup"
                className="text-furniture-charcoal hover:red font-medium transition-colors"
              >
                Look Up
              </Link>
            </button>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <NavUserButton isMobile={false} />
            <Link href={"/"}>
              <button className="border cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-sm">
                View Store
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-sm px-4 pt-2 pb-4 absolute top-full left-0 right-0 z-40">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/create-product"
                className="text-furniture-charcoal hover:red font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Create Product
              </Link>
              <Link
                href="/lookup"
                className="text-furniture-charcoal hover:red font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Look Up
              </Link>
              <NavUserButton isMobile={true} />
              <Link href={"/"}>
                  View Store
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
