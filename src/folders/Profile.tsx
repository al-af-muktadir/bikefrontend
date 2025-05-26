import React from "react";
import { useAppSelector } from "../redux/storeHooks";
import { useCurrentUser } from "../Slice/AuthStore";

type Props = {
  user: {
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
};

const Profile: React.FC<Props> = () => {
  const user = useAppSelector(useCurrentUser);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#58652D]">User Profile</h2>
          <p className="text-sm text-gray-500">Personal Information</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-800">{user?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-800">{user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="text-[#754130] capitalize font-medium">
              {user?.role}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Issued At:</span>
            <span className="text-gray-800">{user?.iat}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Expires At:</span>
            <span className="text-gray-800">{user?.exp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
