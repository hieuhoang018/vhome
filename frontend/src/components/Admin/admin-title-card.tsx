export default function AdminTitleCard({
  header,
  subtitle,
}: {
  header: string
  subtitle: string
}) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
        {header}
      </h1>
      <h2 className="mt-3 text-2xl font-serif text-gray-400">
        {subtitle}
      </h2>
    </div>
  )
}
