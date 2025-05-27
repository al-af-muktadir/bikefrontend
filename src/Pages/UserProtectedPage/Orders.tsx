/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetUserProductQuery } from "../../api/OrderApi";
import { useCurrentUser } from "../../Slice/AuthStore";
import { useAppSelector } from "../../redux/storeHooks";

const Orders = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading } = useGetUserProductQuery(user?.email, {
    pollingInterval: 1000,
  });

  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 5;

  // Extract unique statuses and transaction methods for dropdown options
  const allStatuses = Array.from(
    new Set(data?.data?.map((order: any) => order.status) || [])
  );
  const allMethods = Array.from(
    new Set(data?.data?.map((order: any) => order.transaction.method) || [])
  );

  // Filter orders by status and method
  const filteredOrders =
    data?.data?.filter((order: any) => {
      const statusMatch = statusFilter ? order.status === statusFilter : true;
      const methodMatch = methodFilter
        ? order.transaction.method === methodFilter
        : true;
      return statusMatch && methodMatch;
    }) || [];

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="overflow-x-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">My Orders</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded-md"
        >
          <option value="">All Statuses</option>
          {allStatuses?.map((status) => (
            <option key={String(status)} value={String(status)}>
              {String(status)}
            </option>
          ))}
        </select>

        <select
          value={methodFilter}
          onChange={(e) => {
            setMethodFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded-md"
        >
          <option value="">All Methods</option>
          {allMethods?.map((method) => (
            <option key={String(method)} value={String(method)}>
              {String(method)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100 border-b">
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
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Loading orders...
              </td>
            </tr>
          ) : currentOrders.length ? (
            currentOrders?.map((order: any) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border">{order.transaction.id}</td>
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
                <td className="px-4 py-2 border">{order.transaction.method}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No Orders Yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
