import React from 'react'
import { VenHero } from '../ReusableComponenets/Icons'
import Image from 'next/image'
import TopNav from '../ReusableComponenets/TopNav'

const Hero = () => {
  return (
    
<div className='relative '>
     
    

     
     <Image src={VenHero} alt={"home image"} className='rounded-[10px] w-full md:h-[95vh] h-[450px] sm:h-screen object-cover ' />
     <div className='absolute top-5 md:left-5 w-full z-10'>
         <TopNav />
     </div>
     <div className='absolute md:bottom-15 md:left-20 bottom-10 left-8  font-medium text-[20px] md:text-[62px] md:leading-[72px] text-white'>
     <div>
      Our trusted network
     </div>
     <div className='text-[16px] md:text-[32px] md:leading-[100%] leading-[23px] font-normal text-white md:w-[1000px]'>
     Innovative Interiors is a leading turnkey contracting company specializing in architect designed - project execution and fine woodworking.  
     </div>
     </div>
     
   </div>
  )
}

export default Hero
