"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExcellenceImage } from "../ReusableComponenets/Icons";
import Image from "next/image";
import Commitment3mobile from "@/public/Manufacturer/Commitment3mobile.png";

const Excellence = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Replace this with your actual YouTube video ID
  const youtubeVideoId = "1LckJ2SwoEc";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
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
        className="relative items-center p-5 lg:p-20 md:space-y-10 space-y-5 md:mt-40 mt-10 mb-10"
        variants={videoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* YouTube iframe container */}
        <motion.div
          className="relative w-full aspect-video max-w-[1320px] mx-auto"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${isInView ? 1 : 0}&mute=1&loop=1&playlist=${youtubeVideoId}&controls=1&modestbranding=1&rel=0`}
            title="Manufacturing Excellence Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>

      <div className="w-full mt-[10px] md:mt-30 lg:px-0 md:px-5">
        <motion.div
          className="text-left md:text-center text-3xl lg:text-[40px] md:text-[60px] text-[#040444] font-medium lg:px-0 md:px-5 px-5"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Our Commitment to Excellence
        </motion.div>

        <motion.p
          className="text-[14px] px-5 mt-3 md:mt-1 md:text-[20px] md:leading-[42px] lg:leading-[32px] font-normal text-left md:text-center text-[#393535] lg:px-65"
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
        className="lg:mt-20 mt-10"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src={ExcellenceImage}
          alt="excellence"
          className="w-full object-contain h-full rounded-lg md:rounded-none md:block hidden"
        />
        <Image
          src={Commitment3mobile}
          alt="excellence"
          className="w-full object-contain h-full rounded-lg md:rounded-none md:hidden block"
        />
      </motion.div>
    </div>
  );
};

export default Excellence;