import React, { useState } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { FabricJSCanvas, useFabricJSEditor } from '../components/FabricReact/lib'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFontColor, setFontPosition, setFontSize } from "../store/reducers/ToolSlice";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFont } from '../store/reducers/ToolSlice';
import { ChromePicker} from 'react-color';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';


const Test = () => {
    const positionArr =[<FormatAlignLeftIcon/>, <FormatAlignCenterIcon/>, <FormatAlignRightIcon/>]
    // const { editor, onReady } = useFabricJSEditor()
    // const onAddCircle = () => {
    //     editor?.addCircle()
    // }
    // const onAddRectangle = () => {
    //     editor?.addRectangle()
    // }
    // const addText = () => {
    //     editor?.addText("text")
    // }
    // const aboba = () => {
    //     editor?.setFillColor('#FFFFFF')
    // }
    // const aboba2 = () => {
    //     editor?.updateText("aboab")
    // }
    // return (
    //     <div className="">
    //         <button onClick={onAddCircle}>Add circle</button>
    //         <button onClick={onAddRectangle}>Add Rectangle</button>
    //         <button onClick={addText}>Add text</button>
    //         <button onClick={aboba}>color</button>
    //         <button onClick={aboba2}>edit</button>
    //         <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    //     </div>
    // );
    const { selectedObjects, editor, onReady } = useFabricJSEditor({
        defaultStrokeColor: 'red'
    })
    const [text] = useState('Your text')
    // const [strokeColor, setStrokeColor] = useState('')
    // const [fillColor, setFillColor] = useState('')

    const onUpdateAlign = (align) => {
        if (selectedObjects?.length) {
            return editor?.updateAlign(align)
        }
    }
    const onUpdateFont = (font) => {
        if (selectedObjects?.length) {
            return editor?.updateFont(font)
        }
    }
    const onUpdateFontSize = (size) => {
        if (selectedObjects?.length) {
            return editor?.updateFontSize(size)
        }
    }
    const onAddText = () => {
        if (selectedObjects?.length) {
            return editor?.updateText(text)
        }
        editor?.addText(text)
    }
    const onSetFillColor = () => {
        editor?.setFillColor(`rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`)
    }
    // const onSetStrokeColor = () => {
    //     editor?.setStrokeColor(strokeColor)
    // }
    // const onSetFillColor = () => {
    //     editor?.setFillColor(fillColor)
    // }
    // const onDeleteAll = () => {
    //     editor?.deleteAll()
    // }
    // const onDeleteSelected = () => {
    //     editor?.deleteSelected()
    // }
    const { downTools } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
    const dispatch = useDispatch();
    const [onColor, setOnColor] = useState(false)
    return (
        <>
            {editor ? (
                <div>
                    

                    {/* <button onClick={onAddLine}>Add Line</button>
                    <button onClick={onDeleteAll}>Delete All</button>
                    <button onClick={onDeleteSelected}>Delete Selected</button> */}
                    {/* <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    /> */}
                    <button onClick={onAddText}>Add Text</button>
                    {/* <input
                        type='text'
                        value={strokeColor || editor.strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                    />
                    <button onClick={onSetStrokeColor}>Set Stroke Color</button> */}
                    {/* <input
                        type='text'
                        value={fillColor || editor.fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                    />
                    <button onClick={onSetFillColor}>Set Fill Color</button> */}

                    {/* <pre>
                        fillColor: {editor.fillColor}, strokeColor: {editor.strokeColor}
                    </pre>
                    <pre>{JSON.stringify(selectedObjects)}</pre> */}
                </div>
            ) : (
                <>Loading...</>
            )}
            <FabricJSCanvas className='sample-canvas' onReady={onReady} />
            <div className='fontChange my-auto'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel style={{ color: "rgb(112, 160, 203)" }} className=' text-mainFontColor '>Font</InputLabel>
                    <Select
                        style={{ color: "rgb(112, 160, 203)" }}
                        autoWidth
                        value={downTools[5].curFont}
                        onChange={event => {
                            dispatch(setFont({ font: event.target.value }))
                            onUpdateFont(event.target.value)
                        }}
                        label="Font"
                    >
                        {downTools[5].fonts.map(font => {
                            return <MenuItem
                                value={font}
                                key={font}
                            >
                                {font}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <input 
                type="number" 
                className='bg-transparent w-16 p-2 h-fit border rounded-xl border-mainFontColor my-auto'
                placeholder="Size"
                value={downTools[5].size}
                min={1}
                max={99}
                onChange={(event) => {
                    if(event.target.value > 99){
                        dispatch(setFontSize({size: 99}))
                        onUpdateFontSize(event.target.value)
                    }
                    else if(event.target.value < 0){
                        dispatch(setFontSize({size: 0}))
                        onUpdateFontSize(event.target.value)
                    }
                    else {
                        dispatch(setFontSize({size: event.target.value}))
                        onUpdateFontSize(event.target.value)
                    }
                }}
            />
            {downTools[5].positions.map((position, index) => {
                return <div
                        key={position}
                        className={`${position} ${position === downTools[5].curPosition && "text-amber-200 border border-mainFontColor"}tools h-5/6 w-20 rounded-2xl cursor-pointer flex flex-col justify-center items-center hover:text-amber-200 hover:bg-[#333042] content-center`}
                        onClick={() => {
                            onUpdateAlign(position);
                            dispatch(setFontPosition({position}))
                        }}
                >
                    {positionArr[index]}
                    <p>{position}</p>
                </div>
            })}
            <div className="w-fit h-fit my-auto relative">
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        onColor ? setOnColor(false) : setOnColor(true)
                    }}
                    style={{ backgroundColor: `rgb(${downTools[5].curColor.rgb.r},${downTools[5].curColor.rgb.g},${downTools[5].curColor.rgb.b})` }}
                    className={`w-12 h-12 rounded-full`}
                >
                </div>
                {onColor &&
                    <ChromePicker
                        className='absolute bottom-0 left-16'
                        color={downTools[5].curColor.rgb}
                        onChange={color => {
                            onSetFillColor();
                            // setOnColor(false)
                            dispatch(setFontColor({ color: { rgb: color.rgb } }))
                        }}
                    />
                }
            </div>
        </>
    )
    ///////////////////////////////////////////////////////////////////////

    // const { selectedObjects, editor, onReady } = useFabricJSEditor({
    //     defaultStrokeColor: 'red'
    // })
    // const [text, setText] = useState('')
    // const [strokeColor, setStrokeColor] = useState('')
    // const [fillColor, setFillColor] = useState('')

    // const onAddCircle = () => {
    //     editor?.addCircle()
    // }
    // const onAddRectangle = () => {
    //     editor?.addRectangle()
    // }
    // const onAddLine = () => {
    //     editor?.addLine()
    // }
    // const onAddText = () => {
    //     if (selectedObjects?.length) {
    //         return editor?.updateText(text)
    //     }
    //     editor?.addText(text)
    // }
    // const onSetStrokeColor = () => {
    //     editor?.setStrokeColor(strokeColor)
    // }
    // const onSetFillColor = () => {
    //     editor?.setFillColor(fillColor)
    // }
    // const onDeleteAll = () => {
    //     editor?.deleteAll()
    // }
    // const onDeleteSelected = () => {
    //     editor?.deleteSelected()
    // }
    // const onZoomIn = () => {
    //     editor?.zoomIn()
    // }
    // const onZoomOut = () => {
    //     editor?.zoomOut()
    // }
    // return (
    //     <>
    //         {editor ? (
    //             <div className="flex flex-col">
    //                 <button onClick={onZoomIn}>Zoom In</button>
    //                 <button onClick={onZoomOut}>Zoom Out</button>
    //                 <button onClick={onAddCircle}>Add circle</button>
    //                 <button onClick={onAddRectangle}>Add Rectangle</button>
    //                 <button onClick={onAddLine}>Add Line</button>
    //                 <button onClick={onDeleteAll}>Delete All</button>
    //                 <button onClick={onDeleteSelected}>Delete Selected</button>
    //                 <input
    //                     type='text'
    //                     value={text}
    //                     onChange={(e) => setText(e.target.value)}
    //                 />
    //                 <button onClick={onAddText}>Add Text</button>
    //                 <input
    //                     type='text'
    //                     value={strokeColor || editor.strokeColor}
    //                     onChange={(e) => setStrokeColor(e.target.value)}
    //                 />
    //                 <button onClick={onSetStrokeColor}>Set Stroke Color</button>
    //                 <input
    //                     type='text'
    //                     value={fillColor || editor.fillColor}
    //                     onChange={(e) => setFillColor(e.target.value)}
    //                 />
    //                 <button onClick={onSetFillColor}>Set Fill Color</button>

    //                 <pre>
    //                     fillColor: {editor.fillColor}, strokeColor: {editor.strokeColor}
    //                 </pre>
    //                 <pre>{JSON.stringify(selectedObjects)}</pre>
    //             </div>
    //         ) : (
    //             <>Loading...</>
    //         )}
    //         <FabricJSCanvas className='sample-canvas bg-white' onReady={onReady} />
    //     </>
    // )

};

export default Test;

