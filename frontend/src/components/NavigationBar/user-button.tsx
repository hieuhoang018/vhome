import { useUser } from "@/context/userContext"
import api from "@/lib/axios"
import { User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function NavUserButton() {
  const { user, refreshUser } = useUser()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  async function handleLogOut() {
    try {
      await api.post("/users/logout")
      refreshUser()
      router.push("/")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return user ? (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 text-furniture-charcoal hover:text-furniture-navy font-medium transition-colors focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <User className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
          <Link href={"/profile"}>
            <button className="block w-full text-left px-4 py-2 text-furniture-charcoal hover:bg-gray-100">
              Settings
            </button>
          </Link>
          <button
            onClick={handleLogOut}
            className="block w-full text-left px-4 py-2 text-furniture-charcoal hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link href={"/login"}>
      <User className="h-5 w-5" />
    </Link>
  )
}
