import { baseApi } from "../../apiBaseQuery";


export const yocoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingData: builder.query({
      query: (id) => ({
        url: `/admin/dashboard/payout/${id}`,
        method: "GET",
      }),
      providesTags: ["walletbalance"],
    }),

    walletPayouts: builder.query({
      query: ({ page = 1, searchTerm = '' }) => ({
        url: `/admin/dashboard/payouts?page=${page}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
    }),


    updatePayout: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/dashboard/payouts-request-status-update/${id}`,
        method: "PATCH",
        body: data, //{"status": "pending"
      }),
      invalidatesTags: ["walletbalance"],
    }),
  }),
});

export const {useGetSingDataQuery, useWalletPayoutsQuery, useUpdatePayoutMutation } = yocoApi;
