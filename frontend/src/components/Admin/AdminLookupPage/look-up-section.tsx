"use client"

import { useState } from "react"
import TabButton from "../../StoreFront/UserSettingsPage/tab-button"
import UsersTab from "./users-tab"
import ProductsTab from "./products-tab"
import OrdersTab from "./orders-tabs"
import CartsTab from "./carts-tab"

export default function LookUpSection() {
  const [activeTab, setActiveTab] = useState("users")
  return (
    <div className="border rounded-lg bg-gray-100 p-6">
      <div className="flex mb-6 bg-gray-200 p-1 rounded-lg">
        <TabButton
          tabName="users"
          activeTab={activeTab}
          onClick={() => setActiveTab("users")}
        />
        <TabButton
          tabName="products"
          activeTab={activeTab}
          onClick={() => setActiveTab("products")}
        />
        <TabButton
          tabName="orders"
          activeTab={activeTab}
          onClick={() => setActiveTab("orders")}
        />
        <TabButton
          tabName="carts"
          activeTab={activeTab}
          onClick={() => setActiveTab("carts")}
        />
      </div>

      {activeTab === "users" && <UsersTab />}
      {activeTab === "products" && <ProductsTab />}
      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "carts" && <CartsTab />}
    </div>
  )
}
