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
      <div className="hidden md:flex flex-col justify-center min-h-[516px] px-5 max-w-[1920px] mx-auto">
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
      <div className="md:hidden flex flex-col items-start px-4 py-10 min-h-[876px] w-full">
        <Image src={companyLogo || "/placeholder.svg"} alt="company logo" className="w-[120px] h-[70px] mb-8 mt-4" />

        <div className="flex flex-col items-start justify-center w-full">
          {/* Stay in touch */}
          <div className="text-white font-bold text-[18px]">Stay in touch:</div>
          <p className="text-white text-[14px] mt-3 font-normal leading-6">
            Innovative Interiors Pvt Ltd, Plot No 7, VV Koil St, <br />
            Chinmaya Nagar Stage 1, <br />
            Chennai-600092., <br />
          </p>

          {/* Factory Address */}
          <div className="text-white font-bold text-[18px] mt-7">Factory Address:</div>
          <p className="text-white text-[14px] mt-3 font-normal leading-6">
            S.No:50, Peruvoyal Village, Nainakuppam, <br />
            Gummidipoondi (TK), Tiruvallur (Dt) - 601 206. <br />
          </p>

          {/* Contact Us */}
          <div className="flex flex-col items-start justify-center mt-8 space-y-3 w-full">
            <div className="text-white font-bold text-[18px]">Contact Us:</div>
            <div className="flex flex-col items-start justify-center space-y-1">
              <p className="text-white text-[14px] font-normal leading-6">Email: info@innovativeinteriors.in</p>
              <p className="text-white text-[14px] font-normal leading-6">Phone: 044-24795133</p>
            </div>

            {/* Dropdown for Pages */}
            <div className="relative w-full mt-6" ref={dropdownRef}>
              <button
                className="bg-white text-[#030303] text-[13px] rounded-full w-[160px] h-[40px] flex items-center justify-center gap-1"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                Explore More
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div
                  id="mobile-menu"
                  className="absolute top-full left-0 mt-2 w-[160px] bg-white rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {pagesLink.map((option) => (
                    <Link
                      key={option.link}
                      href={option.href}
                      className="block w-full px-4 py-2 text-[10px] text-[#030303] hover:font-semibold hover:bg-gray-100 text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      {option.link}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-start justify-center mt-6 space-y-4">
              <h1 className="text-white text-[16px] font-bold">Stay Connected</h1>

              <div className="flex flex-row gap-7">
                {/* <Link href="#" aria-label="Twitter">
                  <Image src={twitter || "/placeholder.svg"} alt="twitter" width={24} height={24} />
                </Link> */}
                <Link href="https://youtube.com/@innovativeinteriorsindia?feature=shared" aria-label="Youtube">
                  <Image src={Youtube || "/placeholder.svg"} className="w-6 h-6" alt="facebook" width={24} height={24} />
                </Link>
                <Link href="https://www.instagram.com/innovative.interiors.india?igsh=MW9xOHYydnlvaDFvdw%3D%3D&utm_source=qr" aria-label="Instagram">
                  <Image src={instagram || "/placeholder.svg"} alt="instagram" width={24} height={24} />
                </Link>
                <Link href="https://www.linkedin.com/company/innovativeinteriors/" aria-label="LinkedIn">
                  <Image src={linkedin || "/placeholder.svg"} alt="linkedin" width={24} height={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-start justify-center mt-12 space-y-1">
            <p className="text-white text-[14px] font-bold leading-6">Designed & Developed by</p>
            <p className="text-white text-[14px] font-bold leading-6">© TIC Global</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;