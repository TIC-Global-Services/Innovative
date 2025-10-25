"use client";
import { useState, useEffect, useRef } from "react";
import GalleryImage1 from "@/public/Mask group(2).png";
import GalleryImage2 from "@/public/Mask group(3).png";
import GalleryImage3 from "@/public/Mask group(4).png";
import GalleryImage4 from "@/public/Mask group(5).png";
import GalleryImage5 from "@/public/Mask group(6).png";
import GalleryImage6 from "@/public/Mask group(7).png";

import {
  CyteCare,
  Mih,
  Sakra,
  Annai,
  Bhagini,
  Confluence,
  Fitc,
  Aloft,
  Gokulam,
  itcvellore,
  Kakinada,
  radission,
  ramada,
  residency,
  rkpondy,
  tamara,
  zibe,
  cabin,
  conference,
  coWork,
  csscorp,
  edutech,
  extreme,
  featherlite,
  foodcourt,
  get,
  lycatel,
  micronics,
  newgen,
  sricity,
  tcs,
  tesa,
  elevenhouse,
  Adithya,
  Ashok,
  Jaffer,
  Kg,
  Krishna,
  murugus,
  nithya,
  pavillion,
  sundarHouse,
  usha,
  cakes,
  grt,
  kama,
  ombc,
  rns,
  spa,
  kate,
  Aloft1,
  Aloft3,
  Aloft2,
  Annai3,
  Annai2,
  Annai1,
  Bhagini2,
  Bhagini3,
  Bhagini1,
  Confluence1,
  Confluence2,
  kakinada3,
  kakinada2,
  kakinada1,
  fitc1,
  itcvellore3,
  itcvellore1,
  itcvellore2,
  radi1,
  radi2,
  radi3,
  ramada1,
  ramada2,
  ramada3,
  residency1,
  residency2,
  residency3,
  rk1,
  rk2,
  rk3,
  tamara1,
  tamara2,
  tamara3,
  zibe3,
  zibe2,
  zibe1,
  cc3,
  cc2,
  cc1,
  sakra3,
  sakra1,
  sakra2,
  cakes1,
  cakes2,
  grt3,
  grt2,
  grt1,
  kate3,
  kate2,
  kate1,
  rns2,
  rns3,
  rns1,
  spa3,
  spa2,
  spa1,
  sony1,
  kama3,
  kama2,
  kama1,
  ombc3,
  ombc2,
  ombc1,
  house1,
  house2,
  house3,
  ashok2,
  ashok1,
  ashok3,
  murugus3,
  murugus2,
  murugus1,
  kg2,
  kg1,
  krishna3,
  krishna2,
  krishna1,
  sundarhouse3,
  sundarhouse2,
  sundarhouse1,
  adithya1,
  adithya2,
  adithya3,
  jaffer3,
  jaffer2,
  jaffer1,
  nithya3,
  nithya1,
  nithya2,
  pavi1,
  pavi3,
  pavi2,
  usha3,
  usha2,
  usha1,
  cabin1,
  cabin3,
  cowork1,
  cowork2,
  conf1,
  conf2,
  conf3,
  csscorp1,
  csscorp2,
  csscorp3,
  edutech1,
  edutech2,
  edutech3,
  extreme1,
  extreme2,
  feather1,
  feather2,
  feather3,
  food1,
  food2,
  food3,
  get1,
  get2,
  get3,
  lyca1,
  lyca2,
  lyca3,
  micro1,
  micro2,
  micro3,
  newgen1,
  newgen2,
  newgen3,
  sricity1,
  sricity2,
  sricity3,
  tsc1,
  tsc2,
  tsc3,
  tesa1,
  tesa2,
  tesa3,
  Aloft6,
  Aloft10,
  Aloft4,
  Aloft5,
  Aloft7,
  Aloft8,
  Aloft9,
  Aloft11,
  Aloft12,
  Aloft13,
  Aloft27,
  Aloft14,
  Aloft15,
  Aloft16,
  Aloft17,
  Aloft18,
  Aloft19,
  Aloft20,
  Aloft21,
  Aloft22,
  Aloft23,
  Aloft24,
  Aloft25,
  Aloft26,
  Bhagini5,
  Bhagini6,
  Bhagini7,
  Bhagini8,
  Bhagini9,
  Bhagini10,
  Bhagini11,
  Bhagini12,
  Gokulam1,
  Gokulam2,
  Gokulam3,
  Gokulam4,
  Gokulam5,
  Gokulam6,
  Gokulam7,
  Gokulam8,
  kakinada6,
  kakinada4,
  kakinada5,
  kakinada10,
  kakinada11,
  kakinada12,
  kakinada13,
  kakinada14,
  kakinada15,
  kakinada16,
  kakinada17,
  kakinada18,
  kakinada19,
  kakinada20,
  kakinada21,
  kakinada22,
  kakinada23,
  kakinada24,
  kakinada25,
  kakinada26,
  kakinada27,
  kakinada7,
  kakinada8,
  kakinada9,
  itcvellore23,
  itcvellore10,
  itcvellore11,
  itcvellore12,
  itcvellore13,
  itcvellore14,
  itcvellore15,
  itcvellore16,
  itcvellore17,
  itcvellore18,
  itcvellore20,
  itcvellore21,
  itcvellore22,
  itcvellore24,
  itcvellore4,
  itcvellore5,
  itcvellore6,
  itcvellore7,
  itcvellore8,
  itcvellore9,
  itcvellore19,
  radi4,
  radi10,
  radi11,
  radi12,
  radi13,
  radi14,
  radi5,
  radi7,
  radi8,
  radi9,
  radi6,
  residency4,
  residency5,
  residency10,
  residency11,
  residency6,
  residency7,
  residency8,
  residency9,
  rk4,
  rk20,
  rk30,
  rk37,
  rk10,
  rk11,
  rk12,
  rk13,
  rk14,
  rk15,
  rk16,
  rk17,
  rk18,
  rk19,
  rk21,
  rk22,
  rk23,
  rk24,
  rk25,
  rk26,
  rk27,
  rk28,
  rk29,
  rk31,
  rk32,
  rk33,
  rk34,
  rk35,
  rk36,
  rk38,
  rk39,
  rk5,
  rk6,
  rk7,
  rk8,
  rk9,
  tamara4,
  tamara10,
  tamara5,
  tamara6,
  tamara7,
  tamara8,
  tamara9,
  cc10,
  cc11,
  cc12,
  cc13,
  cc14,
  cc15,
  cc16,
  cc17,
  cc18,
  cc19,
  cc20,
  cc21,
  cc22,
  cc23,
  cc24,
  cc25,
  cc26,
  cc27,
  cc28,
  cc4,
  cc5,
  cc6,
  cc7,
  cc8,
  cc9,
  mih1,
  mih10,
  mih11,
  mih12,
  mih13,
  mih14,
  mih15,
  mih16,
  mih17,
  mih18,
  mih19,
  mih2,
  mih20,
  mih21,
  mih22,
  mih23,
  mih24,
  mih25,
  mih26,
  mih27,
  mih28,
  mih29,
  mih3,
  mih30,
  mih31,
  mih32,
  mih33,
  mih34,
  mih35,
  mih36,
  mih37,
  mih38,
  mih39,
  mih4,
  mih40,
  mih5,
  mih6,
  mih7,
  mih8,
  mih9,
  grt5,
  grt10,
  grt4,
  grt6,
  grt7,
  grt8,
  grt9,
  ombc4,
  ombc5,
  ombc6,
  ombc7,
  ombc8,
  ombc9,
  house10,
  house11,
  house12,
  house4,
  house5,
  house6,
  house7,
  house8,
  house9,
  ashok10,
  ashok4,
  ashok5,
  ashok6,
  ashok7,
  ashok8,
  ashok9,
  sundarhouse4,
  sundarhouse10,
  sundarhouse5,
  sundarhouse6,
  sundarhouse7,
  sundarhouse8,
  sundarhouse9,
  jaffer10,
  jaffer4,
  jaffer5,
  jaffer6,
  jaffer7,
  jaffer8,
  jaffer9,
  pavi10,
  pavi4,
  pavi5,
  pavi6,
  pavi7,
  pavi8,
  pavi9,
  usha10,
  usha4,
  usha5,
  usha6,
  usha7,
  usha8,
  usha9,
  feather6,
  feather10,
  feather4,
  feather5,
  feather7,
  feather8,
  feather9,
  micro10,
  micro4,
  micro5,
  micro6,
  micro7,
  micro8,
  micro9,
  logo15,
  logo14,
} from "../ReusableComponenets/Icons";
import Image, { type StaticImageData } from "next/image";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import { ArrowRight } from "lucide-react";

