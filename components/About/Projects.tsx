
"use client";
import React, { useState, useEffect } from 'react';
import { CaroselImage, RightArrow } from '../ReusableComponenets/Icons';
import Image from 'next/image';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 15;
  const splideId = 'projects-main-carousel'; // Unique identifier for this Splide instance

  const getInitialMiddleIndex = () => {
    return Math.floor(totalSlides / 2);
  };

  useEffect(() => {
    setActiveIndex(getInitialMiddleIndex());
  }, []);

  const getImageClassName = (index: number) => {
    const baseClasses = "transition-all duration-300 ease-in-out transform object-cover rounded-[10px] justify-center items-center";
    const activeClasses = "scale-110 z-20 opacity-100";
    const inactiveClasses = "scale-90 opacity-50 z-10 mt-4";
    
    if (index === activeIndex) {
      return `${baseClasses} ${activeClasses} w-full sm:w-[90%] md:w-[347px] lg:w-[706px]`;
    } else {
      return `${baseClasses} ${inactiveClasses} w-[70%] sm:w-[80%] md:w-[347px]`;
    }
  };

  const getImageHeight = (index: number) => {
    return index === activeIndex 
      ? 'h-[250px] sm:h-[300px]' 
      : 'h-[200px] sm:h-[269px]';
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto  ">
      {/* Header Section */}
      <div className="flex xl:flex-row flex-col xl:justify-between justify-center xl:items-start items-center w-full space-y-5 mb-10 md:mb-20">
        <div className="flex flex-col space-y-5 items-center w-full xl:items-start xl:w-auto">
          <div className="bg-[#F8F8F8] h-[30px] w-[140px] flex justify-center items-center font-medium text-[#141414] text-[11.81px] rounded-[8px] whitespace-nowrap">
            <ul className="list-disc pl-5 text-center whitespace-nowrap">
              <li>OUR PROJECTS</li>
            </ul>
          </div>
          <h2 className="font-semibold text-[16px] md:text-[32px] xl:text-[55px] xl:leading-[64px] text-center xl:text-start text-[#040444] max-w-[784px]">
            Our Creations, Your Inspiration Itself.
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full xl:items-start xl:w-auto space-y-5 max-w-[784px]">
          <p className="font-normal text-[14px] md:text-[18px] xl:text-[26px] xl:leading-[42px] text-center xl:text-start text-[#393535]">
            Architecture is more than just structures; it's a reflection of creativity, purpose, and human connection. We believe in designing spaces that inspire, function seamlessly, and stand the test of time.
          </p>
        </div>
      </div>
    
      {/* Carousel Section */}
      <div className="relative w-full mx-auto h-[220px]  md:h-[300px] px-1 md:px-8 lg:px-12 xl:px-20 ">
        <Splide
          id={splideId}
          aria-label="Our Projects Gallery"
          options={{
            type: 'loop',
            perPage: 3,
            perMove: 1,
            focus: 'center',
            gap: '20px',
            start: getInitialMiddleIndex(),
            autoplay: true,
            interval: 3000,
            pagination: false,
            arrows: false,
            trimSpace: false,
            
            breakpoints: {
              1536: { perPage: 3 },
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          onMove={(splide: any, newIndex: React.SetStateAction<number>) => setActiveIndex(newIndex)}
          className="w-full mt-10"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <SplideSlide 
              key={`${splideId}-slide-${index}`}
              className="flex items-center justify-center h-full"
            >
              <div className={`w-full flex items-center mt-10  h-[100px] md:h-[300px] justify-center ${getImageHeight(index)}`}>
                <Image
                  src={CaroselImage}
                  alt={`Project showcase ${index + 1}`}
                  className={getImageClassName(index)}
                  width={400}
                  height={500}
                  priority={index === activeIndex}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Projects;