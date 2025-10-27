"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Linkedin, Mail } from "lucide-react";
import SectionLabel from "../ui/secionLabel";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
}

const managementTeam: TeamMember[] = [
  {
    id: 1,
    name: "Mr. Pandian Kailasam",
    title: "Managing Director",
    image: "/About/Directors/pandian.png",
    bio: "With nearly 20 years of experience in turnkey interior contracting, Pandian Kailasam has led Innovative Interiors to become one of South India's most trusted names in high-end interiors. His uncompromising focus on quality, detailing, and timely delivery has earned the company strong relationships with leading architects, developers, and brands across hospitality, retail, healthcare, corporate, and residential sectors. Pandian's vision blends craftsmanship with modern execution. He is known for translating an architect's design intent into reality with precision, while building long-lasting partnerships with clients and vendors. Under his leadership, Innovative Interiors has completed landmark projects for groups like GRT, ITC, Brigade, Appaswamy, and many more, while nurturing a team culture that values resilience, collaboration, and continuous innovation.",
  },
  {
    id: 2,
    name: "Mr. Nandakrishnan T",
    title: "Chief Executive Officer",
    image: "/About/Directors/nandha.jpg",
    bio: "With over three decades of expertise in construction management and business development, Mr. Nandakrishnan has delivered 8+ million sq. ft. of projects across India. Previously Director at Ocean Lifespace, he led landmark industrial and commercial developments for global brands. At Innovative Interiors, he is driving the shift towards a process-driven, organized contracting company, strengthening execution across civil, MEP, and interiors.",
  },
  {
    id: 3,
    name: "Mrs. Devi Pandian",
    title: "Director – Administration, Finance & HR",
    image: "/About/Directors/devi.jpeg",
    bio: "Mrs. Devi Pandian is a key pillar of Innovative Interiors, balancing personal and professional roles with dedication. As head of Administration, HR, and Finance, she ensures smooth operations, financial discipline, and a motivated team. Her sharp eye for detail, structured approach, and commitment to transparency have been vital in upholding the company's culture and long-term vision.",
  },
];

const ManagementTeam = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  // Track scroll position for dot indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && isMobile) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < managementTeam.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16  overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#0A0A50] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:mb-16 mb-6"
        >
          <SectionLabel text="Leadership" />
          <h2 className="font-medium text-[18px] md:text-[60px] lg:text-[40px] text-[#040444] md:leading-[69.12px]  whitespace-nowrap">
            <span className="bg-gradient-to-r from-[#0A0A50] to-[#1a1a80] bg-clip-text text-transparent">
              Management
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Visionary leaders driving innovation and excellence in interior
            design
          </p>
        </motion.div>

        {/* Desktop Grid */}
        {!isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div
                  onClick={() => setSelectedMember(member)}
                  className="relative h-[500px] rounded-3xl overflow-hidden cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
                        {member.name}
                      </h3>
                      <p className="text-sm text-blue-200 mb-4 font-medium">
                        {member.title}
                      </p>
                    </motion.div>
                  </div>

                  {/* View More indicator */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-xl">→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Mobile Carousel */
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {managementTeam.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="flex-shrink-0 snap-center pr-4 first:pl-0"
                  style={{ width: "80vw" }}
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-white shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                      <p className="text-sm text-blue-200 mb-3">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {managementTeam.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-[#0A0A50]"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:flex items-center justify-center bg-black/80 backdrop-blur-sm hidden"
            onClick={() => setSelectedMember(null)}
            style={{ padding: isMobile ? "0" : "1rem" }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative bg-white w-full overflow-hidden shadow-2xl ${
                isMobile
                  ? "h-full rounded-none"
                  : "rounded-3xl max-w-4xl max-h-[90vh]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div
                className={`h-full ${
                  isMobile ? "flex flex-col" : "grid md:grid-cols-2"
                }`}
              >
                {/* Image side */}
                <div
                  className={`relative ${
                    isMobile ? "h-64 flex-shrink-0" : "h-64 md:h-auto"
                  }`}
                >
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Content side */}
                <div
                  className={`overflow-y-auto ${
                    isMobile ? "flex-1 p-6" : "p-8 md:p-12"
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-[#0A0A50] mb-3">
                      {selectedMember.name}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium mb-4">
                      {selectedMember.title}
                    </p>
                    <div className="flex gap-3">
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          className="w-10 h-10 rounded-full bg-[#0A0A50]/10 flex items-center justify-center hover:bg-[#0A0A50]/20 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 text-[#0A0A50]" />
                        </a>
                      )}
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="w-10 h-10 rounded-full bg-[#0A0A50]/10 flex items-center justify-center hover:bg-[#0A0A50]/20 transition-colors"
                        >
                          <Mail className="w-5 h-5 text-[#0A0A50]" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ManagementTeam;