const Gallery = () => {
  const [activeTitle, setActiveTitle] = useState<
    | "Residental"
    | "Hotels"
    | "Retail"
    | "Healthcare"
    | "Workspaces"
    | "Industrial"
  >("Hotels");
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<StaticImageData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showCelebrationPopup, setShowCelebrationPopup] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (isMobile && tabsRef.current) {
      const activeElement = tabsRef.current.querySelector(".active-tab");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeTitle, isMobile]);

  const title = [

    { title: "Hotels" },
    { title: "Workspaces" },

    { title: "Residental" },
    { title: "Healthcare" },

    { title: "Retail" },
    { title: "Industrial" },
  ];

  const imagesMap = {
    Hotels: [
      {
        image: Aloft,
        title: "Aloft  Coimbatore",
        sliderImages: [
          Aloft1,
          Aloft2,
          Aloft3,
          Aloft4,
          Aloft5,
          Aloft6,
          Aloft7,
          Aloft8,
          Aloft9,
          Aloft10,
          Aloft11,
          Aloft12,
          Aloft13,
          Aloft14,
          Aloft15,
          Aloft16,
          Aloft17,
          Aloft18,
          Aloft19,
          Aloft20,
          Aloft21,
          Aloft22,
          Aloft23,
          Aloft24,
          Aloft25,
          Aloft26,
          Aloft27,
        ],
      },
      {
        image: Annai,
        title: "Annai Resorts",
        sliderImages: [Annai1, Annai2, Annai3],
      },
      {
        image: Bhagini,
        title: "Bhagini",
        sliderImages: [
          Bhagini1,
          Bhagini2,
          Bhagini3,
          Bhagini5,
          Bhagini6,
          Bhagini7,
          Bhagini8,
          Bhagini9,
          Bhagini10,
          Bhagini11,
          Bhagini12,
        ],
      },
      {
        image: Confluence,
        title: "Confluence",
        sliderImages: [Confluence1, Confluence2],
      },
      {
        image: Gokulam,
        title: "Gokulam park",
        sliderImages: [
          Gokulam1,
          Gokulam2,
          Gokulam3,
          Gokulam4,
          Gokulam5,
          Gokulam6,
          Gokulam7,
          Gokulam8,
        ],
      },
      {
        image: Kakinada,
        title: "GRT Grand - Kakinada",
        sliderImages: [
          kakinada1,
          kakinada2,
          kakinada3,
          kakinada4,
          kakinada5,
          kakinada6,
          kakinada7,
          kakinada8,
          kakinada9,
          kakinada10,
          kakinada11,
          kakinada12,
          kakinada13,
          kakinada14,
          kakinada15,
          kakinada16,
          kakinada17,
          kakinada18,
          kakinada19,
          kakinada20,
          kakinada21,
          kakinada22,
          kakinada23,
          kakinada24,
          kakinada25,
          kakinada26,
          kakinada27,
        ],
      },
      {
        image: Fitc,
        title: "ITC Tirupur",
        sliderImages: [fitc1],
      },
      {
        image: itcvellore,
        title: "ITC Vellore",
        sliderImages: [
          itcvellore1,
          itcvellore2,
          itcvellore3,
          itcvellore4,
          itcvellore5,
          itcvellore6,
          itcvellore7,
          itcvellore8,
          itcvellore9,
          itcvellore10,
          itcvellore11,
          itcvellore12,
          itcvellore13,
          itcvellore14,
          itcvellore15,
          itcvellore16,
          itcvellore17,
          itcvellore18,
          itcvellore19,
          itcvellore20,
          itcvellore21,
          itcvellore22,
          itcvellore23,
          itcvellore24,
        ],
      },
      {
        image: radission,
        title: "Radisson Blu",
        sliderImages: [
          radi1,
          radi2,
          radi3,
          radi4,
          radi5,
          radi6,
          radi7,
          radi8,
          radi9,
          radi10,
          radi11,
          radi12,
          radi13,
          radi14,
        ],
      },
      {
        image: ramada,
        title: "Ramada",
        sliderImages: [ramada1, ramada2, ramada3],
      },
      {
        image: residency,
        title: "Residency Tower - Chennai",
        sliderImages: [
          residency1,
          residency2,
          residency3,
          residency4,
          residency5,
          residency6,
          residency7,
          residency8,
          residency9,
          residency10,
          residency11,
        ],
      },
      {
        image: rkpondy,
        title: "RKR Pondy",
        sliderImages: [
          rk1,
          rk2,
          rk3,
          rk4,
          rk5,
          rk6,
          rk7,
          rk8,
          rk9,
          rk10,
          rk11,
          rk12,
          rk13,
          rk14,
          rk15,
          rk16,
          rk17,
          rk18,
          rk19,
          rk20,
          rk21,
          rk22,
          rk23,
          rk24,
          rk25,
          rk26,
          rk27,
          rk28,
          rk29,
          rk30,
          rk31,
          rk32,
          rk33,
          rk34,
          rk35,
          rk36,
          rk37,
          rk38,
          rk39,
        ],
      },
      {
        image: tamara,
        title: "Tamara cbe",
        sliderImages: [
          tamara1,
          tamara2,
          tamara3,
          tamara4,
          tamara5,
          tamara6,
          tamara7,
          tamara8,
          tamara9,
          tamara10,
        ],
      },
      {
        image: zibe,
        title: "ZIBE",
        sliderImages: [zibe1, zibe2, zibe3],
      },
    ],
    Residental: [
      {
        image: elevenhouse,
        title: "11 House",
        sliderImages: [
          house1,
          house2,
          house3,
          house4,
          house5,
          house6,
          house7,
          house7,
          house8,
          house9,
          house10,
          house11,
          house12,
        ],
      },
      {
        image: Ashok,
        title: "Ashok Sattanathan Residence",
        sliderImages: [
          ashok1,
          ashok2,
          ashok3,
          ashok4,
          ashok5,
          ashok6,
          ashok7,
          ashok8,
          ashok9,
          ashok10,
        ],
      },
      {
        image: murugus,
        title: "Dr. Murugusundaram",
        sliderImages: [murugus1, murugus2, murugus3],
      },
      {
        image: Kg,
        title: "Kg Dining Table",
        sliderImages: [kg1, kg2],
      },
      {
        image: Krishna,
        title: "Krishna Residence",
        sliderImages: [krishna1, krishna2, krishna3],
      },
      {
        image: sundarHouse,
        title: "Mr. P R Sundar Penthouse",
        sliderImages: [
          sundarhouse1,
          sundarhouse2,
          sundarhouse3,
          sundarhouse4,
          sundarhouse5,
          sundarhouse6,
          sundarhouse7,
          sundarhouse8,
          sundarhouse9,
          sundarhouse10,
        ],
      },
      {
        image: Adithya,
        title: "Mr.Adithya Residence",
        sliderImages: [adithya1, adithya2, adithya3],
      },
      {
        image: Jaffer,
        title: "Mr.Jaffer,-Grange club house",
        sliderImages: [
          jaffer1,
          jaffer2,
          jaffer3,
          jaffer4,
          jaffer5,
          jaffer6,
          jaffer7,
          jaffer8,
          jaffer9,
          jaffer10,
        ],
      },
      {
        image: nithya,
        title: "Nithya Sundarrajan",
        sliderImages: [nithya1, nithya2, nithya3],
      },
      {
        image: pavillion,
        title: "Pavillion house",
        sliderImages: [
          pavi1,
          pavi2,
          pavi3,
          pavi4,
          pavi5,
          pavi6,
          pavi7,
          pavi8,
          pavi9,
          pavi10,
        ],
      },
      {
        image: usha,
        title: "Usha Srinivasan",
        sliderImages: [
          usha1,
          usha2,
          usha3,
          usha4,
          usha5,
          usha6,
          usha7,
          usha8,
          usha9,
          usha10,
        ],
      },
    ],
    
    Retail: [
      {
        image: cakes,
        title: "Cake Waves",
        sliderImages: [cakes1, cakes2],
      },
      {
        image: grt,
        title: "GRT - Rajahmundry Jewllery",
        sliderImages: [
          grt1,
          grt2,
          grt3,
          grt4,
          grt5,
          grt6,
          grt7,
          grt8,
          grt9,
          grt10,
        ],
      },
      {
        image: kate,
        title: "kate & Oscar",
        sliderImages: [kate1, kate2, kate3],
      },
      {
        image: rns,
        title: "RNS",
        sliderImages: [rns1, rns2, rns3],
      },
      {
        image: spa,
        title: "SPA",
        sliderImages: [spa1, spa2, spa3],
      },
      // {
      //   image: spa,
      //   title: "Sony",
      //   sliderImages: [sony1],
      // },
      {
        image: kama,
        title: "Kamadhenu",
        sliderImages: [kama1, kama2, kama3],
      },
      {
        image: ombc,
        title: "OMBC",
        sliderImages: [
          ombc1,
          ombc2,
          ombc3,
          ombc4,
          ombc5,
          ombc6,
          ombc7,
          ombc8,
          ombc9,
        ],
      },
    ],
    Healthcare: [
      {
        image: CyteCare,
        title: "Cyte Care",
        sliderImages: [
          cc1,
          cc2,
          cc3,
          cc4,
          cc5,
          cc6,
          cc7,
          cc8,
          cc9,
          cc10,
          cc11,
          cc12,
          cc13,
          cc14,
          cc15,
          cc16,
          cc17,
          cc18,
          cc19,
          cc20,
          cc21,
          cc22,
          cc23,
          cc24,
          cc25,
          cc26,
          cc27,
          cc28,
        ],
      },
      {
        image: Mih,
        title: "MIH",
        sliderImages: [
          mih1,
          mih2,
          mih3,
          mih4,
          mih5,
          mih6,
          mih7,
          mih8,
          mih9,
          mih10,
          mih11,
          mih12,
          mih13,
          mih14,
          mih15,
          mih16,
          mih17,
          mih18,
          mih19,
          mih20,
          mih21,
          mih22,
          mih23,
          mih24,
          mih25,
          mih26,
          mih27,
          mih28,
          mih29,
          mih30,
          mih31,
          mih32,
          mih33,
          mih34,
          mih35,
          mih36,
          mih37,
          mih38,
          mih39,
          mih40,
        ],
      },
      {
        image: Sakra,
        title: "Sakra World Hospitals",
        sliderImages: [sakra1, sakra2, sakra3],
      },
    ],
    Workspaces: [
      {
        image: cabin,
        title: "Cabins",
        sliderImages: [cabin1, cabin3],
      },
      {
        image: coWork,
        title: "Co-Working",
        sliderImages: [cowork1, cowork2],
      },
      {
        image: conference,
        title: "Conference Table",
        sliderImages: [conf1, conf2, conf3],
      },
      {
        image: csscorp,
        title: "Css Corp",
        sliderImages: [csscorp1, csscorp2, csscorp3],
      },
      {
        image: edutech,
        title: "Edutech",
        sliderImages: [edutech1, edutech2, edutech3],
      },
      {
        image: extreme,
        title: "Extreme",
        sliderImages: [extreme1, extreme2],
      },
      {
        image: featherlite,
        title: "Featherlite",
        sliderImages: [
          feather1,
          feather2,
          feather3,
          feather4,
          feather5,
          feather6,
          feather7,
          feather8,
          feather8,
          feather9,
          feather10,
        ],
      },
      {
        image: get,
        title: "GET",
        sliderImages: [get1, get2, get3],
      },
      {
        image: lycatel,
        title: "Lycatel",
        sliderImages: [lyca1, lyca2, lyca3],
      },
      {
        image: micronics,
        title: "Micronics",
        sliderImages: [
          micro1,
          micro2,
          micro3,
          micro4,
          micro5,
          micro6,
          micro7,
          micro8,
          micro9,
          micro10,
        ],
      },
      {
        image: newgen,
        title: "Newgen",
        sliderImages: [newgen1, newgen2, newgen3],
      },
      {
        image: sricity,
        title: "Sricity",
        sliderImages: [sricity1, sricity2, sricity3],
      },
      {
        image: foodcourt,
        title: "Sricity Food Court",
        sliderImages: [food1, food2, food3],
      },
      {
        image: tcs,
        title: "TCS",
        sliderImages: [tsc1, tsc2, tsc3],
      },
      {
        image: tesa,
        title: "Tesa",
        sliderImages: [tesa1, tesa2, tesa3],
      },
    ],
    Industrial: [
      {
        image: GalleryImage3,
        title: "GRT Hotels & Resorts",
        sliderImages: [GalleryImage3, GalleryImage3, GalleryImage3],
      },
      {
        image: GalleryImage4,
        title: "ITC Vellore",
        sliderImages: [GalleryImage4, GalleryImage4, GalleryImage4],
      },
      {
        image: GalleryImage5,
        title: "Radisson Blu",
        sliderImages: [GalleryImage5, GalleryImage5, GalleryImage5],
      },
      {
        image: GalleryImage3,
        title: "GRT Hotels & Resorts",
        sliderImages: [GalleryImage3, GalleryImage3, GalleryImage3],
      },
      {
        image: GalleryImage4,
        title: "ITC Vellore",
        sliderImages: [GalleryImage4, GalleryImage4, GalleryImage4],
      },
      {
        image: GalleryImage5,
        title: "Radisson Blu",
        sliderImages: [GalleryImage5, GalleryImage5, GalleryImage5],
      },
      {
        image: GalleryImage3,
        title: "GRT Hotels & Resorts",
        sliderImages: [GalleryImage3, GalleryImage3, GalleryImage3],
      },
      {
        image: GalleryImage4,
        title: "ITC Vellore",
        sliderImages: [GalleryImage4, GalleryImage4, GalleryImage4],
      },
      {
        image: GalleryImage5,
        title: "Radisson Blu",
        sliderImages: [GalleryImage5, GalleryImage5, GalleryImage5],
      },
    ],
  };

  const imagesToShow = imagesMap[activeTitle];

  const handleImageClick = (sliderImages: StaticImageData[]) => {
    setSelectedImages(sliderImages);
    setIsSliderOpen(true);
  };

  return (
    <div className="">
      {/* Desktop tabs - visible only on md and above */}
      <div className="hidden md:flex md:flex-row flex-wrap justify-between md:gap-10 gap-5 w-full md:px-25 px-5 mb-[100px]">
        {title.map((item, index) => (
          <div key={index} className="flex flex-row flex-grow md:gap-2">
            <h2
              className={`md:text-[24px] text-[14px] font-normal cursor-pointer ${
                activeTitle === item.title
                  ? "text-[#040444] font-semibold underline md:underline-offset-20 underline-offset-10"
                  : "text-[#393535]"
              }`}
              onClick={() => {
                setActiveTitle(
                  item.title as
                    | "Hotels"
                    | "Workspaces"
                    | "Residental"
                    | "Healthcare"
                    | "Retail"
                    | "Industrial"
                );
                if (item.title === "Retail" || item.title === "Hotels") {
                  setShowCelebrationPopup(true);
                }
              }}
            >
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Mobile scrollable tabs - visible only on small screens */}
      <div
        ref={tabsRef}
        className="md:hidden flex overflow-x-auto scrollbar-hide whitespace-nowrap px-5 mb-8 pb-2 gap-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {title.map((item, index) => (
          <div key={index} className="inline-block">
            <h2
              className={`text-[14px] font-normal cursor-pointer whitespace-nowrap ${
                activeTitle === item.title
                  ? "text-[#040444] font-semibold underline underline-offset-10 active-tab"
                  : "text-[#393535]"
              }`}
              onClick={() => {
                setActiveTitle(
                  item.title as
                   | "Hotels"
                    | "Workspaces"
                    | "Residental"
                    | "Healthcare"
                    | "Retail"
                    | "Industrial"  
                );
                if (item.title === "Retail") {
                  setShowCelebrationPopup(true);
                }
              }}
            >
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-12 md:mt-4 mt-1">
        {imagesToShow.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={`Gallery Image ${index + 1}`}
              layout="responsive"
              width={1000}
              height={1000}
              onClick={() =>
                handleImageClick(item.sliderImages as StaticImageData[])
              }
              className="cursor-pointer object-cover"
            />
            <div className="flex flex-row gap-2 items-end">
              <p className="mt-2 font-semibold text-[#040444] cursor-pointer md:text-[20px] text-center">
                {item.title}
              </p>
              <div className="md:w-7 md:h-7 w-5 h-7 text-black -rotate-45 flex flex-row items-center justify-center rounded-full">
                <ArrowRight className="text-[10px] text-[#040444]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Celebration Popup */}
      {showCelebrationPopup && (
        <>
          {/* Blurred Background */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-50 flex items-center justify-center p-2"
            onClick={() => setShowCelebrationPopup(false)}
          >
            {/* Popup Content */}
            <div
              className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl shadow-2xl max-w-xl w-full mx-4 p-8 text-center border border-orange-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowCelebrationPopup(false)}
                aria-label="Close popup"
              >
                ×
              </button>

              {/* Celebration Content */}
              <div className="space-y-10">
                {/* Celebration Icon/Emoji */}
                <div className="flex flex-row justify-between">
                  <Image src={logo15} alt="GRT" className="w-40" />
                  <Image src={logo14} alt="GRT" className="w-50" />

                </div>
                {/* <div className="text-6xl">🎉</div> */}

                {/* Main Heading */}

                <div className="space-y-2 mt-5 text-right">
                  <h2 className="text-xl md:text-2xl font-bold text-[#040444] leading-tight"></h2>
                  <div className="text-2xl md:text-5xl font-extrabold text-[#040444]  ">
                    Celebrating 17+ Years
                  </div>
                  <p className="text-xl md:text-2xl text-red-800 font-medium">
                    of Association with GRT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Image Slider Modal */}
      {isSliderOpen && (
        <>
          {/* Blurred Background - Transparent */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"
            onClick={() => setIsSliderOpen(false)}
          ></div>

          {/* Slider */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl max-h-[90vh]  rounded-xl overflow-hidden shadow-2xl">
              {/* Close Button - Positioned outside slider on larger screens, inside on mobile */}
              <button
                className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl hover:bg-white/20 transition-all duration-200 ease-in-out cursor-pointer border border-white/20"
                onClick={() => setIsSliderOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>

              <Splide
                options={{
                  type: "fade",
                  height: "100vh", // Reduced height for better proportions
                  pagination: true,
                  arrows: true,
                  autoplay: true,
                  classes: {
                    pagination: "splide__pagination splide__pagination--custom",
                    page: "splide__pagination__page splide__pagination__page--custom",
                  },
                }}
                className="h-full"
              >
                {selectedImages.map((image, index) => (
                  <SplideSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Selected Image ${index + 1}`}
                        fill
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>

              {/* Custom Splide Arrow Styles */}
              <style jsx>{`
                .splide__arrow {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border: 1px solid rgba(255, 255, 255, 0.2) !important;
                  backdrop-filter: blur(10px) !important;
                  width: 3rem !important;
                  height: 3rem !important;
                  opacity: 0.8 !important;
                  transition: all 0.2s ease !important;
                }

                .splide__arrow:hover {
                  background: rgba(255, 255, 255, 0.2) !important;
                  opacity: 1 !important;
                }

                .splide__arrow svg {
                  fill: white !important;
                  width: 1.2rem !important;
                  height: 1.2rem !important;
                }

                .splide__pagination--custom {
                  bottom: 1rem !important;
                  display: flex !important;
                  justify-content: center !important;
                  gap: 0.5rem !important;
                }

                .splide__pagination__page--custom {
                  background: rgba(255, 255, 255, 0.3) !important;
                  border: 1px solid rgba(255, 255, 255, 0.2) !important;
                  backdrop-filter: blur(10px) !important;
                  width: 0.75rem !important;
                  height: 0.75rem !important;
                  border-radius: 50% !important;
                  transition: all 0.2s ease !important;
                }

                .splide__pagination__page--custom.is-active {
                  background: white !important;
                  transform: scale(1.2) !important;
                }

                @media (max-width: 640px) {
                  .splide__arrow {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                  }

                  .splide__arrow svg {
                    width: 1rem !important;
                    height: 1rem !important;
                  }

                  .splide__pagination__page--custom {
                    width: 0.6rem !important;
                    height: 0.6rem !important;
                  }
                }
              `}</style>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
