import React, {useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { setFilter, applyFilters } from "../../store/reducers/ToolSlice";

const FilterTools = () => {
    const { downTools,  previewImg} = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
    const filtersBar = useRef();
    // const filter = useRef();
    const dispatch = useDispatch();

    const applyNewFilters = (curFilters, newFilters) => {

        let filterArr = curFilters.map((filter, index) => {
            return {
                name: filter.name,
                value: newFilters[filter.name === "Hue-rotate" ? "hueRotate" :filter.name.toLowerCase()]
            }
        });
        dispatch(applyFilters({filters: filterArr}))
    }

    return (
        <div ref={filtersBar} className='filterTool h-full font-sans flex justify-center gap-3'>
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
                    className={`${filter} ${downTools[1].filters[index] === downTools[1].curFilter && "text-amber-200  border border-mainFontColor"} select-none filters h-24 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center px-1 py-3`}
                    onClick={() => {
                        dispatch(setFilter({filter}))
                        applyNewFilters(downTools[2].filters, downTools[1].filtersValues[index])
                        // dispatch(applyFilters({filterIndex: index}))
                    }}
                >
                    <div 
                        className='imageContainer flex justify-center'
                    >
                        {/* <ImageRoundedIcon/> */}
                        {/* {console.log(filter)} */}
                        {previewImg 
                        ?
                            <img 
                                style={{filter: filterStr(downTools[1].filtersValues[index])}}
                                className='rounded-lg'
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