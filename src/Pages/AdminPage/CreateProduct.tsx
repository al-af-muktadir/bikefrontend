import axios from "axios";

import { toast, Toaster } from "sonner";

import { useState } from "react";

import { useCreateProductMutation } from "../../api/productApi";

/* eslint-disable @typescript-eslint/no-explicit-any */

const Createproduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createproduct] = useCreateProductMutation();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    category: "",
    description: "",
    quantity: 0,
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "quantity" ? parseInt(value) : value;

    setFormData({ ...formData, [name]: updatedValue });
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
      const productData = {
        name: formData.name,
        brand: formData.brand,
        price: formData.price,
        category: formData.category,
        quantity: formData.quantity,
        description: formData.description,
        image: imageUrl,
      };
      //(productData);
      if (imageUrl) {
        const res = await createproduct(productData);
        if (res.data.success === true) {
          setIsLoading(false);
          //(res);
          toast.success("Product Added Succesfully");
        } else {
          toast.error("Couldnt Create Product");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Addition Failed");
    }
  };
  return (
    <div className=" bg-amber-50 min-h-screen">
      <div className="flex items-center justify-center relative top-20 bg-amber-50   ">
        <div className=" w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-semibold text-center text-brown-700 mb-6">
            Create Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="mb-4" htmlFor="">
              Bike Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            />

            <label className="mb-4" htmlFor="">
              Brand Name:
            </label>

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            />

            <label className="mb-4" htmlFor="">
              Price:
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            />

            <label className="mb-4" htmlFor="">
              Select Category:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>

            <label className="mb-4" htmlFor="">
              Bike Description:
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            ></textarea>
            <label className="mb-4" htmlFor="">
              Add Quantity:
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500"
              required
            />

            <label className="mb-4" htmlFor="">
              Upload Bike Image:
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-brown-500 bg-yellow-300 px-3 py-3 rounded-lg hover:bg-brown-600 transition"
            >
              {isLoading ? "Adding Product" : "Add Product"}
            </button>
          </form>
        </div>

        <Toaster />
      </div>
      <h1></h1>
    </div>
  );
};

export default Createproduct;
