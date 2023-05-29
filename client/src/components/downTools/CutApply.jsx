import React from "react";
import { setPreviewImg } from "../../store/reducers/ToolSlice";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";

const CutApply = ({ position }) => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const { image } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const cropImage = () => {
        var newImage = new Image();
        newImage.src = image;

        const canvas = document.createElement("canvas");
        const scaleX = newImage.naturalWidth / newImage.width;
        const scaleY = newImage.naturalHeight / newImage.height;
        canvas.width = position.width;
        canvas.height = position.height;
        const ctx = canvas.getContext("2d");

        const pixelRatio = window.devicePixelRatio;
        canvas.width = position.width * pixelRatio;
        canvas.height = position.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            newImage,
            position.x * scaleX,
            position.y * scaleY,
            position.width * scaleX,
            position.height * scaleY,
            0,
            0,
            position.width,
            position.height
        );

        // Converting to base64
        const base64Image = canvas.toDataURL("image/jpeg");
        if (position.width === 0 || position.height === 0) {
            dispatch(setPreviewImg({ previewImg: image }));
        } else {
            dispatch(setPreviewImg({ previewImg: base64Image }));
        }
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Success!
                </Alert>
            </Snackbar>
            <button
                className="ml-2"
                onClick={() => {
                    cropImage();
                    handleClick();
                }}
            >
                Apply
            </button>
        </>
    );
};

export default CutApply;
