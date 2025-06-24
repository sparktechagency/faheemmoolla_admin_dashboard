import { baseApi } from "../../apiBaseQuery";


export const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "PUT",
        body: data,
      }),
    }),

    getAll: builder.query({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
    }),

  }),
});


export const {
  useChangePasswordMutation,
  useUpdateSettingsMutation,
  useGetAllQuery
} = offerApi;