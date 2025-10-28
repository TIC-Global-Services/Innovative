import Image from "next/image"
import { Interior } from "../ReusableComponenets/Icons";

const ServicesSection = () => {
  return (
    <div className="w-full  lg:mt-36 mt-5   mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="w-full lg:w-[45%] lg:pr-8 py-8">
          <div className="space-y-12">
            <div className="lg:hidden w-full h-[400px] rounded-xl bg-[#E5EAEB] my-8 flex items-end justify-center">
              <Image src={Interior} alt="Furniture detail" width={180} height={180} className="object-cover h-full w-full rounded-xl" />
            </div>
            {/* Service 1 */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-[#0A0A50]">
                Comprehensive Turnkey Contracting
              </h2>
              <p className="text-gray-700 text-[14px] md:text-base leading-relaxed">
                From flooring to ceiling and everything in between, we handle every aspect of your interior project with
                structured coordination and technical excellence.
              </p>
              <div className="w-full h-px bg-gray-500 mt-6"></div>
            </div>

            {/* Service 2 */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-[#0A0A50]">Civil Construction</h2>
              <p className="text-gray-700 text-[14px] md:text-base  leading-relaxed">
                From foundational works to structural modifications, our civil team ensures robust construction aligned
                with project needs — enabling seamless integration with interior execution for High end Residentail, Commercial and Industrial spaces.
              </p>
              <div className="w-full h-px bg-gray-500 mt-6"></div>
            </div>


            {/* Service 4 */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-[#0A0A50]">
                Supply & Execution of Superior Quality Woodwork
              </h2>
              <p className="text-gray-700 text-[14px] md:text-base  leading-relaxed">
                Supported by our in-house manufacturing unit, we deliver high-grade woodwork that meets the highest
                benchmarks in finish and detailing.
              </p>
              <div className="w-full h-px bg-gray-500 mt-6"></div>
            </div>
          </div>
        </div>

        {/* Center Divider with Image - Only visible on desktop */}
        <div className="hidden lg:block relative w-[10%] flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full bg-[#E5EAEB] rounded-4xl flex items-end justify-center">
              <Image
                src={Interior}
                alt="Furniture detail"
                width={1000}
                height={1000}
                className="object-cover rounded-4xl  h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className=" w-full lg:w-[45%] lg:px-8 py-8">
          <div className="space-y-12">
            {/* Service 5 */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-[#0A0A50]">Design-Build <br className="lg:block xl:hidden 2xl:hidden hidden " /> Solutions</h2>
              <p className="text-gray-700 text-[14px] md:text-base  leading-relaxed">
                A streamlined approach where we handle both design and execution under one roof — ensuring faster
                delivery, cost efficiency, and design integrity.
              </p>
              <div className="w-full h-px bg-gray-500 mt-6"></div>
            </div>

            {/* Service 6 */}
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold text-[#0A0A50]">
            Manufacturer of customized modular & solid wood furniture
              </h2>
              <p className="text-gray-700 text-[14px] md:text-base  leading-relaxed">
                We craft and supply bespoke furniture tailored to the uniqueness of each space — blending luxury
                aesthetics with durable function.
              </p>
              <div className="w-full h-px bg-gray-500 mt-6"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default ServicesSection;