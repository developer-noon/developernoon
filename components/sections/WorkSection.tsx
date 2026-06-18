"use client";

import Link from "next/link";

interface MockupCard {
  titleText?: string;
  highlightText?: string;
  subText?: string;
  bgClass: string;
  isImageCard?: boolean;
  imageUrl?: string;
}

interface Project {
  id: string;
  slug: string;
  clientName: string;
  mainTitle: string;
  categories: string[];
  year: string;
  mockups: MockupCard[];
}

const WorkSection = () => {
  const projects: Project[] = [
    {
      id: "1",
      slug: "digital-platform-and-identity",
      clientName: "MindFuture",
      mainTitle: "DIGITAL PLATFORM AND IDENTITY",
      categories: ["DIGITAL", "DESIGN SYSTEM", "IDENTITY"],
      year: "2024",
      mockups: [
        {
          titleText: "Best\nidea's",
          highlightText: "best\nfriend",
          subText:
            "Visit our MindFuture Hub in Høje Taastrup and show us your idea",
          bgClass: "bg-[#1c1e22] text-white",
        },
        {
          bgClass: "bg-[#d1d5db]",
          isImageCard: true,
          imageUrl:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        },
        {
          titleText: "Device tech\ndone right",
          highlightText: "at the speed\nof light",
          subText: "We take you to market in 18 months",
          bgClass: "bg-[#191f22] text-white",
        },
      ],
    },
    {
      id: "2",
      slug: "ecommerce-system-and-security",
      clientName: "DeveloperNoon",
      mainTitle: "E-COMMERCE SYSTEM & SECURITY",
      categories: ["FULLSTACK", "NEXT.JS", "MONGO AUTH"],
      year: "2026",
      mockups: [
        {
          titleText: "Production\nauth",
          highlightText: "simplified\nright",
          subText:
            "Secure HttpOnly cookie token rotation built out-of-the-box.",
          bgClass: "bg-[#0f172a] text-white",
        },
        {
          bgClass: "bg-[#334155]",
          isImageCard: true,
          imageUrl:
            "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          titleText: "Scalable\nData",
          highlightText: "powered\nby Atlas",
          subText: "Enterprise rate-limiting configured instantly.",
          bgClass: "bg-[#171717] text-white",
        },
      ],
    },
  ];

  // Brand logos with SVG files from public folder
  const brandsData = [
    {
      name: "Evaporena",
      logo: "/evaporena.svg",
    },
    {
      name: "Signemous",
      logo: "/signemous.svg",
    },
    {
      name: "ModdingCredits",
      logo: "/moddingcredits.svg",
    },
    {
      name: "AlexaQueen",
      logo: "/alexaqueen.svg",
    },
    {
      name: "SmartFlow",
      logo: "/smartflow.svg",
    },
  ];

  // Duplicate for continuous marquee effect
  const brands = [...brandsData, ...brandsData];

  return (
    <section className="w-full max-w-[95%] lg:max-w-7xl mx-auto bg-white mt-4 mb-24 relative z-10 font-product-sans rounded-lg shadow-lg border border-slate-200 overflow-hidden ">
      {/* 1. TOP CLIENT LOGO MARQUEE TICKER (From image_2a4607.png) */}
      <div className="w-full bg-[#1c1d1f] text-white select-none py-4 px-6 overflow-hidden border-b border-slate-800 relative flex">
        <div className="flex items-center animate-marquee whitespace-nowrap gap-8">
          {brands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 h-8 flex items-center justify-center px-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-full max-h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. HERO "WORK" MASSIVE DISPLAY TYPOGRAPHY PANEL (From image_2a4607.png) */}
      <div className="w-full py-12 px-4 sm:px-8 flex items-center justify-between overflow-hidden border-b border-slate-600 bg-white relative min-h-[160px]">
        <div className="flex items-baseline select-none z-10">
          <h1 className="text-[14vw] lg:text-[9rem] font-product-sans-bold tracking-tighter text-royalblue leading-none uppercase">
            Case Studies
          </h1>
        </div>
        {/* Abstract structural glyph wheel design element on right side */}
        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[15rem] sm:text-[20rem] font-light text-slate-950 leading-none select-none animate-spin-slow pointer-events-none opacity-20 sm:opacity-100">
          ✱
        </div>
      </div>

      {/* 3. DYNAMIC PROJECT SHOWN BLOCKS CONTAINER */}
      <div className="space-y-16 p-4 sm:p-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="block group"
          >
            {/* Aspect Ratio Constraint Layer matching image proportions exactly */}
            <div className="w-full aspect-video md:aspect-[21/9] border border-slate-600 rounded-lg overflow-hidden flex flex-col md:flex-row bg-royalblue/5">
              {/* LEFT SIDEWAY IDENTITY CARD PANEL (31% Static Column Width) */}
              <div className="w-full md:w-[31%] p-6 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-600 bg-royalblue/5">
                <div>
                  {/* Brand Client Logo Identity Pill */}
                  <div className="bg-white border border-slate-200 rounded-md px-3.5 py-1.5 w-fit flex items-center gap-2 shadow-sm mb-6 md:mb-10">
                    <div className="w-4 h-4 bg-slate-900 rounded-sm flex items-center justify-center text-[10px] text-white font-product-sans-bold">
                      凹
                    </div>
                    <span className="text-sm font-product-sans-bold text-slate-800 tracking-tight">
                      {project.clientName}
                    </span>
                  </div>

                  {/* Main Uppercase Left Panel Header Title Description */}
                  <h3 className="text-lg lg:text-3xl font-product-sans-bold tracking-tight text-slate-900 leading-[1.15] max-w-xs">
                    {project.mainTitle}
                  </h3>
                </div>
              </div>

              {/* RIGHT SIDEWAY SHOWCASE PANEL CONTAINER (69% Static Column Width) */}
              <div className="w-full md:w-[69%] flex flex-col bg-royalblue/5 min-h-0">
                {/* Immersive Image Display Frame */}
                <div className="flex-grow relative overflow-hidden min-h-0">
                  {/* Darkening Overlay for text legibility */}
                  <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none transition-colors duration-300 group-hover:bg-black/15" />

                  {/* Stock Image Representation matching image mockup views */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      project.id === "1"
                        ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                        : "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={`${project.clientName} product mockup presentation`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                </div>

                {/* Status Ribbon Footer - Bounded precisely underneath the image display container */}
                <div className="w-full h-12 border-t border-slate-600 bg-royalblue/5 px-6 flex items-center justify-between text-[11px] font-product-sans-bold tracking-wider text-slate-700 select-none flex-shrink-0">
                  <div className="flex items-center gap-1 flex-wrap uppercase overflow-hidden whitespace-nowrap">
                    {project.categories.map((cat, i) => (
                      <span key={cat} className="flex items-center text-sm font-product-sans">
                        {cat}
                        {i < project.categories.length - 1 && (
                          <span className="mx-2">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="tracking-normal ml-4 text-sm font-product-sans">
                    {project.year}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
