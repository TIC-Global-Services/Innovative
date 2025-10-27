"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  tower1,
  tower2,
  tower3,
  tower4,
  tower5,
  tower6,
} from "../ReusableComponenets/Icons";

const Tower = () => {
  const steps = [
    {
      number: "01",
      title: "Shop Drawing Approval",
      description:
        "Production begins only after detailed shop drawings are vetted and approved, ensuring accuracy from the start.",
      image: tower1,
    },
    {
      number: "02",
      title: "Production Planning Pipeline",
      description:
        "Tasks are scheduled through our system for efficient timelines and resource use.",
      image: tower2,
    },
    {
      number: "03",
      title: "Material Procurement",
      description:
        "Materials are sourced via our central stores and trusted vendors to ensure quality and consistency.",
      image: tower3,
    },
    {
      number: "04",
      title: "Controlled Manufacturing Environment",
      description: "Meeting diverse client needs efficiently",
      image: tower4,
    },
    {
      number: "05",
      title: "Multi-Level Quality Checks",
      description:
        "Each product undergoes rigorous quality checks at multiple stages, ensuring adherence to our high standards.",
      image: tower5,
    },
    {
      number: "06",
      title: " Packing & In-House Delivery",
      description:
        "Finished goods are securely packed and dispatched through our in-house logistics network for safe, on-time delivery.",
      image: tower6,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <div className="mx-auto max-w-7xl w-full md:px-0">
      <motion.div
        className="flex flex-col items-center space-y-1 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              backgroundColor: "rgba(4, 4, 68, 0.02)",
              transition: { duration: 0.3 },
            }}
            className={`flex md:flex-row flex-col items-start md:items-center justify-between w-full md:h-[253px] h-auto md:px-6 transition-colors duration-300 ${
              index < steps.length - 1 ? "border-b border-[#000000]" : ""
            }`}
          >
            {/* Text Column */}
            <div className="flex md:flex-row md:py-0 py-6 flex-col items-start md:items-center w-full text-[#040444]">
              <div className="flex items-start md:items-center md:space-x-16 space-x-4 mb-3 md:mb-0">
                <motion.span
                  className="text-left md:text-center text-[20px] md:text-[40px] font-bold min-w-[40px] md:min-w-[60px]"
                  variants={numberVariants}
                >
                  {step.number}
                </motion.span>
                <motion.span
                  className="text-left md:font-medium font-semibold text-[18px] md:text-[35px] md:w-90 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {step.title}
                </motion.span>
              </div>

              <motion.span
                className="text-[#393535] text-left md:text-left text-[15px] md:text-[20px] font-light md:ml-20 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {step.description}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Tower;
