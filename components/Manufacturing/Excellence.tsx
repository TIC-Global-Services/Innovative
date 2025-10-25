'use client'

import React, { useEffect, useRef, useState } from "react";
import { ExcellenceImage } from "../ReusableComponenets/Icons";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

const Excellence = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Video is in view, try to play it
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(error => {
                console.log("Autoplay prevented:", error);
                // Fallback: try playing with user interaction
                if (sectionRef.current) {
                  sectionRef.current.addEventListener('click', tryPlayVideoOnce, { once: true });
                }
              });
          }
        } else {
          // Video is out of view, pause it
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const tryPlayVideoOnce = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.log("Still can't play:", error));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div>
      <div ref={sectionRef} className="relative items-center p-5 md:p-20 md:space-y-10 space-y-5 md:mt-40 mt-10 mb-10">
        {/* Video container with relative positioning */}
        <div className="relative w-full">
          <video
            ref={videoRef}
            src="https://ik.imagekit.io/i3jiehkks/Manufacture%20-%20Made%20with%20Clipchamp%20(1).mp4?updatedAt=1755856475737"
            className="w-full h-auto object-cover rounded-xl"
            muted={isMuted}
            loop
            playsInline
            preload="auto"
          />

          {/* Mute/Unmute Button fixed to bottom-right of video */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </button>
          
          {/* Fallback play button if video doesn't autoplay */}
          {!isPlaying && (
            <button
              onClick={tryPlayVideoOnce}
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30"
            >
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="w-full mt-[10px] md:mt-30">
        <div className="text-center text-3xl lg:text-[40px] md:text-[60px] text-[#040444]">
          Our Commitment to Excellence
        </div>
        <p className="text-[14px] mt-1 md:text-[20px] md:leading-[42px] lg:leading-[32px] font-normal text-center text-[#393535] md:px-65">
          At Innovative Interiors, excellence is not just a goal—it's the
          foundation of everything we create. From the selection of premium
          materials to the final quality checks, every step of our manufacturing
          process is driven by precision, innovation, and attention to detail.
        </p>
      </div>

      <div className="md:mt-20 mt-10">
        <Image src={ExcellenceImage} alt="excellence" className="w-full object-cover h-full" />
      </div>
    </div>
  );
};

export default Excellence;