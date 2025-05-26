import { Link, useParams } from "react-router-dom";
import { useGetSepeceficProductQuery } from "../api/productApi";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slice/cartSlice";

import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //(user);

  const { data, isLoading } = useGetSepeceficProductQuery(id, {
    pollingInterval: 3000,
  });
  let bike;
  if (isLoading) {
    <span className="loading loading-spinner text-warning"></span>;
  } else {
    bike = data?.data[0];
    //(bike);
  }
  const handleAddToCart = async () => {
    await dispatch(
      addToCart({
        product: bike!._id,
        name: bike!.name,
        price: bike!.price,
        quantity: 1,
        stock: bike!.quantity,
        image: bike!.image,
      })
    );
    // //("dis", res);
    // setDisable(true);
    // //({
    //   product: bike!._id,
    //   name: bike!.name,
    //   price: bike!.price,
    //   quantity: 1,
    //   stock: bike!.quantity,
    //   image: bike!.image,
    // });
  };
  return (
    <div>
      <Helmet>
        <title>Details</title>
      </Helmet>
      {isLoading ? (
        <span className="loading loading-spinner text-warning"></span>
      ) : (
        <div className="flex max-w-[1440px] mx-auto justify-center mt-14 bg-white lg:h-[450px]  flex-col md:flex-row items-center gap-8 p-8  rounded-xl ">
          <div className="flex-shrink-0">
            <img
              src={bike?.image}
              alt="Product Image"
              className="rounded-xl h-[300px] object-cover shadow-md"
            />
          </div>

          <div className="max-w-lg text-gray-800">
            <h3 className="uppercase text-gray-500 text-sm mb-1">Bike</h3>
            <h1 className="text-3xl font-semibold mb-4">{bike?.name}</h1>
            <p className="text-xl font-bold text-gray-900 mb-2">
              {bike?.price}Tk
            </p>

            <p className="text-gray-600 mb-6">{bike?.description}</p>

            <div className="flex items-center mb-6">
              <label className="mr-3 text-gray-700">
                Stock:{bike?.inStock ? "Available" : "Out OF Stock"}
              </label>
            </div>

            <div className="flex space-x-4 ">
              {" "}
              {bike?.inStock ? (
                <>
                  <Link to="/checkout">
                    <button
                      onClick={() => handleAddToCart()}
                      className="px-6 py-2 flex items-center text-white bg-blue-600 hover:bg-blue-700 rounded shadow"
                    >
                      Buy Now <FaCartPlus />
                    </button>
                  </Link>
                </>
              ) : (
                <h1 className="stroke-red-400">Out OF Stock </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
