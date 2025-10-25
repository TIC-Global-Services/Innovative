"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Pic1, Pic2, Pic3, Pic4 } from "../ReusableComponenets/Icons"
import SectionLabel from "../ui/secionLabel"

const Content = () => {
  // Timeline data with years, titles, and images
  const timelineData = [
    {
      year: "2005",
      title: "Initiated Execution",
      content: "Lorem ipsum dolor sit amet, consectetur",
      image: Pic1,
    },
    {
      year: "2017",
      title: "High-Scale Production",
      content: "Lorem ipsum dolor sit amet, consectetur",
      image: Pic3,
    },
    {
      year: "2019",
      title: "Peak Momentum",
      content: "Lorem ipsum dolor sit amet, consectetur",
      image: Pic4,
    },
    {
      year: "Present",
      title: "Expanding Boundaries",
      content: "Lorem ipsum dolor sit amet, consectetur",
      image: Pic2,
    },
  ]

  // State for active tab
  const [activeTab, setActiveTab] = useState(0)
  const imagesPreloaded = useRef(false)

  // Safely preload images only in browser environment
  useEffect(() => {
    // Skip if already preloaded or if not in browser
    if (imagesPreloaded.current || typeof window === "undefined") return

    // Mark as preloaded to avoid duplicate work
    imagesPreloaded.current = true

    // Safely preload images
    const preloadImages = () => {
      timelineData.forEach((item) => {
        if (item.image && item.image.src) {
          // Create a hidden image element to preload
          const preloadLink = document.createElement("link")
          preloadLink.rel = "preload"
          preloadLink.as = "image"
          preloadLink.href = item.image.src
          document.head.appendChild(preloadLink)
        }
      })
    }

    // Execute preloading
    preloadImages()
  }, [])

  return (
    <div className=" mx-auto w-full">
      {/* Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 mt-10 md:mt-20 lg:mt-72">
        {/* Left Column */}
        <div className="flex flex-col space-y-5 items-center xl:items-start lg:items-start">
          <SectionLabel text="OUR VISION" />
          <h2 className="font-medium text-[20px] md:text-[40px] 2xl:text-[45px] leading-tight md:leading-tight 2xl:leading-[54px] font-medium text-center xl:text-left lg:text-left text-[#040444] max-w-3xl">
            Bringing Life Into Spaces With Craftsmanship That Speaks for Itself.
          </h2>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center">
          <p className="font-normal text-[14px] md:text-[20px] lg:text-left text-center xl:text-left text-[#393535]">
            Innovative Interiors is a leading turnkey contracting company specializing in architect designed - project
            execution and fine woodworking. With over 19 years of experience, we've partnered with India's finest
            architects and brands to bring spaces to life — from iconic 5-star hotels and super-specialty hospitals to
            luxury residences, corporate offices, and flagship retail outlets.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      {/* <div className="mt-20 md:mt-32 lg:mt-40 ">
        <div className="flex justify-center">
          <SectionLabel text="TIMELINE" />
        </div>

        <h2 className="text-[#040444] my-2 text-center font-medium text-[20px] md:text-[42px] lg:text-[45px] 2xl:text-[60px] leading-tight md:leading-tight mt-4 mb-20 md:mb-25 lg:mb-35">
          A Legacy of Transforming Spaces
        </h2>

        
        <div className="relative w-full ">
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%]">
            <div className="bg-white  md:rounded-[65px] shadow-lg flex overflow-hidden rounded-lg">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  className={`flex-1 flex flex-col items-center justify-center py-4 md:py-8 2xl:py-10 px-2 transition-all duration-300 relative overflow-hidden rounded-l-lg cursor-pointer  ${
                    activeTab === index ? "text-white" : "text-[#9A9A9A]"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
    
                  {activeTab === index && <div className="absolute inset-0 bg-[#040444] z-0 "></div>}

                  <div className="relative z-10 flex flex-col items-center w-full">
                    <span className="font-semibold text-[14px] md:text-xl lg:text-2xl 2xl:text-3xl">{item.year}</span>

                    <div
                      className={`h-[2px] md:h-[3px] w-12 md:w-16 lg:w-20 my-2 md:my-3 ${
                        activeTab === index ? "bg-white" : "bg-[#9A9A9A]"
                      }`}
                    ></div>

                    <span className="text-[10px] md:text-sm lg:text-base xl:text-lg font-medium px-1 md:w-[50%] mx-auto">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

     
          <div className="w-full relative  rounded-2xl md:rounded-[32px] overflow-hidden h-[400px] md:h-[600px] lg:h-[800px] xl:h-[1000px] 2xl:h-[1152px]">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeTab === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.year} - ${item.title}`}
                  fill
                  className="object-cover"
                  priority={index === 0 || index === activeTab}
                />
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Content
