import LookUpSection from "@/components/AdminLookupPage/look-up-section";

export default function AdminLookupPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
              Admin Lookup
            </h1>
            <h2 className="text-2xl md:text-2xl font-serif text-furniture-charcoal mt-4">
              Search products, users and orders
            </h2>
          </div>
          <LookUpSection />
        </div>
      </main>
    </div>
  )
}
