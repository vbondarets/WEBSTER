import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ReactCrop from "react-image-crop";
import { FileUploader } from "react-drag-drop-files";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import "react-image-crop/dist/ReactCrop.css";
import {
    setImage,
    setPosition,
    setPreviewImg,
    resetState,
    undoState,
    redoState,
} from "../store/reducers/ToolSlice";
import FabricCanvas from "./fabricJS/FabricCanvas";

const Canvas = () => {
    const { downTools, image, previewImg, curTool } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    const dispatch = useDispatch();
    const previewImgRef = useRef(null);

    const applyFilter = useCallback(() => {
        previewImgRef.current.style.filter = `${downTools[2].filters[0].name}(${downTools[2].filters[0].value}%) 
            ${downTools[2].filters[1].name}(${downTools[2].filters[1].value}%) 
            ${downTools[2].filters[2].name}(${downTools[2].filters[2].value}%)
            ${downTools[2].filters[3].name}(${downTools[2].filters[3].value}%)
            ${downTools[2].filters[4].name}(${downTools[2].filters[4].value}px)
            ${downTools[2].filters[5].name}(${downTools[2].filters[5].value}%)
            ${downTools[2].filters[6].name}(${downTools[2].filters[6].value}%)
            ${downTools[2].filters[7].name}(${downTools[2].filters[7].value}deg)`;
        previewImgRef.current.style.transform = `rotate(${downTools[4].value}deg)`;
    }, [previewImgRef, downTools]);

    useEffect(() => {
        if (previewImgRef.current !== null) {
            applyFilter();
        }
    }, [applyFilter]);

    const loadImage = (file) => {
        dispatch(setPreviewImg({ previewImg: URL.createObjectURL(file) }));
        dispatch(setImage({ image: URL.createObjectURL(file) }));
    };

    return (
        <div className="flex justify-center items-center min-h-full p-5 pt-12 w-full bg-[#131314] relative">
            <div className="absolute top-0 left-0 flex p-1 z-20 text-slate-100">
                <div
                    className="hover:bg-gray-200/40 p-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        dispatch(resetState());
                    }}
                >
                    <RestoreRoundedIcon />
                </div>
                <div
                    className="hover:bg-gray-200/40 p-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        dispatch(undoState());
                    }}
                >
                    <UndoRoundedIcon />
                </div>
                <div
                    className="hover:bg-gray-200/40 p-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        dispatch(redoState());
                    }}
                >
                    <RedoRoundedIcon />
                </div>
            </div>
            {previewImg && image ? (
                <>
                    {curTool === "Cut" ? (
                        <ReactCrop
                            crop={downTools[0].position}
                            onChange={(c) => {
                                dispatch(setPosition(c));
                            }}
                        >
                            <img
                                src={image}
                                className="z-0 select-none"
                                alt="preview"
                                ref={previewImgRef}
                                onLoad={applyFilter}
                            />
                        </ReactCrop>
                    ) : (
                        <>
                            <FabricCanvas/>
                            {/* <img
                                src={previewImg}
                                className="z-0 select-none"
                                alt="preview"
                                ref={previewImgRef}
                                onLoad={applyFilter}
                            /> */}
                        </>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <FileUploader
                        handleChange={loadImage}
                        name="file"
                        types={["JPG", "PNG", "WEBP", "JPEG"]}
                        maxSize={6}
                        children={
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <CloudUploadOutlinedIcon fontSize="large" />
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>
                                    <span> or drag and drop</span>
                                </p>
                                <p className="text-xs">
                                    PNG, JPG (MAX. 800x400px)
                                </p>
                            </div>
                        }
                        classes="flex flex-col items-center justify-center w-1/2 xl:w-1/3 min-w-[250px] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100/10"
                    />
                </div>
            )}
        </div>
    );
};

export default Canvas;
