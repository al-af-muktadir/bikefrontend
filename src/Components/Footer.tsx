import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <h1 className="  grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 py-16 text-[#58652D]  ">
        <div className=" col-span-3 lg:col-span-3">
          <div className="">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:gap-8 text-sm px-8 md:px-4 lg:px-12 py-10">
              {/* SHOP Column */}
              <div>
                <h3 className="font-semibold text-2xl mb-4">SHOP</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      All
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Apparel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Jewellery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Homeware
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Brands
                    </a>
                  </li>
                </ul>
              </div>

              {/* ABOUT Column */}
              <div>
                <h3 className="font-semibold text-2xl mb-4 ">ABOUT</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Who we are
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Values
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Be a gOOOders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Make it Good
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Milano is Good
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Journal
                    </a>
                  </li>
                </ul>
              </div>

              {/* INFORMATION Column */}
              <div>
                <h3 className="font-semibold text-2xl mb-4 ">INFORMATION</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Terms of service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#5D4037]">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* STAY UPDATED Column */}
              <div>
                <h3 className="font-semibold text-2xl mb-4">STAY UPDATED</h3>
                <p className="text-[#6D4C41] mb-3">
                  Be the first to know about events, new content, products, or
                  brands at <strong>gOOOders</strong>.
                </p>
                <a
                  href="#"
                  className="font-semibold hover:text-[#5D4037] underline"
                >
                  Subscribe to our newsletter
                </a>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="hover:text-[#5D4037] text-2xl">
                    <FaFacebook />
                  </a>
                  <a href="#" className="hover:text-[#5D4037] text-2xl"></a>
                  <FaInstagram className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col  lg:flex-row text-7xl items-center border-l-2 border-dotted border-s-amber-700 ">
            <img className="sm:w-16" src={logo} alt="" />
            <h3 className=" text-3xl lg:text-7xl lg:px-10 font-semibold tracking-tighter font-stretch-ultra-condensed">
              Wheelz
            </h3>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default Footer;
