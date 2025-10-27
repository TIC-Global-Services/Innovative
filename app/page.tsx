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
      <div className="bg-white overflow-x-hidden mt-40 pb-20">
        <div className="md:px-16 p-5">
          <VideoScrubber />
          <Clients />
        </div>
        <Production />
        <div className="md:px-16 p-5">
          <Service />
          <Stories />
          <Future />
        </div>
      </div>
    </MainLayout>
  );
}
