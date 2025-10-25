"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  proImage1,
  proImage2,
  proImage3,
  proImage4,
  proImage5,
  proImage6,
  proImage7,
  proImage8,
  proImage9,
  proImage,
  Stars,
} from "../ReusableComponenets/Icons";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface StoryItem {
  stars: any;
  profile: any;
  name: string; 
  description: string;
  message: string;
}

const contentscol1: StoryItem[] = [
  {
    stars: Stars,
    profile: proImage1,
    name: "Ar.Anu",
    description: "L&D Associates",
    message:
      "From the first day I met Pandian 15 years ago until now, his energy level has never dipped. That consistency is remarkable",
  },
  {
    stars: Stars,
    profile: proImage2,
    name: "Mrs. Aparna Ganesan",
    description: "Client",
    message:
      "Innovative made my house feel like a home. It was a wonderful experience working with them, and I’m truly grateful for their efforts",
  },
  {
    stars: Stars,
    profile: proImage3,
    name: "Ar.Jayasree Bharath",
    description: "Bharath & Associates",
    message:
      "It's very difficult these days to remain straightforward and honest and still earn a good name. I wish you all the best to continue this journey.",
  },
  {
    stars: Stars,
    profile: proImage4,
    name: "Ar.Kiki",
    description: "Satori Living",
    message:
      "Innovative truly understands an architect's design intent. They don't just build; they connect deeply with the aesthetic vision. They also manage multiple projects at once with great grace",
  },
];

const contentscol2: StoryItem[] = [
  {
    stars: Stars,
    profile: proImage9,
    name: "Ar.Vinod",
    description: "POV Designs",
    message:
      "Innovative is a 'No Compromise' team. Their attention to detail is unmatched. They focus on delivering every project right, and on time.",
  },
  {
    stars: Stars,
    profile: proImage,
    name: "Ar.John",
    description: "Diagrammer",
    message:
      "Mr. Pandian is truly passionate about what he does. He never compromises on quality nor vision. It's always a pleasure working with him.",
  },
  {
    stars: Stars,
    profile: proImage5,
    name: "Ar.Malli Saravanan",
    description: "Client",
    message:
      "The integrity that runs across their team is commendable. The people in the field deliver under pressure while maintaining absolute quality.",
  },
  {
    stars: Stars,
    profile: proImage6,
    name: "Ar.Nancy Satish",
    description: "Design Works",
    message:
      "Innovative has always been close to our hearts. Completing 20 years in business is a remarkable milestone. You are one of the most intelligent contractors.",
  },
];

const contentscol3: StoryItem[] = [
  {
    stars: Stars,
    profile: proImage2,
    name: "Mrs. Aparna Ganesan",
    description: "Client",
    message:
      "Innovative made my house feel like a home. It was a wonderful experience working with them, and I’m truly grateful for their efforts",
  },
  {
    stars: Stars,
    profile: proImage8,
    name: "Ar.Sundaravelan",
    description: "DOFX",
    message:
      "What I admire most about Team Innovative is their ability to understand a designer’s perspective. That connection makes collaboration effortless",
  },
  {
    stars: Stars,
    profile: proImage9,
    name: "Ar.Vinod",
    description: "POV Designs",
    message:
      "Innovative is a 'No Compromise' team. Their attention to detail is unmatched. They focus on delivering every project right, and on time.",
  },
  {
    stars: Stars,
    profile: proImage7,
    name: "Ar.Prakash",
    description: "Client",
    message:
      "I have been associated with Innovative for more than a decade. Whatever we expect, they deliver with top-notch finishes.",
  },
];

// Mobile content - first 5 items
const mobileContent: StoryItem[] = [
  ...contentscol1.slice(0, 3),
  ...contentscol2.slice(0, 2),
];

