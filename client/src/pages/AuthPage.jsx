import React, { useState } from "react";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
    let [page, setPage] = useState(false);
    return (
        <div className="flex flex-col h-full justify-center items-center gap-5 m-5 text-mainFontColor">
            <h6 className="flex gap-8 text-amber-200 font-bold text-xl select-none">
                <span>Log In</span>
                <span>Sign Up</span>
            </h6>

            <input
                type="checkbox"
                id="check"
                name="check"
                className="sr-only checkbox-auth"
                onChange={() => {
                    setPage(!page);
                }}
            />
            <label
                htmlFor="check"
                className="bg-amber-200 w-14 h-4 relative rounded-full mb-3 cursor-pointer"
            >
                <div className="flex items-center justify-center w-8 h-8 bg-black absolute rounded-full -left-2 -top-2 transition-all ease-linear duration-[350ms] text-orange-300">
                    <NorthWestIcon />
                </div>
            </label>
            <div className="card-3d-wrap mt-4 w-[440px] h-[400px] block">
                <div className="card-3d-wrapper w-full h-full preserve-3d bg-authF bg-[#2c2c2c] ">
                    <AuthForm />
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
