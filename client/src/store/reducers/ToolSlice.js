import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
    name: 'tool',
    initialState: { 
        tools: ['Cut', 'Filters', 'Colors', 'Draw', 'Rotate', 'Text', 'Resize', 'Image'], 
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
                    name:'Saturation',
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
            curColor: 'rgba(0,0,0,0,0)',
            tools: ['free', 'straight', 'arrow', 'triangle', 'rectangle', 'circle']
        }, 
        {
            name: 'Rotate',
            value: 180,
        }, 
        {
            name: 'Text',
            curFont: 'arial',
            curPosition: 'left',
            curColor: 'rgba(0,0,0,0,0)',
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
        setValues: (state, action) => {
            state.downTools[action.payload.toolIndex] = action.payload.values;
        },
        setFilter: (state, action) => {
            state.downTools[1].curFilter = action.payload.filter;
        }
    }
})
export const { setTool, setDownTool, setValues, setFilter } = toolSlice.actions;

export default toolSlice.reducer;