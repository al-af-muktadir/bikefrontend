import logo from "../assets/logo.png";
import userPic from "../assets/uu.jpg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/storeHooks";
import { logout, useCurrentUser } from "../Slice/AuthStore";
import { useGetUserQuery, useLogOutMutation } from "../api/AuthApi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { clearCart } from "../Slice/cartSlice";
// import { persistor } from "../redux/store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logOut] = useLogOutMutation();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserQuery(user?.email);

  // const navigate = useNavigate();
  if (isLoading) {
    <span className="loading loading-spinner text-warning"></span>;
  }
  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? "text-[#58652D]" : "text-black"}`
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${isActive ? "text-[#58652D]" : "text-black"}`
        }
        to="/products"
      >
        Products
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${isActive ? "text-[#58652D]" : "text-black"}`
        }
        to="/about"
      >
        About
      </NavLink>

      {user?.role === "customer" && (
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-[#58652D]" : "text-black"}`
          }
          to="dashboard"
        >
          Dashboard
        </NavLink>
      )}
      {user?.role === "admin" && (
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "text-[#58652D]" : "text-black"}`
          }
          to="admin/dashboard/createproduct"
        >
          Admin Dashboard
        </NavLink>
      )}
    </>
  );
  gsap.registerPlugin(useGSAP);
  const NavRef = useRef(null);
  const logoRef = useRef(null);

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
    <div className="bg-[#ECE3D2] w-full sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-3 py-2 lg:px-6 lg:py-4 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center">
          <img className=" w-8 lg:w-12" src={logo} alt="Logo" />
          <h1 className="font-bold text-[#58652D] text-xl ml-2">Wheelz</h1>
        </div>
        <div className="hidden md:flex items-center  lg:gap-10 font-bold">
          {links}
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          {user ? (
            <button
              onClick={() => {
                logOut({});
                dispatch(logout());
                dispatch(clearCart());
              }}
              className="bg-amber-400 lg:px-4 lg:py-2 rounded-3xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-[#58652D]   lg:px-4 lg:py-2 rounded-xl font-bold hover:animate-pulse">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-[#bcbb9d] lg:px-4 lg:py-2 rounded-xl font-bold hover:animate-pulse">
                  Register
                </button>
              </Link>
            </>
          )}
          <div>
            {user ? (
              <img
                className="w-8 h-8 rounded-full"
                src={isLoading ? "X" : data?.data?.image}
                alt="User"
              />
            ) : (
              <img
                className="w-8 h-8 rounded-full"
                src={userPic}
                alt="Default"
              />
            )}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4 gap-4">
          {links}
        </div>
      )}
    </div>
  );
};

export default Navbar;
