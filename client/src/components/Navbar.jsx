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
        <div>
            <nav class ="dark:bg-indigo-900 w-full z-20 top-0 left-0 border-b border-yellow-400 dark:border-yellow-400">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to={"/"}
                        className="hover:text-amber-200 transition-all self-center text-2xl font-semibold whitespace-nowrap"
                    >
                        WEBSTER
                    </Link>
                    <div className='items-center justify-between hidden w-full md:flex md:w-auto text-orange-400'>
                        <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-12 md:mt-0 md:border-0'>
                            <li>
                                <Link  to={"#"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Home</Link>
                            </li>
                            <li>
                                <Link  to={"#"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">About</Link>
                            </li>
                            <li>
                                <Link  to={"#"} className="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Support</Link>
                            </li>
                        </ul>
                    </div>
                    {isAuth ? (
                        <div className="flex justify-between mr-2 text-yellow-400 items-center">
                        <span className="flex justify-between items-center mr-2 bg-indigo-500 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400">
                            Profile 
                            <PersonIcon className=" text-2xl" />    
                        </span>
                        <button 
                            onClick={() => {
                                dispatch(logOut());
                                logout();
                            }} 
                            className="bg-indigo-500 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400"
                        >
                            Logout
                        </button>
                    </div>
                    ) : (
                        <div className="flex justify-between mr-2 text-yellow-400">
                            <Link  to={"/auth"} className="bg-indigo-500 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400">Authentication</Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;