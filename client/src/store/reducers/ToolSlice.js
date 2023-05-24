import { createSlice } from "@reduxjs/toolkit";

let initialState = {
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
            position: { x: 0, y: 0, width: 0, height: 0, unit: "px" },
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
            curTool: "free",
            curColor: { rgb: { r: 0, g: 0, b: 0, a: 1 } },
            tools: [
                "free",
                "straight",
                "arrow",
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
        setPosition: (state, action) => {
            state.states[state.curState].downTools[0].position = action.payload;
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
            state.states[state.curState].downTools[3].curColor =
                action.payload.color;
        },
        setDrawTool: (state, action) => {
            state.states[state.curState].downTools[3].curTool =
                action.payload.tool;
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
    setPosition,
    setFontSize,
    resetState,
    undoState,
    redoState,
} = toolSlice.actions;

export default toolSlice.reducer;
