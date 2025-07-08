import InformationSettingsTab from "@/components/StoreFront/UserSettingsPage/information-setting-tab"
import UserInformationSection from "@/components/StoreFront/UserSettingsPage/user-information-section"

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <UserInformationSection />
        </div>
        <InformationSettingsTab />
      </div>
    </div>
  )
}
