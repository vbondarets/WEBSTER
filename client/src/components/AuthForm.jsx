import React from "react";

const AuthForm = () => {
    const handler = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <form
            className="flex flex-col gap-4 bg-auth shadow-md rounded px-8 pt-6 pb-8"
            method="POST"
            onSubmit={handler}
        >
            <span className="text-xl text-center text-amber-200 select-none">
                Log In
            </span>
            <input
                className="appearance-none bg-main rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none"
                name="login"
                type="text"
                placeholder="login"
                required
            />
            <input
                className="appearance-none bg-main border border-red-500 rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none"
                name="password"
                type="password"
                placeholder="********"
                required
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
            <div className="flex flex-col gap-3 items-center justify-between">
                <button
                    className="bg-amber-200 hover:bg-amber-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
                {/* <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Forgot Password?
                </a> */}
            </div>
        </form>
    );
};

export default AuthForm;
