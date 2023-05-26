import React, {useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { setFilter, applyFilters } from "../../store/reducers/ToolSlice";

const FilterTools = () => {
    const { downTools,  previewImg} = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
    const filtersBar = useRef();
    // const filter = useRef();
    const dispatch = useDispatch();
    return (
        <div ref={filtersBar} className='filterTool w-fit h-full mt-1 font-sans flex flex-row space-x-6 mx-auto'>
            {downTools[1].filters.map((filter, index) => {
                const filterStr = (filterObj) => {
                    let str = '';
                    for(let key in filterObj){
                        if(key === 'hueRotate'){
                            str += `hue-rotate(${filterObj[key]}deg) `
                        }
                        else if(key === 'blur'){
                            str += `${key}(${filterObj[key]}px) `
                        }
                        else {
                        str += `${key}(${filterObj[key]}%) `
                        }
                    }
                    return str;
                }
                return <div
                    key={filter}
                    className={`${filter} ${downTools[1].filters[index] === downTools[1].curFilter && "text-amber-200  border border-mainFontColor"} filters h-20 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
                    onClick={() => {
                        dispatch(setFilter({filter}))
                        dispatch(applyFilters({filter: index}))
                    }}
                >
                    <div 
                        className='imageContainer w-5/6 h-2/3 mt-1 flex justify-center'
                    >
                        {/* <ImageRoundedIcon/> */}
                        {/* {console.log(filter)} */}
                        {previewImg 
                        ?
                            <img 
                                style={{filter: filterStr(downTools[1].filtersValues[index])}}
                                className='rounded'
                                alt='filter' 
                                src={previewImg}
                            />
                        :
                            <ImageRoundedIcon/>
                        }
                    </div>
                    <p className='mb-1'>{filter}</p>
                </div>
            })}
        </div>
    )
}

export default FilterTools