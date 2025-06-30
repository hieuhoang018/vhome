import CheckoutSection from "@/components/StoreFront/CheckoutPage/checkout-section";
import { TitleCardWrapper } from "@/components/StoreFront/storefront-wrappers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  return(
    <>
      <TitleCardWrapper>
        <Link
          href={"/cart"}
          className="text-furniture-charcoal/70 max-w-2xl flex items-center hover:text-red-500"
        >
          <ArrowLeft className="h-4" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
          Checkout Information
        </h1>
      </TitleCardWrapper> 
      <CheckoutSection />   
    </>
  )
}