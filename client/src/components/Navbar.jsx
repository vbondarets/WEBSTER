import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { userAPI } from "../services/UserService";
import { useDispatch } from "react-redux";
import { logOut } from "../store/reducers/UserSlice";

const Navbar = () => {
    const {isAuth} = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();
    const [logout] = userAPI.useLogoutMutation();

    return (
        <nav className ="bg-main w-full z-40 top-0 left-0 border-b-2 border-slate-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <Link
                    to={"/"}
                    className="hover:text-amber-200 transition-all self-center text-2xl font-semibold whitespace-nowrap"
                >
                    WEBSTER
                </Link>
                <div className='items-center justify-between hidden w-full md:flex md:w-auto text-mainFontColor'>
                    <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-12 md:mt-0 md:border-0'>
                        <li>
                            <Link  to={"#"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-amber-200 md:p-0">Home</Link>
                        </li>
                        <li>
                            <Link  to={"/about"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-amber-200 md:p-0">About</Link>
                        </li>
                        <li>
                            <Link  to={"#"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-amber-200 md:p-0">Support</Link>
                        </li>
                    </ul>
                </div>
                {isAuth ? (
                    <div className="flex justify-between mr-2 text-amber-200 items-center">
                    <span className="flex justify-between items-center mr-2 bg-indigo-500 py-2 pl-3 pr-4 rounded-md hover:text-amber-200">
                        Profile 
                        <PersonIcon className=" text-2xl" />    
                    </span>
                    <button 
                        onClick={() => {
                            dispatch(logOut());
                            logout();
                        }} 
                        className="bg-mainFontColor mr-5 py-2 pl-3 pr-4 rounded-md hover:text-amber-200 hover:bg"
                    >
                        Logout
                    </button>
                </div>
                ) : (
                    <div className="flex justify-between mr-2 text-yellow-400">
                        <Link  to={"/auth"} className="bg-indigo-500/80 hover:bg-indigo-500 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-amber-300">Authentication</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;