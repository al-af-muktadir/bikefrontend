/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserProductQuery } from "../../api/OrderApi";

import { useCurrentUser } from "../../Slice/AuthStore";
import { useAppSelector } from "../../redux/storeHooks";

const Orders = () => {
  const user = useAppSelector(useCurrentUser);
  //(user?.email);

  const { data, isLoading } = useGetUserProductQuery(user?.email, {
    pollingInterval: 1000,
  });
  //   //(data.data[0].productDetails.name);
  //   //(data.data.length);

  if (!isLoading) {
    //("orderfrom user", data.data);
  }
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
              <div>Data is Loading</div>
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
                      <td
                        className={`px-4 py-2 border ${
                          order.status === "Pending"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {order.status}
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
    </div>
  );
};

export default Orders;
