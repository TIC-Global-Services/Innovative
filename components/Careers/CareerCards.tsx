"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SectionLabel from "../ui/secionLabel";
import { bulb, ideas, skills, stones } from "../ReusableComponenets/Icons";

// Import all SVG icons
import InnovativeProjects from "@/public/svg/InnovativeProject.svg";
import LightbulbIcon from "@/public/svg/CreativeFreedom.svg";
import TrendingUpIcon from "@/public/svg/ProfessionalGrowth.svg";
import AwardIcon from "@/public/svg/Skills.svg";

interface CareerCardProps {
  icon: string; // Changed to string to use imported SVG paths
  title: string;
  description: string;
  imageSrc: string;
}

const CareerCard: React.FC<CareerCardProps> = ({
  icon,
  title,
  description,
  imageSrc,
}) => {
  return (
    <div className="min-w-[350px] md:min-w-[350px] lg:min-w-[450px] flex-shrink-0 mr-6 rounded-xl overflow-hidden bg-[#F8F9FE] flex flex-col h-[450px] md:h-[558px]">
      <div className="p-6 flex-grow">
        <div className="w-10 h-10 rounded-full bg-[#0A0A50] flex items-center justify-center text-white mb-4">
          {/* Use Image component for SVG icons */}
          <Image
            src={icon || "/placeholder.svg"}
            width={20}
            height={20}
            alt={`${title} icon`}
          />
        </div>
        <h3 className="text-xl font-bold text-[#0A0A50] mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="md:h-[320px] h-[230px] w-[90%] mx-auto relative">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

const CareerCards = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const careerData: CareerCardProps[] = [
    {
      icon: InnovativeProjects,
      title: "Innovative Projects",
      description:
        "Be part of landmark interior projects across hospitality, commercial, and residential sectors — where every assignment challenges conventions and pushes creative boundaries.",
      imageSrc: "/Gallery/carrers/whyWorkSection/ideas.png",
    },
    {
      icon: LightbulbIcon,
      title: "Creative Freedom",
      description:
        "We empower our team to think, experiment, and build without limitations. Your ideas matter here — and you'll have the freedom to bring them to life.",
      imageSrc: "/Gallery/carrers/whyWorkSection/bulb.png",
    },
    {
      icon: TrendingUpIcon,
      title: "Professional Growth",
      description:
        "Grow with an organization that believes in upskilling, mentorship, and exposure to top-tier projects and professionals from across the industry.",
      imageSrc: "/Gallery/carrers/whyWorkSection/stones.png",
    },
    {
      icon: AwardIcon,
      title: "Skill Development",
      description:
        "We value continuous learning at Innovative Interiors, providing opportunities for real-world skill enhancement and professional development.",
      imageSrc: "/Gallery/carrers/whyWorkSection/skills.png",
    },
  ];

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      // Initial check
      checkScrollability();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className=" h-full md:mt-50 pt-16 px-4 md:px-8   flex flex-col justify-center mx-auto text-center mt-10 lg:mt-52 pb-16">
      <section className="">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A50] text-center md:mb-16 mb-8">
          Why Work With Us?
        </h2>

        <div className="relative flex-1 flex items-center">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {careerData.map((card, index) => (
              <div key={index} className="snap-start">
                <CareerCard {...card} />
              </div>
            ))}
          </div>

          {/* Scroll Indicator (Mobile) */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2">
            {careerData.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardWidth = container.scrollWidth / careerData.length;
                    container.scrollTo({
                      left: cardWidth * index,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerCards;
