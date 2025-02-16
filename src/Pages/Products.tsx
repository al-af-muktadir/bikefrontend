/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetProductsQuery } from "../api/productApi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [inStock, setInStock] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { data, isLoading } = useGetProductsQuery({
    search,
    category: "",
    brand,
    inStock,
    minPrice,
    maxPrice,
  });

  let bikes;
  let brands;
  if (isLoading) {
    <span className="loading"></span>;
  } else {
    bikes = data.data;
    brands = [...new Set(bikes?.map((bike: any) => bike.brand))];
  }

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="bg-[#ECE3D2] p-8 mb-10  rounded-xl shadow-xl text-white text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-wider text-[#58652D]">
          Bikes of the Future
        </h1>
        <p className="text-lg font-semibold text-[#754130]">
          Where Elegance Meets Speed
        </p>
      </div>

      <div className="flex  justify-center mb-8 gap-8">
        <input
          type="text"
          placeholder="Search bikes..."
          className="border p-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-md"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands?.map((b) => (
            <option value={b as string}>{b as string}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded-md"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
        >
          <option value="">All Stock</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded-md w-24"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded-md w-24"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {isLoading ? (
        <span className="loading loading-spinner text-warning"></span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1300px] mx-auto justify-center md:gap-x-6 gap-y-8">
          {bikes.map((bike: any) => (
            <div className="card bg-base-100 lg:w-96  shadow-sm">
              <figure>
                <img className="w-full" src={bike.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Bike-{bike.name}</h2>
                <h2 className="card-title">Brand-{bike.brand}</h2>
                <p>{bike.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">{bike.price}Tk</button>
                  <Link to={`/products/${bike._id}`}>
                    {" "}
                    <button className="btn btn-secondary">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
