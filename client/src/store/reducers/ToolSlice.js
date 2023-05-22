import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
    name: 'tool',
    initialState: { 
        tools: ['Cut', 'Filters', 'Colors', 'Draw', 'Rotate', 'Text', 'Resize', 'Image'], 
        previewImg: null,
        downTools: [
        {
            name: 'Cut',
            curFormat: 'Custom',
            position: '',
            formats: ['Custom', '1:1', '3:2', '4:3', '5:4', '7:5', '16:9']
        }, 
        {
            name: 'Filters',
            curFilter: 'Default',
            filters: ['Default', 'Chrome', 'Fade', 'Cold', 'Warm', 'Mono', 'Stark', 'Sepia', 'Rust']

        }, 
        {
            name: 'Colors',
            curSetting: null,
            filters: [
                {
                    name:'Brightness',
                    value: 100
                }, 
                {
                    name:'Contrast',
                    value: 100
                }, 
                {
                    name:'Saturate',
                    value: 100
                }, 
                {
                    name:'Grayscale',
                    value: 0
                }, 
                {
                    name:'Blur',
                    value: 0
                }, 
                {
                    name:'Sepia',
                    value: 0
                }, 
                {
                    name:'Invert',
                    value: 0
                }, 
                {
                    name:'Hue-rotate',
                    value: 0
                }]
        }, 
        {
            name: 'Draw',
            curTool: 'free',
            curColor: {rgb: {r: 0, g: 0, b: 0,a: 1}},
            tools: ['free', 'straight', 'arrow', 'triangle', 'rectangle', 'circle']
        }, 
        {
            name: 'Rotate',
            value: 0,
        }, 
        {
            name: 'Text',
            curFont: 'arial',
            curPosition: 'left',
            curColor: {rgb: {r: 0, g: 0, b: 0,a: 1}},
            size: 20,
            fonts: ['arial', 'helvetica', 'tnr', 'futura', 'rockwell'],
            position: ['left', 'center', 'right'],
        }, 
        {
            name: 'Resize',
            height: 1080,
            width: 1920
        }, 
        {
            name: 'Image',
            curOpt: 'add',
            options: ['add', 'generate']
        }], 
        curTool: null,
        curDownTool: null, 
    },
    reducers: {
        setTool: (state, action) => {
            state.curTool = action.payload.curTool;
        },
        setDownTool: (state, action) => {
            state.curDownTool = action.payload.curDownTool;
        },
        setPreviewImg: (state, action) => {
            state.previewImg = action.payload.previewImg;
            console.log(state.previewImg)
        },
        setValues: (state, action) => {
            state.downTools[action.payload.toolIndex] = action.payload.values;
            console.log(state.downTools[2].curSetting)
        },
        setFormat: (state, action) => {
            state.downTools[0].curFormat = action.payload.format;
            console.log(state.downTools[0].curFormat)
        },
        setRotate: (state, action) => {
            state.downTools[4].value = action.payload.value;
            console.log(state.downTools[4].value);
        },
        setFilter: (state, action) => {
            state.downTools[1].curFilter = action.payload.filter;
        },
        setDrawColor: (state, action) => {
            state.downTools[3].curColor = action.payload.color;
        },
        setDrawTool: (state, action) => {
            state.downTools[3].curTool = action.payload.tool;
            console.log(state.downTools[3].curTool);
        },
    }
})
export const { setTool, setDownTool, setValues, setFilter, setFormat, setDrawColor, setPreviewImg, setRotate, setDrawTool } = toolSlice.actions;

export default toolSlice.reducer;