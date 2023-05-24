import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFont } from '../../store/reducers/ToolSlice';
import { CompactPicker } from 'react-color';
import { setFontColor } from '../../store/reducers/ToolSlice';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { setFontPosition } from '../../store/reducers/ToolSlice';
import { setFontSize } from '../../store/reducers/ToolSlice';

const TextTools = () => {
    const { downTools } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
    const dispatch = useDispatch();
    const positionArr =[<FormatAlignLeftIcon/>, <FormatAlignCenterIcon/>, <FormatAlignRightIcon/>]

    return (
        <div className='textTools flex flex-row w-fit h-full mt-1 font-sans mx-auto space-x-6'>
            <div className='fontChange my-auto'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel style={{ color: "rgb(112, 160, 203)" }} className=' text-mainFontColor '>Font</InputLabel>
                    <Select
                        style={{ color: "rgb(112, 160, 203)" }}
                        autoWidth
                        value={downTools[5].curFont}
                        onChange={event => dispatch(setFont({ font: event.target.value }))}
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
                    }
                    else if(event.target.value < 1){
                        dispatch(setFontSize({size: 1}))
                    }
                    else {
                        dispatch(setFontSize({size: event.target.value}))
                    }
                }}
            />
            {downTools[5].positions.map((position, index) => {
                return <div
                        key={position}
                        className={`${position} ${position === downTools[5].curPosition && "text-amber-200 border border-mainFontColor"}tools h-5/6 w-20 rounded-2xl cursor-pointer flex flex-col justify-center items-center hover:text-amber-200 hover:bg-[#333042] content-center`}
                        onClick={() => {dispatch(setFontPosition({position}))}}
                >
                    {positionArr[index]}
                    <p>{position}</p>
                </div>
            })}
            <div>
                <CompactPicker
                    color={downTools[5].curColor}
                    onChangeComplete={color => dispatch(setFontColor({ color: color.rgb }))}
                />
            </div>
        </div>
    )
}

export default TextTools