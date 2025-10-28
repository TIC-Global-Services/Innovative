import React from "react";
import CountUp from "@/components/ReusableComponenets/Countup";
import { motion } from "framer-motion";
import SectionLabel from "../ui/secionLabel";
import Image from "next/image";
import ChairImage1 from "@/public/chair.jpg";

const Milestone = () => {
  const leftContent = [
    { number: 20, title: "Years of Execution Excellence" },
    { number: 25, title: "Hotel Projects" },
    { number: 500, title: "Residential Projects" },
  ];

  const rightContent = [
    { number: 50, title: "Retail Projects" },
    { number: 5, title: "Super Speciality Hospitals" },
    { number: 40, title: "Work Spaces" },
  ];

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
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
    <div className="">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel text="OUR PROCESS" />
      </motion.div>

      <motion.p
        className="font-medium text-[20px] md:text-[60px] text-[#040444] md:leading-[69.12px] text-center whitespace-nowrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Milestone
      </motion.p>

      {/* Mobile Image */}
      <motion.div
        className="block lg:hidden mt-6 px-4"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src={ChairImage1}
          alt={`Gallery Image 4`}
          layout="responsive"
          width={300}
          height={300}
          className="rounded-lg"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 px-0 md:px-20 max-w-8xl mx-auto mt-8 md:mt-15">
        {/* Left Column */}
        <motion.div
          className="flex flex-col space-y-4 md:space-y-10 justify-center items-center md:items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {leftContent.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(4, 4, 68, 0.15)",
                transition: { duration: 0.3 },
              }}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 text-start w-full md:w-[220px]"
            >
              <div className="text-4xl font-bold text-[#040444]">
                <CountUp
                  from={0}
                  to={item.number}
                  duration={1.5}
                  separator=","
                />
                +
              </div>
              <p className="mt-2 text-[15px] text-gray-700">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Image */}
        <motion.div
          className="hidden lg:block"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={ChairImage1}
            alt={`Gallery Image 4`}
            layout="responsive"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="flex flex-col space-y-4 md:space-y-10 justify-center items-center md:items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {rightContent.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(4, 4, 68, 0.15)",
                transition: { duration: 0.3 },
              }}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 text-start w-full md:w-[220px]"
            >
              <div className="text-4xl font-bold text-[#040444]">
                <CountUp
                  from={0}
                  to={item.number}
                  duration={1.5}
                  separator=","
                />
                +
              </div>
              <p className="mt-2 text-[15px] text-gray-700">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Milestone;
