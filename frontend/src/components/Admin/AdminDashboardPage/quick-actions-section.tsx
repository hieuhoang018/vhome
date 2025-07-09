import { Package, Plus, Users } from "lucide-react"
import Link from "next/link"

export default function QuickActionsSection() {
  return (
    <div className="border rounded-lg bg-gray-100 p-4 mb-6">
      <h1 className="text-2xl font-bold mb-3">Quick Actions</h1>
      <div className="flex flex-wrap gap-4">
        <Link href="/create-product">
          <button className="border rounded-lg bg-navi-blue hover:bg-navi-blue/90 text-white flex items-center p-3">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </button>
        </Link>
        <button className="border rounded-lg bg-white hover:bg-gray-400/90 flex items-center p-3">
          <Users className="h-4 w-4 mr-2" />
          Create User
        </button>
      </div>
    </div>
  )
}
