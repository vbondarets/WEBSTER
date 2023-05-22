import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ReactCrop from "react-image-crop";
import { FileUploader } from "react-drag-drop-files";
import "react-image-crop/dist/ReactCrop.css";
import {
    setImage,
    setPosition,
    setPreviewImg,
} from "../store/reducers/ToolSlice";

const fileTypes = ["JPG", "PNG"];

const Canvas = () => {
    const { downTools, image, previewImg, curTool } = useSelector(
        (state) => state.toolReducer
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
        <div className="flex justify-center items-center p-5 w-full bg-[#131314]">
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
                        <img
                            src={previewImg}
                            className="z-0 select-none"
                            alt="preview"
                            ref={previewImgRef}
                            onLoad={applyFilter}
                        />
                    )}
                </>
            ) : (
                <div class="flex items-center justify-center w-full">
                    <FileUploader
                        handleChange={loadImage}
                        name="file"
                        types={fileTypes}
                        children={
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <CloudUploadOutlinedIcon fontSize="large" />
                                <p class="mb-2 text-sm">
                                    <span class="font-semibold">
                                        Click to upload
                                    </span>
                                    <span> or drag and drop</span>
                                </p>
                                <p class="text-xs">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
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
