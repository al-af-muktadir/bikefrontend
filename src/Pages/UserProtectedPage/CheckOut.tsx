import { useEffect } from "react";
import { updateQuantity, clearCart } from "../../Slice/cartSlice";
import { useCreateOrderMutation } from "../../api/OrderApi";
import { useAppDispatch, useAppSelector } from "../../redux/storeHooks";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {
  const [createOrder, { data, isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handlePayment = async () => {
    //("Cart Details:", { products: cart.items });

    await createOrder({ products: cart.items });

    //(res);
    if (isSuccess) {
      //("orderss");
      dispatch(clearCart());
    }
  };
  const toastId = "cart";
  useEffect(() => {
    if (isLoading) {
      toast.loading("...Loading", { id: toastId });
    } else if (isSuccess) {
      if (data.data) {
        window.location.href = data.data;
      }
      toast.success("...Success", { id: toastId });
    } else if (isError) {
      toast.error(`${JSON.stringify(error)}`, { id: toastId });
    }
  }, [error, isError, isSuccess, isLoading]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>ChekOut</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout Page</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.items?.map((item) => (
            <div
              key={item.product}
              className="border shadow-lg p-4 rounded-2xl bg-white hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="mb-2">
                Price: <strong>${item.price}</strong>
              </p>
              <p className="mb-2">
                Stock Available: <strong>{item.stock}</strong>
              </p>
              <div className="flex items-center justify-between mb-3">
                <label className="mr-2">Quantity:</label>
                <div>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.product,
                          quantity: Math.max(item.quantity - 1, 1),
                        })
                      )
                    }
                    className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.product,
                          quantity: Math.min(item.quantity + 1, item.stock),
                        })
                      )
                    }
                    className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <p>
                Total for this item:{" "}
                <strong>${item.price * item.quantity}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {cart.items.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-2xl font-bold">
            Grand Total: ${cart.totalPrice}
          </h2>
          <button
            onClick={() => dispatch(clearCart())}
            className="btn mr-8 rounded-3xl bg-red-500"
          >
            Clear Cart
          </button>
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl mt-4"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
