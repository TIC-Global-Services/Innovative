import React from "react";
import { RightArrow, RightColorArrow } from "../ReusableComponenets/Icons";
import SectionLabel from "../ui/secionLabel";
const OurServices = () => {
  const contents = [
    {
      title: "Architectural Design",
      description:
        "Architecture is more than just structures; it's a reflection of creativity, purpose, and human connection. We believe ",
      viewMore: "View More",
    },
    {
      title: "Interior Design",
      description:
        "Architecture is more than just structures; it's a reflection of creativity, purpose, and human connection. We believe ",
      viewMore: "View More",
    },
    {
      title: "Renovation",
      description:
        "Architecture is more than just structures; it's a reflection of creativity, purpose, and human connection. We believe ",
      viewMore: "View More",
    },
  ];

  return (
    <div className="md:mt-52">
      <div className="flex xl:flex-row flex-col justify-between items-center space-y-5 md:my-[100px] mt-[80px]">
        <div className="flex flex-col xl:space-y-2 space-y-5 items-start w-full xl:items-start xl:w-auto">
          <SectionLabel text="OUR SERVICES"/>
          <div>
            <p className="font-semibold text-3xl xl:text-[45px] xl:leading-[59px] xl:text-start text-start text-[#040444] xl:w-[884px]">
              Empowering You <br className="hidden md:block xl:block" /> with Our
              Services
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start w-full md:items-start md:w-auto space-y-5">
          <div>
            <p className="font-normal text-[16px]  xl:text-[20px] xl:leading-[32px] xl:text-start  text-[#393535]">
              Architecture is more than just structures; it's a reflection of
              creativity, purpose, and human connection. We believe in designing
              spaces that inspire, function seamlessly, and stand the test of time.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex xl:flex-row flex-col-reverse  gap-10 justify-center items-center  md:mt-30 mt-20 space-x-8 ">
        <div className="flex flex-col md:w-1/2 w-full mx-auto mt-4">
          {contents.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-[#888888] relative pb-12 space-y-20"
            >
              <div className="flex flex-col border-b border-[#888888] relative pb-2 md:space-y-15 space-y-5 ">
                <div className="flex flex-col space-y-2">
                  <h2 className="md:text-[32px] text-[14px]  font-semibold leading-[36px] text-[#040444]">
                    {item.title}
                  </h2>
                  <p className="font-normal md:text-[16px] text-[10px] md:leading-[32px] leading-[100%] width text-[#393535]">
                    {item.description}
                  </p>
                </div>

               
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/2 w-full relative">
          <Image src={Image1} alt="Image1" />
          <Image 
              src={Play} 
              alt="Play button" 
              className="absolute md:top-4 md:right-4 top-1 right-1 cursor-pointer w-[50px] h-[50px] md:w-[90px] md:h-[90px]"
              width={90}
              height={90}
          />
        </div>
      </div> */}

      {/* <div className=" justify-center items-center flex-row flex mt-30">
          <button className="w-[100px] md:w-[152px]   h-[30px] md:h-[56px] bg-[#040444] md:text-[19px] text-[11px] text-white rounded-full whitespace-nowrap cursor-pointer hover:scale-104">
            View More
          </button>
          <a className="">
            <div className="w-[30px] md:w-[56px] h-[30px] md:h-[56px] bg-[#040444] text-white rounded-full flex justify-center items-center  cursor-pointer hover:scale-104">
              <Image src={RightArrow} alt="right arrow" className="w-[15px] md:w-[19.3px] h-[15px] md:h-[19.3px] bg-[#040444] text-white" />
            </div>
          </a>
        </div> */}
    </div>
  );
};

export default OurServices;
