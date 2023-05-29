import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { userAPI } from "../services/UserService";
import { useDispatch } from "react-redux";
import { logOut } from "../store/reducers/UserSlice";

const Navbar = () => {
    const { isAuth } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();
    const [logout] = userAPI.useLogoutMutation();
    const { data } = userAPI.useGetOneUserQuery();
    console.log(data);
    return (
        <nav className="bg-main w-full z-40 top-0 left-0 border-b-2 border-slate-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 select-none">
                <Link
                    to={"/"}
                    className=" ease-in-out duration-150 hover:text-amber-200 transition-all self-center text-2xl font-semibold whitespace-nowrap"
                >
                    WEBSTER
                </Link>
                <div className='items-center justify-between hidden w-full md:flex md:w-auto text-mainFontColor'>
                    <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-12 md:mt-0 md:border-0'>
                        <li>
                            <Link to={"/studio"} className="block py-2 pl-3 pr-4 ease-in-out duration-150 cursor-pointer rounded hover:text-amber-200 md:p-0">Studio</Link>
                        </li>
                        <li>
                            <Link target="_blank" to={"https://t.me/WEBSTER_assistant_bot"} className="block ease-in-out duration-150 py-2 pl-3 pr-4 cursor-pointer rounded hover:text-amber-200 md:p-0">TG Bot</Link>
                        </li>
                        <li>
                            <Link to={"/about"} className="block py-2 pl-3 pr-4 cursor-pointer ease-in-out duration-150 rounded hover:text-amber-200 md:p-0">About</Link>
                        </li>
                        <li>
                            <Link to={"/support"} className="block py-2 pl-3 pr-4 cursor-pointer ease-in-out duration-150 rounded hover:text-amber-200 md:p-0">Support</Link>
                        </li>
                    </ul>
                </div>
                {isAuth ? (
                    <div className="flex justify-between mr-2 text-amber-200 items-center">
                        <Link to="/profile" className="flex justify-between ease-in-out duration-300 items-center mr-2 bg-indigo-500 py-2 pl-3 pr-4 rounded-md shadow-none hover:text-amber-200 hover:shadow-lg hover:shadow-indigo-500/50">
                            {data ? (data.login && data.login) : <span>Profile</span>}
                            <PersonIcon className=" text-2xl" />
                        </Link>
                        <button
                            onClick={() => {
                                dispatch(logOut());
                                logout();
                            }}
                            className="bg-mainFontColor mr-5 py-2 pl-3 pr-4 rounded-md ease-in-out duration-300 shadow-none hover:text-amber-200 hover:bg hover:shadow-lg hover:shadow-mainFontColor/50"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between mr-2 text-yellow-400">
                        <Link to={"/auth"} className="bg-indigo-500/80 ease-in-out duration-300 shadow-none hover:bg-indigo-500 mr-5 hover:shadow-lg hover:shadow-indigo-500 py-2 pl-3 pr-4 rounded-md hover:text-amber-300">Authentication</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;