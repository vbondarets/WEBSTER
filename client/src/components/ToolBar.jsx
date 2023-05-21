import React, { useRef } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CropIcon from "@mui/icons-material/Crop";
import BrushIcon from "@mui/icons-material/Brush";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useDispatch, useSelector } from "react-redux";
import { setPreviewImg, setTool } from "../store/reducers/ToolSlice";

const ToolBar = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { downTools, previewImg } = useSelector((state) => state.toolReducer);

    const setActiveTool = (e) => {
        dispatch(setTool({ curTool: e.currentTarget.classList[0] }));
        e.currentTarget.parentNode.childNodes.forEach(
            (el) =>
                (el.classList = [
                    `${el.classList[0]} mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center`,
                ])
        );
        e.currentTarget.classList = [
            `${e.currentTarget.classList[0]} mx-auto mt-2 rounded-2xl text-amber-200 cursor-pointer h-fit w-fit p-2 flex flex-col justify-center`,
        ];
    };

    const loadImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        dispatch(setPreviewImg({ previewImg: URL.createObjectURL(file) }));
        console.log("tet");
        // resetFilter();
    };

    const saveImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            ctx.filter = `${downTools[2].filters[0].name}(${downTools[2].filters[0].value}%) 
                ${downTools[2].filters[1].name}(${downTools[2].filters[1].value}%) 
                ${downTools[2].filters[2].name}(${downTools[2].filters[2].value}%)
                ${downTools[2].filters[3].name}(${downTools[2].filters[3].value}%)
                ${downTools[2].filters[4].name}(${downTools[2].filters[4].value}px)
                ${downTools[2].filters[5].name}(${downTools[2].filters[5].value}%)
                ${downTools[2].filters[6].name}(${downTools[2].filters[6].value}%)
                ${downTools[2].filters[7].name}(${downTools[2].filters[7].value}deg)`;
            ctx.translate(canvas.width / 2, canvas.height / 2);
            if (downTools[4].value !== 0) {
                ctx.rotate((downTools[4].value * Math.PI) / 180);
            }
            // ctx.scale(flipHorizontal, flipVertical);
            ctx.drawImage(
                image,
                -canvas.width / 2,
                -canvas.height / 2,
                canvas.width,
                canvas.height
            );

            const link = document.createElement("a");
            link.download = "image.jpg";
            link.href = canvas.toDataURL();
            link.click();
        };

        image.src = previewImg;
    };

    return (
        <div className="ToolBar h-128 w-fit px-2 bg-[#131314] grid grid-cols-1 border-r-2 border-slate-700 mr-auto">
            <div
                className="Cut mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <CropIcon className="mx-auto" />
                <p>Cut</p>
            </div>
            <div
                className="Filters mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <TuneIcon className="mx-auto" />
                <p>Filters</p>
            </div>
            <div
                className="Colors mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <PaletteRoundedIcon className="mx-auto" />
                <p>Colors</p>
            </div>
            <div
                className="Draw mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <BrushIcon className="mx-auto" />
                <p>Draw</p>
            </div>
            <div
                className="Rotate mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <RotateLeftRoundedIcon className="mx-auto" />
                <p>Rotate</p>
            </div>
            <div
                className="Text mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <FormatColorTextRoundedIcon className="mx-auto" />
                <p>Text</p>
            </div>
            <div
                className="Resize mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={setActiveTool}
            >
                <AspectRatioRoundedIcon className="mx-auto" />
                <p>Resize</p>
            </div>
            <div
                className="Image mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={(e) => {
                    setActiveTool(e);
                    fileInputRef.current.click();
                    // setFileInputRef(fileInputRef);
                }}
            >
                <AddToPhotosRoundedIcon className="mx-auto" />
                <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={loadImage}
                />
                <p>Image</p>
            </div>
            <div
                className="Download mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center"
                onClick={saveImage}
            >
                <DownloadRoundedIcon className="mx-auto" />
                <p className="hidden">Download</p>
            </div>
        </div>
    );
};

export default ToolBar;
