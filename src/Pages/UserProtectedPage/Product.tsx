/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productApi";

const Product = () => {
  const { data, isLoading } = useGetProductsQuery({});
  let bikes;
  if (isLoading) {
    {
      <p>
        <span className="loading loading-spinner text-warning"></span>
      </p>;
    }
  } else {
    bikes = data?.data?.slice(0, 6);
  }

  return (
    <div className="  text-center  mt-14 mx-auto">
      <h1 className="text-4xl font-bold text-gray-900">Our Bikes Collection</h1>
      <p className="my-6 text-lg text-gray-600 mb-12">
        Discover the latest models and innovations in bike design.
      </p>
      {isLoading ? (
        <span className="loading loading-spinner text-warning"></span>
      ) : (
        <Link to="/products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:translate-x-12 lg:w-[1400px] gap-y-8">
            {bikes?.map((bike: any) => (
              <div className="card bg-base-100 w-full lg:w-80 shadow-sm">
                <figure>
                  <img src={bike.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <span className="text-amber-700">Bike</span>
                    {bike.name}
                  </h2>
                  <h2 className="card-title">
                    <span className="text-green-700">Brand</span>-{bike.brand}
                  </h2>
                  <p>--{bike.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">{bike.price}Tk</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Link>
      )}
      <Link to="/products">
        <button className="btn bg-amber-200 mt-6 rounded-3xl border-2 border-black">
          View All Bike
        </button>
      </Link>
    </div>
  );
};

export default Product;
