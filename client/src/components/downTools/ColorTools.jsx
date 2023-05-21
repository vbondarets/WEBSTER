import { Slider } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDownTool, setValues } from "../../store/reducers/ToolSlice";

const ColorTools = () => {
    const colorsBar = useRef();
    const dispatch = useDispatch();
    const { downTools, curDownTool } = useSelector(
        (state) => state.toolReducer
    );

    const setActive = (e, filter) => {
        dispatch(setDownTool({ curDownTool: filter.name }));
        setFilterValues(filter.name);
    };

    const setFilterValues = (curFilter, newValue) => {
        console.log(curFilter, curDownTool, newValue);
        dispatch(
            setValues({
                toolIndex: 2,
                values: {
                    curSetting: curFilter,
                    name: "colors",
                    filters: downTools[2].filters.map((filter) =>
                        newValue !== undefined && filter.name === curDownTool
                            ? { ...filter, value: newValue }
                            : filter
                    ),
                },
            })
        );
    };

    return (
        <div className="colorTool">
            <div className="w-3/6 mx-auto">
                {curDownTool != null && (
                    <Slider
                        aria-label="discrete-slider"
                        value={
                            downTools[2].filters.find(
                                (x) => x.name === downTools[2].curSetting
                            )?.value
                        }
                        valueLabelDisplay="auto"
                        step={5}
                        marks={true}
                        min={0}
                        max={200}
                        onChange={(e, newValue) => {
                            setFilterValues(curDownTool, newValue);
                        }}
                    />
                )}
            </div>
            <div
                ref={colorsBar}
                className="colorsBar w-fit mt-1 mx-auto font-sans flex space-x-24"
            >
                {downTools[2].filters.map((filter) => {
                    return (
                        <p
                            key={filter.name}
                            className={`${
                                filter.name === downTools[2].curSetting &&
                                "text-amber-200 border border-mainFontColor"
                            } colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer`}
                            onClick={(e) => {
                                setActive(e, filter);
                            }}
                        >
                            {filter.name}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorTools;
