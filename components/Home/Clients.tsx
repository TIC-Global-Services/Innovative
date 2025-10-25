"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, 
  logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, 
  logo20, logo21, logo22, logo23, logo24, logo25, logo26, logo27, logo28, logo29
} from "../ReusableComponenets/Icons";

// TypeScript interfaces
interface LogoItem {
  id: number;
  logo: string;
}

type FadeState = "visible" | "fading-out" | "fading-in";

interface ViewportDimensions {
  width: number;
  height: number;
}

// Custom hook for viewport dimensions
const useViewport = (): ViewportDimensions => {
  const [viewport, setViewport] = useState<ViewportDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};

// Fixed custom hook for intersection observer
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isVisible;
};

const Clients: React.FC = () => {
  // All logos array with proper typing
  const allLogos: LogoItem[] = useMemo(() => [
    { id: 1, logo: logo1 },
    { id: 2, logo: logo2 },
    { id: 3, logo: logo3 },
    { id: 4, logo: logo4 },
    { id: 5, logo: logo5 },
    { id: 6, logo: logo6 },
    { id: 7, logo: logo7 },
    { id: 8, logo: logo8 },
    { id: 9, logo: logo9 },
    { id: 10, logo: logo10 },
    { id: 11, logo: logo11 },
    // { id: 12, logo: logo12 },
    { id: 13, logo: logo13 },
    { id: 14, logo: logo14 },
    { id: 15, logo: logo15 },
    { id: 16, logo: logo16 },
    { id: 17, logo: logo17 },
    { id: 18, logo: logo18 },
    { id: 19, logo: logo19 },
    { id: 20, logo: logo20 },
    // { id: 21, logo: logo21 },
    { id: 22, logo: logo22 },
    { id: 23, logo: logo23 },
    { id: 24, logo: logo24 },
    { id: 25, logo: logo25 },
    { id: 26, logo: logo26 },
    { id: 27, logo: logo27 },
    { id: 28, logo: logo28 },
    { id: 29, logo: logo29 },
  ], []);

  // Hooks
  const viewport = useViewport();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  // State management
  const [activeSet, setActiveSet] = useState<number>(0);
  const [displaySet, setDisplaySet] = useState<number>(0);
  const [fadeState, setFadeState] = useState<FadeState>("visible");

  // Refs
  const animatingRef = useRef<boolean>(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const logoSets = useRef<LogoItem[][]>([]);

  // Memoized values
  const isMobile = useMemo(() => viewport.width < 768, [viewport.width]);
  const isTablet = useMemo(() => viewport.width >= 768 && viewport.width < 1024, [viewport.width]);

  // Dynamic logo count based on screen size
  const logoCount = useMemo((): number => {
    if (viewport.width < 640) return 8; // Mobile: 2x4 grid
    if (viewport.width < 768) return 9; // Small tablet: 3x3 grid
    if (viewport.width < 1024) return 12; // Tablet: 3x4 grid
    return 12; // Desktop: 4x3 grid
  }, [viewport.width]);

  // Shuffle function for randomizing logos
  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize logo sets
  const initializeLogoSets = useCallback((): void => {
    logoSets.current = [
      allLogos.slice(0, logoCount), // First set - sequential
      shuffleArray(allLogos).slice(0, logoCount), // Random set 1
      shuffleArray(allLogos).slice(0, logoCount), // Random set 2
    ];
  }, [allLogos, logoCount, shuffleArray]);

  // Initialize logo sets on component mount and when logoCount changes
  useEffect(() => {
    initializeLogoSets();
  }, [initializeLogoSets]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Get opacity class based on fade state
  const getOpacityClass = useCallback((): string => {
    switch (fadeState) {
      case "visible":
        return "opacity-100";
      case "fading-out":
        return "opacity-0";
      case "fading-in":
        return "opacity-100";
      default:
        return "opacity-100";
    }
  }, [fadeState]);

  // Animation sequence
  const animationSequence = useCallback((): void => {
    if (animatingRef.current || !isVisible) return;

    animatingRef.current = true;

    // Clear existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Start fade out
    setFadeState("fading-out");

    // Mobile-optimized timing
    const fadeOutDuration = isMobile ? 300 : 500;
    const fadeInDuration = isMobile ? 250 : 400;

    const timeout1 = setTimeout(() => {
      // Generate new random set for next rotation
      const nextSetIndex = (activeSet + 1) % 3;

      if (nextSetIndex === 1 || nextSetIndex === 2) {
        logoSets.current[nextSetIndex] = shuffleArray(allLogos).slice(0, logoCount);
      }

      // Switch to next logo set
      setActiveSet(nextSetIndex);
      setDisplaySet(nextSetIndex);

      // Start fade in
      setFadeState("fading-in");

      // After fade in completes
      const timeout2 = setTimeout(() => {
        setFadeState("visible");
        animatingRef.current = false;
      }, fadeInDuration);

      timeoutsRef.current.push(timeout2);
    }, fadeOutDuration);

    timeoutsRef.current.push(timeout1);
  }, [activeSet, allLogos, logoCount, shuffleArray, isMobile, isVisible]);

  // Animation interval effect
  useEffect(() => {
    if (!isVisible) return;

    // Longer intervals on mobile to reduce battery drain
    const intervalDuration = isMobile ? 3500 : 2500;

    const interval = setInterval(() => {
      animationSequence();
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [animationSequence, isMobile, isVisible]);

  // Grid classes based on screen size
  const gridClasses = useMemo((): string => {
    return [
      "grid",
      "grid-cols-2", // Mobile: 2 columns
      "sm:grid-cols-3", // Small screens: 3 columns
      "md:grid-cols-4", // Medium screens and up: 4 columns
      "gap-3 sm:gap-4 md:gap-6 lg:gap-8",
      "place-items-center",
      "w-full"
    ].join(" ");
  }, []);

  // Container classes
  const containerClasses = useMemo((): string => {
    return [
      "flex flex-col justify-center items-center",
      "mt-8 sm:mt-12 md:mt-16 lg:mt-20",
      "mb-8 sm:mb-12 md:mb-16 lg:mb-20",
      "px-4 sm:px-6 lg:px-8"
    ].join(" ");
  }, []);

  // Title classes
  const titleClasses = useMemo((): string => {
    return [
      "text-[#040444] w-full text-center",
      "mb-6 sm:mb-8 md:mb-12 lg:mb-16",
      "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl",
      "font-medium leading-tight tracking-tight"
    ].join(" ");
  }, []);

  // Logo container classes
  const logoContainerClasses = useCallback((index: number): string => {
    return [
      "flex justify-center items-center relative",
      "w-full aspect-square",
      "min-h-[80px] max-h-[100px]",
      "sm:min-h-[80px] sm:max-h-[100px]",
      "md:min-h-[90px] md:max-h-[120px]",
      "lg:min-h-[100px] lg:max-h-[140px]",
      "p-3 sm:p-4 md:p-5",
      "rounded-xl sm:rounded-2xl",
      "transition-all duration-300 ease-out",
      "hover:scale-95",
      "active:scale-95",
      "group cursor-pointer",
      getOpacityClass()
    ].join(" ");
  }, [getOpacityClass]);

  // Render logo item
  const renderLogoItem = useCallback((item: LogoItem, index: number) => (
    <div
      key={`${item.id}-${displaySet}-${index}`}
      className={logoContainerClasses(index)}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      } as React.CSSProperties}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={item.logo}
          alt={`Partner logo ${item.id}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
          className="object-contain transition-all duration-300 ease-out group-hover:brightness-110 "
          priority={index < 4}
          loading={index < 4 ? "eager" : "lazy"}
          quality={isMobile ? 75 : 90}
        />
      </div>
    </div>
  ), [displaySet, logoContainerClasses, isMobile]);

  return (
    <div ref={sectionRef} className={containerClasses}>
      {/* Title Section */}
      <header className={titleClasses}>
        <h2>Proudly Associated With</h2>
      </header>

      {/* Logo Grid Section */}
      <section className="w-full max-w-7xl mx-auto">
        <div className={gridClasses}>
          {logoSets.current[displaySet]?.map(renderLogoItem)}
        </div>
      </section>

      {/* Loading Indicator - Only show on mobile during transitions */}
      {isMobile && fadeState === "fading-out" && (
        <div 
          className="fixed bottom-6 right-6 z-50"
          role="status"
          aria-label="Loading new logos"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-spin border-2 border-white border-t-transparent" />
        </div>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {fadeState === "visible" && `Showing ${logoCount} partner logos`}
      </div>
    </div>
  );
};

export default React.memo(Clients);