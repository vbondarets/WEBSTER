import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const userSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAuth: false, id: null, confirmed: null, role: null },
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload)
            const { jwt_token } = action.payload.data;
            const { id, confirmed, role } = jwt_decode(jwt_token);
            state.token = jwt_token;
            state.isAuth = true;
            state.id = id;
            state.confirmed = confirmed;
            console.log("data refreshed")
            state.role = role;
        },
        logOut: (state, action) => {
            state.token = null;
            state.isAuth = false;
            state.id = null;
            state.confirmed = null;
            state.role = null;
        }
    }
})
export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;