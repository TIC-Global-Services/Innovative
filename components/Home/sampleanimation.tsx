"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !containerRef.current || !videoRef.current) return;

    // Wait for video to be ready
    const initAnimation = () => {
      const video = videoRef.current;
      if (!video) return;

      // Ensure video is ready
      if (video.readyState < 3) {
        video.addEventListener('loadedmetadata', initAnimation);
        return;
      }

      // Reset scroll triggers
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Set up the animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=10000',
        pin: true,
        scrub: 0.5,
        markers: true, // Remove for production
        onUpdate: (self) => {
          if (video) {
            const progress = Math.max(0, Math.min(self.progress, 1));
            video.currentTime = progress * video.duration;
          }
        },
        onEnter: () => {
          video.currentTime = 0;
          video.play().catch(e => console.log('Autoplay prevented:', e));
        },
        onEnterBack: () => {
          video.currentTime = 0;
          video.play().catch(e => console.log('Autoplay prevented:', e));
        },
        onLeave: () => {
          video.currentTime = video.duration;
        },
        onLeaveBack: () => {
          video.currentTime = 0;
        }
      });
    };

    // Initialize when video loads
    videoRef.current.addEventListener('loadedmetadata', initAnimation);
    
    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', initAnimation);
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <Head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: "Signika Negative", sans-serif;
            background: black;
            color: white;
            overflow-x: hidden;
          }
          .video-container {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .video-wrapper {
            width: 80%;
            max-width: 1200px;
            position: relative;
          }
          video {
            width: 100%;
            height: auto;
            display: block;
          }
          .other-sections {
            height: 100vh;
            width: 100%;
            background: grey;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
          }
        `}</style>
      </Head>

      <div ref={containerRef} className="video-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            preload="auto"
            muted
            playsInline
            webkit-playsinline="true"
          />
        </div>
      </div>
      <div className="other-sections">Section 1</div>
      <div className="other-sections">Section 2</div>
    </>
  );
}