"use client"
import Content from "@/components/Projects/Content"
import Gallery from "@/components/Projects/Gallery"
import Chair from "@/components/About/Chair"
import Image from "next/image"
// import FooterProjectImage from "@/public/Group 39.png"
import MainLayout from "@/components/Layouts/MainLayout"
import ProjectBottomImg from "@/public/ProjectBottomImg.png"
// import heroImageprojects from '@/public/A07I9078 1.svg';
import ProjectBanner from "@/public/Projects/banner.jpg";
import InfoBanner from "@/components/ReusableComponenets/InfoBanner"
import ProjectInfoBanner from "@/public/ProjectInfoBanner.png";


const ProjectsPage = () => {
  return (
    <>
      <MainLayout
        heroImage={ProjectBanner}
        title="View our Project"
        description="Explore our portfolio of thoughtfully executed spaces that showcase our commitment to quality, innovation, and timeless design."
      >
        <div className="md:px-16 overflow-hidden mt-20 pb-20">
          <div className="p-5">
            <Content />
            <Gallery />
          </div>

          <div className="p-5 hidden md:block">
            <InfoBanner backgroundImage={ProjectInfoBanner} />
          </div>
          {/* <Image
          src={ProjectBottomImg || "/placeholder.svg"}
          alt="Footer Project Image"
          className="w-full md:h-full object-cover h-[300px] mt-20 md:mt-0"
        /> */}
        </div>
      </MainLayout>
    </>
  );
}

export default ProjectsPage
