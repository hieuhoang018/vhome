import StatisticsBlock from "./statistics-block"

export default function StatisticsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatisticsBlock title="Total Products" apiEndpoint="/products" />
      <StatisticsBlock title="Total Users" apiEndpoint="/users" />
      <StatisticsBlock title="Total Orders" apiEndpoint="/orders" />
      <div>
        <h1>col</h1>
      </div>
    </div>
  )
}
