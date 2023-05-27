import React from "react";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { userAPI } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/reducers/UserSlice";
import { Navigate } from "react-router-dom";
import TelegramLoginButton from 'react-telegram-login';


const AuthForm = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.userReducer);
    const [login, { error }] = userAPI.useLoginMutation();
    const [telegram_login, { telegram_error }] = userAPI.useLoginByTelegramMutation();
    
    if (isAuth) {
        return <Navigate to={"/"} />;
    }
    
    const handler = async (e) => {
        e.preventDefault();
        const res = await login(new FormData(e.target));
        if (!res.error) dispatch(setCredentials(res));
        console.log(res);
    };
    
    const onTelegramAuth = async (user) => {
        console.log(user);
        const res = await telegram_login(user);
        if (!res.error) dispatch(setCredentials(res));
        console.log(res);
    }

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
                    <div className="block relative mt-4">
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
                            type="password"
                            name="password"
                            className="w-full h-12 px-5 py-3 pl-14 outline-none bg-main border-none transition-all ease-linear duration-200 font-medium rounded-md focus:shadow-stroke text-sm tracking-wide placeholder:select-none"
                            placeholder="Password"
                        />
                        <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 transition-all ease-linear duration-200 text-2xl" />
                    </div>
                    {(error || telegram_error) && (
                        <p className="text-red-500 mt-3 text-sm font-semibold italic">
                            {error?.data?.message || telegram_error?.data?.message}
                        </p>
                    )}
                    <button className="inline-flex items-center mt-8 rounded-md bg-amber-200 h-11 px-8 text-sm font-bold uppercase transition-all ease-linear duration-200 tracking-wider select-none text-black hover:bg-black hover:text-amber-200">
                        Login
                    </button>
                    <TelegramLoginButton className="flex justify-center mt-5" dataOnauth={onTelegramAuth} botName="WEBSTER_assistant_bot" requestAccess="write" usePic={false} />
                    <p className="mt-5 text-center">
                        <Link
                            to={"#"}
                            className="hover:text-amber-400 transition-all ease-linear"
                        >
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default AuthForm;
