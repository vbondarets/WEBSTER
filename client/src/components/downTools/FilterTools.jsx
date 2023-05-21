import React, {useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { setFilter } from "../../store/reducers/ToolSlice";

const FilterTools = () => {
    const { downTools } = useSelector((state) => state.toolReducer);
    const filtersBar = useRef();
    const dispatch = useDispatch();
    const chooseHandler = (e, filter) => {
        e.currentTarget.parentNode.childNodes.forEach(el => el.classList = [`${filter} filters h-5/6 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`])
        e.currentTarget.classList = [`${filter} filters h-5/6 w-20 text-amber-200  border border-mainFontColor rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`]
        dispatch(setFilter({filter}))
    }
    return (
        <div ref={filtersBar} className='filterTool w-fit h-full mt-1 font-sans flex flex-row space-x-6 mx-auto'>
            {downTools[1].filters.map((filter, index) => {
                if(downTools[1].filters[index] === downTools[1].curFilter){
                    return <div
                        key={filter}
                        className={`${filter} filters h-5/6 w-20 text-amber-200  border border-mainFontColor rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
                        onClick={(e) => {chooseHandler(e, filter)}}
                    >
                        <div className='imageContainer w-fit h-2/3 mt-1'>
                            <ImageRoundedIcon/>
                        </div>
                        <p className='mb-1'>{filter}</p>
                    </div> 
                }
                else {
                    return <div
                        key={filter}
                        className={`${filter} filters h-5/6 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
                        onClick={(e) => {chooseHandler(e, filter)}}
                    >
                        <div className='imageContainer w-fit h-2/3 mt-1'>
                            <ImageRoundedIcon/>
                        </div>
                        <p className='mb-1'>{filter}</p>
                    </div> 
                }
            })}
        </div>
    )
}

export default FilterTools