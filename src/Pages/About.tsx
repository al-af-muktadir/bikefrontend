import { Helmet } from "react-helmet-async";
import { FaBicycle, FaCheckCircle, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-16">
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#58652D] mb-6">About Wheelz</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          At <strong>Wheelz</strong>, we are passionate about delivering
          top-quality bicycles that meet the needs of every rider. Whether
          you’re a professional cyclist, a daily commuter, or a weekend
          adventurer, we have the perfect ride for you.
        </p>
      </div>

      <div className="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Quality Bikes */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaBicycle className="text-5xl text-[#58652D] mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Quality Bikes</h3>
          <p className="text-gray-600">
            We provide premium bikes crafted for durability, speed, and comfort.
          </p>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaCheckCircle className="text-5xl text-[#58652D] mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-gray-600">
            Our goal is to ensure that every customer finds their ideal bike
            with us.
          </p>
        </div>

        {/* Community Driven */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FaUsers className="text-5xl text-[#58652D] mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Community Driven</h3>
          <p className="text-gray-600">
            We support cycling communities and promote eco-friendly transport.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
