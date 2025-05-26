import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRegisterMutation } from "../api/AuthApi";
import NavbarLogin from "../components/LoginNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/storeHooks";
import { setUser } from "../Slice/AuthStore";
import { verifyToken } from "../util/VerifyToken";
import { Helmet } from "react-helmet-async";

/* eslint-disable @typescript-eslint/no-explicit-any */

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    // Upload image to Cloudinary
    const imageData = new FormData();
    imageData.append("file", formData.image);
    imageData.append("upload_preset", "cloudy"); // Replace with Cloudinary upload preset
    imageData.append("cloud_name", "drbmetoqj"); // Replace with your Cloudinary cloud name

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/drbmetoqj/image/upload`,
        imageData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Send form data with image URL to backend
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: imageUrl,
      };
      //(userData);
      if (imageUrl) {
        const res = await register(userData);

        const user = verifyToken(res.data.data as string);
        dispatch(setUser({ user, token: res.data }));
        setIsLoading(false);
        //(res);
        toast.success("Registered Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration Failed");
    }
  };
  return (
    <div className=" bg-amber-50 min-h-screen">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <NavbarLogin />
      <div className="flex items-center justify-center relative top-20 bg-amber-50   ">
        <div className=" w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-semibold text-center text-brown-700 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-brown-500 bg-blue-100 p-3 rounded-lg hover:bg-brown-600 transition duration-300"
            >
              {isLoading ? "Resgistering" : "Register"}
            </button>
          </form>
          <div>
            Already Have an account Please <Link to="/login">Login</Link>
          </div>
        </div>

        <Toaster />
      </div>
      <h1></h1>
    </div>
  );
};

export default Register;
