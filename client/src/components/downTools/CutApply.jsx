import React, { useCallback, useEffect, useRef, useState } from "react";
import { setPreviewImg } from "../../store/reducers/ToolSlice";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import ReactCrop from "react-image-crop";
const getAspect = (key) => {
    switch (key) {
        case "1:1":
            return 1;
        case "3:2":
            return 3 / 2;
        case "4:3":
            return 4 / 3;
        case "5:4":
            return 5 / 4;
        case "7:5":
            return 7 / 5;
        case "16:9":
            return 16 / 9;
        default:
            return 0;
    }
};

const CutApply = ({ crop, setCrop }) => {
    const [completedCrop, setCompletedCrop] = useState(null);
    const [open, setOpen] = React.useState(false);

    const { downTools } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const { image } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );

    const imageRef = useRef(null);

    const applyFilter = useCallback(() => {
        imageRef.current.style.filter = `${downTools[2].filters[0].name}(${downTools[2].filters[0].value}%) 
            ${downTools[2].filters[1].name}(${downTools[2].filters[1].value}%) 
            ${downTools[2].filters[2].name}(${downTools[2].filters[2].value}%)
            ${downTools[2].filters[3].name}(${downTools[2].filters[3].value}%)
            ${downTools[2].filters[4].name}(${downTools[2].filters[4].value}px)
            ${downTools[2].filters[5].name}(${downTools[2].filters[5].value}%)
            ${downTools[2].filters[6].name}(${downTools[2].filters[6].value}%)
            ${downTools[2].filters[7].name}(${downTools[2].filters[7].value}deg)`;
        imageRef.current.style.transform = `rotate(${downTools[4].value}deg)`;
    }, [imageRef, downTools]);

    useEffect(() => {
        if (imageRef.current !== null) {
            applyFilter();
        }
    }, [applyFilter]);

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

    const onLoad = useCallback(
        (img) => {
            imageRef.current = img;
        },
        [imageRef]
    );

    const cropImage = useCallback(
        (imageRef, crop) => {
            console.log(imageRef, crop)
            if (!imageRef || !crop) {
                console.log("-")
                return;
            }
            const canvas = document.createElement("canvas");
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            console.log(imageRef);
            ctx.drawImage(
                imageRef,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
            // Converting to base64
            console.log(canvas)
            const base64Image = canvas.toDataURL("image/jpeg");
            if (crop.width === 0 || crop.height === 0) {
                dispatch(setPreviewImg({ previewImg: image }));
            } else {
                dispatch(setPreviewImg({ previewImg: base64Image }));
            }
            handleClick();
        },
        [dispatch, image]
    );

    useEffect(() => {
        cropImage(imageRef.current, completedCrop);
    }, [completedCrop, imageRef, cropImage]);

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
            <ReactCrop
                crop={crop}
                aspect={getAspect(downTools[0].curFormat)}
                onChange={(c) => {
                    setCrop(c);
                }}
                onImageLoaded={onLoad}
                onComplete={(c) => setCompletedCrop(c)}
            >
                <img
                    src={image}
                    className="z-0 select-none"
                    alt="preview"
                    ref={imageRef}
                    onLoad={applyFilter}
                />
            </ReactCrop>
        </>
    );
};

export default CutApply;
