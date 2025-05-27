/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productApi";

const Product = () => {
  const { data, isLoading } = useGetProductsQuery({});
  console.log(data, "this is product");
  const bikes = !isLoading
    ? data?.data?.data
      ? data?.data?.data?.slice(0, 6)
      : []
    : [];

  const skeletonArray = Array(6).fill(0);

  return (
    <div className="text-center mt-14 px-4 lg:px-10">
      <h1 className="text-4xl font-bold text-[#58652D]">
        Our Bikes Collection
      </h1>
      <p className="my-6 text-lg text-gray-600 mb-12">
        Discover the latest models and innovations in bike design.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
        {isLoading
          ? skeletonArray?.map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-2xl overflow-hidden w-full max-w-sm border border-gray-200 shadow"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))
          : bikes?.map((bike: any) => (
              <div
                key={bike._id}
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden w-full max-w-sm border border-gray-200 hover:border-[#58652D]"
              >
                <figure className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="p-5 text-left space-y-2">
                  <h2 className="text-xl font-semibold text-[#58652D]">
                    {bike.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    <span className="text-green-700 font-medium">Brand:</span>{" "}
                    {bike.brand}
                  </p>
                  <p className="text-gray-600 text-sm">{bike.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-[#58652D]">
                      {bike.price} Tk
                    </span>
                    <Link to={`/products`}>
                      <button className="px-4 py-2 bg-[#bcbb9d] hover:bg-[#58652D] hover:text-white text-black rounded-full font-semibold text-sm transition-all">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <Link to="/products">
        <button
          className="btn 
         mt-10 px-6 py-2 rounded-3xl border border-black hover:bg-[#58652D] hover:text-white transition-all"
        >
          View All Bikes
        </button>
      </Link>
    </div>
  );
};

export default Product;
