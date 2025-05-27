/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllUserQuery, useUpdateStatusMutation } from "../../api/UserApi";

import { toast, Toaster } from "sonner";

const ManageUser = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);
  const [updateStatus] = useUpdateStatusMutation();
  let customers;
  if (isLoading) {
    //("data is loading");
  } else {
    //(data.data);
    customers = data.data.filter((item: any) => item.role === "customer");
    //("f one", customers);
  }

  const handleStatusChange = async (id: string, e: any) => {
    const status = e.target.value;
    let isBlocked;
    if (status === "Block") {
      isBlocked = true;
    } else {
      isBlocked = false;
    }
    const statusData = {
      isBlocked,
    };
    //("hitting", status, id);
    const res = await updateStatus({ id, status: statusData });
    if (res.data.success === true) {
      toast.success("Status Updated Succesfully");
    } else {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="overflow-x-auto  w-full  mt-8">
        <table className="min-w-full  bg-white border border-gray-200 shadow-md ">
          <thead className="bg-gray-100 border-b  ">
            <tr>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">User Status</th>
            </tr>
          </thead>
          <tbody>
            <>
              {isLoading ? (
                <div>Data is Loading</div>
              ) : (
                <>
                  {customers.length ? (
                    customers?.map((user: any) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 border">{user.name}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">
                          <form>
                            <select
                              className={
                                user.isBlocked
                                  ? "bg-red-500 text-white w-full p-2 border rounded-lg"
                                  : "bg-green-500 text-white w-full p-2 border rounded-lg"
                              }
                              defaultValue={
                                user.isBlocked === true ? "Block" : "Active"
                              }
                              onChange={(e) => handleStatusChange(user._id, e)}
                            >
                              <option
                                value="Active"
                                className="bg-green-500 text-white"
                              >
                                Active
                              </option>
                              <option
                                value="Block"
                                className="bg-red-500 text-white"
                              >
                                Block
                              </option>
                            </select>
                          </form>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>"User loading"</div>
                  )}
                </>
              )}
            </>
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default ManageUser;
