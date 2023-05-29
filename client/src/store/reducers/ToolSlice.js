import { createSlice } from "@reduxjs/toolkit";
// import addImage from "../../components/fabricJS/addImage";
import resizeCanvas from "../../components/fabricJS/resizeCanvas";


let initialState = {
    imageProportion: 1,
    maxHeight: 0,
    maxWidth: 0,
    canvas: undefined,
    canvasElement: undefined,
    tools: [
        "Cut",
        "Filters",
        "Colors",
        "Draw",
        "Rotate",
        "Text",
        "Resize",
        "Image",
    ],
    previewImg: null,
    image: null,
    downTools: [
        {
            name: "Cut",
            curFormat: "Custom",
            formats: ["Custom", "1:1", "3:2", "4:3", "5:4", "7:5", "16:9"],
        },
        {
            name: "Filters",
            curFilter: "Default",
            filters: [
                "Default",
                "Chrome",
                "Fade",
                "Cold",
                "Warm",
                "Mono",
                "Stark",
                "Sepia",
                "Rust",
            ],
            filtersValues: [
                {
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    grayscale: 0,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 100,
                    contrast: 120,
                    saturate: 125,
                    grayscale: 0,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 0,
                    invert: 0,

                },
                {
                    brightness: 120,
                    contrast: 90,
                    saturate: 85,
                    grayscale: 0,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 20,
                    invert: 0,
                },
                {
                    brightness: 103,
                    contrast: 117,
                    saturate: 65,
                    grayscale: 0,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 90,
                    contrast: 100,
                    saturate: 115,
                    grayscale: 0,
                    blur: 0,
                    sepia: 35,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    grayscale: 100,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 110,
                    contrast: 120,
                    saturate: 110,
                    grayscale: 100,
                    blur: 0,
                    sepia: 0,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    grayscale: 0,
                    blur: 0,
                    sepia: 100,
                    hueRotate: 0,
                    invert: 0,
                },
                {
                    brightness: 100,
                    contrast: 100,
                    saturate: 60,
                    grayscale: 0,
                    blur: 0,
                    sepia: 100,
                    invert: 0,
                    hueRotate: 0,
                },
            ]
        },
        {
            name: "Colors",
            curSetting: null,
            filters: [
                {
                    name: "Brightness",
                    value: 100,
                },
                {
                    name: "Contrast",
                    value: 100,
                },
                {
                    name: "Saturate",
                    value: 100,
                },
                {
                    name: "Grayscale",
                    value: 0,
                },
                {
                    name: "Blur",
                    value: 0,
                },
                {
                    name: "Sepia",
                    value: 0,
                },
                {
                    name: "Invert",
                    value: 0,
                },
                {
                    name: "Hue-rotate",
                    value: 0,
                },
            ],
        },
        {
            name: "Draw",
            curTool: "move",
            size: 5,
            curColor: { rgb: { r: 0, g: 0, b: 0, a: 1 } },
            tools: [
                "free",
                "straight",
                "triangle",
                "rectangle",
                "circle",
            ],
        },
        {
            name: "Rotate",
            value: 0,
        },
        {
            name: "Text",
            curFont: "Arial",
            curPosition: "left",
            curColor: { rgb: { r: 0, g: 0, b: 0, a: 1 } },
            size: 20,
            fonts: ["Arial", "Helvetica", "TNR", "Futura", "Rockwell"],
            positions: ["left", "center", "right"],
        },
        {
            name: "Resize",
            height: 1080,
            width: 1920,
        },
        {
            name: "Image",
            curOpt: "add",
            options: ["add", "generate"],
        },
    ],
    curTool: null,
    curDownTool: null,
};

const addValue = (state, action, key) => {
    const newValue = {
        ...state.states[state.curState],
        [key]: action.payload[key],
    };
    state.curState += 1;
    state.states = state.states.slice(0, state.curState);
    state.states.push(newValue);
};

