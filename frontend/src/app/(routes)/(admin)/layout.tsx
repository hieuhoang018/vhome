import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute"
import AdminHeader from "@/components/StoreFront/NavigationBar/admin-navbar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminHeader />
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16">
          <div className="container mx-auto px-4">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
