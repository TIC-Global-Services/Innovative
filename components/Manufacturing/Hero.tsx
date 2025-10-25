import React from 'react'
import { HeroImageManu } from '../ReusableComponenets/Icons'
import Image from 'next/image'
import TopNav from '../ReusableComponenets/TopNav'

const Hero = () => {
  return (
    <div className='relative'>
     
      <Image src={HeroImageManu} alt={"home image"} className='rounded-[10px] w-full md:h-[95vh] h-[450px] sm:h-screen object-cover ' />
      <div className='absolute top-5 md:left-5 w-full z-10'>
          <TopNav />
      </div>



      

      <div className='absolute top-5 md:left-5 w-full z-10'>
          <TopNav />
      </div>
      <div className='absolute md:bottom-15 md:left-20 bottom-10 left-8  font-medium text-[20px] md:text-[62px] md:leading-[72px] text-white'>
      <div>
      Manufacturing Excellence at <br className='hidden md:block' /> Innovative Interiors
      </div>
      
      </div>
      
    
  

    </div>
  )
}

export default Hero
