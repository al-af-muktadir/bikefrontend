/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";
import { logout, setUser } from "../Slice/AuthStore";
import { verifyToken } from "../util/VerifyToken";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://bike-store-backend-ovyb.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const BaseQueryRefresh = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  //("baseAPi", result);
  if (result?.error?.status === 401) {
    const res = await fetch(
      "https://bike-store-backend-ovyb.vercel.app/api/auth/refreshToken",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    //("refershres", data);

    if (data?.data?.accesstoken) {
      // const user = (api.getState() as RootState).auth.user;
      const user = verifyToken(data?.data?.accesstoken);
      //("setting user", user);
      api.dispatch(
        setUser({
          user,
          token: data.data.accesstoken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
    // const user = (api.getState() as RootState).auth.user;
    // api.dispatch(setUser({ user, token: data.accesstoken  }));
  }
  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: BaseQueryRefresh,
  tagTypes: ["user", "product", "order"],
  endpoints: () => ({}),
});
