"use client"
import Clients from "@/components/Home/Clients"
import Service from "@/components/Home/Service"
import Future from "@/components/Home/Future"
import { footerImage1, HomeImage } from "@/components/ReusableComponenets/Icons"
import VideoScrubber from "@/components/Home/videoAnimation"
import Production from "@/components/Home/Production"
import Stories from "@/components/Home/Stories"
import Image from "next/image"
import MainLayout from "@/components/Layouts/MainLayout"
import HomeBottomImg from "@/public/footer/Home_Footer.jpg"

export default function Home() {
  return (
    <MainLayout
      heroImage={HomeImage}
      heroText="Turnkey Contracting |Civil Construction |Woodwork Mastery | Timeless Interiors"
    >
      <div className="bg-white overflow-x-hidden mt-30">
        <div className="p-5">
          <VideoScrubber />
          <Clients />
        </div>
        <Production />
        <div className="p-5">
          <Service />
          <Stories />
          <Future />
        </div>
        <div className="relative w-full h-full md:mt-20">
          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
            background: "linear-gradient(180deg, #FFFFFF 3.76%, rgba(255, 255, 255, 0) 67.57%)"
          }} />

          {/* Image */}
          <Image
            src={HomeBottomImg || "/placeholder.svg"}
            alt="footer image"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </MainLayout>
  )
}
