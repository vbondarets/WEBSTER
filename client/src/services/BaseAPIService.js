import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const baseAPI = createApi({
    reducerPath: "baseAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Image"],
    endpoints: () => ({}),
});
