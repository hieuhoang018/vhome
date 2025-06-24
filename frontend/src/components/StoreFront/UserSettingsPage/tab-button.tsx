import React from "react"

export default function TabButton({
  tabName,
  onClick,
  activeTab,
}: {
  tabName: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  activeTab: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-1/2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        activeTab === tabName
          ? "bg-white shadow text-blue-600"
          : "text-gray-500 hover:bg-white hover:shadow"
      }`}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  )
}
