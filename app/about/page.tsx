"use client";

import Content from "@/components/About/Content";
import Clients from "@/components/About/Clients";
import Process from "@/components/About/Process";
import Image from "next/image";

import MainLayout from "@/components/Layouts/MainLayout";
import ManagementTeam from "@/components/About/ManagementTeam";
import TeamStrength from "@/components/About/TeamStrength";
import AboutBanner from "@/public/About/AboutBanner.png";
import Milestone from "@/components/About/Milestone";
import {
  AboutFooterImage,
  companyLogo,
} from "@/components/ReusableComponenets/Icons";

const AboutPage = () => {
  return (
    <MainLayout
      heroImage={AboutBanner}
      title="About us"
      description="Innovative Interiors brings architect-designed spaces to life with expert execution and fine woodworking—where craftsmanship meets creativity."
      textColor="black"
    >
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2">
        <Image
          src={companyLogo}
          alt="Company Logo"
          className="w-[95%] max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-auto"
        />
      </div>

      <div className="bg-white lg:px-16">
        <div className=" lg:p-5">
          <Content />
          <Clients />
          {/* <Projects /> */}
          <Milestone />
          {/* <Chair/> */}
          <TeamStrength />
          <ManagementTeam />
          <Process />
          {/* <TurnoverChartWithControls/> */}
        </div>
        {/* <div className="relative w-full h-full md:mt-20">

          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 3.76%, rgba(255, 255, 255, 0) 67.57%)",
            }}
          />

    
          <Image
            src={AboutFooterImage || "/placeholder.svg"}
            alt="footer image"
            className="w-full h-full object-cover "
          />
        </div> */}
      </div>
    </MainLayout>
  );
};

export default AboutPage;
