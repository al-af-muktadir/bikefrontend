/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../api/productApi";

const MegaNavbar = () => {
  const { data, isLoading } = useGetProductsQuery({ search: "" });
  const bikeNames = data?.data?.map((bike: any) => bike.name) || [];

  return (
    <nav className="bg-[#ECE3D2] px-4 py-3 shadow-md ml-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
        {!isLoading &&
          bikeNames?.map((name: string, idx: number) => (
            <Link
              key={idx}
              to={`/product/${encodeURIComponent(name)}`}
              className="text-[#58652D] hover:text-[#754130] text-sm"
            >
              {name}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default MegaNavbar;
