import React from "react";
import Image from "next/image";
import {
  venImage1,
  venImage2,
} from "../ReusableComponenets/Icons";
import SectionLabel from "../ui/secionLabel";
import ArrowBtn from "../ui/arrowBtn";

const Partner = () => {
  return (
    <section className="w-full md:mt-52 mt-40 md:mb-28 mb-20 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col gap-20">
        {/* === Top Section === */}
        <div className="flex flex-col lg:flex-row lg:items-center item-start justify-between gap-10 lg:gap-16">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center items-start text-left w-full max-w-lg space-y-3 lg:space-y-5">
            <SectionLabel text="EVERYONE SAYS" />

            <h2 className="text-[#040444] text-3xl md:text-[45px] leading-[1.1] font-semibold">
              Be a Trusted <br className="hidden lg:block" />
              Vendora Partner
            </h2>

            <p className="text-[#252525] text-[14px] md:text-[20px] leading-relaxed">
              Supplying Quality Materials for <br /> Exceptional Interiors.
            </p>

            <ArrowBtn
              text="Contact us"
              backgroundColor="#ffffff"
              textColor="#000000"
            />
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[90%] flex justify-center">
            <Image
              src={venImage1}
              alt="Vendora Partner"
              className="w-full h-auto object-cover rounded-2xl shadow-sm"
              priority
            />
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Image */}
          <div className="w-full lg:w-[60%]">
            <Image
              src={venImage2}
              alt="Trusted Network"
              className="w-full h-[180px] md:h-[250px] lg:h-[280px] xl:h-[320px] object-cover rounded-3xl shadow-sm"
              priority
            />
          </div>

          {/* Right Text Block */}
          <div className="w-full lg:w-[50%] flex flex-col items-center md:items-end text-center md:text-right space-y-3 md:space-y-5">
            <h2 className="text-[#040444] text-3xl md:text-[45px] leading-[1.1] font-semibold">
              Our Trusted Network
            </h2>

            <p className="text-[#191919] text-[14px] md:text-[20px] leading-relaxed lg:max-w-md text-end">
              Our success is built on trusted partners. Together, we deliver
              quality, innovation, and exceptional spaces on time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
