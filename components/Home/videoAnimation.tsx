"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "../ui/secionLabel";
import ArrowBtn from "../ui/arrowBtn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const VideoAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const totalFrames = 180;
  const currentFrame = (index: number) =>
    `/Inno/frame_${(index + 1).toString().padStart(4, '0')}.webp`;

  const images: HTMLImageElement[] = [];
  const imgSeq = { frame: 0 };

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    // Set canvas size based on window size
    const setCanvasSize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[imgSeq.frame];
      if (!img || !img.complete) return;
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        x,
        y,
        imgWidth * scale,
        imgHeight * scale
      );
    };

    images[0].onload = () => {
      render();


      // Timeline for sequential text animations
     gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=10",
          end: "+=3000",
          scrub: 1,
        },
      });


      // Canvas animation
      gsap.to(imgSeq, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
        },
        onUpdate: render,
      });
    };

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row justify-center items-center py-6 sm:py-8 md:py-10 lg:py-0 px-4 "
    >
      {/* Canvas Container - Left Side */}
      <div className="w-full xl:w-[80%] lg:w-[60%] h-[500px] sm:h-[400px] md:h-[700px] lg:h-[600px] xl:h-[600px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
        />
      </div>

      {/* Content Container - Right Side */}
      <div className="w-full lg:w-[30%] flex flex-col items-center lg:items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:pl-8 xl:pl-16">
        {/* Desktop Content */}
        <div className="hidden md:flex flex-col gap-3 lg:gap-4 w-full">
          <div>
            <SectionLabel text="WHAT WE DO" />
          </div>

          <h2 className="text-[#040444] text-[32px] lg:text-[38px] xl:text-[45px] leading-[38px] lg:leading-[44px] xl:leading-[50px] font-medium">
            Bringing Life Into
            <br />
            Spaces
          </h2>

          <p className="text-[#141414] text-[16px] lg:text-[18px] xl:text-[20px] leading-[24px] lg:leading-[26px] xl:leading-[28px]">
            Over 1 million sft of Interior Furniture manufactured,
           
            Civil & Interior Fitout projects delivered.
          </p>

          <ArrowBtn
            text="View More"
            backgroundColor="#040444"
            textColor="white"
            href="/manufacturing"
          />
        </div>

        {/* Mobile Content */}
        <div className="flex md:hidden flex-col items-center text-center gap-3 sm:gap-4 w-full">
          <SectionLabel text="WHAT WE DO" />

          <h2 className="text-[#040444] text-[22px] sm:text-[26px] leading-[28px] sm:leading-[34px] font-semibold">
            Turning Vision Into Reality
          </h2>

          <p className="text-[#191919] text-[14px] sm:text-[15px] leading-[20px] sm:leading-[22px] max-w-[90%] sm:max-w-full">
            Over 1 million sft of Interior Furniture manufactured
          </p>

          <ArrowBtn
            text="View More"
            backgroundColor="#040444"
            textColor="white"
            href="/manufacturing"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoAnimation;