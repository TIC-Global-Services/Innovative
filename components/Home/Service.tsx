"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {hotel, residential, health, work, retail, factory} from '@/components/ReusableComponenets/Icons'
// Import Splide
import Splide from "@splidejs/splide"
import "@splidejs/splide/css"
import SectionLabel from "../ui/secionLabel"
import ArrowBtn from "../ui/arrowBtn"

const Service = () => {
  const splideRef = useRef<Splide | null>(null)

  const images = [
    {
      image: hotel,
      title: "HOTELS",
      description: "Trusted execution partners for high-end hotels and guest spaces.",
    },
    {
      image: residential,
      title: "RESIDENTIAL",
      description: "Executing premium homes with precision, finish, and timely delivery..",
    },
    {
      image: health,
      title: "HEALTH CARE",
      description: "Delivering sterile, functional environments built to medical standards.",
    },
    {
      image: work,
      title: "WORKSPACES",
      description: "Building efficient, modern offices ready for immediate use.",
    },
    {
      image: retail,
      title: "RETAIL",
      description:" Crafting distinctive retail spaces  that elevates brand identity and enhance customer experience.",
    },
    {
      image: factory,
      title: "FACTORIES & WAREHOUSES",
      description: "Delivering efficient, durable, and future-ready industrial spaces",
    },
  ]

  useEffect(() => {
    // Initialize Splide
    if (document.querySelector(".splide")) {
      splideRef.current = new Splide(".splide", {
        type: "fade", // Using fade for smoother transitions
        rewind: true,
        perPage: 1,
        gap: "0px",
        arrows: false,
        pagination: true, // Enable pagination dots
        autoplay: true,
        interval: 5000, // 5 seconds per slide
        speed: 1000, // Transition speed in ms
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Smooth easing
        pauseOnHover: false,
        breakpoints: {
          768: {
            perPage: 1,
          },
          480: {
            perPage: 1,
          },
        },
      }).mount()
    }

    // Cleanup function
    return () => {
      if (splideRef.current) {
        splideRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full mt-10  md:mb-80 justify-center items-center">
      {/* Section Label */}
      <div className="flex justify-center items-center">
        <SectionLabel text="OUR SERVICE" backgroundColor="#F8F8F8" textColor="#141414" />
      </div>

      {/* Section Title */}
      <div className="text-[#040444] w-full justify-center text-center items-center text-[17px] md:text-[60px] md:leading-[70.4px] md:mt-5 mb-5">
      Trunkey Contracting Solutions
      </div>

      {/* Splide Slider with Custom Styling */}
      <div className="splide md:mt-10  relative mx-auto">
        <style jsx global>{`
          /* Custom styles for Splide */
          .splide__pagination {
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 30;
          }
          
          .splide__pagination__page {
            background: rgba(255, 255, 255, 0.5);
            width: 10px;
            height: 10px;
            margin: 0 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          
          .splide__pagination__page.is-active {
            background: white;
            transform: scale(1.3);
          }
          
          /* Smooth transitions */
          .splide__slide {
            transition: opacity 0.8s ease;
          }
          
          /* Custom image styling with specific border radius */
          .custom-image-radius {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          
          @media (min-width: 768px) {
            .custom-image-radius {
              border-top-left-radius: 40px;
              border-top-right-radius: 40px;
              border-bottom-left-radius: 40px;
              border-bottom-right-radius: 40px; 
            }
            
            .splide__pagination__page {
              width: 12px;
              height: 12px;
            }
          }
        `}</style>

        <div className="splide__track ">
          <ul className="splide__list">
            {images.map((item, index) => (
              <li className="splide__slide" key={index}>
                <div className="relative">
                  {/* Image with custom border radius - centered */}
                  <div className="relative w-full md:h-[70vh] h-[50vh] flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover custom-image-radius rounded-2xl"
                      priority={index === 0}
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-10 md:bottom-8 left-6 md:left-16  max-w-[80%] md:max-w-[60%]">
                    <h3 className="text-[24px] md:text-[45px] lg:text-[45px] leading-[25px] md:leading-[40px] lg:leading-[60px] text-white font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-[17px] md:text-[20px]  text-white leading-[15px] md:leading-[24px] lg:leading-[22px] md:mt-0 mt-1 ">
                      {item.description}
                    </p>

                    {/* Learn More Button */}
                    <div className="mt-4 md:mt-5">
                      <ArrowBtn text="View More" backgroundColor="white" textColor="#040444" href="/projects" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Service