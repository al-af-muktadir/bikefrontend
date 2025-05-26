/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/AuthApi";
import loginpic from "../assets/login.png";
import NavbarLogin from "../Components/LoginNavbar";
import { useAppDispatch } from "../redux/storeHooks";
import { setUser } from "../Slice/AuthStore";
import { verifyToken } from "../util/VerifyToken";
import { toast, Toaster } from "sonner";
import { Helmet } from "react-helmet-async";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in..Please Wait");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const userData = { email, password };

    try {
      const res = await login(userData).unwrap();
      const user = verifyToken(res.data as string);
      dispatch(setUser({ user, token: res.data }));

      navigate(location?.state ? location.state : "/");
      toast.success("Logged In Successfully", { id: toastId, duration: 3000 });
    } catch (error) {
      toast.error("Invalid Credentials", { id: toastId });
    }
  };

  const fillAdminCredentials = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "beckham@gmail.com";
      passwordRef.current.value = "securepassword";
    }
  };

  const fillUserCredentials = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "beckham77@gmail.com";
      passwordRef.current.value = "securepassword";
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <NavbarLogin />

      <div className="flex gap-12 relative top-20 items-center justify-center h-[500px] w-full rounded-full bg-amber-50">
        <h1 className="font-bold text-4xl">Welcome to Wheelz</h1>
        <div className="flex bg-amber-50 items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg ">
            <h2 className="text-2xl font-semibold text-center mb-4"></h2>

            {/* Admin/User Buttons */}
            <div className="flex gap-4 justify-center mb-4">
              <button
                onClick={fillAdminCredentials}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Login as Admin
              </button>
              <button
                onClick={fillUserCredentials}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Login as User
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Log in
              </button>
            </form>

            <Link to="/register">
              <h1 className="mt-3 text-center">
                Don't Have an Account?{" "}
                <span className="text-amber-800 font-semibold">Register</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="w-[300px]">
          <img src={loginpic} alt="Login illustration" />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
