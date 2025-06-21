import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute"
import AdminHeader from "@/components/admin-navbar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminHeader />
      <div>{children}</div>
    </ProtectedRoute>
  )
}
