"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExcellenceImage } from "../ReusableComponenets/Icons";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import Commitment3mobile from "@/public/Manufacturer/Commitment3mobile.png";

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
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch((error) => {
                console.log("Autoplay prevented:", error);
                // Fallback: try playing with user interaction
                if (sectionRef.current) {
                  sectionRef.current.addEventListener(
                    "click",
                    tryPlayVideoOnce,
                    { once: true }
                  );
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
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Still can't play:", error));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Animation variants
  const videoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <motion.div
        ref={sectionRef}
        className="relative items-center p-5 md:p-20 md:space-y-10 space-y-5 md:mt-40 mt-10 mb-10"
        variants={videoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Video container with relative positioning */}
        <motion.div
          className="relative w-full"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <video
            ref={videoRef}
            src="\Manufacturer\manufacturing.mp4"
            className="w-[1320px] h-[670px] object-cover rounded-xl"
            muted={isMuted}
            loop
            playsInline
            preload="auto"
          />

          {/* Mute/Unmute Button fixed to bottom-right of video */}
          <motion.button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </motion.button>

          {/* Fallback play button if video doesn't autoplay */}
          {!isPlaying && (
            <motion.button
              onClick={tryPlayVideoOnce}
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      <div className="w-full mt-[10px] md:mt-30 md:px-0">
        <motion.div
          className="text-left md:text-center text-3xl lg:text-[40px] md:text-[60px] text-[#040444] font-medium"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Our Commitment to Excellence
        </motion.div>

        <motion.p
          className="text-[14px] mt-3 md:mt-1 md:text-[20px] md:leading-[42px] lg:leading-[32px] font-normal text-left md:text-center text-[#393535] md:px-65"
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          At Innovative Interiors, excellence is not just a goal—it's the
          foundation of everything we create. From the selection of premium
          materials to the final quality checks, every step of our manufacturing
          process is driven by precision, innovation, and attention to detail.
        </motion.p>
      </div>

      <motion.div
        className="md:mt-20 mt-10"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src={ExcellenceImage}
          alt="excellence"
          className="w-full object-cover h-full rounded-lg md:rounded-none md:block hidden"
        />
        <Image
          src={Commitment3mobile}
          alt="excellence"
          className="w-full object-cover h-full rounded-lg md:rounded-none md:hidden block"
        />
      </motion.div>
    </div>
  );
};

export default Excellence;
