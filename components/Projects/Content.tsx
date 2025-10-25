import React from "react";
import SectionLabel from "../ui/secionLabel";

const Content = () => {
  return (
    <div className="md:mb-40 mb-10 mt-20 md:mt-0">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 xl:gap-12 mt-10 md:mt-20 lg:mt-30">
        {/* Left Column */}
        <div className="flex flex-col space-y-5 items-center xl:items-start">
          <SectionLabel text="OUR VISION" />
          <h2 className="font-medium text-3xl md:text-[60px] leading-tight md:leading-tight 2xl:leading-[64px] text-center xl:text-left text-[#040444]">
            A Glimpse of Our <br className="md:block hidden" />Expertise
          </h2>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center ">
          <p className="font-normal text-[14px] md:text-[20px] 2xl:text-[20px]  2xl:leading-[32px] text-center xl:text-left text-[#393535]">
            We bring design to life through precision-led execution  built to last, function seamlessly, and stay true to the architect’s vision.
          </p>
        </div>
      </div>

      {/* <div className="flex xl:flex-row flex-col md:items-center justify-between space-y-5 mt-10 md:mt-30">
        <div className="flex flex-col space-y-2 items-center w-full md:items-start md:w-auto">
          <div>
          <SectionLabel text="OUR PROJECTS"/>
            <p className="font-semibold text-[16px] xl:text-[55.91px] xl:leading-[69px] md:text-start text-center text-[#040444] w-[884px]">
              A Glimpse of Our <br/>Expertise
            </p>
          </div>
        </div>



        <div className="flex flex-col items-center w-full md:items-start md:w-auto space-y-5">

          <div>
            <p className="font-normal text-[16px]  xl:text-[25px] xl:leading-[42px] md:text-start text-center text-[#393535]">
              We bring design to life through precision-led execution  built to last, function seamlessly, and stay true to the architect’s vision.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Content;
