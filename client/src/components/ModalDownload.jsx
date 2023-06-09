import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, InputLabel, Slider, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FormControl from '@mui/material/FormControl';
import { fabric } from 'fabric';
import { imagesAPI } from '../services/ImageService';
import saveImage from '../services/utils/saveImage';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const ModalDownload = (props) => {
    const { downTools, canvas } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    const { isAuth } = useSelector((state) => state.userReducer);
    const [format, setFormat] = useState("")
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [fileName, setFileName] = useState("Filename")
    const [quality, setQuality] = useState(100)
    const [image_upload, { upload_error }] = imagesAPI.useSaveImageMutation();
    const [messageError, setMessageError] = useState('')
    const errorRef = useRef();
    const [isLock, setIsLock] = useState(true);
    // const dispatch = useDispatch();
    const [proportions, setProportions] = useState();

    useEffect(() => {
        setWidth(downTools[6].width)
        setHeight(downTools[6].height)
    }, [downTools])
    useEffect(() => {
        if (isLock) {
            setProportions(width / height)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLock]);
    useEffect(() => {
        if (height > 4000) {
            setHeight(4000)
        }
        if (width > 4000) {
            setWidth(4000)
        }
        if (height < 0) {
            setHeight(0)
        }
        if (width < 0) {
            setWidth(0)
        }
    }, [height, width])

    async function downloadImg() {
        if (format && width && height && fileName && quality && canvas) {
            const imgHref = canvas.toDataURL({
                format: format,
                quality: quality / 100
            });
            const template = document.createElement("canvas");
            const newCanvas = new fabric.Canvas(template);
            newCanvas.setDimensions({
                width: width,
                height: height
            });
            const finalImg = new Image();

            finalImg.onload = function () {
                fabric.Image.fromURL(finalImg.src, async function (img) {
                    // console.log(finalImg);
                    let scaleX = width / img.width;
                    let scaleY = height / img.height;
                    if (width < img.width) {
                        scaleX = img.width / width
                    }
                    if (height < img.height) {
                        scaleY = img.height / height
                    }
                    newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas), {
                        scaleX: scaleX,
                        scaleY: scaleY,
                    });
                    newCanvas.renderAll()
                    await saveImage(newCanvas.toDataURL({
                        format: format,
                        quality: quality / 100
                    }), downTools, image_upload, isAuth, format)
                    props.setOpen(false)
                });
            };
            finalImg.src = imgHref
        }
        else {
            errorRef.current.style.display = 'block'
            setMessageError('Fill all data')
            setTimeout(() => {
                errorRef.current.style.display = 'none'
            }, 1500)
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={() => { props.setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='rounded'
        >
            <Box
                className={'absolute top-1/2 start-1/2 w-1/4 bg-[#1f2029] p-4 border-2 border-[#000] -translate-y-1/2 -translate-x-1/2 flex flex-col'}
            >
                <FormControl fullWidth>
                    <InputLabel
                        id="demo-simple-select-label"
                        style={{ color: "rgb(112, 160, 203)" }}
                    >Format</InputLabel>
                    <Select
                        label="Format"
                        labelId="demo-simple-select-label"
                        style={{ color: "rgb(112, 160, 203)" }}
                        className='border-b border-mainFontColor focus:outline-none focus:ring focus:border-red-500 w-2/3'
                        value={format}
                        autoWidth
                        onChange={event => {
                            setFormat(event.target.value)
                        }}
                    >
                        <MenuItem
                            value={"jpg"}
                            className='focus:outline-none'
                        >
                            {'JPG'}
                        </MenuItem>
                        <MenuItem
                            value={"jpeg"}
                            className='focus:outline-none'
                        >
                            {'JPEG'}
                        </MenuItem>
                        <MenuItem
                            value={"png"}
                            className='focus:outline-none'
                        >
                            {'PNG'}
                        </MenuItem>
                        <MenuItem
                            value={"webp"}
                            className='focus:outline-none'
                        >
                            {'WEBP'}
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    InputLabelProps={{
                        sx: {
                            color: '#76A0CB',
                        }
                    }}
                    sx={{
                        marginTop: '20px',
                        input: { color: '#76A0CB' }
                    }}
                    type="number"
                    label="Width"
                    variant="standard"
                    value={width}
                    onChange={event => {
                        if (isLock) {
                            setHeight(Math.round(parseFloat(event.target.value / proportions)))``
                        }
                        setWidth(event.target.value)
                    }}
                />
                {isLock
                    ?
                    <LockIcon
                        style={{ color: "rgb(112, 160, 203)", marginTop:("10px") }}
                        onClick={() => { setIsLock(false) }}
                    />
                    :
                    <LockOpenIcon
                        style={{ color: "rgb(112, 160, 203)", marginTop:("10px") }}
                        onClick={() => { setIsLock(true) }}
                    />
                }
                <TextField
                    InputLabelProps={{
                        sx: {
                            color: '#76A0CB',
                        }
                    }}
                    sx={{ marginTop: '20px', input: { color: '#76A0CB' } }}
                    className='px-3 py-2 mt-4'
                    type="number"
                    label="Height"
                    variant="standard"
                    value={height}
                    onChange={event => {
                        if (isLock) {
                            setWidth(Math.round(parseFloat(event.target.value * proportions)))
                        }
                        setHeight(event.target.value)
                    }}
                />
                <TextField
                    InputLabelProps={{
                        sx: {
                            color: '#76A0CB',
                        }
                    }}
                    sx={{ marginTop: '20px', input: { color: '#76A0CB' } }}
                    className='px-3 py-2 mt-4'
                    label="Filename"
                    variant="standard"
                    value={fileName}
                    onChange={event => {
                        setFileName(event.target.value)
                    }}
                />
                <Slider
                    sx={{ marginTop: '40px', input: { color: '#76A0CB' } }}
                    aria-label="quality"
                    value={quality}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={false}
                    min={1}
                    max={100}
                    onChange={(e, value) => {
                        setQuality(value)
                    }}
                />
                <TextField
                    InputLabelProps={{
                        sx: {
                            color: '#76A0CB',
                        }
                    }}
                    sx={{ marginTop: '5px', input: { color: '#76A0CB' } }}
                    className='px-3 py-2 mt-2 w-1/2'
                    type="number"
                    label="Quality"
                    variant="standard"
                    value={quality}
                    onChange={event => {
                        setQuality(event.target.value)
                    }}
                />
                <p
                    ref={errorRef}
                    className='w-1/2 text-2xl text-center rounded bg-mainFontColor mt-4 mx-auto py-0 border-2 border-red-500 hidden'
                >
                    {messageError}
                </p>
                <Button
                    style={{ marginTop: "20px" }}
                    startIcon={<DownloadIcon />}
                    variant="contained"
                    onClick={() => {
                        downloadImg()
                    }}
                >
                    Download
                </Button>
                {upload_error && console.log(upload_error)}
            </Box>
        </Modal>
    )
}

export default ModalDownload