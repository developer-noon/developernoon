// components/sections/ConceptSection.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ConceptSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const bulletPoints = [
    "Access to curated learning resources and expert content",
    "Network with industry leaders and peers",
    "Exclusive opportunities and job placements",
    "Personalized growth recommendations",
    "24/7 support and community feedback",
  ];

  // Safely manage status timeouts to prevent memory leaks if the component unmounts
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => setSubmitStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      // Handle form submission here
      console.log({ name, email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Subscription error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Changed h-full to min-h-screen to let the columns stretch evenly */}
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Image Container */}
        {/* Uses 40vh on mobile to leave plenty of room for copy, scales to full height on lg screens */}
        <div className="relative flex h-[40vh] w-full items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 sm:h-[50vh] lg:h-full">
          <div className="relative h-full w-full max-w-md lg:max-w-xl">
            <Image
              src="/post-side.svg"
              alt="Post Side - Decorative illustration representing community growth"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex w-full flex-col justify-center bg-white px-6 py-12 sm:px-12 md:py-20 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            {/* Heading */}
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
              Discover Your Potential
            </h2>

            {/* Description */}
            <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              Join our community and unlock exclusive opportunities to grow your
              skills, connect with like-minded professionals, and advance your
              career to new heights.
            </p>

            {/* Bullet Points */}
            <ul className="mb-8 space-y-3.5">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700 sm:text-base"
                >
                  <span className="mr-3 mt-1 flex-shrink-0 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full h-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50"
                  required
                  aria-label="Your name"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full h-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50"
                  required
                  aria-label="Your email address"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* Status Messages */}
            <div className="aria-live-assertive">
              {submitStatus === "success" && (
                <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-800 transition-all">
                  ✓ Successfully subscribed! Check your email for confirmation.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800 transition-all">
                  ✗ Subscription failed. Please try again later.
                </div>
              )}
            </div>

            {/* Form disclaimer */}
            <p className="mt-4 text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
