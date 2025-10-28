"use client"

import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface InfoBannerProps {
  /** Main heading text */
  heading?: string
  /** Subheading or description text */
  subheading?: string
  /** Background image URL */
  backgroundImage?: string | StaticImageData
  /** Button text (if empty, button won't show) */
  buttonText?: string
  /** Button link URL */
  buttonUrl?: string
  /** Optional custom button action */
  onButtonClick?: () => void
  /** Optional overlay opacity (0-1) */
  overlayOpacity?: number
  /** Optional custom classes */
  className?: string
  /** Optional height setting */
  height?: string
}

export default function InfoBanner({
  heading = "Transform Your Space with Us",
  subheading = "Start your journey toward modern, functional, and inspiring interiors today.",
  backgroundImage = "/modern-interior.png",
  buttonText = "Contact Us",
  buttonUrl = "/contact",
  onButtonClick,
  overlayOpacity = 0.4,
  className = "",
  height = "auto",
}: InfoBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle button click
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <div className={`md:mt-40 mt-10 relative ${className}`} style={{ height }}>
      {/* Background Image with Overlay */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={heading}
          fill
          className="w-full h-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 95vw"
          onLoad={() => setIsLoaded(true)}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      </div>

      {/* Content - Centered Text */}
      <div className="absolute inset-0 lg:-top-35 md:-top-15 -top-8 flex flex-col items-center justify-center -space-y-5 md:space-y-8 z-10 px-4 md:px-12">
        {heading && (
          <p className="text-[15px] md:text-[55.91px] leading-[42px] font-semibold text-center text-white">{heading}</p>
        )}

        {subheading && (
          <p className="text-[10px] md:text-[25.92px] font-light xl:leading-[42px] text-center text-[#F3F3F3] mt-1">
            {subheading}
          </p>
        )}
      </div>

      {/* Button - Positioned at Bottom */}
      {buttonText && (
        <Link href={buttonUrl} className="cursor-pointer" onClick={handleClick}>
          <div className="absolute lg:bottom-35 bottom-5 flex-row flex justify-center items-center w-full hover:scale-105 transition-all duration-300 z-20">
            <button className="md:px-8 px-4 md:py-3 py-1 text-[#040444] bg-white rounded-full cursor-pointer whitespace-nowrap">
              {buttonText}
            </button>
            <div className="md:w-12 md:h-12 w-8 h-8 text-[#040444] bg-white rounded-full flex justify-center items-center ml-2">
              <ArrowRight className="md:w-6 md:h-6 w-4 h-4" />
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}
