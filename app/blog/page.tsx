import Header from "@/components/Header";

export default function BlogPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full min-h-screen bg-white">
        <div className="px-4 md:px-6 lg:px-24 py-12 md:py-16 lg:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-600 mb-12">
            Insights, articles, and stories about design, development, and
            technology.
          </p>

          <div className="max-w-3xl">
            <div className="space-y-8">
              <article className="border-b pb-8">
                <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                <p className="text-gray-600 mb-4">
                  We're working on bringing you insightful articles and stories
                  about design, development, and the latest trends in
                  technology.
                </p>
                <p className="text-sm text-gray-500">
                  Check back soon for new content!
                </p>
              </article>

              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-700">
                  Subscribe to get updates when new articles are published
                </h3>
              </div>
            </div>
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
