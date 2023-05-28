import React, { useEffect, useState } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { FabricJSCanvas, useFabricJSEditor } from '../components/FabricReact/lib'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFontColor, setFontPosition, setFontSize } from "../store/reducers/ToolSlice";
import { fabric } from "fabric";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setFont } from '../store/reducers/ToolSlice';
import { ChromePicker } from 'react-color';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';


const Test = () => {
    const positionArr = [<FormatAlignLeftIcon />, <FormatAlignCenterIcon />, <FormatAlignRightIcon />]

    const { selectedObjects, editor, onReady } = useFabricJSEditor({
        defaultStrokeColor: 'red'
    })
    const { downTools } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
    const [text] = useState('Your text')

    useEffect(() => {
        if (!editor || !fabric) {
            return;
        }
        editor.canvas.freeDrawingBrush.color = `rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`;
        // editor?.setFillColor(`rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`)
        console.log(editor.canvas.freeDrawingBrush)
        editor.setStrokeColor(`rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`);
        // eslint-disable-next-line
    }, [downTools[5].curColor]);

    const toggleDraw = () => {
        editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    };

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

    const dispatch = useDispatch();
    const [onColor, setOnColor] = useState(false)
    return (
        <div>
            {editor ? (
                <div>
                    <button onClick={onAddText}>Add Text</button>
                </div>
            ) : (
                <>Loading...</>
            )}
            <FabricJSCanvas onReady={onReady} />
            {/* /////////////////// */}
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
            <button onClick={toggleDraw}>
                Toggle draw
            </button>
            <input
                type="number"
                className='bg-transparent w-16 p-2 h-fit border rounded-xl border-mainFontColor my-auto'
                placeholder="Size"
                value={downTools[5].size}
                min={1}
                max={99}
                onChange={(event) => {
                    if (event.target.value > 99) {
                        dispatch(setFontSize({ size: 99 }))
                        onUpdateFontSize(event.target.value)
                    }
                    else if (event.target.value < 0) {
                        dispatch(setFontSize({ size: 0 }))
                        onUpdateFontSize(event.target.value)
                    }
                    else {
                        dispatch(setFontSize({ size: event.target.value }))
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
                        dispatch(setFontPosition({ position }))
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
        </div>
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
    /////////////////////////////////////////////////////////////
    //
    //
    // import React, { useEffect, useState } from "react";
    // import { fabric } from "fabric";
    // import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
    // import "./styles.css";

    // export default function App() {
    //     const { editor, onReady } = useFabricJSEditor();

    //     const history = [];
    //     const [color, setColor] = useState("#35363a");
    //     const [cropImage, setCropImage] = useState(true);

    //     useEffect(() => {
    //         if (!editor || !fabric) {
    //             return;
    //         }

    //         if (cropImage) {
    //             editor.canvas.__eventListeners = {};
    //             return;
    //         }

    //         if (!editor.canvas.__eventListeners["mouse:wheel"]) {
    //             editor.canvas.on("mouse:wheel", function (opt) {
    //                 var delta = opt.e.deltaY;
    //                 var zoom = editor.canvas.getZoom();
    //                 zoom *= 0.999 ** delta;
    //                 if (zoom > 20) zoom = 20;
    //                 if (zoom < 0.01) zoom = 0.01;
    //                 editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //                 opt.e.preventDefault();
    //                 opt.e.stopPropagation();
    //             });
    //         }

    //         if (!editor.canvas.__eventListeners["mouse:down"]) {
    //             editor.canvas.on("mouse:down", function (opt) {
    //                 var evt = opt.e;
    //                 if (evt.ctrlKey === true) {
    //                     this.isDragging = true;
    //                     this.selection = false;
    //                     this.lastPosX = evt.clientX;
    //                     this.lastPosY = evt.clientY;
    //                 }
    //             });
    //         }

    //         if (!editor.canvas.__eventListeners["mouse:move"]) {
    //             editor.canvas.on("mouse:move", function (opt) {
    //                 if (this.isDragging) {
    //                     var e = opt.e;
    //                     var vpt = this.viewportTransform;
    //                     vpt[4] += e.clientX - this.lastPosX;
    //                     vpt[5] += e.clientY - this.lastPosY;
    //                     this.requestRenderAll();
    //                     this.lastPosX = e.clientX;
    //                     this.lastPosY = e.clientY;
    //                 }
    //             });
    //         }

    //         if (!editor.canvas.__eventListeners["mouse:up"]) {
    //             editor.canvas.on("mouse:up", function (opt) {
    //                 // on mouse up we want to recalculate new interaction
    //                 // for all objects, so we call setViewportTransform
    //                 this.setViewportTransform(this.viewportTransform);
    //                 this.isDragging = false;
    //                 this.selection = true;
    //             });
    //         }

    //         editor.canvas.renderAll();
    //     }, [editor]);

    //     const addBackground = () => {
    //         if (!editor || !fabric) {
    //             return;
    //         }

    //         fabric.Image.fromURL(
    //             "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
    //             (image) => {
    //                 editor.canvas.setBackgroundImage(
    //                     image,
    //                     editor.canvas.renderAll.bind(editor.canvas)
    //                 );
    //             }
    //         );
    //     };

    //     const fromSvg = () => {
    //         fabric.loadSVGFromString(
    //             `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    // <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    // <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
    // <desc>Created with Fabric.js 5.3.0</desc>
    // <defs>
    // </defs>
    // <g transform="matrix(1 0 0 1 662.5 750)"  >
    //   <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg" x="-662.5" y="-750" width="1325" height="1500"></image>
    // </g>
    // <g transform="matrix(1 0 0 1 120.5 120.5)"  >
    // <circle style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" r="20" />
    // </g>
    // <g transform="matrix(1 0 0 1 245.5 200.5)"  >
    // <line style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x1="-75" y1="-50" x2="75" y2="50" />
    // </g>
    // <g transform="matrix(1 0 0 1 141.4 220.03)" style=""  >
    //     <text xml:space="preserve" font-family="Arial" font-size="16" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(53,54,58); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-16.9" y="-5.46" >inset</tspan><tspan x="-16.9" y="15.51" >text</tspan></text>
    // </g>
    // <g transform="matrix(1 0 0 1 268.5 98.5)"  >
    // <rect style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  x="-20" y="-20" rx="0" ry="0" width="40" height="40" />
    // </g>
    // </svg>`,
    //             (objects, options) => {
    //                 editor.canvas._objects.splice(0, editor.canvas._objects.length);
    //                 editor.canvas.backgroundImage = objects[0];
    //                 const newObj = objects.filter((_, index) => index !== 0);
    //                 newObj.forEach((object) => {
    //                     editor.canvas.add(object);
    //                 });

    //                 editor.canvas.renderAll();
    //             }
    //         );
    //     };

    //     useEffect(() => {
    //         if (!editor || !fabric) {
    //             return;
    //         }
    //         editor.canvas.setHeight(500);
    //         editor.canvas.setWidth(500);
    //         addBackground();
    //         editor.canvas.renderAll();
    //     }, [editor?.canvas.backgroundImage]);

    //     const toggleSize = () => {
    //         editor.canvas.freeDrawingBrush.width === 12
    //             ? (editor.canvas.freeDrawingBrush.width = 5)
    //             : (editor.canvas.freeDrawingBrush.width = 12);
    //     };

    //     useEffect(() => {
    //         if (!editor || !fabric) {
    //             return;
    //         }
    //         editor.canvas.freeDrawingBrush.color = color;
    //         editor.setStrokeColor(color);
    //     }, [color]);

    //     const toggleDraw = () => {
    //         editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    //     };
    //     const undo = () => {
    //         if (editor.canvas._objects.length > 0) {
    //             history.push(editor.canvas._objects.pop());
    //         }
    //         editor.canvas.renderAll();
    //     };
    //     const redo = () => {
    //         if (history.length > 0) {
    //             editor.canvas.add(history.pop());
    //         }
    //     };

    //     const clear = () => {
    //         editor.canvas._objects.splice(0, editor.canvas._objects.length);
    //         history.splice(0, history.length);
    //         editor.canvas.renderAll();
    //     };

    //     const removeSelectedObject = () => {
    //         editor.canvas.remove(editor.canvas.getActiveObject());
    //     };

    //     const onAddCircle = () => {
    //         editor.addCircle();
    //         editor.addLine();
    //     };
    //     const onAddRectangle = () => {
    //         editor.addRectangle();
    //     };
    //     const addText = () => {
    //         editor.addText("inset text");
    //     };

    //     const exportSVG = () => {
    //         const svg = editor.canvas.toSVG();
    //         console.info(svg);
    //     };

    //     return (
    //         <div className="App">
    //             <h1>FabricJS React Sample</h1>
    //             <button onClick={onAddCircle}>Add circle</button>
    //             <button onClick={onAddRectangle} disabled={!cropImage}>
    //                 Add Rectangle
    //             </button>
    //             <button onClick={addText} disabled={!cropImage}>
    //                 Add Text
    //             </button>
    //             <button onClick={toggleDraw} disabled={!cropImage}>
    //                 Toggle draw
    //             </button>
    //             <button onClick={clear} disabled={!cropImage}>
    //                 Clear
    //             </button>
    //             <button onClick={undo} disabled={!cropImage}>
    //                 Undo
    //             </button>
    //             <button onClick={redo} disabled={!cropImage}>
    //                 Redo
    //             </button>
    //             <button onClick={toggleSize} disabled={!cropImage}>
    //                 ToggleSize
    //             </button>
    //             <button onClick={removeSelectedObject} disabled={!cropImage}>
    //                 Delete
    //             </button>
    //             <button onClick={(e) => setCropImage(!cropImage)}>Crop</button>
    //             <label disabled={!cropImage}>
    //                 <input
    //                     disabled={!cropImage}
    //                     type="color"
    //                     value={color}
    //                     onChange={(e) => setColor(e.target.value)}
    //                 />
    //             </label>
    //             <button onClick={exportSVG} disabled={!cropImage}>
    //                 {" "}
    //                 ToSVG
    //             </button>
    //             <button onClick={fromSvg} disabled={!cropImage}>
    //                 fromsvg
    //             </button>

    //             <div
    //                 style={{
    //                     border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
    //                     width: "500px",
    //                     height: "500px"
    //                 }}
    //             >
    //                 <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    //             </div>
    //         </div>
    //     );
    // }

};

export default Test;

