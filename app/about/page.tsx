import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full min-h-screen bg-white">
        <div className="px-4 md:px-6 lg:px-24 py-12 md:py-16 lg:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-600 mb-8">
            Developer Noon is a platform dedicated to helping developers grow
            their skills and stay up-to-date with the latest trends in
            technology.
          </p>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              We believe in the power of community and shared knowledge. Our
              mission is to provide high-quality articles, tutorials, and
              resources that help developers at all levels improve their craft.
            </p>

            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="text-lg text-gray-700 space-y-3">
              <li>• In-depth technical articles and tutorials</li>
              <li>• UX research insights for better design decisions</li>
              <li>• Community-driven discussions and feedback</li>
              <li>• Resources and best practices</li>
              <li>• Career development opportunities</li>
            </ul>
          </div>
        </div>
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
