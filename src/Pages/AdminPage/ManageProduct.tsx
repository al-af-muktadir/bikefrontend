/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetProductsQuery } from "../../api/productApi";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  const { data, isLoading } = useGetProductsQuery({});

  // Extract all brands and categories dynamically from data for filter dropdown options
  const allBrands = Array.from(
    new Set(data?.data?.map((product: any) => product.brand) || [])
  );
  const allCategories = Array.from(
    new Set(data?.data?.map((product: any) => product.category) || [])
  );

  // Filter products based on selected brand and category
  const filteredProducts =
    data?.data?.filter((product: any) => {
      const brandMatch = brandFilter ? product.brand === brandFilter : true;
      const categoryMatch = categoryFilter
        ? product.category === categoryFilter
        : true;
      return brandMatch && categoryMatch;
    }) || [];

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 space-y-6">
      <h2 className="text-xl font-bold">Manage Products</h2>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={brandFilter}
          onChange={(e) => {
            setBrandFilter(e.target.value);
            setCurrentPage(1); // reset page on filter change
          }}
          className="border p-2 rounded-md"
        >
          <option value="">All Brands</option>
          {allBrands.map((brand) => (
            <option key={String(brand)} value={String(brand)}>
              {String(brand)}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1); // reset page on filter change
          }}
          className="border p-2 rounded-md"
        >
          <option value="">All Categories</option>
          {allCategories.map((category) => (
            <option key={String(category)} value={String(category)}>
              {String(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 border">Bike</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">inStock</th>
              <th className="px-4 py-2 border">Update</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-2 text-center">
                  <span className="loading loading-spinner text-warning"></span>
                </td>
              </tr>
            ) : currentProducts.length ? (
              currentProducts.map((product: any) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.brand}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">
                    ৳{product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{product.quantity}</td>
                  <td className="px-4 py-2 border">
                    {product.inStock ? "True" : "False"}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`${product._id}`}
                      className="px-4 py-2 bg-green-200 rounded"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="px-4 py-2 bg-red-200 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-2 text-center">
                  No Products Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
