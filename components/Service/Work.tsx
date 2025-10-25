"use client";

import React, { useState } from "react";
import Image from "next/image";
// import Imagestair from "@/public/Rectangle 242.svg";
import Imagestair from "@/public/Manufacturer/Commitment1.png";
import SectionLabel from "../ui/secionLabel";

const Work = () => {
  const [openSection, setOpenSection] = useState<number>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? -1 : index);
  };


  const workSteps = [
    {
      number: 1,
      title: "Design Integrity",
      description:
        "We respect and enhance architectural vision through thoughtful execution.",
    },
    {
      number: 2,
      title: "Process Discipline",
      description:
        "Every project is managed with systems, timelines, and technical clarity.",
    },
    {
      number: 3,
      title: "Craftsmanship with Scale",
      description:
        "Craftsmanship with Scale – We blend traditional skill with modern manufacturing power.",
    },
    {
      number: 4,
      title: "Client Partnership",
      description:
        "Clear communication, honest feedback, and long-term relationships.",
    },{
      number: 5,
      title: "Sustainability & Efficiency",
      description:
        "Optimized resource use, value engineering, and future-ready planning.",
    },
  ];

  return (
    <div className="md:mt-[150px]  mb-10">
      <div className="flex flex-col md:space-y-8 space-y-0 items-center md:max-h-[600px]">
        <SectionLabel text="HOW WE WORK"/>

        <div className="text-[#040444] my-4 mb-7 w-full justify-center font-semibold text-center items-center text-3xl md:text-[55px] md:leading-[70.4px] md:mb-16">
          Our Innovative Interiors Approach
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <div className="flex-1">
          <Image src={Imagestair} alt="image"  className="w-full h-full object-cover md:max-h-[500px]-[400px] h"/>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {workSteps.map((step, index) => (
            <div key={index} className="transition-all duration-300">
              <div
                className="cursor-pointer flex items-center gap-4  bg-[#F8F8F8] p-4 rounded-md shadow-sm hover:shadow-md transition-all"
                onClick={() => toggleSection(index)}
              >
                <span className="text-[#040444] font-semibold text-[22px] min-w-[24px]">
                  {step.number}
                </span>
                <span className="text-[#040444] text-[20px] font-medium">
                  {step.title}
                </span>
                <svg
                  className={`w-5 h-5 text-[#040444] ml-auto transition-transform ${
                    openSection === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {openSection === index && (
                <div className="mt-2 p-4 text-[#666666] text-[14px] leading-relaxed bg-[#F8F8F8] rounded-md ">
                  {step.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
