"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../ui/secionLabel";

const Content = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mb-[40px] mt-[80px] md:mt-[150px] md:mb-[100px]">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] xl:justify-between justify-center space-y-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* <div className="flex flex-col items-center md:w-auto  md:items-start">
          <SectionLabel text="EVERYONE SAYS"/>
        </div> */}

        <div className="flex flex-col items-start w-full xl:items-start md:w-auto space-y-5 mt-5 md:px-0">
          <motion.div variants={headingVariants}>
            <p className="text-3xl md:text-[45px] xl:leading-[55px] text-left xl:text-start lg:text-start text-[#040444] font-medium">
              Innovative Interiors: Where Design Meets Manufacturing Excellence
            </p>
          </motion.div>

          <motion.div variants={paragraphVariants}>
            <p className="font-normal text-[16px] lg:text-[20px] xl:text-[20px] xl:leading-[42px] text-left xl:text-start lg:text-start text-[#393535]">
              Manufacturing is a fine balance of engineering, craftsmanship, and
              advanced technology. Our facilities boast:
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Content;
