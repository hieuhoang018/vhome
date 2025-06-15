import ProductsSection from "@/components/ProductsListingPage/products-section"

const itemsPerPage = 8

export default function ProductListing() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        <div className="bg-beige-yellow py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4">
              Our Collection
            </h1>
            <p className="text-furniture-charcoal/70 max-w-2xl">
              Discover our carefully curated selection of modern furniture
              pieces designed to transform your living space.
            </p>
          </div>
        </div>

        <ProductsSection itemsPerPage={itemsPerPage} />
      </main>
    </div>
  )
}
