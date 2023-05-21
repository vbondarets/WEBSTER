import React from "react";
import { setRotate } from "../../store/reducers/ToolSlice";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";

const RotateTools = () => {
    const { downTools } = useSelector((state) => state.toolReducer);
    const dispatch = useDispatch();
    return (
        <div className="w-3/6 mx-auto">
            <Slider
                aria-label="discrete-slider"
                value={downTools[4].value}
                valueLabelDisplay="auto"
                step={5}
                marks={true}
                min={-180}
                max={180}
                onChange={(e, value) => {
                    dispatch(setRotate({ value }));
                }}
            />
        </div>
    );
};

export default RotateTools;
