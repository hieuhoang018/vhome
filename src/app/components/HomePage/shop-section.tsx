import livingRoomImage from "@/app/assets/living-room.png"
import bedroomImage from "@/app/assets/bedroom.png"
import bathoomImage from "@/app/assets/bathroom.png"
import kitchenImage from "@/app/assets/kitchen.png"
import FeaturedRoom from "./featured-room"

export default function ShopSection() {
  const categories = [
    {
      name: "Living Room",
      description:
        "Create a welcoming space with our stylish sofas, coffee tables, and accent pieces.",
      imageSrc: livingRoomImage,
      link: "/living-room",
    },
    {
      name: "Bedroom",
      description:
        "Transform your bedroom into a sanctuary with our elegant beds and storage solutions.",
      imageSrc: bedroomImage,
      link: "/bedroom",
    },
    {
      name: "Bathroom",
      description:
        "Transform your bathroom with elegant and practical furniture solutions.",
      imageSrc: bathoomImage,
      link: "/bathroom",
    },
    {
      name: "Kitchen",
      description:
        "Discover stylish and functional kitchen furniture designed to elevate your space.",
      imageSrc: kitchenImage,
      link: "/kitchen",
    },
  ]

  return (
    <>
      <section className="p-10 section-padding bg-furniture-offwhite">
        <div className="container mx-auto">
          <h1 className="text-center font-serif font-semibold text-4xl m-5 mt-10">Shop By Room</h1>
          <p className="text-center text-xl text-furniture-charcoal/70 max-w-200 mx-auto">
            Find the perfect pieces for every space in your home. Each category
            features carefully selected items that blend style, function, and
            quality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
            {categories.map((category) => {
              return <FeaturedRoom key={category.name} room={category} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}
