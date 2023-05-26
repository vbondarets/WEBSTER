import { Slider } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDownTool, setValues } from "../../store/reducers/ToolSlice";
// import setFilters from "../fabricJS/setFilters";

const ColorTools = () => {
    const colorsBar = useRef();
    const dispatch = useDispatch();
    const { downTools, curDownTool } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    const setActive = (e, filter) => {
        dispatch(setDownTool({ curDownTool: filter.name }));
        setFilterValues(filter.name);
    };

    const setFilterValues = (curFilter, newValue) => {
        // console.log(curFilter, curDownTool, newValue);
        dispatch(
            setValues({
                toolIndex: 2,
                values: {
                    curSetting: curFilter,
                    name: "colors",
                    filters: downTools[2].filters.map((filter) =>
                        newValue !== undefined && filter.name === curFilter
                            ? { ...filter, value: newValue }
                            : filter
                    ),
                },
            })
        );
        // setFilters(canvas, downTools, curFilter, newValue);
    };

    return (
        <>
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
                className="flex gap-3 justify-center mt-1 font-sans"
            >
                {downTools[2].filters.map((filter) => {
                    return (
                        <p
                            key={filter.name}
                            className={`${
                                filter.name === downTools[2].curSetting &&
                                "text-amber-200 border border-mainFontColor"
                            } flex items-center justify-center px-4 h-10 select-none hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer`}
                            onClick={(e) => {
                                setActive(e, filter);
                            }}
                        >
                            {filter.name}
                        </p>
                    );
                })}
            </div>
        </>
    );
};

export default ColorTools;
