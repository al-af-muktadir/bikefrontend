/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, Toaster } from "sonner";
import { useAppSelector } from "../../redux/storeHooks";
import { useCurrentUser } from "../../Slice/AuthStore";
import { useChangePasswordMutation } from "../../api/AuthApi";

const Settings = () => {
  const { email }: any = useAppSelector(useCurrentUser);

  const [changPass] = useChangePasswordMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    // //(form.get("OldPass"));
    const OldPass = form.get("OldPass");
    const password = form.get("password");
    const PassData = {
      email,
      OldPass,
      password,
    };
    //(PassData);
    try {
      e.currentTarget.reset();
      const result = await changPass(PassData).unwrap();
      //("beforetaost", result);

      if (result.success) {
        toast.success(`Password Changed Succesfully`);
        //("after toast");
      }
    } catch (error) {
      toast.error(`${error}`, { duration: 1000 });
    }
    //("hello");
  };
  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter Previous Password
          </label>
          <input
            type="text"
            name="OldPass"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Previous Pass"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password(PassWord should be atleast 3 charecter)"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Settings;
