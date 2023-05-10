import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
    const navigate = useNavigate()
    const {isAuth} = useSelector((state) => state.userReducer)

    if (isAuth === false) {
        return (
            <div>
                <nav class ="dark:bg-indigo-900 w-full z-20 top-0 left-0 border-b border-yellow-400 dark:border-yellow-400">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap">WEBSTER</span>
                        <div class='items-center justify-between hidden w-full md:flex md:w-auto text-orange-400'>
                            <ul class='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-12 md:mt-0 md:border-0'>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Home</a>
                                </li>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">About</a>
                                </li>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Support</a>
                                </li>
                            </ul>
                        </div>
                        <div class="flex justify-between mr-2 text-yellow-400">
                            <button onClick={() => {navigate('/auth')}} class="bg-indigo-500 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400">Authentication</button>
                        </div>
                    </div>
                </nav>
            </div>
        )        
    }
    else {
        return (
            <div>
                <nav class ="dark:bg-indigo-900 w-full z-20 top-0 left-0 border-b border-yellow-400 dark:border-yellow-400">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap">WEBSTER</span>
                        <div class='items-center justify-between hidden w-full md:flex md:w-auto text-orange-400'>
                            <ul class='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-12 md:mt-0 md:border-0'>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Home</a>
                                </li>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Project</a>
                                </li>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">About</a>
                                </li>
                                <li>
                                    <a href = '#' class="block py-2 pl-3 pr-4 cursor-pointer rounded hover:text-yellow-500 md:p-0">Support</a>
                                </li>
                            </ul>
                        </div>
                        <div class="flex justify-between mr-2 text-yellow-400 items-center">
                            <span class="flex justify-between items-center mr-2 bg-indigo-500 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400">
                                Profile 
                                <PersonIcon className=" text-2xl" />    
                            </span>
                            <button onClick={() => {navigate('/test')}} class="bg-indigo-500 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-yellow-300 md:hover:bg-indigo-400">Logout</button>
                        </div>
                    </div>
                </nav>
            </div>
        ) 
    }
    
}

export default Navbar;