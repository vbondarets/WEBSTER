import { baseAPI } from "./BaseAPIService";

export const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        init: build.query({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        login: build.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        logout: build.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),
        register: build.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        sendRequest: build.mutation({
            query: () => ({
                url: "/auth/validation",
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        confirmEmail: build.query({
            query: (data) => ({
                url: `/auth/validation/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getOneUser: build.query({
            query: (data) => ({
                url: `/user/${data}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getUsers: build.query({
            query: () => ({
                url: `/user`,
                method: "GET",
            }),
            // providesTags: ['User']
        }),
        updateUser: build.mutation({
            query: (data) => ({
                url: `/user/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});
