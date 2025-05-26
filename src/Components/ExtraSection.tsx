const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#ECE3D2] py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#58652D] mb-4">
          Why Choose Wheelz?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We don’t just sell bikes — we deliver an experience engineered for
          thrill and trust.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-[#ECE3D2] rounded-xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-xl font-bold text-[#58652D] mb-2">
            Certified Quality
          </h3>
          <p className="text-sm text-gray-700">
            Every bike passes strict inspections to ensure top-notch
            performance.
          </p>
        </div>

        <div className="p-6 bg-[#ECE3D2] rounded-xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-xl font-bold text-[#58652D] mb-2">
            Secure Payments
          </h3>
          <p className="text-sm text-gray-700">
            Shop with confidence using encrypted and flexible payment options.
          </p>
        </div>

        <div className="p-6 bg-[#ECE3D2] rounded-xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-xl font-bold text-[#58652D] mb-2">
            Nationwide Delivery
          </h3>
          <p className="text-sm text-gray-700">
            From Dhaka to Chittagong — we deliver where your wheels need to
            roll.
          </p>
        </div>

        <div className="p-6 bg-[#ECE3D2] rounded-xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="text-xl font-bold text-[#58652D] mb-2">
            24/7 Support
          </h3>
          <p className="text-sm text-gray-700">
            Got a question? We’re always here to help — day or night.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
