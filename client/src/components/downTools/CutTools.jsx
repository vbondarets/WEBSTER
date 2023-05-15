import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import { setFormat } from "../../store/reducers/ToolSlice";
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

const CutTools = () => {
    const cutBar = useRef();
    const { downTools } = useSelector((state) => state.toolReducer);
    const dispatch = useDispatch();

    const chooseHandler = (e, format) => {
        e.currentTarget.parentNode.childNodes.forEach(el => el.classList = [`${format} format h-5/6 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`])
        e.currentTarget.classList = [`${format} formats h-5/6 w-20 text-amber-200  border border-mainFontColor rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`]
        dispatch(setFormat({ format }))
    }
    useEffect(() => {
        cutBar.current.childNodes.forEach((format) => {
            if (format.classList[0] === downTools[0].curFormat) {
                format.classList = [`${format.classList[0]} formats h-5/6 w-20 text-amber-200  border border-mainFontColor rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`]
            }
        })
    }, [])
    return (
        <div ref={cutBar} className='formatTool w-fit h-full mt-1 font-sans flex flex-row space-x-6 mx-auto'>
            {downTools[0].formats.map(format => {
                return <div
                    key={format}
                    className={`${format} format h-5/6 w-20 hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
                    onClick={(e) => { chooseHandler(e, format) }}
                >
                    {format === 'Custom'
                        ?
                        <div className='iconContainer w-fit h-2/3 mt-1'>
                            <CheckBoxOutlineBlankRoundedIcon />
                        </div>
                        :
                        <div className='iconContainer w-fit h-2/3 mt-1'>
                            <ContentCutRoundedIcon />
                        </div>
                    }
                    <p className='mb-1'>{format}</p>
                </div>
            })}
        </div>
    )
}

export default CutTools