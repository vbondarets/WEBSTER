import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { setPosition } from "../store/reducers/ToolSlice";
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
    
    return (
        <div className="flex justify-center items-center p-5 w-full bg-[#131314]">
            {previewImg && image && (
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
            )}
        </div>
    );
};

export default Canvas;
