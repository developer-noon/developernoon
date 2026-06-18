import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Section01 from "@/components/sections/Section01";
import ContextSection from "@/components/sections/ContextSection";
import ConceptSection from "@/components/sections/ConceptSection";
import WorkSection from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <div className="w-full">
      <Header />

      {/* Landing Page Sections */}
      <main>
        <Hero />
        <Section01 />
        <ContextSection />
        <ConceptSection />
        <div id="work">
          <WorkSection />
        </div>
      </main>

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
