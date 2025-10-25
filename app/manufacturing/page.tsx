"use client"

import Tower from "@/components/Manufacturing/Tower"
import Excellence from "@/components/Manufacturing/Excellence"
import ManufacturingBottomImg from "@/public/ManufacturingBottomImg.png"
import ManufacturingBanner from "@/public/Manufacturer/manu_home.png"
import Image from "next/image"
import Content from "@/components/Manufacturing/Content"
import MainLayout from "@/components/Layouts/MainLayout"


const ManufacturingPage = () => {
  return (
    <MainLayout heroImage={ManufacturingBanner} heroText="Manufacturing Excellence At Innovative Interiors">
      <div className="bg-white overflow-x-hidden">
        <div className="p-5 md:mt-20">
          <Content />
          <Tower />
          <Excellence />
        </div>
        <Image src={ManufacturingBottomImg || "/placeholder.svg"} alt="footer image" className="w-full md:h-full object-cover h-[300px]" />
      </div>
    </MainLayout>
  )
}

export default ManufacturingPage
