"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/userContext"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: Props) => {
  const { user, status } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(redirectTo)
    } else if (
      status === "authenticated" &&
      allowedRoles &&
      !allowedRoles.includes(user?.role || "")
    ) {
      router.replace("/unauthorized")
    }
  }, [status, user, router, allowedRoles, redirectTo])

  if (status === "loading") return <div>Loading...</div>

  if (
    status === "authenticated" &&
    allowedRoles &&
    !allowedRoles.includes(user?.role || "")
  ) {
    return <div>Unauthorized</div>
  }
  return <>{children}</>
}
