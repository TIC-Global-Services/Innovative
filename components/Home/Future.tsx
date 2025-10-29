import React from "react";
import Image from "next/image";
import ArrowBtn from "../ui/arrowBtn";
import image1 from "@/public/home/Future/1.png"
import image1m from "@/public/home/Future/1m.png"
import image2 from "@/public/home/Future/2.png"
import image3 from "@/public/home/Future/3.png"


const Future = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-[25px] md:text-[60px] md:leading:[64.8px] text-[#040444]">
          Shaping the Future
        </div>
        <div className="hidden sm:block md:block">
          <ArrowBtn
            text="Let's talk"
            backgroundColor="#040444"
            textColor="white"
            href="/"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 lg:gap-6 mt-10">
        {/* Left Column (Large Image) */}
        <div className="relative rounded-[40px] overflow-hidden h-full min-h-[400px]">
          {/* Desktop Image */}
          <Image
            src={image1}
            alt="furniture"
            className="hidden md:block object-cover w-full h-full"
          />

          {/* Mobile Image */}
          <Image
            src={image1m}
            alt="furniture"
            className="md:hidden object-cover w-full h-[560px]"
          />

          {/* Text Overlay - Different positioning for mobile vs desktop */}
          <div className="absolute inset-0 flex flex-col md:justify-end justify-start 2xl:px-5 xl:px-5 lg:px-3 px-3 py-1 lg:py-3 2xl:py-0 xl:py-1">
            <div className="max-w-[210px] md:max-w-[350px] lg:max-w-[320px] xl:max-w-[290px] 2xl:max-w-[380px]">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-2xl font-medium text-[#141414] 2xl:mb-2 xl:mb-0 lg:mb-0 mb-1">
                Interior Turnkey
              </h3>
              <p className="text-[11px] sm:text-sm md:text-base lg:text-md text-[#141414] xl:leading-relaxed">
                Delivering precision-built interiors with assured quality and
                on-time execution.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Two Smaller Images) */}
        <div className="space-y-6 md:space-y-8 bg-white">
          {/* Top Image - Furniture */}
          <div className="relative rounded-[40px] overflow-hidden h-[48%] min-h-[300px]">
            <Image
              src={image2}
              alt="Interior"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-end xl:px-0 lg:px-2 md:px-14 xl:py-2 py-5 md:py-5 px-0">
              <div className=" max-w-[210px] md:max-w-[280px] lg:max-w-[280px] xl:max-w-[290px] 2xl:max-w-[360px] text-left">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-2xl font-medium text-[#141414] xl:mb-0 lg:mb-0 mb:1">
                  Furniture
                </h3>
                <p className="text-[11px] sm:text-sm md:text-base lg:text-md text-[#141414] xl:leading-relaxed">
                  Factory-made furniture built for durability, comfort, and
                  lasting finish.
                </p>
              </div>
            </div>
          </div>
          

          {/* Bottom Image - Exterior */}
          <div className="relative rounded-[40px] overflow-hidden h-[48%] min-h-[300px]">
            <Image
              src={image3}
              alt="Exterior"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-end xl:px-5 lg:px-5 md:px-10 2xl:py-5 xl:py-0 lg:py-2 py-4 md:py-0 px-1">
              <div className=" max-w-[210px] md:max-w-[280px] lg:max-w-[2820px] xl:max-w-[280px] 2xl:max-w-[380px] ">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-2xl font-medium text-[#141414] xl:mb-2 lg:mb-0  mb-1">
                  Civil construction
                </h3>
                <p className="text-[11px] sm:text-sm md:text-base lg:text-[14px] text-[#141414] xl:leading-relaxed">
                  Reliable civil execution with structural accuracy and timely
                  delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Future;