import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDownTool, setValues } from "../../store/reducers/ToolSlice";

const ColorTools = () => {
    const colorsBar = useRef();
    const dispatch = useDispatch();
    const { downTools, curDownTool } = useSelector(
        (state) => state.toolReducer
    );
    const [value, setValue] = useState(100);

    const setActive = (e, filter) => {
        dispatch(setDownTool({ curDownTool: filter.name }));
        dispatch(
            setValues({
                toolIndex: 2,
                values: {
                    curSetting: filter.name,
                    name: "colors",
                    filters: downTools[2].filters,
                },
            })
        );
        setValue(filter.value);
    };

    const handleChange = async (e, newValue) => {
        setValue(newValue);
        dispatch(
            setValues({
                toolIndex: 2,
                values: {
                    curSetting: curDownTool,
                    name: "colors",
                    filters: downTools[2].filters.map((filter) =>
                        filter.name === curDownTool
                            ? { ...filter, value: newValue }
                            : filter
                    ),
                },
            })
        );
    };
    useEffect(() => {
        if (downTools[2].curSetting) {
            downTools[2].filters.forEach((filter) => {
                if (filter.name === downTools[2].curSetting) {
                    setValue(filter.value);
                }
            });
        }
    }, [downTools]);

    return (
        <div className="colorTool">
            <div className="w-3/6 mx-auto">
                {curDownTool != null && (
                    <Slider
                        aria-label="discrete-slider"
                        value={value}
                        valueLabelDisplay="auto"
                        step={5}
                        marks={true}
                        min={0}
                        max={200}
                        onChange={handleChange}
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