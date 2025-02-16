/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./BaseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, brand, inStock, minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (brand) params.append("brand", brand);
        if (inStock) params.append("inStock", inStock);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        return { url: `/products?${params.toString()}`, method: "GET" };
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/products`,
        method: "POST",
        body: productData,
      }),
    }),
    getSepeceficProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetSepeceficProductQuery,
} = productApi;
