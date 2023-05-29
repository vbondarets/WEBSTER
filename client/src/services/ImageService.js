import { baseAPI } from "./BaseAPIService";

export const imagesAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getImages: build.query({
            query: () => ({
                url: "/images",
                method: "GET",
            }),
            providesTags: ["Image"],
        }),
        saveImage: build.mutation({
            query: (data) => ({
                url: "/images",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Image"],
        }),
    }),
});
