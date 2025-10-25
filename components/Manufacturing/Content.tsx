import React from "react";
import SectionLabel from "../ui/secionLabel";

const Content = () => {
  return (
    <div className="mb-[40px] mt-[80px] md:mt-[150px] md:mb-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] xl:justify-between justify-center space-y-5">
        {/* <div className="flex flex-col items-center md:w-auto  md:items-start">
          <SectionLabel text="EVERYONE SAYS"/>
        </div> */}

        <div className="flex flex-col items-center w-full xl:items-start md:w-auto space-y-5 mt-5">
          <div>
            <p className=" text-3xl md:text-[45px] xl:leading-[55px] xl:text-start lg:text-start text-center text-[#040444]">
              Innovative Interiors: Where Design Meets Manufacturing Excellence
            </p>
          </div>
          <div>
            <p className="font-normal text-[16px] lg:text-[20px]  xl:text-[20px] xl:leading-[42px] xl:text-start lg:text-start text-center text-[#393535]">
              Manufacturing is a fine balance of engineering, craftsmanship, and
              advanced technology. Our facilities boast:
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
