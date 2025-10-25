"use client";
import React, { useRef, useEffect } from "react";
// @ts-ignore
import { Splide, SplideSlide, SplideInstance } from "@splidejs/react-splide";
import ScrollImage1 from "@/public/unsplash_p9Dh4EAhcfg(1).png";
import ScrollImage2 from "@/public/unsplash_pAtA8xe_iVM.png";
import ScrollImage3 from "@/public/unsplash_p9Dh4EAhcfg.png";
import Image from "next/image";
import "@splidejs/react-splide/css";
import SectionLabel from "../ui/secionLabel";

// Slider component for displaying images in a carousel

interface SplideRef {
  splide: SplideInstance;
}
const Slider = () => {
  const splideRef = useRef<SplideRef | null>(null);

  const images = [
    {
      src: ScrollImage1,
      alt: "Interior design concept 1",
      name: "John",
      title: "Ceo",
    },
    {
      src: ScrollImage2,
      alt: "Interior design concept 2",
      name: "Frank",
      title: "Manager",
    },
    {
      src: ScrollImage3,
      alt: "Interior design concept 3",
      name: "Philip",
      title: "Assistant Manager",
    },
  ];
  // Duplicate images for infinite loop effect
  const sliderImages = [...images, ...images, ...images];

  // Effect to add animation classes after mounting
  useEffect(() => {
    const splideInstance = splideRef.current?.splide;

    if (splideInstance) {
      // Add animation effect on slide change
      splideInstance.on("move", () => {
        const slides = document.querySelectorAll(".splide__slide");
        slides.forEach((slide, index) => {
          if (slide.classList.contains("is-active")) {
            slide.classList.add("center-focused");
          } else {
            slide.classList.remove("center-focused");
          }

          // Add special class for last two images
          const totalSlides = sliderImages.length;
          if (index === totalSlides - 2 || index === totalSlides - 1) {
            slide.classList.add("scale-down");
          } else {
            slide.classList.remove("scale-down");
          }
        });
      });

      // Trigger initial animation setup
      setTimeout(() => {
        const activeSlide = document.querySelector(".splide__slide.is-active");
        if (activeSlide) {
          activeSlide.classList.add("center-focused");
        }

        // Apply special class to last two images initially
        const slides = document.querySelectorAll(".splide__slide");
        const totalSlides = slides.length;
        if (totalSlides >= 2) {
          slides[totalSlides - 1].classList.add("scale-down");
          slides[totalSlides - 2].classList.add("scale-down");
        }
      }, 100);
    }
  }, []);

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12 justify-center items-center overflow-hidden">
      <div className="flex flex-col space-y-3 items-center w-full  ">
        <SectionLabel text="EMPLOYEES SAYS" />
        <div>
          <p className="font-medium text-3xl md:text-[55px] xl:leading-[69px]  text-center text-[#040444]">
            A Workplace That Fuels Creativity
          </p>
        </div>
      </div>
      <Splide
        className="mt-10"
        ref={splideRef}
        aria-label="Interior design concepts slider"
        options={{
          type: "loop",
          perPage: 5,
          perMove: 1,
          focus: "center",
          pagination: false,
          gap: "1.5rem",
          arrows: false,
          autoplay: true,
          interval: 4000,
          speed: 800,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          pauseOnHover: true,
          trimSpace: false,
          updateOnMove: true,
          breakpoints: {
            640: {
              perPage: 1,
            },
            1024: {
              perPage: 3,
              gap: "1rem",
            },
            1280: {
              perPage: 5, // Ensure this remains 5 for larger screens
            },
          },
        }}
      >
        {sliderImages.map((image, index) => {
          const isActive =
            index === sliderImages.length - 1 ||
            index === sliderImages.length - 2;
          return (
            <SplideSlide
              key={`${image.alt}-${index}`}
              className={`transition-all duration-500 h-[420px] ease-in-out ${
                isActive ? "scale-down" : ""
              }`}
            >
              <div className="flex justify-center p-2">
                <div className="relative aspect-square w-full max-w-[220px] transition-all duration-500 ease-in-out h-[220px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
                    priority={index < 3}
                  />
                </div>
              </div>
              <div className="text-center bg-opacity-75 p-2 mt-5">
                <h3 className="font-bold text-[#040444] text-[40px]">
                  {image.name}
                </h3>
                <p className="text-[20px] text-[#040444]">{image.title}</p>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>

      <style jsx global>{`
        /* Container styling for better focus */
        .splide__track {
          overflow: hidden;
        }

        /* Base styles for all slides */
        .splide__slide {
          transition: all 800ms cubic-bezier(0.25, 1, 0.5, 1);
          opacity: 0.6;
          transform: scale(0.8);
          filter: blur(1px);
          margin: 0 auto; /* Center the slide */
          margin-top: 40px;
          width: 90%; /* Adjust width for better centering */
        }

        /* Center active slide */
        .splide__slide.is-active {
          opacity: 1;
          transform: scale(1.1);
          filter: blur(0);
          z-index: 10;
        }

        /* Media query for mobile */
        @media (max-width: 640px) {
          .splide__slide {
            width: 90%; /* Ensure the slide takes up 90% of the width */
            margin: 0 auto; /* Center the slide */
            margin-top: 40px;
            margin-left: -20px;
          }
        }

        /* Animation for center focused slide */
        .splide__slide.center-focused {
          /* Add any additional styling for center focused slides here */
        }

        /* Adjacent slides to the active slide */

        // 1st and fifth image
        .splide__slide.is-active + .splide__slide + .splide__slide,
        .splide__slide:has(+ .splide__slide + .splide__slide.is-active) {
          opacity: 0.8;
          transform: scale(0.5);
          filter: blur(6px);
          z-index: 5;
        }

        // 2nd n  4th image
        .splide__slide:has(+ .splide__slide.is-active),
        .splide__slide.is-active + .splide__slide {
          opacity: 0.8;
          transform: scale(0.7);
          filter: blur(6px);
          margin: 0 auto;
          z-index: 5;
          width: 100%;
        }

        .splide__slide:has(+ .splide__slide.is-active) {
          margin-left: 3% !important;
        }

        .splide__slide:has(+ .splide__slide.is-active) {
          margin-right: 3% !important;
        }

        /* Scale down specifically for last two images */
        .splide__slide.scale-down,
        .splide__slide:nth-last-child(1),
        .splide__slide:nth-last-child(2) {
          transform: scale(0.6) !important;
          opacity: 0.5 !important;
        }

        /* Fixed width for all slides */
        .splide__slide .aspect-square {
          width: 220px;
          height: 220px;
        }

        /* Hover effect for all slides */
        .splide__slide:hover {
          cursor: pointer;
        }

        .splide__slide.is-active {
          animation: slideFadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>
    </div>
  );
};

export default Slider;
