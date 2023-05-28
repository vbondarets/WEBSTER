import React from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import { userAPI } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/reducers/UserSlice";
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.userReducer);
    const [register, { error }] = userAPI.useRegisterMutation();
    if (isAuth) {
        return <Navigate to={"/"} />;
    }

    const handler = async (e) => {
        e.preventDefault();
        const res = await register(new FormData(e.target));
        if (!res.error) dispatch(setCredentials(res));
        console.log(res);
    };

    return (
        <form
            className="card-back w-full h-full absolute rounded-md preserve-3d rotate-y-180 text-mainFontColor"
            method="POST"
            onSubmit={handler}
        >
            <div className="center-wrap block absolute top-1/2 left-0 w-full px-9">
                <div className="text-center block relative">
                    <h4 className="font-bold font-boldselect-none text-3xl w-fit mx-auto pb-4 mb-2 p-1 rounded">
                        Sign Up
                    </h4>
                    <div className="block relative">
                        <input
                            type="text"
                            name="login"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Login"
                        />
                        <PersonIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    <div className="block relative mt-2">
                        <input
                            type="text"
                            name="full_name"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Full Name"
                        />
                        <CreateIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    <div className="block relative mt-2">
                        <input
                            type="email"
                            name="email"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Email"
                        />
                        <AlternateEmailIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    <div className="block relative mt-2">
                        <input
                            type="password"
                            name="password"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Password"
                        />
                        <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    <div className="block relative mt-2">
                        <input
                            type="password"
                            name="password_conf"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Password confirmed"
                        />
                        <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    {error && (
                        <p className="text-red-500 mt-3 text-sm font-semibold italic">
                            {error.data?.message}
                        </p>
                    )}
                    <button className="inline-flex items-center mt-4 rounded-md bg-mainFontColor text-white h-11 px-8 text-sm font-bold uppercase transition-all ease-linear duration-200 tracking-wider select-none text-black hover:bg-white hover:text-mainFontColor">
                        Register
                    </button>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
