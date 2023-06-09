import React, { useRef, useState } from "react";
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
import { setTool } from "../store/reducers/ToolSlice";
// import saveImage from "../services/utils/saveImage";
import addSticker from "./fabricJS/addSticker";
import ModalDownload from "./ModalDownload";

const buttons = [
    { name: "Cut", icon: <CropIcon className="mx-auto" /> },
    { name: "Filters", icon: <TuneIcon className="mx-auto" /> },
    { name: "Colors", icon: <PaletteRoundedIcon className="mx-auto" /> },
    { name: "Draw", icon: <BrushIcon className="mx-auto" /> },
    { name: "Rotate", icon: <RotateLeftRoundedIcon className="mx-auto" /> },
    { name: "Text", icon: <FormatColorTextRoundedIcon className="mx-auto" /> },
    { name: "Resize", icon: <AspectRatioRoundedIcon className="mx-auto" /> },
];

const ToolBar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { curTool, canvas, imageProportion } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );

    const setActiveTool = (value) => {
        dispatch(setTool({ curTool: value }));
    };

    const loadSticker = (e) => {
        if (canvas) {
            const file = e.target.files[0];
            if (!file) return;
            addSticker(canvas, URL.createObjectURL(file), imageProportion)
        }
    };

    return (
        <div className="flex flex-col gap-1 items-center p-1 text-sm z-20 bg-[#131314] border-r-2 border-slate-700 select-none">
            {buttons.map((value) => (
                <div
                    key={value.name}
                    className={`${curTool === value.name && "bg-toolBg text-amber-200"
                        } flex flex-col items-center justify-center h-16 w-16 rounded-2xl hover:text-amber-200 hover:bg-toolBg/90 cursor-pointer`}
                    onClick={() => setActiveTool(value.name)}
                >
                    {value.icon}
                    <p>{value.name}</p>
                </div>
            ))}
            <div
                className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl hover:text-amber-200 hover:bg-toolBg/90 cursor-pointer"
                onClick={() => {
                    if (canvas)
                        fileInputRef.current.click();
                }}
            >
                <AddToPhotosRoundedIcon className="mx-auto" />
                <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={loadSticker}
                />
                <p>Image</p>
            </div>
            <div
                className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl hover:text-amber-200 hover:bg-toolBg/90 cursor-pointer"
                onClick={() => {
                    // saveImage(previewImg, downTools);
                    if (canvas) {
                        setOpen(true)
                    }
                }}
            >
                <DownloadRoundedIcon className="mx-auto" />
                <p className="hidden">Download</p>
            </div>
            <ModalDownload
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default ToolBar;
