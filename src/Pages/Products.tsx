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
  const [page, setPage] = useState(1);
  const limit = 6; // you can change per-page limit

  const { data, isLoading } = useGetProductsQuery({
    search,
    brand,
    inStock,
    minPrice,
    maxPrice,
    page,
    limit,
  });

  const bikes = data?.data || [];
  const brands = [...new Set(bikes?.map((bike: any) => bike.brand))];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <Helmet>
        <title>Products</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#ECE3D2] p-6 sm:p-8 mb-10 rounded-xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-wide text-[#58652D]">
          Bikes of the Future
        </h1>
        <p className="text-lg font-semibold text-[#754130]">
          Where Elegance Meets Speed
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full bg-[#ECE3D2] rounded-xl p-6 border shadow-md space-y-4">
          <h2 className="text-xl font-bold text-[#58652D] mb-2">
            Filter Bikes
          </h2>

          <input
            type="text"
            placeholder="Search bikes..."
            className="w-full border p-2 rounded-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select
              className="w-full border p-2 rounded-md"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Brands</option>
              {brands?.map((b) => (
                <option key={String(b)} value={String(b)}>
                  {String(b)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Stock Status
            </label>
            <select
              className="w-full border p-2 rounded-md"
              value={inStock}
              onChange={(e) => {
                setInStock(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="w-1/2 border p-2 rounded-md"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-1/2 border p-2 rounded-md"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Products */}
        <div className="lg:w-3/4 w-full">
          {isLoading ? (
            <div className="text-center mt-10">
              <span className="loading loading-spinner text-warning"></span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {bikes?.map((bike: any) => (
                  <div
                    key={bike._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                  >
                    <div className="relative">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#58652D] text-white text-xs px-2 py-1 rounded">
                        {bike.brand}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h2 className="text-xl font-semibold text-[#58652D]">
                        {bike.name}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {bike.description}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold text-[#754130]">
                          {bike.price} Tk
                        </span>
                        <Link to={`/products/${bike._id}`}>
                          <button className="px-4 py-2 bg-[#bcbb9d] hover:bg-[#58652D] hover:text-white text-black rounded-full font-medium text-sm transition-all">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)]?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      page === i + 1
                        ? "bg-[#58652D] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
