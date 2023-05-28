import React from "react";
import Navbar from "../components/Navbar"

const Container = ({ component }) => {
    return (
        <div className="flex flex-col min-h-screen bg-mainColor text-mainFontColor">
            <Navbar />
            {component}
        </div>
    );
};

export default Container;
