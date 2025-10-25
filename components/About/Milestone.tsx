import React from 'react';
import CountUp from '@/components/ReusableComponenets/Countup';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/secionLabel';
import Image from 'next/image';
import ChairImage1 from '@/public/chair.jpg'


const Milestone = () => {
  const leftContent = [
    { number: 20, title: 'Years of Execution Excellence' },
    { number: 25, title: 'Hotel Projects' },
    { number: 500, title: 'Residential Projects' },
  ];

  const rightContent = [
    { number: 50, title: 'Retail Projects' },
    { number: 5, title: 'Super Speciality Hospitals' },
    { number: 40, title: 'Work Spaces' },
  ];

  return (
    <div className=" ">
      <div className='text-center'>
      <SectionLabel text='OUR PROCESS' />

      </div>
      <p className="font-medium text-[20px] md:text-[60px] text-[#040444] md:leading-[69.12px] text-center whitespace-nowrap">
        Milestone
        </p>

        <div className='block sm:hidden md:hidden'>
        <Image src={ChairImage1} alt={`Gallery Image 4`} layout='responsive' width={300} height={300} />

        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 md:px-20 max-w-8xl mx-auto mt-15">
        <div className="flex flex-col space-y-10 justify-center items-center">
          {leftContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-md rounded-lg p-4 text-start w-[220px]"
            >
              <div className="text-4xl font-bold text-[#040444]">
                <CountUp from={0} to={item.number} duration={1.5} separator="," />+
              </div>
              <p className="mt-2 text-[15px] text-gray-700">{item.title}</p>
            </motion.div>
          ))}
        </div>


        <div className='hidden sm:block md:block'>
        <Image src={ChairImage1} alt={`Gallery Image 4`} layout='responsive' width={300} height={300} />

        </div>

        <div className="flex flex-col space-y-10  justify-center items-center ">
          {rightContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-md rounded-lg p-4 text-start w-[220px]"
            >
              <div className="text-4xl font-bold text-[#040444]">
                <CountUp from={0} to={item.number} duration={1.5} separator="," />+
              </div>
              <p className="mt-2 text-[15px] text-gray-700">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Milestone;
