import { baseApi } from "./BaseApi";

export const OrderAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProduct: builder.query({
      query: (email) => ({
        url: `/orders/${email}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (args) => ({
        url: `/orders`,
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["product"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/verify`,
        method: "GET",
        params: { order_id },
      }),
    }),
    getOrder: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => {
        //("insideoderapi", status);
        return {
          url: `/orders/${id}`,
          method: "PATCH",
          body: status,
        };
      },
      invalidatesTags: ["order"],
    }),
    totalRevenue: builder.query({
      query: () => {
        return {
          url: `/orders/totalrevenue`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetUserProductQuery,
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useTotalRevenueQuery,
} = OrderAPi;
