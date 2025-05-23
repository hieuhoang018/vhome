import Image from "next/image"
import logo from "@/app/assets/logo.png"

export default function Footer() {
  return (
    <>
      <footer
        style={{ backgroundColor: "#2b2b2b" }}
        className="text-white/80 pt-16 pb-8"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-5 gap-15">
            {/* Column 1 */}
            <div className="col-span-2">
              <Image src={logo} alt="VHome logo" width={150} />
              <p className="mt-5">
                Creating beautiful, functional spaces with furniture that stands
                the test of time. Quality craftsmanship for everyday living.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h2 className="font-semibold text-2xl mb-5 font-serif">Shop</h2>
              <p>Room 1</p>
              <p>Room 2</p>
              <p>Room 3</p>
              <p>Room 4</p>
              <p>Room 5</p>
            </div>

            {/* Column 3 */}
            <div>
              <h2 className="font-semibold text-2xl mb-5">Company</h2>
              <p>Row</p>
              <p>Row</p>
              <p>Row</p>
            </div>

            {/* Column 4 */}
            <div>
              <h2 className="font-semibold text-2xl mb-5"> Contact</h2>
              <p>Row</p>
              <p>Row</p>
              <p>Row</p>
            </div>
          </div>
        </div>
        <hr
          className="my-8 border-t border-white/20 mx-auto"
          style={{ width: "97%" }}
        />
        <div>
          <div className="container mx-auto">
            <h2>VHome</h2>
          </div>
        </div>
      </footer>
    </>
  )
}
