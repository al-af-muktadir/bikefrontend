/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSepeceficProductQuery,
  useUpdateProductMutation,
} from "../../api/productApi";

import { toast, Toaster } from "sonner";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [loading, setLoading] = useState(true);

  const [updateinfo] = useUpdateProductMutation();
  const { data, isLoading } = useGetSepeceficProductQuery(id);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const form = new FormData(e.curruentTarget);
    // const name = form.get("name");
    // const brand = form.get("brand");
    // const price = form.get("price");
    // const quantity = form.get("quantity");
    // const category = form.get("categoryy");
    const name = e.currentTarget.name.value;
    const brand = e.currentTarget.brand.value;
    const price = Number(e.currentTarget.price.value);
    const quantity = Number(e.currentTarget.quantity.value);
    const category = e.currentTarget.category.value;

    //(name, brand, price, quantity, category);
    const updateData = {
      name,
      brand,
      price,
      quantity,
      category,
    };
    const res = await updateinfo({ id, data: updateData });

    if (res.data.success === true) {
      toast.success("Updated Succesfully");
      navigate("/admin/dashboard/manageproduct");
    } else {
      toast.error("Updation Failed");
    }
  };
  return (
    <div>
      {isLoading ? (
        <span className="loading loading-spinner text-warning"></span>
      ) : (
        <>
          {" "}
          <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Update Bike
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="mb-4">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Bike Name"
                defaultValue={data.data[0].name}
                required
                //   onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <label className="mb-4">Brand:</label>
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                defaultValue={data.data[0].brand}
                required
                //   onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <label className="mb-4">Price:</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                defaultValue={data.data[0].price}
                required
                //   onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <label className="mb-4">Category:</label>
              <select
                name="category"
                defaultValue={data.data[0].category}
                required
                //   onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Category</option>
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              <label className="mb-4">Quantity:</label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                defaultValue={data.data[0].quantity}
                required
                //   value={data.data[0].quantity || ""}
                //   onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-brown-500 bg-orange-300 p-3 rounded-lg hover:bg-brown-600 transition"
              >
                Update Bike
              </button>
            </form>
          </div>
          <Toaster />
        </>
      )}
    </div>
  );
};

export default UpdateProducts;
