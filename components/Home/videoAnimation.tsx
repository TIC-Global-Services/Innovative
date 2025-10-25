"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionLabel from "../ui/secionLabel";
import ArrowBtn from "../ui/arrowBtn";

// Register plugin once at module level
gsap.registerPlugin(ScrollTrigger);

const VideoAnimation: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [videoReady, setVideoReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Handle resize with proper debouncing
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const handleResize = (): void => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        if (mobile !== isMobile) {
          setIsMobile(mobile);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true } as AddEventListenerOptions);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Main scroll animation effect
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const initAnimation = (): (() => void) => {
      // Prepare video
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      
      const onLoadedMetadata = (): void => {
        setVideoReady(true);
        video.currentTime = 0;
        
        // Kill existing ScrollTrigger instances for this section
        ScrollTrigger.getAll().forEach((st: ScrollTrigger) => {
          if (st.vars.trigger === section) st.kill();
        });

        // Create ScrollTrigger with optimized settings
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=200%' : '+=150%',
          pin: true,
          scrub: true, // Boolean for instant response, no artificial delay
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (video.duration && isFinite(video.duration)) {
              // Direct update - no smoothing needed
              video.currentTime = self.progress * (video.duration - 0.05);
            }
          }
        });
      };

      const onError = (): void => {
        console.error('Video failed to load');
        setError(true);
      };

      if (video.readyState >= 2) {
        onLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        video.addEventListener('error', onError, { once: true });
      }

      // Cleanup
      return (): void => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('error', onError);
      };
    };

    const cleanup = initAnimation();
    return cleanup;
  }, [isMobile]);

  // Refresh ScrollTrigger on layout changes
  useEffect(() => {
    if (videoReady) {
      ScrollTrigger.refresh();
    }
  }, [videoReady]);

  return (
    <>
      

      {/* Video Animation Section */}
      <div
        ref={sectionRef}
        className="w-full min-h-screen flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10 px-4 md:px-8 py-8 md:py-0 bg-white"
      >
        {/* Video Container */}
        <div className="w-full md:w-[60%] relative">
          {!videoReady && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-[#040444] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Loading video...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-sm text-red-600">Failed to load video</span>
            </div>
          )}

          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-[300px] md:h-[500px] object-cover rounded-lg "
            style={{ 
              transform: 'translateZ(0)',
              willChange: 'auto'
            }}
          >
            <source
              src="https://ik.imagekit.io/99y1fc9mh/Innovative/vd.mp4?updatedAt=1756020563812"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Container */}
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start gap-5 md:gap-8">
          {/* Desktop Content */}
          <div className="hidden md:flex flex-col gap-4 w-full">
            <div>
            <SectionLabel text="WHAT WE DO" />
            </div>
            
            <h2 className="text-[#040444] text-[45px] leading-[50px] font-medium">
              Bringing Life Into<br />
              Spaces
            </h2>
            
            <p className="text-[#141414] text-[20px] leading-[28px]">
              Over 1 million sft of Interior Furniture manufactured,<br />
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
          <div className="flex md:hidden flex-col items-center text-center gap-4 w-full">
            <SectionLabel text="WHAT WE DO" />
            
            <h2 className="text-[#040444] text-[24px] leading-[32px] font-semibold">
              Turning Vision Into Reality
            </h2>
            
            <p className="text-[#191919] text-[14px] leading-[20px]">
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
      </div>

     
    </>
  );
};

export default VideoAnimation;

