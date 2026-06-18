// components/sections/ContextSection.tsx

import Image from "next/image";

export default function ContextSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-[#B7C4F1]">
      {/* Background Split */}
      <div className="absolute inset-0">
        {/* Left / Right panels */}
        <div className="grid h-full w-full grid-cols-2">
          <div className="bg-[#AEBEF0]" />
          <div className="bg-[#C7D3F5]" />
        </div>
      </div>

      {/* Card Wrapper */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="w-full max-w-[880px] md:rotate-[-5deg] rounded-[24px] border border-white/50 bg-gradient-to-r from-white/100 to-[#B8C8F6] px-12 py-10 shadow-[0_28px_55px_rgba(46,67,135,0.52)]">
          <div className="grid items-center gap-6 md:grid-cols-[280px_1fr]">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[240px] w-[240px] overflow-hidden">
                <Image
                  src="/profile.png" // Place image in public/profile.png
                  alt="Hammad Noon"
                  width={240}
                  height={240}
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className=" text-black text-center md:text-left">
              {/* Small Label */}
              <p className="mb-2 text-[14px] font-light leading-none tracking-tight md:text-[16px]">
                Context First
              </p>

              {/* Heading */}
              <h1 className="max-w-[520px] text-[34px] font-normal leading-[1.08] tracking-[-0.045em] md:text-[42px]">
                Making Community
                <br />
                Impossible to Ignore
                <br />
                From Established Program
                <br />
                to Strategies Function
              </h1>

              {/* Divider */}
              <div className="my-5 h-px w-full relative bg-black/65" />

              {/* Author */}
              <div>
                <h3 className="text-[20px] font-semibold leading-none tracking-[-0.03em] md:text-[24px]">
                  Hammad Noon
                </h3>
                <p className="mt-1 text-[14px] font-light leading-tight tracking-tight md:text-[16px]">
                  UX Researcher and Frontend Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
