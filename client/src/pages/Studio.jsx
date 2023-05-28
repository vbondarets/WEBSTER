import React from "react";
import ToolBar from "../components/ToolBar";
import Canvas from "../components/Canvas";
import DownBar from "../components/DownBar";

const Studio = () => {
    return (
        <div className="w-full h-full">
            <div className="flex flex-row w-full min-h-full overflow-hidden flex-1">
                <ToolBar />
                <Canvas />
            </div>
            <DownBar />
        </div>
    );
};

export default Studio;
