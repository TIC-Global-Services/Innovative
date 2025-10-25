import { PartnerImage1, PartnerImage2 } from "../ReusableComponenets/Icons"
import Image from "next/image"
import PartnerImage from "@/public/Bike scene 10.png"

const WhyPartner = () => {
  return (
    <div className="container mx-auto md:px-4 mt-40">
      <section className="flex flex-col justify-center items-center py-10">
        <div className="flex flex-col justify-center items-center space-y-5 w-full mb-10">
          <h2 className="text-3xl md:text-[60px] text-center md:text-left text-[#040444] md:leading-[69.12px] leading-tight font-medium">
            Partner with us to supply at scale
          </h2>
        </div>

        {/* Hero image section */}
        <div className="relative px-4 w-full rounded-lg overflow-hidden h-[400px] md:h-[400px] lg:h-[500px] mb-8">
          <Image src={PartnerImage || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />

          {/* Text content - absolutely positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
            <div className="max-w-[1200px] ">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[43px] text-white font-medium leading-tight">
                High-Volume Procurement
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-white leading-normal mt-2 md:w-[50%]">
              We source materials in bulk for large-scale production and on-site execution — ensuring consistency, speed, and reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Two column section */}
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-8  w-full">
          {/* First column */}
          <div className="flex flex-col space-y-4">
            <div className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-md">
              <Image
                src={PartnerImage1 || "/placeholder.svg"}
                alt="Iconic Projects"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-[45px] font-medium lg:text-[45px] text-[#040444] font-medium leading-tight">
                Iconic Projects, Meaningful Impact
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[#141414] font-normal mt-2">
                Collaborate on high-value interiors across luxury residential, commercial, and hospitality spaces.
              </p>
            </div>
          </div>

          {/* Second column */}
          <div className="flex flex-col space-y-4 ">
            <div className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-md">
              <Image
                src={PartnerImage2 || "/placeholder.svg"}
                alt="Sustainable Manufacturing"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] text-[#040444] font-medium leading-tight">
                Reliable Partnerships
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#141414] font-normal mt-2">
                Premium materials and advanced construction techniques to ensure durability and a long lifespan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyPartner
