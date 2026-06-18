import Link from "next/link";
import Header from "@/components/Header";

interface CaseStudy {
  slug: string;
  clientName: string;
  mainTitle: string;
  categories: string[];
  year: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
  color: string;
  backgroundColor: string;
}

const caseStudies: Record<string, CaseStudy> = {
  "digital-platform-and-identity": {
    slug: "digital-platform-and-identity",
    clientName: "MindFuture",
    mainTitle: "DIGITAL PLATFORM AND IDENTITY",
    categories: ["DIGITAL", "DESIGN SYSTEM", "IDENTITY"],
    year: "2024",
    shortDescription:
      "A comprehensive digital platform and identity system designed for innovation hub MindFuture, combining cutting-edge UI/UX with a cohesive design system.",
    challenge:
      "MindFuture needed a unified digital presence that reflected their innovation-focused mission while providing a seamless experience across web, mobile, and physical touchpoints. The challenge was creating a design system that could scale across multiple projects and maintain consistency.",
    solution:
      "We developed a comprehensive design system with flexible components, created a modern digital platform showcasing their innovation hub, and established clear brand identity guidelines. The platform features interactive project showcases, member profiles, and event management capabilities.",
    results: [
      "Complete design system with 200+ components",
      "40% faster development time for future projects",
      "95% brand consistency across all touchpoints",
      "500+ innovation proposals submitted on platform",
    ],
    metrics: [
      { value: "200+", label: "Design Components" },
      { value: "40%", label: "Development Speed Increase" },
      { value: "500+", label: "Innovation Proposals" },
    ],
    color: "from-emerald-400 to-teal-600",
    backgroundColor: "bg-emerald-50",
  },
  "ecommerce-system-and-security": {
    slug: "ecommerce-system-and-security",
    clientName: "DeveloperNoon",
    mainTitle: "E-COMMERCE SYSTEM & SECURITY",
    categories: ["FULLSTACK", "NEXT.JS", "MONGO AUTH"],
    year: "2026",
    shortDescription:
      "A secure, scalable e-commerce platform built with Next.js and MongoDB, featuring production-grade authentication and enterprise-level security practices.",
    challenge:
      "DeveloperNoon needed an e-commerce platform that could handle secure transactions, complex user authentication, and enterprise-scale rate limiting. The platform had to be developer-friendly while maintaining the highest security standards without unnecessary complexity.",
    solution:
      "We built a full-stack e-commerce platform with HttpOnly cookie-based token rotation, MongoDB Atlas for scalable data storage, and enterprise-grade rate limiting. The platform includes real-time inventory management, secure payment processing, and comprehensive admin dashboards.",
    results: [
      "Zero security incidents in 12 months",
      "99.99% uptime achieved",
      "$5M+ transactions processed securely",
      "10,000+ active users",
    ],
    metrics: [
      { value: "99.99%", label: "Uptime" },
      { value: "$5M+", label: "Transactions" },
      { value: "10K+", label: "Active Users" },
    ],
    color: "from-indigo-400 to-purple-600",
    backgroundColor: "bg-indigo-50",
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies[slug];

  if (!caseStudy) {
    return (
      <div className="w-full">
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Case Study Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Link
              href="/#work"
              className="inline-block text-royalblue hover:text-blue-700 font-semibold transition-colors"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header />

      {/* Hero Section */}
      <section
        className={`w-full min-h-screen flex items-center justify-center ${caseStudy.backgroundColor} py-20 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Client Badge */}
          <div className="mb-8 inline-block">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
              <div className="w-5 h-5 bg-slate-800 rounded-sm flex items-center justify-center text-[12px] text-white font-extrabold">
                {caseStudy.clientName.charAt(0)}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {caseStudy.clientName}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 uppercase">
            {caseStudy.mainTitle}
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {caseStudy.categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs md:text-sm font-semibold uppercase tracking-widest text-slate-600 bg-white/50 backdrop-blur px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
            {caseStudy.shortDescription}
          </p>

          {/* Year Badge */}
          <div className="mb-12">
            <span className="text-sm font-semibold text-gray-600">
              Project Year: {caseStudy.year}
            </span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {caseStudy.metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${caseStudy.color} bg-clip-text text-transparent mb-2`}
                >
                  {metric.value}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
            The Challenge
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
            Our Solution
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
            Results & Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.results.map((result, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg bg-gradient-to-br ${caseStudy.color} text-white`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-base sm:text-lg font-semibold">{result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${caseStudy.color}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring our expertise to your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Back to Work Section */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-royalblue hover:text-blue-700 font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            View All Projects
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white py-12 px-4 md:px-6 lg:px-24">
        <div className="text-center">
          <p className="mb-2 text-lg font-product-sans">Developer Noon</p>
          <p className="text-slate-400">
            © 2024 Developer Noon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
