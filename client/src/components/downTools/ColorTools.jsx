import { Slider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDownTool, setValues } from "../../store/reducers/ToolSlice";

const ColorTools = () => {
    const colorsBar = useRef();
    const dispatch = useDispatch();
    const { downTools } = useSelector((state) => state.toolReducer);
    const { curDownTool } = useSelector((state) => state.toolReducer);
    const [value, setValue] = useState(100);

    const setActive = (e, filterValue) => {
        // console.log(filterValue);
        setValue(filterValue);
        e.target.parentNode.childNodes.forEach(el => el.classList = ['colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'])
        e.target.classList = ['colors p-2 h-fit text-amber-200 rounded-2xl cursor-pointer'];
        dispatch(setDownTool({ curDownTool: e.target.innerText }))
        dispatch(setValues({
            toolIndex: 2,
            values: {
                curSetting: e.target.innerText,
                name: "colors",
                filters: downTools[2].filters
            }
        }));
        setValue(filterValue);
    }

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        if (typeof newValue === 'number' && newValue !== null) {
            dispatch(setValues({
                toolIndex: 2,
                values: {
                    curSetting: curDownTool,
                    name:"colors",
                    filters: downTools[2].filters.map(filter => {
                        if(filter.name === curDownTool){
                            return({
                                name: filter.name,
                                value: newValue
                            })
                        }
                        else {
                            return({
                                name: filter.name,
                                value: filter.value
                            })
                        }
                    })
                }
            }));
        }
    };
    useEffect(() => {
        if(downTools[2].curSetting){
            downTools[2].filters.forEach(filter => {
                if(filter.name === downTools[2].curSetting){
                    setValue(filter.value)
                }
            })
            colorsBar.current.childNodes.forEach(filter => {
                if(filter.innerText === downTools[2].curSetting){
                    filter.classList = ['colors p-2 h-fit text-amber-200 rounded-2xl cursor-pointer']
                }
            })
        }
    }, [])

    return (
        <div className='colorTool'>
            <div className='w-3/6 mx-auto'>
                {curDownTool != null &&
                    <Slider
                        aria-label="discrete-slider"
                        value={value}
                        valueLabelDisplay="auto"
                        step={5}
                        marks={true}
                        min={0}
                        max={200}
                        onChange={handleChange}
                    />
                }
            </div>
            <div ref={colorsBar} className='colorsBar w-fit mt-1 mx-auto font-sans flex space-x-24'>
                {downTools[2].filters.map(filter => {
                    return <p
                        key={filter.name}
                        className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
                        onClick={(e) => { setActive(e, filter.value) }}
                    >
                        {filter.name}
                    </p>
                })}
            </div>
        </div>
    )
}

export default ColorTools