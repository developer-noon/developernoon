// "use client";

// import Image from "next/image";
// import Button from "../Button";

// const Hero = () => {
//   return (
//     <div className="w-full min-h-[437.9px] relative text-center text-gray font-helvetica-now-display py-32">
//       {/* Main Heading with Images as Background */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute left-0 top-1/2 -translate-y-1/2">
//           <Image
//             src="/puzzle.svg"
//             alt="puzzle image"
//             width={450}
//             height={450}
//             className="opacity-90"
//           />
//         </div>
//         <div className="absolute right-24 top-1/2 -translate-y-1/2">
//           <Image
//             src="/hero-ui.svg"
//             alt="hero ui image"
//             width={400}
//             height={400}
//             className="opacity-90"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10">
//         <h1 className="text-[40px] font-bold md:text-[66px] tracking-[-0.03em] leading-[1.1] md:leading-[68px] max-w-[744px] mx-auto">
//           <span>Your </span>
//           <span className="uppercase text-royalblue">users</span>
//           <span> shouldn&apos;t need a manual to love your </span>
//           <span className="uppercase text-tomato">
//             <span>product</span>
//             <span className="text-gray">!</span>
//           </span>
//         </h1>

//         {/* Description */}
//         <p className="text-base md:text-2xl max-w-[670px] mx-auto mt-8 md:mt-12 text-gray/80">
//           Turns confusion into confidence, clicks into calm, and frustration
//           into flow. No guesswork. No ego. Just research-backed design that
//           actually works for real people.
//         </p>

//         {/* CTA Button */}
//         <div className="flex justify-center mt-12 md:mt-12">
//           <Button
//             className="flex"
//             variant="filled"
//             size="large"
//             rightIcon={
//               <Image
//                 src="/button-icon.svg"
//                 alt="Smile Icon"
//                 width={24}
//                 height={24}
//               />
//             }
//           >
//             Let's talk UX research
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
"use client";

import Image from "next/image";
import Button from "../Button";

const Hero = () => {
  return (
    <section className="w-full min-h-[700px] md:min-h-[600px] relative text-center text-gray font-helvetica-now-display py-28 sm:py-12 md:py-24 lg:py-40 overflow-x-hidden bg-white">
      {/* Background Images - Hidden on mobile, visible on larger screens */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Left Image - Puzzle - More visible and inside */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2">
          <div className="relative w-[300px] h-[300px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] -translate-x-1/6">
            <Image
              src="/puzzle.svg"
              alt="puzzle image"
              loading="eager"
              fill
              className="object-contain opacity-30 lg:opacity-40 xl:opacity-50"
              sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 300px, (max-width: 1536px) 450px, 550px"
            />
          </div>
        </div>

        {/* Right Image - Hero UI */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
          <div className="relative w-[250px] h-[250px] xl:w-[320px] xl:h-[320px] 2xl:w-[400px] 2xl:h-[400px] translate-x-1/6">
            <Image
              src="/hero-ui.svg"
              alt="hero ui image"
              loading="eager"
              fill
              className="object-contain opacity-30 lg:opacity-40 xl:opacity-50"
              sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 250px, (max-width: 1536px) 320px, 400px"
            />
          </div>
        </div>

        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/4">
          <div className="relative w-[100px] h-[100px] xl:w-[120px] xl:h-[140px] 2xl:w-[180px] 2xl:h-[200px]">
            <Image
              src="/iconny.svg"
              alt="hero ui image"
              loading="eager"
              fill
              className="object-contain opacity-50 lg:opacity-60 xl:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* Content - Always centered and responsive */}
      <div className="relative z-10 px-5 sm:px-6 md:px-8">
        <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[66px] font-bold tracking-[-0.02em] sm:tracking-[-0.03em] leading-[1.3] sm:leading-[1.2] md:leading-[1.3] lg:leading-[68px] max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[744px] mx-auto">
          <span className="font-bold">Your </span>
          <span className="uppercase text-royalblue font-bold">users</span>
          <span className="font-bold">
            {" "}
            shouldn&apos;t need a manual to love your{" "}
          </span>
          <span className="uppercase text-tomato font-bold">
            <span>product</span>
            <span className="text-gray">!</span>
          </span>
        </h1>

        {/* Description */}
        <p className="px-8 text-lg sm:text-sm md:text-base lg:text-xl xl:text-2xl max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[670px] mx-auto mt-6 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 text-gray/70 sm:text-gray/80 px-2">
          Turns confusion into confidence, clicks into calm, and frustration
          into flow. No guesswork. No ego. Just research-backed design that
          actually works for real people.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-8 md:mt-10 lg:mt-12">
          <Button
            className="flex whitespace-nowrap"
            variant="filled"
            size="large"
            rightIcon={
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8">
                <Image
                  src="/button-icon.svg"
                  alt="Smile Icon"
                  fill
                  className="object-contain"
                />
              </div>
            }
          >
            <span className="text-lg sm:text-sm md:text-base lg:text-lg xl:text-2xl">
              Let's talk UX research
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
