import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import { setFormat } from "../../store/reducers/ToolSlice";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import "react-image-crop/dist/ReactCrop.css";

const CutTools = () => {
    const cutBar = useRef();
    const { downTools } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );

    const dispatch = useDispatch();

    return (
        <div
            ref={cutBar}
            className="formatTool w-fit h-full mt-1 font-sans flex flex-row space-x-6 mx-auto"
        >
            {downTools[0].formats.map((format) => {
                return (
                    <div
                        key={format}
                        className={`${format} ${
                            format === downTools[0].curFormat &&
                            "text-amber-200 border border-mainFontColor"
                        } format h-5/6 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
                        onClick={(e) => {
                            dispatch(setFormat({ format }));
                        }}
                    >
                        {format === "Custom" ? (
                            <div className="iconContainer w-fit h-2/3 mt-1">
                                <CheckBoxOutlineBlankRoundedIcon />
                            </div>
                        ) : (
                            <div className="iconContainer w-fit h-2/3 mt-1">
                                <ContentCutRoundedIcon />
                            </div>
                        )}
                        <p className="mb-1">{format}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CutTools;
