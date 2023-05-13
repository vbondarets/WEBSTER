import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const toolSlice = createSlice({
    name: 'tool',
    initialState: { 
        tools: ['cut', 'filters', 'colors', 'draw', 'rotate', 'text', 'resize', 'image'], 
        downTools: [{
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
            curSetting: 'brightness',
            filters: [
                {
                    name:'brightness',
                    value: 100
                }, 
                {
                    name:'contrast',
                    value: 100
                }, 
                {
                    name:'saturation',
                    value: 100
                }, 
                {
                    name:'exposure',
                    value: 100
                }, 
                {
                    name:'temperature',
                    value: 100
                }, 
                {
                    name:'gamma',
                    value: 100
                }, 
                {
                    name:'clarity',
                    value: 100
                }, 
                {
                    name:'vingette',
                    value: 100
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
        // setTool: (state, action) => {
        //     state.curTool = jwt_token;
        //     state.currDownTool = true;
        //     state.id = id;
        //     state.confirmed = confirmed;
        //     console.log("data refreshed")
        //     state.role = role;
        // }
    }
})
export const { setCredentials, logOut } = toolSlice.actions;

export default toolSlice.reducer;