"use client"

import { createContext, useContext } from "react"
import useSWR from "swr"
import axios from "axios"
import type { ReactNode } from "react"
import type { MeResponse, User } from "@/types/users"

const fetcher = async (): Promise<User> => {
  const res = await axios.get<MeResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
    { withCredentials: true }
  )
  return res.data.data.user
}

type UserContextType = {
  user: User | undefined
  status: "loading" | "authenticated" | "unauthenticated"
  error: Error | undefined
  refreshUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("user", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60_000, // avoid repeated calls within 1 minute
  })

  const status = isLoading
    ? "loading"
    : error
    ? "unauthenticated"
    : user
    ? "authenticated"
    : "unauthenticated"

  const refreshUser = () => mutate(undefined, { revalidate: true })

  return (
    <UserContext.Provider value={{ user, error, status, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
