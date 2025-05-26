/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useGetOrderQuery, useUpdateOrderMutation } from "../../api/OrderApi";

const ManageOrder = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const { data, isLoading, refetch } = useGetOrderQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [updateOrder, { isSuccess }] = useUpdateOrderMutation();

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess, refetch]);

  const handleStatusChange = async (id: string, e: any) => {
    const status = { status: e.target.value };
    const res = await updateOrder({ id, status });
    if (isSuccess && res.data.success === true) {
      toast.success("Status Changed Successfully");
      refetch();
    }
  };
  const filteredData =
    data?.data?.filter((order: any) => {
      const statusMatch = statusFilter ? order.status === statusFilter : true;

      const orderMethod = order.transaction?.method?.toLowerCase() || "";
      const methodMatch = methodFilter
        ? orderMethod === methodFilter.toLowerCase()
        : true;

      return statusMatch && methodMatch;
    }) || [];
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredData.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredData.length / ordersPerPage);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Manage Orders</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select
          onChange={(e) => setMethodFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Methods</option>
          <option value="bkash">Bkash</option>
          <option value="nagad">Nagad</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Total Price</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Method</th>
              <th className="py-2 px-4 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <span className="loading loading-spinner text-warning"></span>
                </td>
              </tr>
            ) : currentOrders.length ? (
              currentOrders.map((order: any) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.transaction.id}</td>
                  <td className="px-4 py-2 border">{order.User}</td>
                  <td className="px-4 py-2 border">{order.totalPrice}</td>
                  <td className="px-4 py-2 border">
                    <select
                      className={`w-full p-2 rounded-md text-white ${
                        order.status === "Pending"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                      defaultValue={order.status}
                      onChange={(e) => handleStatusChange(order._id, e)}
                      value={order.status}
                      disabled={order.status === "Delivered"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>
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
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No Orders Found.
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
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Toaster />
    </div>
  );
};

export default ManageOrder;
