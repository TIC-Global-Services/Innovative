import React from 'react'
import Image from 'next/image'
import pin from '@/public/pin.png';
import exp from '@/public/exp.png';
import SectionLabel from '../ui/secionLabel';

const Journey = () => {

  const journey = [
    {
      title: 'Project Site Engineer',
      location: 'chennai',
      experience: '3+years (In Interiors)',
    },
    {
      title: 'Interior Designer (Autocad Expert)',
      location: 'chennai',
      experience: '4+years',
    },
    {
      title: 'Project Coordinators',
      location: 'chennai',
      experience: '3+years',
    },
    {
      title: 'Estimation Engineer',
      location: 'chennai',
      experience: '4+years',
    },
    {
      title: 'Production Manager',
      location: 'chennai',
      experience: '4+years',
    }, 
    {
      title: 'Intern (civil, hr, Accounts, Interior design)',
      location: 'chennai',
      experience: 'Fresher',
    },
  ]

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col items-center w-full md:mt-[120px] mt-[50px]">
        <SectionLabel text='OPENINGS'/>
        <div>
          <p className="font-medium text-3xl md:text-[40px] xl:leading-[69px] text-center text-[#040444] md:w-[884px]">
            Start Your Career Journey Here
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 mt-10 max-w-7xl  mx-auto">
          {journey.map((item, index) => (
            <div key={index} className="border-b border-[#888888] pb-4 flex flex-row justify-between items-start">
              <div className='flex flex-col gap-2'>
                <h3 className="font-bold text-[#040444] text-[30px]">{item.title}</h3>
                <p className="text-[#393535] text-[16px] flex flex-row items-center gap-2">
                  <Image src={pin} alt="pin" className='w-[15px] h-[15px]' /> 
                  Location: {item.location}
                </p>
                <p className="text-[#393535] text-[16px] flex flex-row items-center gap-2">
                  <Image src={exp} alt="exp" className='w-[15px] h-[15px]' /> 
                  Experience: {item.experience}
                </p>
              </div>
              <div className='flex flex-col justify-between items-center gap-4 py-2'>
                {/* <button className='bg-[#040444] text-white w-[122px] h-[36px] rounded-full hover:bg-[#060666] transition-colors'>
                  Apply Now
                </button>
                <p className='text-[#888888] underline text-[16px] cursor-pointer hover:text-[#666666]'>
                  View More
                </p> */}
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='block md:hidden'>
        <div className="grid grid-cols-1 gap-6 p-4 mt-10">
          {journey.map((item, index) => (
            <div key={index} className="border-b border-[#888888] pb-4 flex flex-col">
              <h3 className="font-bold text-[#040444] text-[24px] text-center mb-4">{item.title}</h3>
              <div className="flex justify-between px-4 mb-4">
                <p className="text-[#393535] text-[12px] flex flex-row items-center gap-1">
                  <Image src={pin} alt="pin" className='w-[10px] h-[10px]' /> 
                  Location: {item.location}
                </p>
                <p className="text-[#393535] text-[12px] flex flex-row items-center gap-1">
                  <Image src={exp} alt="exp" className='w-[10px] h-[10px]' /> 
                  Experience: {item.experience}
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                {/* <p className='text-[#888888] underline text-[12px] cursor-pointer hover:text-[#666666]'>
                  View More
                </p>
                <button className='bg-[#040444] text-[12px] text-white w-[122px] h-[36px] rounded-full hover:bg-[#060666] transition-colors'>
                  Apply Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Journey