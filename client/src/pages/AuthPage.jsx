import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
    let [page, setPage] = useState(false);
    return (
        <div className="flex flex-col items-center p-5 gap-4">
            <div className="flex gap-3 text-amber-200 select-none">
                <span>Log In</span>
                <span>Sign Up</span>
            </div>
            <label
                htmlFor="check"
                className="bg-amber-200 w-16 h-4 relative rounded-full mb-3 cursor-pointer"
            >
                <input
                    type="checkbox"
                    id="check"
                    className="sr-only peer"
                    onChange={() => {
                        setPage(!page);
                    }}
                />
                <div className="flex items-center justify-center w-8 h-8 bg-black absolute rounded-full -left-2 -top-2 ease-linear duration-150 text-orange-300 peer-checked:left-9">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4/6 h-4/6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={
                                page
                                    ? "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                                    : "M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
                            }
                        />
                    </svg>
                </div>
            </label>
            {page ? <RegisterForm /> : <AuthForm />}
        </div>
    );
};

export default AuthPage;
