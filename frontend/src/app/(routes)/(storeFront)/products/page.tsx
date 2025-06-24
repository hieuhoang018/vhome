import ProductsSection from "@/components/StoreFront/ProductsListingPage/products-section"
import { TitleCardWrapper } from "@/components/StoreFront/storefront-wrappers"

const itemsPerPage = 8

export default function ProductListing() {
  return (
    <>
      <TitleCardWrapper>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4">
          Our Collection
        </h1>
        <p className="text-furniture-charcoal/70 max-w-2xl">
          Discover our carefully curated selection of modern furniture pieces
          designed to transform your living space.
        </p>
      </TitleCardWrapper>

      <ProductsSection itemsPerPage={itemsPerPage} />
    </>
  )
}
