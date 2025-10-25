"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface TurnoverData {
  year: string
  value: number
}

interface TurnoverChartProps {
  data?: TurnoverData[]
  title?: string
  subtitle?: string
  className?: string
}

const defaultData: TurnoverData[] = [
  { year: "16-17", value: 28 },
  { year: "17-18", value: 25 },
  { year: "18-19", value: 19 },
  { year: "19-20", value: 18 },
  { year: "20-21", value: 20 },
  { year: "21-22", value: 27 },
  { year: "22-23", value: 29 },
  { year: "23-24", value: 42 },
]

const TurnoverChart: React.FC<TurnoverChartProps> = ({
  data = defaultData,
  title = "Turnover",
  subtitle = "in Crores",
  className = "",
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const maxValue = Math.max(...data.map((item) => item.value)) * 1.2 // Add 20% padding to the top

  // Find the highest value for highlighting
  const highestValue = Math.max(...data.map((item) => item.value))

  // Intersection Observer to trigger animation when chart is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  // Generate y-axis labels
  const yAxisLabels = Array.from({ length: 5 }, (_, i) => Math.round((maxValue / 4) * i))

  // Handle touch events for mobile
  const handleTouchStart = (index: number) => {
    setHoveredBar(index)
  }

  const handleTouchEnd = () => {
    setHoveredBar(null)
  }

  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-[55px] font-semibold text-[#1A1A3A]">
          {title} <span className="text-sm md:text-2xl font-normal">{subtitle}</span>
        </h2>
      </div>

      <div
        ref={chartRef}
        className="relative bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 mt-6 md:mt-14 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #F8F8FF, #F0E6FF)",
        }}
      >
        {/* Financial label */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 text-xs md:text-sm text-[#949494] flex items-center">
          <div className="w-[15px] md:w-[20px] h-[2px] rounded-full bg-[#694BDB] mr-1 md:mr-2"></div>
          <span>financial</span>
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-2 md:left-6 top-10 md:top-12 bottom-12 md:bottom-16 flex flex-col justify-between">
          {yAxisLabels.reverse().map((label, index) => (
            <div key={index} className="text-[8px] md:text-xs text-gray-500">
              {label}
            </div>
          ))}
        </div>

        {/* Chart grid lines */}
        <div
          className="ml-8 md:ml-12 mr-2 md:mr-4 mt-10 md:mt-12 mb-12 md:mb-16 relative"
          style={{ height: isMobile ? "200px" : "300px" }}
        >
          {yAxisLabels.map((_, index) => (
            <div
              key={index}
              className="absolute w-full border-t border-gray-200"
              style={{ top: `${(index * 100) / 4}%` }}
            ></div>
          ))}

          {/* Bars container */}
          <div className="absolute inset-0 flex items-end justify-around">
            {data.map((item, index) => {
              const isHighest = item.value === highestValue
              const barHeight = (item.value / maxValue) * 100

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-end group"
                  style={{ height: "100%" }}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Value label */}
                  <div className="text-[8px] md:text-[10px] font-medium mb-1 text-[#1A1A3A]">{item.value}</div>

                  {/* Animated bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isVisible ? { height: `${barHeight}%` } : { height: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`w-3 md:w-5 lg:w-12 rounded-md ${
                      isHighest ? "bg-[#6C5CE7]" : hoveredBar === index ? "bg-[#8A7CE8]" : "bg-[#A193EC]"
                    } relative group`}
                    style={{
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {/* Tooltip on hover/touch */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={hoveredBar === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 bg-[#1A1A3A] text-white px-2 md:px-3 py-1 md:py-2 rounded-lg text-[8px] md:text-xs whitespace-nowrap z-10"
                    >
                      <div className="font-medium">FY {item.year}</div>
                      <div>₹{item.value} Crores</div>
                      <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-2 md:w-3 h-2 md:h-3 bg-[#1A1A3A] rotate-45"></div>
                    </motion.div>
                  </motion.div>

                  {/* Year label */}
                  <div className="text-[6px] md:text-[7px] lg:text-xs mt-1 md:mt-2 text-gray-600">{item.year}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TurnoverChart
