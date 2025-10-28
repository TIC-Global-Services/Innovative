"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionLabel from "../ui/secionLabel";

const TeamStrength = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const teams = [
    {
      title: "Management & Commercial Team",
      count: 11,
    },
    {
      title: "Senior Project Manager",
      count: 25,
    },
    {
      title: "Project Engineers Including MEP",
      count: 53,
    },
    {
      title: "Project Coordinators",
      count: 20,
    },
    {
      title: "In House Installation",
      count: 100,
    },
    {
      title: "Production Team",
      count: 120,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const desktopCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 10px 20px rgba(4, 4, 68, 0.2)",
      borderColor: "#040444",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full py-10 px-4 text-black text-center min-h-[50vh] md:min-h-[40vh] lg:min-h-[80vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-7xl mx-auto">
        <motion.div
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <SectionLabel text="Team Strength" />
        </motion.div>

        {isMobile ? (
          <motion.div
            className="grid grid-cols-2 gap-4 w-full mt-4 px-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teams.map((team, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center w-full"
                onClick={() =>
                  setHoveredIndex(index === hoveredIndex ? null : index)
                }
              >
                <motion.div
                  className={`
                    flex flex-col items-center justify-center 
                    w-full aspect-square max-w-[160px] rounded-full border-2
                    bg-white transition-all duration-300
                    ${
                      hoveredIndex === index
                        ? "border-[#040444] shadow-lg"
                        : "border-gray-800"
                    }
                  `}
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-center font-bold px-3 text-[10px] leading-tight text-[#040444]">
                    {team.title}
                  </p>
                  <motion.p
                    className="text-2xl font-bold mt-2"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      color: hoveredIndex === index ? "#040444" : "#000000",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {team.count}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Desktop layout - single row
          <motion.div
            className="flex justify-center items-center space-x-6 md:space-x-8 mt-8 flex-nowrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {teams.map((team, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center cursor-pointer w-[140px] h-[140px] 2xl:w-[180px] 2xl:h-[180px] rounded-full border-2 border-gray-800 bg-white flex-shrink-0"
                variants={desktopCardVariants}
                whileHover="hover"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.p
                  className="text-center font-bold px-3 text-xs 2xl:text-base text-[#040444]"
                  animate={{
                    scale: hoveredIndex === index ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {team.title}
                </motion.p>
                <motion.p
                  className="md:text-xl text-base font-bold mt-1"
                  animate={{
                    scale: hoveredIndex === index ? 1.15 : 1,
                    color: hoveredIndex === index ? "#040444" : "#000000",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {team.count}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamStrength;