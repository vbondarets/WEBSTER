import React from "react";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const AuthForm = () => {
    const handler = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <form
            className="card-front w-full h-full absolute rounded-md preserve-3d text-amber-200"
            method="POST"
            onSubmit={handler}
        >
            <div className="center-wrap block absolute top-1/2 left-0 w-full px-9">
                <div className="text-center block relative">
                    <h4 className="font-bold select-none text-3xl w-fit mx-auto mb-2 pb-4 p-1 rounded">
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
                    <button className="inline-flex items-center mt-4 rounded-md bg-amber-200 h-11 px-8 text-sm font-bold uppercase transition-all ease-linear duration-200 tracking-wider select-none text-black hover:bg-black hover:text-amber-200">
                        Login
                    </button>
                    <p className="mt-4 text-center">
                        <Link to={"#"} className="hover:text-amber-400 transition-all ease-linear">
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default AuthForm;
