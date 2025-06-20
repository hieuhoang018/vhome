"use client"

import { useUser } from "@/context/userContext"

export default function ProfilePage() {
  const { user, status, error } = useUser()
  console.log(user)

  if (status === "loading") return <p>Loading...</p>
  if (error) return <p>Not authorized. Please log in.</p>
  if (!user) return <p>no user</p>

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      {/* Update profile form */}
    </div>
  )
}
