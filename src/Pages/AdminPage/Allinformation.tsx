import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#58652D", "#ECE3D2"];

const InformationPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      console.log("Fetched Users:", data);
      setTotalUsers(data.data.length || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all subscribers
  const fetchSubscribers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/news");
      const data = await res.json();
      setTotalSubscribers(data.data.length || 0);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchSubscribers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const data = [
    { name: "Total Users", value: totalUsers },
    { name: "Total Subscribers", value: totalSubscribers },
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-[#58652D] mb-6">Platform Stats</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Stats */}
          <div className="flex flex-col gap-4 text-lg text-gray-700">
            <p>
              👤 <strong>Total Users:</strong> {totalUsers}
            </p>
            <p>
              📬 <strong>Total Subscribers:</strong> {totalSubscribers}
            </p>
          </div>

          {/* Pie Chart */}
          <div className="w-full lg:w-1/2 h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationPage;
