import { baseApi } from "./BaseApi";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUserQuery, useUpdateStatusMutation } = UserApi;
