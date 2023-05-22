import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import { setFormat, setPreviewImg } from "../../store/reducers/ToolSlice";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import "react-image-crop/dist/ReactCrop.css";

const CutTools = () => {
    const cutBar = useRef();
    const { downTools, image } = useSelector((state) => state.toolReducer);
    const dispatch = useDispatch();

    const cropImage = () => {
        var newImage = new Image();
        newImage.src = image;

        const canvas = document.createElement("canvas");
        const scaleX = newImage.naturalWidth / newImage.width;
        const scaleY = newImage.naturalHeight / newImage.height;
        canvas.width = downTools[0].position.width;
        canvas.height = downTools[0].position.height;
        const ctx = canvas.getContext("2d");

        const pixelRatio = window.devicePixelRatio;
        canvas.width = downTools[0].position.width * pixelRatio;
        canvas.height = downTools[0].position.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            newImage,
            downTools[0].position.x * scaleX,
            downTools[0].position.y * scaleY,
            downTools[0].position.width * scaleX,
            downTools[0].position.height * scaleY,
            0,
            0,
            downTools[0].position.width,
            downTools[0].position.height
        );

        // Converting to base64
        const base64Image = canvas.toDataURL("image/jpeg");
        if (
            downTools[0].position.width === 0 ||
            downTools[0].position.height === 0
        ) {
            dispatch(setPreviewImg({ previewImg: image }));
        } else {
            dispatch(setPreviewImg({ previewImg: base64Image }));
        }
    };

    return (
        <div
            ref={cutBar}
            className="formatTool w-fit h-full mt-1 font-sans flex flex-row space-x-6 mx-auto"
        >
            {downTools[0].position && (
                <button
                    onClick={() => {
                        cropImage();
                    }}
                >
                    apply
                </button>
            )}
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
