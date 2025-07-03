"use client"

import { useUser } from "@/context/userContext"

export default function UserInformationSection() {
  const { user } = useUser()
  if (!user) {
    return <p>Not logged in...</p>
  }
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {/* For later
        Profile picture of user
      */}
      <p className="text-muted-foreground text-xl">
        Hi, <span className="font-bold"> {user.firstName}</span>
      </p>
      <p className="text-muted-foreground text-xl">
        You are of role: <span className="font-bold"> {user.role}</span>
      </p>
    </>
  )
}
