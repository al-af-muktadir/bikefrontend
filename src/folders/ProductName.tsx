/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../api/productApi";

const ProductName = () => {
  const { name } = useParams();
  const { data, isLoading } = useGetProductsQuery({ search: name });

  const matchedProducts = data?.data?.filter(
    (bike: any) => bike.name?.toLowerCase() === name?.toLowerCase()
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#58652D] mb-10">
        {name}'s
      </h1>

      {isLoading ? (
        <div className="text-center mt-10">
          <span className="loading loading-spinner text-warning"></span>
        </div>
      ) : matchedProducts?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchedProducts.map((bike: any) => (
            <div
              key={bike._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-52 object-cover rounded-t-xl"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-[#58652D]">
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
      ) : (
        <p className="text-center text-gray-500">
          No bikes found with the name "{name}"
        </p>
      )}
    </div>
  );
};

export default ProductName;
