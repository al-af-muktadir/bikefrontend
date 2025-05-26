import { useEffect, useState } from "react";

interface Subscriber {
  name: string;
  email: string;
}

const NewsletterTable = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all subscribers
  const fetchSubscribers = async () => {
    try {
      const res = await fetch(
        "https://bike-store-backend-ovyb.vercel.app/api/news"
      );
      const data = await res.json();
      //   setSubscribers(data);
      setSubscribers(data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber by email
  const handleDelete = async (email: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://bike-store-backend-ovyb.vercel.app/api/news/${email}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setSubscribers(subscribers.filter((sub) => sub.email !== email));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#58652D]">
        Newsletter Subscribers
      </h2>

      {loading ? (
        <div>Loading...</div>
      ) : subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-[#ECE3D2] text-[#58652D]">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr
                key={sub.email}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{sub.name}</td>
                <td className="py-3 px-6">{sub.email}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDelete(sub.email)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterTable;
