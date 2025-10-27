"use client";

import { useState, useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  // Initialize scroll position to 0 on mount
  useEffect(() => {
    if (scrollContainerRef.current && isMobile) {
      scrollContainerRef.current.scrollLeft = 0;
      setCurrentIndex(0);
    }
  }, [isMobile]);

  // Scroll to specific index
  const scrollToIndex = (index: number): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;
      const cardWidth = 280;
      const gap = 12;
      const totalCardWidth = cardWidth + gap;

      // Center the card in the viewport
      const targetScroll = index * totalCardWidth;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // For mobile scroll controls
  const scrollToNext = (): void => {
    const nextIndex = Math.min(currentIndex + 1, managementTeam.length - 1);
    scrollToIndex(nextIndex);
  };

  const scrollToPrev = (): void => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  // Update current index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = (): void => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 280;
      const gap = 12;
      const totalCardWidth = cardWidth + gap;
      const index = Math.round(scrollLeft / totalCardWidth);
      setCurrentIndex(Math.min(index, managementTeam.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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

  // Check if bio needs truncation (roughly 100 characters for mobile, 200 for desktop)
  const shouldTruncateBio = (bio: string, isMobile: boolean): boolean => {
    const limit = isMobile ? 100 : 200;
    return bio.length > limit;
  };

  // Get truncated bio text
  const getTruncatedBio = (bio: string, isMobile: boolean): string => {
    const limit = isMobile ? 100 : 200;
    if (bio.length <= limit) return bio;
    return bio.substring(0, limit).trim() + "...";
  };

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Render mobile version
  if (isMobile) {
    return (
      <section className="py-8 w-full">
        <motion.h2
          className="text-3xl font-medium text-[#0A0A50] mb-6 text-left px-4"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Management
        </motion.h2>

        <div className="relative w-full">
          {/* Mobile scroll controls */}
          {currentIndex > 0 && (
            <motion.button
              onClick={scrollToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg"
              aria-label="Previous member"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ChevronLeft className="h-5 w-5 text-[#0A0A50]" />
            </motion.button>
          )}

          {currentIndex < managementTeam.length - 1 && (
            <motion.button
              onClick={scrollToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg"
              aria-label="Next member"
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ChevronRight className="h-5 w-5 text-[#0A0A50]" />
            </motion.button>
          )}

          {/* Container for cards */}
          <div
            ref={scrollContainerRef}
            className="w-full flex overflow-x-scroll snap-x snap-mandatory pb-4 px-4 gap-3 scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
            }}
          >
            {managementTeam.map((member, index) => {
              const isExpanded = expandedBios.has(member.id);
              const needsTruncation =
                member.bio && shouldTruncateBio(member.bio, true);

              return (
                <motion.div
                  key={member.id}
                  className="relative overflow-hidden rounded-xl min-w-[280px] max-w-[280px] h-[450px] snap-start flex-shrink-0"
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileTap={{ scale: 0.98 }}
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
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundColor: isExpanded
                        ? "rgba(0, 0, 0, 0.75)"
                        : "rgba(0, 0, 0, 0.4)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content Container - Always visible */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white text-left"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs text-white/90 mb-2">
                        {member.title}
                      </p>

                      {member.bio && (
                        <div className="text-xs leading-relaxed">
                          <AnimatePresence mode="wait">
                            <motion.p
                              className="line-clamp-none"
                              key={isExpanded ? "expanded" : "collapsed"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {isExpanded || !needsTruncation
                                ? member.bio
                                : getTruncatedBio(member.bio, true)}
                            </motion.p>
                          </AnimatePresence>
                          {needsTruncation && (
                            <motion.button
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                e.stopPropagation();
                                toggleBioExpansion(member.id);
                              }}
                              className="text-blue-300 text-xs hover:underline mt-2 inline-block font-medium"
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isExpanded ? "view less" : "view more"}
                            </motion.button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {managementTeam.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-6 bg-[#0A0A50]"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
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
    <section className="py-16 md:px-8 w-full mx-auto grid grid-cols-[0.6fr_1fr] h-screen">
      <motion.h2
        className="md:text-[60px] text-[20px] font-medium text-[#0A0A50] mb-12"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Management
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row items-stretch md:gap-8 h-[500px] md:h-[95%] w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {managementTeam.map((member, index) => {
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
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
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
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundColor: isExpanded
                    ? "rgba(0, 0, 0, 0.7)"
                    : isActive
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content Container - Always at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                {isActive && member.bio ? (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-bold text-2xl">{member.name}</h3>
                    <div className="text-sm mt-2 leading-relaxed px-2">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={isExpanded ? "expanded" : "collapsed"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isExpanded || !needsTruncation
                            ? member.bio
                            : getTruncatedBio(member.bio, false)}
                        </motion.p>
                      </AnimatePresence>
                      {needsTruncation && (
                        <motion.button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            toggleBioExpansion(member.id);
                          }}
                          className="text-blue-300 text-sm hover:underline mt-2 inline-block font-medium"
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isExpanded ? "view less" : "view more"}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-sm text-white/90 mt-1">{member.title}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ManagementTeam;
