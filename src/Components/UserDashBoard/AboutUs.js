const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="pt-8 pb-6 flex justify-center">
        <h1 className="text-3xl font-semibold tracking-tight select-none">
          Black<span className="text-yellow-500"> Banner</span>
        </h1>
      </div>

      {/* About Us Card */}
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="rounded border border-gray-300 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-medium mb-6">About Us</h1>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Welcome to <span className="font-semibold">BlackBanner</span>! We are dedicated to bringing you the highest-quality products at competitive prices. Our mission is to make shopping seamless, enjoyable, and reliable for every customer.
          </p>

          <p className="text-gray-700 mb-4 leading-relaxed">
            At BlackBanner, we carefully select products that meet our strict quality standards. Whether you are shopping for the latest gadgets, fashion, or everyday essentials, we ensure that each item delivers value and satisfaction.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Customer experience is at the heart of everything we do. Our friendly support team is always ready to help you with your inquiries and make your online shopping experience smooth and enjoyable.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border border-gray-200 rounded hover:shadow-md transition">
              <h2 className="text-yellow-500 font-semibold text-lg mb-2">Quality Products</h2>
              <p className="text-gray-600 text-sm">Only the best for our customers.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded hover:shadow-md transition">
              <h2 className="text-yellow-500 font-semibold text-lg mb-2">Fast Delivery</h2>
              <p className="text-gray-600 text-sm">Quick and reliable shipping.</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded hover:shadow-md transition">
              <h2 className="text-yellow-500 font-semibold text-lg mb-2">Customer Support</h2>
              <p className="text-gray-600 text-sm">Here for you 24/7.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="rounded bg-[#f0c14b] py-2 px-6 text-black font-medium border border-[#a88734] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-[#eeb933] active:bg-[#e6ac2c]">
              Shop Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pb-10 text-center text-xs text-gray-600">
          <div className="flex justify-center gap-4">
            <span className="text-blue-700 hover:underline cursor-pointer">Conditions of Use</span>
            <span className="text-blue-700 hover:underline cursor-pointer">Privacy Notice</span>
            <span className="text-blue-700 hover:underline cursor-pointer">Help</span>
          </div>
          <p className="mt-3">© {new Date().getFullYear()} BlackBanner</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;