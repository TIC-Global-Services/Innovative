"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { companyLogo, companyLogoWhite } from "./Icons";
import Link from "next/link";
import CompanyLogoBlack from "@/public/Innovative Final Logo (1) 1(1).png";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "MANUFACTURING", href: "/manufacturing" },
  { name: "SERVICE", href: "/service" },
  { name: "PROJECTS", href: "/projects" },
  { name: "CAREERS", href: "/careers" },
  { name: "VENDORS", href: "/vendors" },
  { name: "CONTACT", href: "/contact" },
];

interface TopNavProps {
  logoVariant?: 'default' | 'white';
}

const TopNav = ({ logoVariant = 'default' }: TopNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Pages that should use white logo
  const whiteLogoPaths = [ '/contact', '/projects', '/service']; // Add your specific paths here
  
  // Get the appropriate logo based on variant or pathname
  const getCurrentLogo = () => {
    if (logoVariant === 'white' || whiteLogoPaths.includes(pathname)) {
      return companyLogoWhite;
    }
    return companyLogo;
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for menu items
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-row justify-between items-center py-4 md:px-15 pl-7 pr-6">
      {/* Logo Section */}
      <div className="md:w-[150px] w-[100px]">
        <Link href="/">
          <Image
            src={getCurrentLogo() || "/placeholder.svg"}
            alt="company logo"
            priority
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="hidden lg:block">
        <div className="bg-white px-6 py-4 rounded-[12px] h-[56px] shadow">
          <ul className="flex items-center h-full">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                className={index !== navItems.length - 1 ? "mr-6" : ""}
              >
                <Link
                  href={item.href}
                  className={`
                    px-1 py-2 text-[13px] tracking-[0.5px] transition-colors text-black
                    ${
                      pathname === item.href
                        ? "font-bold"
                        : "font-medium hover:font-bold"
                    }
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hamburger Icon with Animation */}
      <div className="lg:hidden">
        <motion.button
          onClick={toggleMenu}
          className="text-white focus:outline-none cursor-pointer p-2 z-50 relative"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {!isMenuOpen && (
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.button>
      </div>

      {/* Mobile Menu with Animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gray-100 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full">
              {/* Header with logo and close button */}
              <motion.div
                className="flex justify-between items-center p-6 border-b border-gray-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-[150px]">
                  <Image
                    src={companyLogo || "/placeholder.svg"}
                    alt="company logo"
                    priority
                  />
                </div>
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Navigation items with staggered animation */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="flex flex-col">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      className="border-b border-gray-200"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex items-center justify-center py-5 text-black text-lg transition-colors
                          ${
                            pathname === item.href ? "font-bold" : "font-medium"
                          }
                        `}
                        onClick={toggleMenu}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNav;