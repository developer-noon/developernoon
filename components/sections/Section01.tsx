"use client";

import Image from "next/image";
import Button from "../Button";

const Section01 = () => {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-20 lg:py-36">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray mb-4 md:mb-6">
              Innovate, Design, Develop –{" "}
              <span className="text-royalblue">Transform with Poqito.</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray/70 mt-4 md:mt-6 leading-relaxed">
              We breathe life into your digital dreams. From stunning designs to
              powerful apps, we craft solutions that inspire and succeed.
            </p>

            <div className="mt-8 md:mt-10">
              <Button
                variant="filled"
                size="large"
                className="shadow-lg hover:shadow-xl"
                rightIcon={
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
              >
                Get a Free Consultation
              </Button>
            </div>

            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200">
              <p className="text-sm sm:text-base text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-tomato"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Proudly Powering Digital Transformation from Pakistan
              </p>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-royalblue/20 to-tomato/20 rounded-full blur-3xl"></div>
              <Image
                src="/hero-ui.svg"
                alt="Digital Transformation Illustration"
                width={400}
                height={400}
                className="relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section01;
