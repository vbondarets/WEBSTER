import React from "react";

const Navbar = () => {
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
                    <div class="flex justify-between mr-2 text-yellow-500">
                        <button class="bg-green-800 mr-5 py-2 pl-3 pr-4 rounded-md hover:text-yellow-600 md:hover:bg-green-600">Sing in</button>
                        <button class="bg-green-800 py-2 pl-3 pr-4 rounded-md hover:text-yellow-600 md:hover:bg-green-600">Sign up</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;