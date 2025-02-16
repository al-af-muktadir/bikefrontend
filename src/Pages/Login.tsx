/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/AuthApi";
import loginpic from "../assets/login.png";
import NavbarLogin from "../Components/LoginNavbar";
import { useAppDispatch } from "../redux/storeHooks";
import { setUser } from "../Slice/AuthStore";
import { verifyToken } from "../util/VerifyToken";
import { toast, Toaster } from "sonner";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in..Please Wait");
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const userData = {
      email,
      password,
    };
    //(userData);
    try {
      const res = await login(userData).unwrap();

      const user = verifyToken(res.data as string);
      dispatch(setUser({ user, token: res.data }));
      navigate(location?.state ? location.state : "/");
      toast.success("Logged In Succesfully", { id: toastId, duration: 3000 });

      //(res.data);
    } catch (error) {
      toast.error(`Invalid Credentials`, { id: toastId });
    }
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <NavbarLogin x={"Login"} />

      <div className="flex gap-12 relative top-20 items-center justify-center h-[500px] w-full rounded-full bg-amber-50">
        <h1 className="font-bold text-4xl">WelCome to Wheelz</h1>
        <div className="flex bg-amber-50 items-center justify-center p-4">
          <div className="w-full  max-w-md rounded-lg ">
            <h2 className="text-2xl font-semibold text-center mb-4"></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
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
              <h1>
                Dont Have any Account{" "}
                <span className="text-amber-800">Regesiter</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="w-[300px]">
          <img src={loginpic} alt="" />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
