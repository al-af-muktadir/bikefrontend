import { Helmet } from "react-helmet-async";
import { useTotalRevenueQuery } from "../api/OrderApi";

const TotalRevenue = () => {
  const { data, isLoading } = useTotalRevenueQuery(undefined);
  //(data);
  return (
    <div>
      <Helmet>
        <title>Total Revenue</title>
      </Helmet>
      {isLoading ? (
        <span className="loading loading-spinner text-warning"></span>
      ) : (
        <>
          <div className="mb-4 p-4 bg-blue-500 text-white text-center rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-2xl font-bold">
              {data.data[0].totalRevenue} BDT
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default TotalRevenue;
