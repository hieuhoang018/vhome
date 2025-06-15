"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function useUpdateQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (params: Record<string, string | undefined>) => {
    const search = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        search.set(key, value)
      } else {
        search.delete(key)
      }
    })
    router.push(`${pathname}?${search.toString()}`)
  }
}
