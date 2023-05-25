import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../services/BaseAPIService";
import userReducer from "./reducers/UserSlice";
import toolReducer from "./reducers/ToolSlice";

const rootReducer = combineReducers({
    userReducer,
    toolReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false}).concat(baseAPI.middleware),
    });
};
