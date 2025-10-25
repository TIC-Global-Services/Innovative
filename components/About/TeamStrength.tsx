"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SectionLabel from "../ui/secionLabel"

const TeamStrength = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
  ]

  return (
    <div className="w-full py-10 px-4 text-black text-center min-h-[50vh] md:min-h-[80vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 items-center justify-center w-full max-w-7xl mx-auto">
        <SectionLabel text="Team Strength" />

        {isMobile ? (
          <div className="grid grid-cols-3 gap-3 w-full mt-4">
            {teams.map((team, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
                onClick={() => setHoveredIndex(index === hoveredIndex ? null : index)}
              >
                <div
                  className={`
                    flex flex-col items-center justify-center 
                    w-[90px] h-[90px] rounded-full border-1 md:border-2 
                    border-gray-800 bg-white
                    ${hoveredIndex === index ? "border-[#040444] shadow-lg" : ""}
                  `}
                >
                  <p className="text-center font-bold px-1 text-[9px] leading-tight text-[#040444]">{team.title}</p>
                  <p className="text-base font-bold mt-1">{team.count}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop layout - single row
          <div className="flex justify-center items-center space-x-6 md:space-x-8 mt-8 flex-nowrap">
            {teams.map((team, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center hover:cursor-pointer w-[140px] h-[140px] 2xl:w-[180px] 2xl:h-[180px] rounded-full border border-gray-800 bg-white flex-shrink-0"
                style={{
                  boxShadow:
                    hoveredIndex === index ? "0px 6px 12px rgba(0, 0, 0, 0.15)" : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
                  borderColor: hoveredIndex === index ? "#1F2937" : "#1F2937",
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p className="text-center font-bold px-3 text-xs 2xl:text-base text-[#040444]">{team.title}</p>
                <p className="md:text-xl text-base font-bold ">{team.count}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamStrength
