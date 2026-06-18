// components/sections/Section01.tsx
"use client";

import Image from "next/image";
import Button from "../Button";

const Section01 = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32">
      {/* --- BACKGROUND PATTERN LAYER --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(63, 143, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(35, 127, 255, 0.39) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          // Fixed the lowercase 'm' typography error to WebkitMaskImage
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* Dynamic wrapper ensuring clean edge alignment on mobile and rigid grid bounds on desktop */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Swaps grid logic dynamically from 1 column layout on mobile to 2 columns on desktop */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left Content Column */}
          <div className="flex flex-col text-center lg:text-left">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              Innovate, Design, Develop –{" "}
              <span className="text-royalblue">Transform with Poqito.</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-xl">
              We breathe life into your digital dreams. From stunning designs to
              powerful apps, we craft solutions that inspire and succeed.
            </p>

            {/* Dynamic button responsiveness */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                variant="filled"
                size="large"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
                rightIcon={
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
              >
                Get a Free Consultation
              </Button>
            </div>

            {/* Footer trust badge */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 md:mt-10 md:pt-8">
              <p className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 lg:justify-start sm:text-base">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-tomato"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Proudly Powering Digital Transformation from Pakistan
                </span>
              </p>
            </div>
          </div>

          {/* Right Image/Illustration Column */}
          <div className="order-last flex w-full items-center justify-center lg:order-none">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl transition-transform duration-300 hover:scale-[1.01]">
              <div className="absolute inset-0 transform-gpu bg-gradient-to-r from-royalblue/10 to-tomato/10 rounded-full blur-3xl" />

              <Image
                src="/hero-ui.svg"
                alt="Digital Transformation Illustration"
                width={600}
                height={600}
                className="relative z-10 h-auto w-full object-contain p-4 drop-shadow-sm"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section01;
