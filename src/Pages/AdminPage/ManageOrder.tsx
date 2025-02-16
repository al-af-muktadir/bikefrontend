/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useGetOrderQuery, useUpdateOrderMutation } from "../../api/OrderApi";
import { useEffect } from "react";

const ManageOrder = () => {
  const { data, isLoading, refetch } = useGetOrderQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [updateOrder, { isSuccess }] = useUpdateOrderMutation();

  const handleStatusChange = async (id: string, e: any) => {
    const status = {
      status: e.target.value,
    };
    //({ id, status: status });
    const res = await updateOrder({ id, status });
    if (isSuccess && res.data.success === true) {
      toast.success("Status Changed Succesfully");
      refetch();
    }
  };

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100 border-b  ">
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">User ID</th>
            <th className="py-2 px-4 border">Total Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Transaction Method</th>
            <th className="py-2 px-4 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          <>
            {isLoading ? (
              <span className="loading loading-spinner text-warning"></span>
            ) : (
              <>
                {data?.data?.length ? (
                  data.data.map((order: any) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        {order.transaction.id}
                      </td>
                      <td className="px-4 py-2 border">{order.User}</td>
                      <td className="px-4 py-2 border">{order.totalPrice}</td>
                      <td>
                        <form>
                          <select
                            className={
                              order.status === "Pending"
                                ? "bg-orange-500 text-white w-full p-2 border rounded-lg"
                                : "bg-green-500 text-white w-full p-2 border rounded-lg"
                            }
                            defaultValue={order.status}
                            onChange={(e) => handleStatusChange(order._id, e)}
                            value={order.status}
                            disabled={order.status === "Delivered"}
                          >
                            <option
                              value="Pending"
                              className="bg-orange-500 text-white"
                            >
                              Pending
                            </option>
                            <option
                              value="Delivered"
                              className="bg-green-500 text-white"
                            >
                              Delivered{" "}
                            </option>
                          </select>
                        </form>
                      </td>

                      <td className="px-4 py-2 border">
                        {order.transaction.method}
                      </td>
                      <td className="px-4 py-2 border">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div>"No Order Yet!"</div>
                )}
              </>
            )}
          </>
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default ManageOrder;