const Stories: React.FC = () => {
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Only run animations on non-mobile screens
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const setupAnimation = (
        container: HTMLElement,
        direction: 'up' | 'down',
        speed: number
      ) => {
        const items = Array.from(container.children) as HTMLElement[];
        if (items.length === 0) return;

        // Calculate total height more accurately
        let totalHeight = 0;
        items.forEach(item => {
          const rect = item.getBoundingClientRect();
          const style = window.getComputedStyle(item);
          const marginTop = parseInt(style.marginTop) || 0;
          const marginBottom = parseInt(style.marginBottom) || 0;
          totalHeight += rect.height + marginTop + marginBottom;
        });

        // Clone items for seamless looping
        items.forEach(item => {
          const clone = item.cloneNode(true) as HTMLElement;
          container.appendChild(clone);
        });

        const initialY = direction === 'down' ? -totalHeight / 2 : 0;
        const targetY = direction === 'down' ? 0 : -totalHeight / 2;
        
        gsap.set(container, { y: initialY });

        const animation = gsap.to(container, {
          y: targetY,
          duration: speed,
          ease: "none",
          repeat: -1,
          onRepeat: () => {
            gsap.set(container, { y: initialY });
          }
        });

        return animation;
      };

      const animations: gsap.core.Tween[] = [];

      // Add small delay to ensure DOM is ready
      setTimeout(() => {
        if (container1Ref.current) {
          const animation1 = setupAnimation(container1Ref.current, 'down', 30);
          if (animation1) animations.push(animation1);
        }
        if (container2Ref.current) {
          const animation2 = setupAnimation(container2Ref.current, 'up', 30);
          if (animation2) animations.push(animation2);
        }
        if (container3Ref.current) {
          const animation3 = setupAnimation(container3Ref.current, 'down', 30);
          if (animation3) animations.push(animation3);
        }
      }, 100);

      return () => {
        animations.forEach(anim => anim.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div 
      ref={mainContainerRef} 
      className="mt-20 mb-20 md:mt-[150px] md:mb-[150px] overflow-hidden stories-container max-w-full w-full px-4 md:px-6 lg:px-8"
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12 items-start">
          {/* Header Section */}
          <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col justify-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-6xl leading-tight text-center lg:text-left lg:leading-[1.1] text-[#040444] font-semibold">
              Trusted by Many, Loved by All
            </h2>
          </div>

          {/* Content Section */}
          {isMobile ? (
            // Mobile Layout - Static centered grid with 5 cards
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center space-y-4 max-w-[280px] w-full">
                {mobileContent.map((item, index) => (
                  <div key={index} className="w-full">
                    <div className="border-[#D8D7DD] border-[1.5px] w-full md:h-[280px] rounded-[20px] p-4 story-item bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                      <div className="mb-3">
                        <Image 
                          src={item.stars} 
                          alt="stars" 
                          className="w-20" 
                        />
                      </div>
                      <div className="flex flex-row gap-3 items-center mb-3">
                        <Image
                          src={item.profile}
                          alt={item.name}
                          className="rounded-full w-10 h-10 object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-[#0E0D0D] truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#838489] truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-black leading-relaxed flex-1 overflow-hidden">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Desktop/Tablet Layout - Original animated columns with fixed height
            <div className="w-full lg:w-[65%] xl:w-[70%] h-[600px] md:h-[700px] lg:h-[800px] xl:h-[950px] overflow-hidden">
              <div className="flex gap-4 lg:gap-5 xl:gap-6 h-full justify-center items-start">
                {/* First column */}
                <div className="flex-1 max-w-[280px] md:max-w-[300px] h-full overflow-hidden">
                  <div 
                    ref={container1Ref} 
                    className="flex flex-col space-y-4 lg:space-y-5"
                  >
                    {contentscol1.map((item, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="border-[#D8D7DD] border-[1.5px] w-full h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-[20px] lg:rounded-[25px] p-4 lg:p-5 story-item bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                          <div className="mb-3 lg:mb-4">
                            <Image 
                              src={item.stars} 
                              alt="stars" 
                              className="w-16 md:w-20 lg:w-24 xl:w-28" 
                            />
                          </div>
                          <div className="flex flex-row gap-3 items-center mb-3 lg:mb-4">
                            <Image
                              src={item.profile}
                              alt={item.name}
                              className="rounded-full w-9 md:w-10 lg:w-12 xl:w-14 h-9 md:h-10 lg:h-12 xl:h-14 object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#0E0D0D] truncate">
                                {item.name}
                              </h3>
                              <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-[#838489] truncate">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-black leading-relaxed flex-1 overflow-hidden">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second column */}
                <div className="flex-1 max-w-[280px] md:max-w-[300px] h-full overflow-hidden">
                  <div 
                    ref={container2Ref} 
                    className="flex flex-col -mt-20 lg:-mt-32 space-y-4 lg:space-y-5"
                  >
                    {contentscol2.map((item, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="border-[#D8D7DD] border-[1.5px] w-full h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-[20px] lg:rounded-[25px] p-4 lg:p-5 story-item bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                          <div className="mb-3 lg:mb-4">
                            <Image 
                              src={item.stars} 
                              alt="stars" 
                              className="w-16 md:w-20 lg:w-24 xl:w-28"
                            />
                          </div>
                          <div className="flex flex-row gap-3 items-center mb-3 lg:mb-4">
                            <Image
                              src={item.profile}
                              alt={item.name}
                              className="rounded-full w-9 md:w-10 lg:w-12 xl:w-14 h-9 md:h-10 lg:h-12 xl:h-14 object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#0E0D0D] truncate">
                                {item.name}
                              </h3>
                              <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-[#838489] truncate">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-black leading-relaxed flex-1 overflow-hidden">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Third column */}
                <div className="flex-1 max-w-[280px] md:max-w-[300px] h-full overflow-hidden">
                  <div 
                    ref={container3Ref} 
                    className="flex flex-col -mt-40 lg:-mt-48 space-y-4 lg:space-y-5"
                  >
                    {contentscol3.map((item, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="border-[#D8D7DD] border-[1.5px] w-full h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] rounded-[20px] lg:rounded-[25px] p-4 lg:p-5 story-item bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                          <div className="mb-3 lg:mb-4">
                            <Image 
                              src={item.stars} 
                              alt="stars" 
                              className="w-16 md:w-20 lg:w-24 xl:w-28"
                            />
                          </div>
                          <div className="flex flex-row gap-3 items-center mb-3 lg:mb-4">
                            <Image
                              src={item.profile}
                              alt={item.name}
                              className="rounded-full w-9 md:w-10 lg:w-12 xl:w-14 h-9 md:h-10 lg:h-12 xl:h-14 object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#0E0D0D] truncate">
                                {item.name}
                              </h3>
                              <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-[#838489] truncate">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] md:text-xs lg:text-sm xl:text-base text-black leading-relaxed flex-1 overflow-hidden">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;