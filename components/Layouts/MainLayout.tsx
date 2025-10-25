"use client"
import type { ReactNode } from "react"
import Image, { type StaticImageData } from "next/image"
import TopNav from "@/components/ReusableComponenets/TopNav"
import Footer from "@/components/ReusableComponenets/Footer"
import { useEffect } from "react"

interface MainLayoutProps {
  heroImage: StaticImageData
  heroText?: string
  title?: string
  description?: string
  children: ReactNode
  textColor?: 'white' | 'black' // New prop for text color
}

const MainLayout = ({ 
  heroImage, 
  heroText, 
  title, 
  description, 
  children, 
  textColor = 'white' // Default to white
}: MainLayoutProps) => {
  // Fix for any potential body overflow issues
  useEffect(() => {
    // Reset any overflow settings that might be causing horizontal scroll
    document.body.style.overflow = "auto"
    document.body.style.overflowX = "hidden"

    // Cleanup function
    return () => {
      document.body.style.overflow = ""
      document.body.style.overflowX = ""
    }
  }, [])

  // Dynamic text color classes
  const textColorClass = textColor === 'black' ? 'text-black' : 'text-white'

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white overflow-hidden">
        {/* Hero Section with TopNav */}
        <div className="relative w-full h-[80vh]">
          <div className="w-[95%] mx-auto mt-[2%] h-full">
            <Image
              src={heroImage || "/placeholder.svg"}
              alt="hero image"
              className="xl:rounded-[30px] md:rounded-[30px] rounded-[10px] w-full h-[90vh] md:h-[95vh] object-cover"
              priority
            />
          </div>

          <div className="absolute top-4 md:top-7 w-full z-10">
            <TopNav />
          </div>

          {heroText && (
            <div className={`absolute md:left-20 -bottom-15 md:-bottom-25 left-5 font-medium text-[20px] md:text-[60px] md:leading-[72px] ${textColorClass} max-w-[90%] md:max-w-[80%]`}>
              {heroText}
            </div>
          )}

          {title && description && (
            <div className={`absolute md:left-20 -bottom-15 md:-bottom-25 left-7 font-medium text-[14px] md:text-[20px] md:leading-[35px] leading-[20px] ${textColorClass} max-w-[90%] md:max-w-[80%]`}>
              <h1 className="md:text-[60px] text-[20px] md:leading-13">{title}</h1>
              <p className="md:text-[20px] md:w-[70%] mt-4 md:leading-[26px] leading-[20px]">{description}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full overflow-x-hidden">{children}</div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default MainLayout;