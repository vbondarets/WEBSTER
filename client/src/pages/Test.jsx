import React from "react";
import { userAPI } from "../services/UserService";
import { useDispatch } from "react-redux";
import { logOut } from "../store/reducers/UserSlice";

const Test = () => {
    const dispatch = useDispatch();
    const [logout] = userAPI.useLogoutMutation();
    return (
        <div
            onClick={() => {
                dispatch(logOut());
                logout();
            }}
            className="bg-gray-300 rounded-md px-3 py-2"
        >
            logout
        </div>
    );
};

export default Test;
