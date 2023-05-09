import React, { useState } from "react";
import { Link } from "react-router-dom";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";

const AuthPage = () => {
    let [page, setPage] = useState(false);
    return (
        <div className="flex flex-col h-full justify-center items-center gap-5 m-5 text-mainFontColor">
            <h6 className="flex gap-8 select-none">
                <span >Log In</span>
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
                <div className="card-3d-wrapper w-full h-full preserve-3d bg-authForm bg-[#2b2e38] ">
                    <div className="card-front w-full h-full absolute rounded-md preserve-3d">
                        <div className="center-wrap block absolute top-1/2 left-0 w-full px-9">
                            <div className="text-center block relative">
                                <h4 className="text-mainColor font-bold pb-4 select-none text-3xl bg-slate-100 w-fit mx-auto mb-2 pb-1 p-1 rounded">
                                    Log In
                                </h4>
                                <div className="block relative">
                                    <input
                                        type="email"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Email"
                                    />
                                    <AlternateEmailIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <div className="block relative mt-2">
                                    <input
                                        type="password"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Password"
                                    />
                                    <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <button className="inline-flex items-center mt-4 rounded-md bg-amber-200 h-11 px-8 text-sm font-semibold uppercase transition-all ease-linear duration-200 tracking-wider select-none text-black hover:bg-black hover:text-amber-200">
                                    Login
                                </button>
                                <p className="mt-4 text-center">
                                    <Link to={"#"} className="link">
                                        Forgot your password?
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card-back w-full h-full absolute rounded-md preserve-3d rotate-y-180">
                        <div className="center-wrap block absolute top-1/2 left-0 w-full px-9">
                            <div className="text-center block relative">
                                <h4 className="text-mainColor font-bold pb-4 select-none text-3xl bg-slate-100 w-fit mx-auto mb-2 pb-1 p-1 rounded">
                                    Sign Up
                                </h4>
                                <div className="block relative">
                                    <input
                                        type="text"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Full Name"
                                    />
                                    <PersonIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <div className="block relative mt-2">
                                    <input
                                        type="tel"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Phone Number"
                                    />
                                    <LocalPhoneIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <div className="block relative mt-2">
                                    <input
                                        type="email"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Email"
                                    />
                                    <AlternateEmailIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <div className="block relative mt-2">
                                    <input
                                        type="password"
                                        className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md shadow-md text-sm tracking-wide placeholder:select-none"
                                        placeholder="Password"
                                    />
                                    <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                                </div>
                                <button className="inline-flex items-center mt-4 rounded-md bg-amber-200 h-11 px-8 text-sm font-semibold uppercase transition-all ease-linear duration-200 tracking-wider select-none text-black hover:bg-black hover:text-amber-200">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
