import ProductListingSection from "@/components/SingleProductPage/product-listing"

export default function IndividualProductListing() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="pt-30 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-6">
            <ProductListingSection />
          </div>
        </main>
      </div>
    </>
  )
}
