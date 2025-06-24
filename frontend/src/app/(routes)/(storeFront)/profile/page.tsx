import InformationSettingsTab from "@/components/UserSettingsPage/information-setting-tab"

export default function UserSettingsPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p className="text-muted-foreground">User details go here.</p>
        </div>
        <InformationSettingsTab />
      </div>
    </div>
  )
}
