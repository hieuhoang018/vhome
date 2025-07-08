import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <>
      <footer
        style={{ backgroundColor: "#2b2b2b" }}
        className="text-white/80 pt-16 pb-8"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1 */}
            <div className="col-span-1 md:col-span-2">
              <Image
                src={"/images/logo.png"}
                alt="VHome logo"
                width={150}
                height={150}
              />
              <p className="mt-5">
                Creating beautiful, functional spaces with furniture that stands
                the test of time. Quality craftsmanship for everyday living.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-2xl mb-5 font-serif">Shop</h2>
              <Link className="hover:text-white" href={"/products"}>
                Living Room
              </Link>
              <Link className="hover:text-white" href={"/products"}>
                Dining Room
              </Link>
              <Link className="hover:text-white" href={"/products"}>
                Bathroom
              </Link>
              <Link className="hover:text-white" href={"/products"}>
                Bedroom
              </Link>
              <Link className="hover:text-white" href={"/products"}>
                Kitchen
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-2xl mb-5">Company</h2>
              <Link className="hover:text-white" href={"/about"}>
                About us
              </Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-2xl mb-5">Contact</h2>
              <div className="flex items-center gap-2">
                <MapPin />
                <span>Opiskelijankatu 123, Tampere</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone />
                <span>(+358) 46 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail />
                <span>vhome@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr
          className="my-8 border-t border-white/20 mx-auto"
          style={{ width: "97%" }}
        />

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <h2>VHome</h2>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link className="hover:text-white" href={"/terms"}>
                Terms of Service
              </Link>
              <Link className="hover:text-white" href={"/policy"}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
