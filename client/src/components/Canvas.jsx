import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { FileUploader } from "react-drag-drop-files";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "react-image-crop/dist/ReactCrop.css";
import {
    setImage,
    setPreviewImg,
    resetState,
    undoState,
    redoState,
} from "../store/reducers/ToolSlice";
import FabricCanvas from "./fabricJS/FabricCanvas";
import CutApply from "./downTools/CutApply";


const Canvas = () => {
    const { image, previewImg, curTool, canvas } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        unit: "px",
    });
    const dispatch = useDispatch();

    const loadImage = (file) => {
        dispatch(setPreviewImg({ previewImg: URL.createObjectURL(file) }));
        dispatch(setImage({ image: URL.createObjectURL(file) }));
    };

    return (
        <div className="flex justify-center min-h-full p-5 pt-12 w-full bg-[#131314] relative">
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
                <div
                    className="hover:bg-gray-200/40 p-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        if (canvas) {
                            canvas
                                .getActiveObjects()
                                .forEach((object) => canvas.remove(object));
                            canvas.discardActiveObject();
                            canvas.renderAll();
                        }
                    }}
                >
                    <DeleteOutlineIcon />
                </div>
            </div>
            {previewImg && image ? (
                <>
                    {curTool === "Cut" ? (
                        <CutApply crop={crop} setCrop={setCrop} />
                    ) : (
                        <FabricCanvas />
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
                                <p className="text-xs">PNG, JPG, WEBP</p>
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
