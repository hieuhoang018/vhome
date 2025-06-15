"use client"
import PasswordTab from "./password-tab"
import ProfileTab from "./profile-tab"
import TabButton from "./tab-button"
import { useState } from "react"

export default function InformationSettingsTab() {
  const [activeTab, setActiveTab] = useState("profile")
  return (
    <div className="col-span-2 bg-white rounded-lg shadow p-6">
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        <TabButton
          tabName="profile"
          activeTab={activeTab}
          onClick={() => setActiveTab("profile")}
        />
        <TabButton
          tabName="password"
          activeTab={activeTab}
          onClick={() => setActiveTab("password")}
        />
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfileTab />}

      {activeTab === "password" && <PasswordTab />}
    </div>
  )
}
