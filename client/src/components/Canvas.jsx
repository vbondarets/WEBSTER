import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Canvas = () => {
    const { downTools, previewImg } = useSelector((state) => state.toolReducer);
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
        <div className="Canvas w-full bg-[#131314]">
            {previewImg && (
                <img
                    src={previewImg}
                    alt="preview"
                    ref={previewImgRef}
                    onLoad={applyFilter}
                />
            )}
        </div>
    );
};

export default Canvas;
