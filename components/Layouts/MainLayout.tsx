"use client";
import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import TopNav from "@/components/ReusableComponenets/TopNav";
import Footer from "@/components/ReusableComponenets/Footer";
import { useEffect } from "react";

interface MainLayoutProps {
  heroImage?: StaticImageData;
  heroVideo?: string;
  heroText?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  textColor?: "white" | "black";
}

const MainLayout = ({
  heroImage,
  heroVideo,
  heroText,
  title,
  description,
  children,
  textColor = "white",
}: MainLayoutProps) => {
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const textColorClass = textColor === "black" ? "text-black" : "text-white";

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white overflow-hidden">
        {/* Hero Section with TopNav */}
        <div className="relative w-full h-[80vh]">
          <div className="w-[95%] mx-auto mt-[2%] h-full">
            {heroVideo ? (
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="xl:rounded-[30px] md:rounded-[30px] rounded-[10px] w-full h-[90vh] md:h-[95vh] object-cover object-bottom"
              />
            ) : (
              <Image
                src={heroImage || "/placeholder.svg"}
                alt="hero image"
                className="xl:rounded-[30px] md:rounded-[30px] rounded-[10px] w-full h-[90vh] md:h-[95vh] object-cover"
                priority
              />
            )}
          </div>

          <div className="absolute top-4 md:top-7 w-full z-10">
            <TopNav />
          </div>

          {heroText && (
            <div
              className={`absolute md:left-20 -bottom-15 md:-bottom-25 left-5 font-medium text-[20px] md:text-[60px] md:leading-[72px] ${textColorClass} max-w-[90%] md:max-w-[80%]`}
            >
              {heroText}
            </div>
          )}

          {title && (
            <div
              className={`absolute md:left-20 -bottom-0 md:-bottom-25 left-7 font-medium ${textColorClass} max-w-[90%] md:max-w-[80%]`}
            >
              <h1 className="md:text-[60px] text-[20px] md:leading-13">
                {title}
              </h1>

              {description && (
                <p className="md:text-[20px] md:w-[70%] mt-4 md:leading-[26px] leading-[20px] break-words whitespace-pre-wrap">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full overflow-x-hidden">{children}</div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;