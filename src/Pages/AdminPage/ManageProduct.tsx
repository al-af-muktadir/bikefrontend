/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsQuery } from "../../api/productApi";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <div className="w-full flex items-center justify-center mt-8">
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
            ) : data?.data?.length ? (
              data.data.map((product: any) => (
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
                      className="px-4 py-2 bg-green-200"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="px-4 py-2 bg-red-200">Delete</button>
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
    </div>
  );
};

export default ManageProduct;
