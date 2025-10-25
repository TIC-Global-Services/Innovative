'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20, logo21, logo22, logo23, logo24, logo25, logo26, logo27, logo28, logo29,
} from "../ReusableComponenets/Icons";
import Image from 'next/image';
import { Volume2, VolumeX } from "lucide-react";

const Clients = () => {
 const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Video is in view, play it
          if (videoRef.current) {
            videoRef.current.play().catch(error => {
              console.log("Autoplay prevented:", error)
            })
            setIsPlaying(true)
          }
        } else {
          // Video is out of view, pause it
          if (videoRef.current) {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const logos = [
    { logo: logo1 }, { logo: logo2 }, { logo: logo3 }, { logo: logo4 }, { logo: logo5 },
    { logo: logo6 }, { logo: logo7 }, { logo: logo8 }, { logo: logo9 }, { logo: logo10 },
    { logo: logo11 }, { logo: logo13 }, { logo: logo14 }, { logo: logo15 }, { logo: logo16 },
    { logo: logo17 }, { logo: logo18 }, { logo: logo19 }, { logo: logo20 }, { logo: logo22 },
    { logo: logo23 }, { logo: logo24 }, { logo: logo25 }, { logo: logo26 }, { logo: logo27 },
    { logo: logo28 }, { logo: logo29 },
  ];

  return (
    <div ref={sectionRef} className='flex flex-col items-center p-5 md:p-20 md:space-y-10 space-y-5 md:mt-40 mt-20 mb-30 lg:mt-20 lg:mb-20'>
      <h2 className='md:text-[60px] text-[16px] lg:text-[45px] font-medium leading-[64px] text-[#040444]'>
        Crafting Spaces for Exceptional Clients
      </h2>

      {/* Marquee Logo Section */}
      <div className="relative overflow-hidden w-full max-w-4xl h-[100px] bg-white mx-auto fade-mask">
        <div
          className="flex items-center"
          style={{
            animation: "marquee 25s linear infinite",
            width: "fit-content"
          }}
        >
          {logos.map((item, index) => (
            <div key={`logo-1-${index}`} className="flex items-center justify-center mx-4 md:mx-8 h-[80px] w-[120px]">
              <Image src={item.logo} alt="Client logo" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
          {logos.map((item, index) => (
            <div key={`logo-2-${index}`} className="flex items-center justify-center mx-4 md:mx-8 h-[80px] w-[120px]">
              <Image src={item.logo} alt="Client logo" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Actual Video Instead of Image */}
      <div className="relative w-full max-w-4xl mt-6">
        <video
          ref={videoRef}
          src="https://ik.imagekit.io/i3jiehkks/about%20(2).mp4?updatedAt=1755856766129" 
          className="w-full h-auto object-cover rounded-xl"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-30%); }
        }
        div:hover > div[style*="animation: marquee"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default Clients
