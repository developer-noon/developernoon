import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full min-h-screen bg-white">
        <div className="px-4 md:px-6 lg:px-24 py-12 md:py-16 lg:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have questions or want to work together? We'd love to hear from you.
          </p>

          <div className="max-w-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-700">hello@developernoon.com</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-700">Pakistan</p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
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
