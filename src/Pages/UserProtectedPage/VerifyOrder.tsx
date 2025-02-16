import { useVerifyOrderQuery } from "../../api/OrderApi";

import { useSearchParams } from "react-router-dom";
import { clearCart } from "../../Slice/cartSlice";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { Helmet } from "react-helmet-async";

const VerifyOrder = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  //(searchParams);

  const { data, isLoading } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) {
    <span className="loading loading-spinner text-warning"></span>;
  } else if (!isLoading && data?.data[0]?.bank_status === "Success") {
    toast.success("Ordered Succesfully");
    dispatch(clearCart());
  } else {
    toast.error("Payment Unsuccessful Please try Again");
  }
  return (
    <div>
      <Helmet>
        <title>Verify Order</title>
      </Helmet>
      {isLoading ? (
        <h1></h1>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Order Verification</h1>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-2xl shadow p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Order ID:</div>
                <div>{data.data[0].order_id}</div>
                <div className="font-semibold">Amount:</div>
                <div>{data.data[0].amount}Bdt</div>
                <div className="font-semibold">Status:</div>

                <div>
                  {data.data[0].sp_message === "Success" ? (
                    <span className="text-green-500">Success</span>
                  ) : (
                    <span className="text-red-500">
                      {data.data[0].sp_message}
                    </span>
                  )}
                </div>
                <div className="font-semibold">Date:</div>
                <div>{data.data[0].date_time} </div>
              </div>
            </div>

            <div className="border rounded-2xl shadow p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Method:</div>
                <div>{data.data[0].method}</div>
                <div className="font-semibold">Transaction ID:</div>
                <div>{data.data[0].customer_order_id}</div>
                <div className="font-semibold">Invoice No:</div>
                <div>{data.data[0].invoice_no}</div>
                <div className="font-semibold">SP Code:</div>
                <div>{data.data[0].sp_code}</div>
                <div className="font-semibold">SP Message:</div>
                <div>{data.data[0].sp_message}</div>
              </div>
            </div>

            <div className="border rounded-2xl shadow p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Name:</div>
                <div>{data.data[0].name}</div>
                <div className="font-semibold">Email:</div>
                <div>{data.data[0].email}</div>
                <div className="font-semibold">Phone:</div>
                <div>{data.data[0].phone_no}</div>
                <div className="font-semibold">Address:</div>
                <div>{data.data[0].address}</div>
                <div className="font-semibold">City:</div>
                <div>{data.data[0].city}</div>
              </div>
            </div>

            <div className="border rounded-2xl shadow p-4 bg-white">
              <h2 className="text-xl font-semibold mb-4">
                Verification Status
              </h2>
              <div className="flex items-center gap-2">
                <i className="lucide lucide-check-circle text-green-500"></i>
                <span>Verified</span>
              </div>
              <div className="mt-4">
                {/* <a href="/order">
                  <Link to=><button  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-2xl">
                    View Orders
                  </button></Link>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default VerifyOrder;
