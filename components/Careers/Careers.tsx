import React from 'react'

import careerImage1 from '@/public/Frame 176 (1).png'
import careerImage2 from '@/public/Frame 178.png'
import careerImage3 from '@/public/Frame 180.png'

import Image from 'next/image'
const Careers = () => {

  const contents = [
    {
      title: 'Innovative Projects',
      description: 'Work on cutting-edge interior design concepts for residential, commercial, and luxury spaces.',
      image: careerImage1,
    },
    {
      title: 'Creative Freedom',
      description: 'Work on cutting-edge interior design concepts for residential, commercial, and luxury spaces.',
      image: careerImage2,
    },
    {
      title: 'Professional Growth',
      description: 'Work on cutting-edge interior design concepts for residential, commercial, and luxury spaces.',
      image: careerImage3,
    },
  ];

  return (
    <div className='bg-white md:mt-[100px] mt-20'>
      <div className="flex flex-col space-y-3 items-center w-full  ">
        <div className="bg-[#F8F8F8] h-[30px] w-[140px] flex justify-center items-center font-medium text-[#141414] text-[11.81px] rounded-[8px] whitespace-nowrap">
          <ul className="list-disc pl-5 text-center whitespace-nowrap">
            <li>CAREERS</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[16px] xl:text-[55.91px] xl:leading-[69px]  text-center text-[#040444] w-full max-w-4xl">
            Why Work With Us?
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-around items-center mt-8  md:mt-15 px-4'>
        {
          contents.map((content, index) => (
            <div key={index} className='flex flex-col space-y-5 items-center justify-center w-full md:w-[30%] text-center mb-10'>
              <h1 className="font-bold text-[24px] md:text-[32px] leading-[36px] text-[#040444]">{content.title}</h1>
              <p className="text-[#808080] text-[16px] md:text-[20px] leading-[30px] ">{content.description}</p>
              <Image src={content.image} alt={content.title} className='w-full h-auto max-w-[400px]' />

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Careers
