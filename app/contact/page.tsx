"use client"
import Appoinment from "@/components/Contact/Appoinment"
import Image from "next/image"
import Faq from "@/components/Contact/Faq"
import MainLayout from "@/components/Layouts/MainLayout"
import  ContactHomeHeroImage  from "@/public/Container.png";
import ContactBottomImg from "@/public/ContactBottomImg.png"

const ContactPage = () => {
  return (
    <MainLayout 
    heroImage={ContactHomeHeroImage} 
     title="Contact us"
    description="Have a project in mind or a question for our team? We’re here to help reach out and let’s start the conversation."
    >
      <div className=" overflow-x-hidden md:px-16">
        <div className="p-5">{/* Content starts after hero section */}</div>
        <Appoinment />
        <Faq />
        {/* <Image
          src={ContactBottomImg || "/placeholder.svg"}
          alt="footer image"
          className="w-full h-full object-cover"
        /> */}
      </div>
    </MainLayout>
  )
}

export default ContactPage
