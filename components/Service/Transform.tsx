import React from 'react'
import {
    
    RightColorArrow,
    TransformImage,
   
  } from "../ReusableComponenets/Icons";
  import {
    logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20, logo21, logo22, logo23,  logo24, logo25, logo26, logo27, logo28, logo29,
   
  } from "../ReusableComponenets/Icons";
  import Image from 'next/image';
import Link from 'next/link';

  const Transform = () => {

    const logos = [
      { logo: logo1 },
      { logo: logo2 },
      { logo: logo3 },
      { logo: logo4 },
      { logo: logo5 },
      { logo: logo6 },
      { logo: logo7 },
      { logo: logo8 },
      { logo: logo9 },
  
      { logo: logo10 },
      { logo: logo11 },
      // { logo: logo12 },
       { logo: logo13 },
        { logo: logo14 },
         { logo: logo15 },
      { logo: logo16 },
      { logo: logo17 },
      { logo: logo18 },
      { logo: logo19 },
      { logo: logo20 },
      // { logo: logo21 },
       { logo: logo22 },
      { logo: logo23 },
      { logo: logo24 },
      { logo: logo25 },
      { logo: logo26 },
      { logo: logo27 },
  
      { logo: logo28 },
      { logo: logo29 },
  
    ];
    
  return (
    <div className='bg-white'>
      <section className="md:mb-[150px] md:mb-[80px]">
        <div className="items-center flex flex-col space-y-5 md:mt-50">
          <h2 className="text-3xl md:text-[60px] font-medium md:leading-[64px] text-center text-[#040444]">
          Brands that Took Our Turnkey <br className="hidden md:block" /> Fit-out Service
          </h2>
          <div className="relative overflow-hidden w-full max-w-5xl h-[100px] bg-white mx-auto fade-mask mt-15">
            <div 
              className="flex items-center"
              style={{
                animation: "marquee 25s linear infinite",
                width: "fit-content"
              }}
            >
              {/* First set of logos */}
              {logos.map((item, index) => (
                <div key={`logo-1-${index}`} className="flex items-center justify-center mx-4 md:mx-8 h-[80px] w-[120px]">
                  <Image src={item.logo} alt="Client logo" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
              {/* Duplicate set of logos for seamless looping */}
              {logos.map((item, index) => (
                <div key={`logo-2-${index}`} className="flex items-center justify-center mx-4 md:mx-8 h-[80px] w-[120px]">
                  <Image src={item.logo} alt="Client logo" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:mt-40 mt-10 relative md:h-[560px] h-[250px]">
          <Image src={TransformImage} alt={"Transform"} className="w-full h-full  object-cover" />
          <div className="absolute inset-0 md:-top-35 -top-8 flex flex-col items-center justify-center -space-y-5 md:space-y-8 z-10">
            <p className="text-[15px] md:text-[55.91px] leading-[42px] font-semibold text-center text-white">
              Transform Your Space with Us
            </p>
            <p className="text-[12px] mt-3  md:text-[25.92px] font-light md:leading-[42px] text-center text-[#F3F3F3] md:mt-1">
              Start your journey toward modern, functional, and inspiring
              interiors today.
            </p>
          </div>
          <Link href={"/contact"} className="cursor-pointer">
            <div className="absolute md:bottom-35 bottom-5 flex-row flex justify-center items-center w-full hover:scale-105 transition-all duration-300 z-20">
              <button className="md:px-8 px-4 md:py-3 py-1 text-[#040444] bg-white rounded-full cursor-pointer  whitespace-nowrap">
                Contact Us
              </button>
              <a>
                <div className="md:w-12 md:h-12 w-8 h-8 text-[#040444] bg-white rounded-full flex justify-center items-center">
                  <Image src={RightColorArrow} alt="right arrow" className="w-4 h-
                4" />
                </div>
              </a>
            </div>
          </Link>
        </div>
      </section>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Add this to pause animation on hover for better user experience */
        div:hover > div[style*="animation: marquee"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
    
  )
}

export default Transform
