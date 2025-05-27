/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserProductQuery } from "../../api/OrderApi";
import { useAppSelector } from "../../redux/storeHooks";
import { useCurrentUser } from "../../Slice/AuthStore";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InformationOfUser = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading } = useGetUserProductQuery(user?.email);

  const orders = data?.data || [];

  // Calculate total cost
  const totalCost = orders.reduce(
    (acc: number, order: any) => acc + order.totalPrice,
    0
  );

  // Count pending and delivered
  const statusCount = orders.reduce(
    (acc: { Pending: number; Delivered: number }, order: any) => {
      if (order.status === "Pending") acc.Pending++;
      else acc.Delivered++;
      return acc;
    },
    { Pending: 0, Delivered: 0 }
  );

  const chartData = [
    { name: "Pending", value: statusCount.Pending },
    { name: "Delivered", value: statusCount.Delivered },
  ];

  const COLORS = ["#FFBB28", "#00C49F"];

  return (
    <div className="p-4 space-y-6">
      {isLoading ? (
        <div className="text-center">Loading data...</div>
      ) : (
        <>
          <div className="text-lg">
            <strong>Total Cost of All Orders:</strong> ৳
            {totalCost.toLocaleString()}
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default InformationOfUser;
