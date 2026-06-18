import Header from "@/components/Header";
import WorkSection from "@/components/sections/WorkSection";

export default function UXStudyPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full min-h-screen bg-royalblue/10 py-12">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg px-4 md:px-6 lg:px-24 py-12 md:py-16 lg:py-20 bg-white border border-slate-200 relative z-10 -translate-y-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            UX Research & Studies
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our in-depth UX research and case studies that showcase the
            science behind great design decisions.
          </p>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg text-gray-700 mb-6">
              We conduct rigorous user research to understand real user needs,
              behaviors, and pain points. Our research-backed designs solve real
              problems and create meaningful user experiences.
            </p>

            <h2 className="text-2xl font-bold mb-4">Featured Research</h2>
            <p className="text-lg text-gray-700">
              Coming soon - Case studies and detailed research findings from our
              latest UX projects.
            </p>
          </div>
        </div>
        <WorkSection />
      </main>

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