const toolSlice = createSlice({
    name: "tool",
    initialState: { curState: 0, states: [initialState] },
    reducers: {
        setCanvas: (state, action) => {
            addValue(state, action, "canvas");
            // state.states[state.curState].canvas = action.payload.canvas
            // console.log(state.states[state.curState].canvas)
        },
        setCanvasElenment: (state, action) => {
            state.states[state.curState].canvasElement = action.payload.canvas
            console.log(state.states[state.curState].canvasElement)
        },
        setTool: (state, action) => {
            addValue(state, action, "curTool");
            // console.log(newValue)
        },
        setDownTool: (state, action) => {
            addValue(state, action, "curDownTool");
        },
        setPreviewImg: (state, action) => {
            addValue(state, action, "previewImg");
        },
        setImage: (state, action) => {
            state.states[state.curState].image = action.payload.image;
        },
        setValues: (state, action) => {
            const newValue = {
                ...state.states[state.curState].downTools,
                [action.payload.toolIndex]: action.payload.values,
            };
            state.states[state.curState].downTools = newValue;
        },
        setFormat: (state, action) => {
            state.states[state.curState].downTools[0].curFormat =
                action.payload.format;
            console.log(state.states[state.curState].downTools[0].curFormat);
        },
        setRotate: (state, action) => {
            state.states[state.curState].downTools[4].value =
                action.payload.value;
            // console.log(state.downTools[4].value);
        },
        setFilter: (state, action) => {
            state.states[state.curState].downTools[1].curFilter =
                action.payload.filter;
        },
        setDrawColor: (state, action) => {
            state.states[state.curState].downTools[3].curColor = {rgb: action.payload.color};
        },
        setDrawTool: (state, action) => {
            state.states[state.curState].downTools[3].curTool =
                action.payload.tool;
        },
        setDrawSize: (state, action) => {
            state.states[state.curState].downTools[3].size =
                action.payload.size;
        },
        setFont: (state, action) => {
            state.states[state.curState].downTools[5].curFont =
                action.payload.font;
        },
        setFontColor: (state, action) => {
            state.states[state.curState].downTools[5].curColor =
                action.payload.color;
        },
        setFontPosition: (state, action) => {
            state.states[state.curState].downTools[5].curPosition =
                action.payload.position;
        },
        setFontSize: (state, action) => {
            state.states[state.curState].downTools[5].size =
                action.payload.size;
        },
        setHight: (state, action) => {
            state.states[state.curState].downTools[6].height =
                action.payload.height;
            if (state.states[state.curState].canvas) {
                resizeCanvas(state.states[state.curState].previewImg, state.states[state.curState].canvas, action.payload.height, state.states[state.curState].downTools[6].width)
            }
        },
        setWidth: (state, action) => {
            state.states[state.curState].downTools[6].width =
            action.payload.width;
            if (state.states[state.curState].canvas) {
                resizeCanvas(state.states[state.curState].previewImg, state.states[state.curState].canvas, state.states[state.curState].downTools[6].height, action.payload.width)
            }
        },
        setMaxWidth: (state, action) => {
            state.states[state.curState].maxWidth =
                action.payload.width;
        },
        setMaxHight: (state, action) => {
            state.states[state.curState].maxHeight =
                action.payload.height;
        },
        resetState: (state) => {
            state.curState = 0;
            state.states = state.states.slice(0, 1);
        },
        undoState: (state) => {
            if (state.curState > 0) state.curState -= 1;
        },
        redoState: (state) => {
            if (state.curState < state.states.length - 1) state.curState += 1;
        },
        applyFilters:  (state, action) => {
             state.states[state.curState].downTools[2].filters = action.payload.filters
            //     console.log(incomeFilters[index], filter)
            // })
            
        },
        setImageProportion:  (state, action) => {
            state.states[state.curState].imageProportion = action.payload.proportion
       },
    },
});

export const {
    setTool,
    setDownTool,
    setValues,
    setFilter,
    setFormat,
    setDrawColor,
    setPreviewImg,
    setRotate,
    setDrawTool,
    setFont,
    setFontColor,
    setFontPosition,
    setImage,
    setFontSize,
    resetState,
    undoState,
    redoState,
    setCanvas,
    setHight,
    setWidth,
    setCanvasElenment,
    setMaxWidth,
    setMaxHight,
    applyFilters,
    setImageProportion,
    setDrawSize,
} = toolSlice.actions;

export default toolSlice.reducer;

