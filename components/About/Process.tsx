"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import imaeg1 from "@/public/step/1.jpg"
import imaeg2 from "@/public/step/2.jpg"
import imaeg3 from "@/public/step/3.jpg"
import imaeg4 from "@/public/step/4.jpg"
import imaeg5 from "@/public/step/5.jpg"
import imaeg6 from "@/public/step/6.jpg"
import imaeg7 from "@/public/step/7.jpg"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SectionLabel from "../ui/secionLabel"

const Process: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  // Touch and drag handling
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const touchMoveRef = useRef<{ x: number; y: number } | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const dragThresholdRef = useRef<number>(0)
  const [dragOffset, setDragOffset] = useState<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const content = [
    {
      no: "01",
      title: "German Precision Machinery",
      description:
        " Advanced woodworking technology ensuring flawless accuracy and finish.",
      image: imaeg1,
    },
    {
      no: "02",
      title: "Superior Veneer Polishing Facility",
      description:
        " In-house capability for high-quality veneer finishes.",
      image: imaeg2,
    },
    {
      no: "03",
      title: "Dry & Wet Paint Booths",
      description:
        "Controlled environment for all types of finishes with consistent quality.",
      image: imaeg3,
    },
    {
      no: "04",
      title: "Tech-Driven Project Management",
      description:
        "Digital tracking and reporting for transparent, timely execution.",
      image: imaeg4,
    },
     {
      no: "05",
      title: "Highly Skilled Workforce",
      description:
        "Experienced craftsmen and supervisors associated with us for over a decade.",
      image: imaeg5,
    },
    {
      no: "06",
      title: "Strict QA/QC Protocols",
      description:
        "Multi-level inspection systems for zero-defect output.",
      image: imaeg6,
    },
    {
      no: "07",
      title: "Process Discipline",
      description:
        "Streamlined operations ensuring seamless coordination from factory to site.",
      image: imaeg7,
    },
  ]

  // Clear autoplay timer
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  // Start autoplay timer
  const startAutoplay = useCallback(() => {
    if (isPaused || isAnimating) return
    
    clearAutoplay()
    autoplayRef.current = setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % content.length)
    }, 3000)
  }, [isPaused, isAnimating, content.length, clearAutoplay])

  // Handle slide navigation
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    
    setIsAnimating(true)
    setCurrentSlide(index)
    clearAutoplay()
    
    // Restart autoplay after a brief pause
    setTimeout(() => {
      setIsPaused(false)
    }, 5000) // 5 second pause after manual interaction
  }, [isAnimating, currentSlide, clearAutoplay])

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    const next = (currentSlide + 1) % content.length
    setIsPaused(true) // Pause autoplay when manually navigating
    goToSlide(next)
  }, [isAnimating, currentSlide, content.length, goToSlide])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    const prev = (currentSlide - 1 + content.length) % content.length
    setIsPaused(true) // Pause autoplay when manually navigating
    goToSlide(prev)
  }, [isAnimating, currentSlide, content.length, goToSlide])

  // Handle dot click
  const handleDotClick = useCallback((index: number) => {
    setIsPaused(true) // Pause autoplay when clicking dots
    goToSlide(index)
  }, [goToSlide])

  // Autoplay effect
  useEffect(() => {
    startAutoplay()
    return clearAutoplay
  }, [currentSlide, startAutoplay, clearAutoplay])

  // Reset animation state after transition completes
  useEffect(() => {
    if (!isAnimating) return
    
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [isAnimating, currentSlide])

  // Pause autoplay on hover (desktop only)
  const handleMouseEnter = () => {
    setIsPaused(true)
    clearAutoplay()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Touch event handlers for mobile swipe and drag
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    touchMoveRef.current = null
    isDraggingRef.current = false
    dragThresholdRef.current = 0
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)
    
    touchMoveRef.current = {
      x: touch.clientX,
      y: touch.clientY
    }

    // Determine if this is a horizontal drag
    if (absDeltaX > 10 && absDeltaX > absDeltaY) {
      isDraggingRef.current = true
      setIsDragging(true)
      setIsPaused(true)
      e.preventDefault()
      
      // Update drag offset for visual feedback
      const maxOffset = 100
      const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX * 0.5))
      setDragOffset(clampedOffset)
      dragThresholdRef.current = deltaX
    } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
      // This is likely a scroll gesture, don't interfere
      isDraggingRef.current = false
      setIsDragging(false)
      setDragOffset(0)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    const wasDragging = isDraggingRef.current
    const dragDistance = dragThresholdRef.current
    const deltaTime = Date.now() - touchStartRef.current.time
    
    // Reset drag state
    setIsDragging(false)
    setDragOffset(0)

    if (wasDragging) {
      const minSwipeDistance = 30
      const maxSwipeTime = 500
      
      // Trigger slide change based on drag distance and speed
      if (Math.abs(dragDistance) > minSwipeDistance && deltaTime < maxSwipeTime) {
        setIsPaused(true)
        
        if (dragDistance > 0) {
          prevSlide()
        } else {
          nextSlide()
        }
      }
    }

    // Cleanup
    touchStartRef.current = null
    touchMoveRef.current = null
    isDraggingRef.current = false
    dragThresholdRef.current = 0
  }

  // Mouse event handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    }
    isDraggingRef.current = false
    dragThresholdRef.current = 0
    setDragOffset(0)
    
    // Add mouse move and up listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!touchStartRef.current) return
      
      const deltaX = e.clientX - touchStartRef.current.x
      const deltaY = e.clientY - touchStartRef.current.y
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)
      
      if (absDeltaX > 5) {
        isDraggingRef.current = true
        setIsDragging(true)
        setIsPaused(true)
        
        // Update drag offset for visual feedback
        const maxOffset = 100
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX * 0.5))
        setDragOffset(clampedOffset)
        dragThresholdRef.current = deltaX
      }
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      const wasDragging = isDraggingRef.current
      const dragDistance = dragThresholdRef.current
      const deltaTime = touchStartRef.current ? Date.now() - touchStartRef.current.time : 0
      
      // Reset drag state
      setIsDragging(false)
      setDragOffset(0)
      
      if (wasDragging) {
        const minSwipeDistance = 20
        const maxSwipeTime = 500
        
        if (Math.abs(dragDistance) > minSwipeDistance && deltaTime < maxSwipeTime) {
          setIsPaused(true)
          
          if (dragDistance > 0) {
            prevSlide()
          } else {
            nextSlide()
          }
        }
      }
      
      // Cleanup
      touchStartRef.current = null
      isDraggingRef.current = false
      dragThresholdRef.current = 0
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: dragOffset,
      opacity: 1,
      transition: {
        duration: isDragging ? 0 : 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  }

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  const titleVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  }

  const descriptionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
  }

  return (
    <div className="flex flex-col items-start mb-5 sm:mb-5 md:mb-5 mt-30">
      <div className="flex flex-col space-y-4 items-start w-full">
        <SectionLabel text="OUR STRENGHTS"/>
        <p className="font-medium text-[18px] md:text-[60px] lg:text-[40px] text-[#040444] md:leading-[69.12px] text-center whitespace-nowrap">
          Driven by Discipline. Defined by Precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mx-auto md:mt-10 mt-5 mb-20 h-screen">
        {/* Content Slider */}
        <div 
          className={`w-full md:h-[90%]  rounded-[15.79px] bg-[#F1F1FE] relative overflow-hidden touch-pan-y select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentSlide}
              custom={1}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 p-8 flex flex-col items-center justify-center h-full"
            >
              <div className="flex flex-col space-y-9 items-center justify-start max-w-md mx-auto">
                <motion.div variants={numberVariants} initial="initial" animate="animate" className="relative">
                  <span className="md:text-4xl text-2xl font-bold text-[#040444] rounded-full bg-white w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                    {content[currentSlide].no}
                  </span>
                </motion.div>

                <div className="space-y-5 text-center">
                  <motion.h3
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    className="text-2xl md:text-3xl font-semibold text-[#040444]"
                  >
                    {content[currentSlide].title}
                  </motion.h3>

                  <motion.p
                    variants={descriptionVariants}
                    initial="initial"
                    animate="animate"
                    className="text-gray-600 leading-relaxed text-sm md:text-lg"
                  >
                    {content[currentSlide].description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
            {content.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                  currentSlide === index ? "bg-[#040444] w-10" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-[90%] sm:h-auto relative overflow-hidden rounded-[15.79px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={content[currentSlide].image || "/placeholder.svg"}
                alt={content[currentSlide].title}
                className="w-full h-[90%] object-cover rounded-[15.79px]"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Process;