import { baseApi } from "./BaseApi";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (PassData) => ({
        url: `/auth/${PassData?.email}`,
        method: "PATCH",
        body: PassData,
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/auth/${email}`,
        method: "GET",
      }),
    }),
    logOut: builder.mutation({
      query: (info) => ({
        url: `/auth/logout`,
        method: "POST",
        body: info,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogOutMutation,
} = AuthApi;
