"use client";

import { useState, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutManagementPandian from "@/public/About/Directors/pandian.png";
import AboutManagementDevi from "@/public/About/Directors/devi.jpeg";
import AboutManagementNandaKris from "@/public/About/Directors/nandha.jpg";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string | StaticImageData;
  bio?: string;
}

const managementTeam: TeamMember[] = [
  {
    id: 1,
    name: "Mr. Pandian Kailasam",
    title: "Managing Director",
    image: AboutManagementPandian,
    bio: "With nearly 20 years of experience in turnkey interior contracting, Pandian Kailasam has led Innovative Interiors to become one of South India's most trusted names in high-end interiors. His uncompromising focus on quality, detailing, and timely delivery has earned the company strong relationships with leading architects, developers, and brands across hospitality, retail, healthcare, corporate, and residential sectors.Pandian's vision blends craftsmanship with modern execution. He is known for translating an architect's design intent into reality with precision, while building long-lasting partnerships with clients and vendors. Under his leadership, Innovative Interiors has completed landmark projects for groups like GRT, ITC, Brigade, Appaswamy, and many more, while nurturing a team culture that values resilience, collaboration, and continuous innovation.",
  },
  {
    id: 2,
    name: "Mr. Nandakrishnan T",
    title: "CEO",
    image: AboutManagementNandaKris,
    bio: "With over three decades of expertise in construction management and business development, Mr. Nandakrishnan has delivered 8+ million sq. ft. of projects across India. Previously Director at Ocean Lifespace, he led landmark industrial and commercial developments for global brands. At Innovative Interiors, he is driving the shift towards a process-driven, organized contracting company, strengthening execution across civil, MEP, and interiors.",
  },
  {
    id: 3,
    name: "Mrs. Devi Pandian",
    title: "Director – Administration, Finance & HR, Innovative Interiors",
    image: AboutManagementDevi,
    bio: "Mrs. Devi Pandian is a key pillar of Innovative Interiors, balancing personal and professional roles with dedication. As head of Administration, HR, and Finance, she ensures smooth operations, financial discipline, and a motivated team. Her sharp eye for detail, structured approach, and commitment to transparency have been vital in upholding the company's culture and long-term vision.",
  },
];

const ManagementTeam: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [expandedBios, setExpandedBios] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get current active ID (either hovered or default)
  const currentActiveId = hoveredId !== null ? hoveredId : activeId;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For mobile scroll controls
  const scrollToNext = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  const scrollToPrev = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  // Toggle bio expansion
  const toggleBioExpansion = (memberId: number): void => {
    setExpandedBios((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  // Check if bio needs truncation (roughly 150 characters for mobile, 200 for desktop)
  const shouldTruncateBio = (bio: string, isMobile: boolean): boolean => {
    const limit = isMobile ? 150 : 200;
    return bio.length > limit;
  };

  // Get truncated bio text
  const getTruncatedBio = (bio: string, isMobile: boolean): string => {
    const limit = isMobile ? 150 : 200;
    if (bio.length <= limit) return bio;
    return bio.substring(0, limit).trim() + "...";
  };

  // Fix for iOS Safari - ensure proper scrolling behavior
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    // Force layout recalculation on iOS
    const handleResize = (): void => {
      container.style.display = "none";
      // Force reflow
      void container.offsetHeight;
      container.style.display = "flex";
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Render mobile version
  if (isMobile) {
    return (
      <section className="py-8  w-full  ">
        <h2 className="text-3xl font-medium text-[#0A0A50] mb-6">Management</h2>

        <div className="relative gap-10 w-full">
          {/* Mobile scroll controls */}
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
            aria-label="Previous member"
            type="button"
          >
            <ChevronLeft className="h-5 w-5 text-[#0A0A50]" />
          </button>
          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
            aria-label="Next member"
            type="button"
          >
            <ChevronRight className="h-5 w-5 text-[#0A0A50]" />
          </button>

          {/* Container for cards */}
          <div
            ref={scrollContainerRef}
            className="w-full flex overflow-x-auto snap-x snap-mandatory pb-4 touch-pan-x"
            style={{
              WebkitOverflowScrolling: "touch", // For older iOS
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            {managementTeam.map((member) => {
              const isActive = currentActiveId === member.id;
              const isExpanded = expandedBios.has(member.id);
              const needsTruncation =
                member.bio && shouldTruncateBio(member.bio, true);

              return (
                <div
                  key={member.id}
                  className="relative overflow-hidden rounded-xl cursor-pointer min-w-[350px] h-[700px] snap-center"
                  onClick={() => setActiveId(member.id)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                      priority
                    />
                  </div>

                  {/* Dark overlay */}
                  <div
                    className={
                      isActive ? "absolute inset-0 " : "absolute inset-0 "
                    }
                  ></div>
                  {isExpanded ? (
                    <div className="absolute inset-0 bg-black/70"></div>
                  ) : (
                    <div className="absolute inset-0 bg-black/10"></div>
                  )}

                  {/* Content Container - Always at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    {isActive && member.bio ? (
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl">{member.name}</h3>
                        <div className="text-sm mt-2 leading-snug">
                          <p className="line-clamp-none text-lg leading-snug">
                            {isExpanded || !needsTruncation
                              ? member.bio
                              : getTruncatedBio(member.bio, true)}
                          </p>
                          {needsTruncation && (
                            <button
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                e.stopPropagation();
                                toggleBioExpansion(member.id);
                              }}
                              className="text-blue-300 text-sm hover:underline mt-1 inline-block"
                              type="button"
                            >
                              {isExpanded ? "view less" : "view more"}
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-xs text-white/90">{member.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* iOS Safari scrollbar hiding */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>
    );
  }

  // Render desktop version
  return (
    <section className="py-16  md:px-8 w-full mx-auto grid grid-cols-[0.6fr_1fr] h-screen">
      <h2 className="md:text-[60px] text-[20px] font-medium text-[#0A0A50] mb-12">
        Management
      </h2>

      <div className="flex flex-col md:flex-row items-stretch md:gap-8 h-[500px] md:h-[95%] w-full">
        {managementTeam.map((member) => {
          const isActive = currentActiveId === member.id;
          const isExpanded = expandedBios.has(member.id);
          const needsTruncation =
            member.bio && shouldTruncateBio(member.bio, false);

          return (
            <motion.div
              key={member.id}
              className="relative overflow-hidden rounded-xl cursor-pointer h-full"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                flex: isActive ? 2 : 0.7,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              initial={false}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  priority
                />
              </div>

              {/* Dark overlay */}
              {isActive ? (
                <div className="absolute inset-0 "></div>
              ) : (
                <div className="absolute inset-0 bg-black/20"></div>
              )}

              {isExpanded ? (
                <div className="absolute inset-0 bg-black/70"></div>
              ) : (
                <div className="absolute inset-0 bg-black/10"></div>
              )}

              {/* Content Container - Always at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {isActive && member.bio ? (
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <div className="text-sm mt-2 leading-snug px-2">
                      <p>
                        {isExpanded || !needsTruncation
                          ? member.bio
                          : getTruncatedBio(member.bio, false)}
                      </p>
                      {needsTruncation && (
                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            toggleBioExpansion(member.id);
                          }}
                          className="text-blue-300 text-xs hover:underline mt-1 inline-block"
                          type="button"
                        >
                          {isExpanded ? "view less" : "view more"}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-xs text-white/90">{member.title}</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ManagementTeam;
