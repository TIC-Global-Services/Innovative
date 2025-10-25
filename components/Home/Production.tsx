"use client"
import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import ArrowBtn from "../ui/arrowBtn"

const Production = () => {
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

  return (
    <div ref={sectionRef} className="production-section md:mb-[150px] z-20 relative md:mt-48">
      <section className="bg-white">
        {/* Wrap video + button in a relative container */}
        <div className="relative">
          <video
            ref={videoRef}
            src="https://ik.imagekit.io/i3jiehkks/Home%20-%20Made%20with%20Clipchamp%20(2).mp4?updatedAt=1755857667411"
            className="w-full h-[593px] object-cover"
            loop
            muted={isMuted}
            playsInline
          />

          {/* Mute/Unmute Button - bottom right of video */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-80 transition"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <div className="flex md:flex-row flex-col md:justify-between space-y-5 md:space-y-0 justify-center items-center md:px-5 px-3 mt-10">
          <div className="flex items-center justify-center w-full md:w-auto h-full">
            <p className="text-[11px] md:text-[36.69px] md:text-start text-center md:leading-[53.8px] text-[#202022] md:tracking-[-1.44px] md:w-[1000px]">
              Our Sprawling 1,00,000 Sq. Ft. Production Facility, Spread Across 11 Acres — With Exciting
              Developments Underway.
            </p>
          </div>
          <ArrowBtn backgroundColor="#040444" text="Let's Talk!" href="/vendors" />
        </div>
      </section>
    </div>
  )
}

export default Production