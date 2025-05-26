/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../assets/logo.png";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { logout, useCurrentUser } from "../Slice/AuthStore";
import { clearCart } from "../Slice/cartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/storeHooks";

const NavbarLogin = () => {
  gsap.registerPlugin(useGSAP);
  const NavRef = useRef(null);
  const logoRef = useRef(null);
  const dispatch = useDispatch();

  const user = useAppSelector(useCurrentUser);
  useGSAP(() => {
    gsap.from(logoRef.current, {
      y: 15,
      duration: 1.2,
      delay: 0.5,
      opacity: 0,
    });
  });
  useGSAP(() => {
    gsap.from(NavRef.current, {
      y: 15,
      duration: 2,
      stagger: 0.2,
      opacity: 0,
    });
  });

  return (
    <div className="bg-[#ECE3D2] relative z-50 w-full shadow-md">
      <div
        className="flex items-center justify-between px-4 py-3 sm:px-8"
        ref={NavRef}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2">
          <img className="w-[4rem]" src={logo} alt="Logo" />
          <h1 className="font-bold text-[#58652D] text-xl sm:text-2xl">
            Wheelz
          </h1>
        </div>

        {/* Optional Title or Page Name */}
        {/* <div className="text-2xl font-semibold">{x}</div> */}

        {/* Icons Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />
            <svg
              className="swap-off h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71..." />
            </svg>
            <svg
              className="swap-on h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05..." />
            </svg>
          </label>

          {/* Home Button */}
          <Link to="/">
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#58652D] text-white hover:bg-[#43511F] transition">
              <FaHome className="text-xl" />
            </button>
          </Link>

          {/* Profile Dropdown */}
          {user && (
            <div className="relative group">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-[#58652D] text-white hover:bg-[#43511F] transition">
                <FaUserCircle className="text-xl" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-40">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      to="profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    {user && (
                      <button
                        onClick={() => {
                          logout();
                          dispatch(logout());
                          dispatch(clearCart());
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarLogin;
