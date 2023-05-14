import { createSlice } from '@reduxjs/toolkit';

const toolSlice = createSlice({
    name: 'tool',
    initialState: { 
        tools: ['cut', 'filters', 'colors', 'draw', 'rotate', 'text', 'resize', 'image'], 
        downTools: [
        {
            name: 'cut',
            curFormat: 'custom',
            position: '',
            formats: ['custom', '1:1', '3:2', '4:3', '5:4', '7:5', '16:9']
        }, 
        {
            name: 'filters',
            curFilter: 'default',
            filters: ['default', 'chrome', 'fade', 'cold', 'warm', 'mono', 'stark', 'sepia', 'rust']

        }, 
        {
            name: 'colors',
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
            name: 'draw',
            curTool: 'free',
            curColor: 'rgba(0,0,0,0,0)',
            tools: ['free', 'straight', 'arrow', 'triangle', 'rectangle', 'circle']
        }, 
        {
            name: 'rotate',
            value: 180,
        }, 
        {
            name: 'text',
            curFont: 'arial',
            curPosition: 'left',
            curColor: 'rgba(0,0,0,0,0)',
            size: 20,
            fonts: ['arial', 'helvetica', 'tnr', 'futura', 'rockwell'],
            position: ['left', 'center', 'right'],
        }, 
        {
            name: 'resize',
            height: 1080,
            width: 1920
        }, 
        {
            name: 'image',
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
        }
    }
})
export const { setTool, setDownTool, setValues } = toolSlice.actions;

export default toolSlice.reducer;