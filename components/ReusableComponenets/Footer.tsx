"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import companyLogo from "@/public/CompanyLogo.svg"

import Youtube from "@/public/youtube2.svg"


import instagram from "@/public/Instagram.svg"
import linkedin from "@/public/linkedin.svg"
import { ChevronDown } from "lucide-react"

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const pagesLink = [
    { link: "HOME", href: "/" },
    { link: "ABOUT", href: "/about" },
    { link: "MANUFACTURING", href: "/manufacturing" },
    { link: "SERVICE", href: "/service" },
    { link: "PROJECTS", href: "/projects" },
    { link: "CAREERS", href: "/careers" },
    { link: "VENDORS", href: "/vendors" },
    { link: "CONTACTS", href: "/contact" },
  ]

  return (
    <footer className="bg-[#141414] w-full overflow-hidden">
      {/* Desktop Footer */}
      <div className="hidden lg:flex flex-col justify-center min-h-[516px] px-5 max-w-[1920px] mx-auto">
        <div className="flex flex-row flex-wrap justify-around items-start mt-10">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Image src={companyLogo || "/placeholder.svg"} alt="company logo" className="w-[150px] mt-1" />
          </div>

          {/* Pages Links */}
          <div className="flex flex-col space-y-3 mb-6 md:mb-0">
            <span className="text-[13px] text-[#888888]">PAGES</span>
            {pagesLink.map((item, index) => (
              <Link key={index} href={item.href} className="text-[13px] text-white hover:font-bold transition-all">
                {item.link}
              </Link>
            ))}
          </div>

          {/* Offices */}
          <div className="flex flex-col mb-6 md:mb-0">
            <span className="text-[13px] text-[#888888]">OFFICES</span>
            <div className="mt-3 text-white">
              HEAD OFFICE <br />
              <span className="text-[#888888] text-[14.88px]">
                Plot No.7, V.V. koil Street,
                <br />
                Chinmaya Nagar,
                <br />
                Chennai - 600092
                <br />
                Tamilnadu.
              </span>
            </div>
            <div className="mt-4 mb-2 text-white">
              FACTORY <br />
              <span className="text-[#888888]">
                S.No:50, Peruvoyal Village,
                <br />
                Nainakuppam, <br />
                Gummidipoondi (TK), <br />
                Thiruvallur (DT) - 601206. <br />
                Tamilnadu.
              </span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col mb-6 md:mb-0">
            <span className="text-[13px] text-[#888888]">CONTACT US</span>
            <div className="mt-3">
              <span className="text-[#FFFFFF] text-[14.88px]">
                EMAIL : info@innovativeinteriors.in<br />
                Phone : 044-24795133
              </span>
            </div>
            <div className="flex flex-col items-start justify-center mt-4 space-y-6">
              <h1 className="text-[#888888] text-[16px] mt-2">STAY CONNECTED</h1>

              <div className="flex flex-row gap-7">
              <Link href="https://www.instagram.com/innovative.interiors.india?igsh=MW9xOHYydnlvaDFvdw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image src={instagram || "/placeholder.svg"} alt="instagram" width={24} height={24} className="mt-1"/>
                </Link>
                <Link href="https://youtube.com/@innovativeinteriorsindia?feature=shared" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Image src={Youtube || "/placeholder.svg"} alt="twitter" width={30} height={30} />
                </Link>
               
                <Link href="https://www.linkedin.com/company/innovativeinteriors/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Image src={linkedin || "/placeholder.svg"} alt="linkedin" width={24} height={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="items-center px-5 mt-auto pt-10">
          <hr className="w-full border-[#888888] border-[0.5px]" />
          <div className="flex flex-row justify-between items-end text-white px-5 mt-3 pb-4">
            <p className="text-white text-[14px] leading-6">Copyright © 2025 Innovative, All Rights Reserved.</p>
            <p className="text-white text-[14px]">Designed & Developed by TIC Global</p>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
     <div className="lg:hidden flex flex-col items-start px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 min-h-screen sm:min-h-[800px] md:min-h-[876px] w-full">
  <Image 
    src={companyLogo || "/placeholder.svg"} 
    alt="company logo" 
    className="w-[100px] h-[58px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[82px] mb-6 sm:mb-8 mt-2 sm:mt-4" 
  />

  <div className="flex flex-col items-start justify-center w-full">
    {/* Stay in touch */}
    <div className="text-white font-bold text-base sm:text-lg md:text-xl">Stay in touch:</div>
    <p className="text-white text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-normal leading-5 sm:leading-6 md:leading-7">
      Innovative Interiors Pvt Ltd, Plot No 7, VV Koil St, <br />
      Chinmaya Nagar Stage 1, <br />
      Chennai-600092., <br />
    </p>

    {/* Factory Address */}
    <div className="text-white font-bold text-base sm:text-lg md:text-xl mt-5 sm:mt-7 md:mt-8">
      Factory Address:
    </div>
    <p className="text-white text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-normal leading-5 sm:leading-6 md:leading-7">
      S.No:50, Peruvoyal Village, Nainakuppam, <br />
      Gummidipoondi (TK), Tiruvallur (Dt) - 601 206. <br />
    </p>

    {/* Contact Us */}
    <div className="flex flex-col items-start justify-center mt-6 sm:mt-8 md:mt-10 space-y-2 sm:space-y-3 w-full">
      <div className="text-white font-bold text-base sm:text-lg md:text-xl">Contact Us:</div>
      <div className="flex flex-col items-start justify-center space-y-1">
        <p className="text-white text-xs sm:text-sm md:text-base font-normal leading-5 sm:leading-6">
          Email: info@innovativeinteriors.in
        </p>
        <p className="text-white text-xs sm:text-sm md:text-base font-normal leading-5 sm:leading-6">
          Phone: 044-24795133
        </p>
      </div>

      {/* Dropdown for Pages */}
      <div className="relative w-full mt-4 sm:mt-6" ref={dropdownRef}>
        <button
          className="bg-white text-[#030303] text-xs sm:text-sm md:text-base rounded-full w-[140px] sm:w-[160px] md:w-[180px] h-[36px] sm:h-[40px] md:h-[44px] flex items-center justify-center gap-1 sm:gap-2 font-medium hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          Explore More
          <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 mt-2 w-[140px] sm:w-[160px] md:w-[180px] bg-white rounded-lg shadow-lg z-10 overflow-hidden"
          >
            {pagesLink.map((option) => (
              <Link
                key={option.link}
                href={option.href}
                className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm text-[#030303] hover:font-semibold hover:bg-gray-100 text-left transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {option.link}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="flex flex-col items-start justify-center mt-5 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4">
        <h1 className="text-white text-sm sm:text-base md:text-lg font-bold">Stay Connected</h1>

        <div className="flex flex-row gap-5 sm:gap-6 md:gap-7">
          <Link href="https://youtube.com/@innovativeinteriorsindia?feature=shared" aria-label="Youtube">
            <Image 
              src={Youtube || "/placeholder.svg"} 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-80 transition-opacity" 
              alt="youtube" 
              width={28} 
              height={28} 
            />
          </Link>
          <Link href="https://www.instagram.com/innovative.interiors.india?igsh=MW9xOHYydnlvaDFvdw%3D%3D&utm_source=qr" aria-label="Instagram">
            <Image 
              src={instagram || "/placeholder.svg"} 
              alt="instagram" 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-80 transition-opacity"
              width={28} 
              height={28} 
            />
          </Link>
          <Link href="https://www.linkedin.com/company/innovativeinteriors/" aria-label="LinkedIn">
            <Image 
              src={linkedin || "/placeholder.svg"} 
              alt="linkedin" 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:opacity-80 transition-opacity"
              width={28} 
              height={28} 
            />
          </Link>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="flex flex-col items-start justify-center mt-8 sm:mt-10 md:mt-12 space-y-1 pb-4 sm:pb-6">
      <p className="text-white text-xs sm:text-sm md:text-base font-bold leading-5 sm:leading-6">
        Designed & Developed by
      </p>
      <p className="text-white text-xs sm:text-sm md:text-base font-bold leading-5 sm:leading-6">
        © TIC Global
      </p>
    </div>
  </div>
</div>
    </footer>
  )
}

export default Footer;