"use client"

import { FooterImageVendors } from "@/components/ReusableComponenets/Icons"
import VendorBottomImg from "@/public/VendorBottomImg.png"
import VendorBanner from "@/public/VendorBanner.png"
import Partner from "@/components/Vendors/Partner"
import Image from "next/image"
import Faq from "@/components/Vendors/Faq"
import Discover from "@/components/Vendors/Discover"
import WhyPartner from "@/components/Vendors/WhyPartner"
import MainLayout from "@/components/Layouts/MainLayout"
import VendorRegistration from "@/components/Vendors/RegistrationForm"

const VendorsPage = () => {
  return (
    <MainLayout
      heroImage={VendorBanner}
      title="Our trusted vendor network"
      description="We collaborate with a reliable network of vendors who share our values of quality, integrity, and timely delivery—ensuring excellence in every project."
    >
      <div className=" lg:px-16">
        <div className="p-5">
          <Partner />
          <WhyPartner />
          <Faq />
        </div>

        {/* <Image
          src={VendorBottomImg || "/placeholder.svg"}
          alt="Footer Image"
          className="w-full md:h-full object-cover h-[600px]"
        /> */}
      </div>
      <VendorRegistration />
    </MainLayout>
  );
}

export default VendorsPage
