import React, { useState } from 'react'
import { HuePicker, AlphaPicker } from 'react-color'
import { useSelector } from 'react-redux';
import { TbArrowWaveRightUp } from "react-icons/tb";
import { AiOutlineMinus } from "react-icons/ai";
import { BsArrowUpRight } from "react-icons/bs";
import { IoTriangleSharp } from "react-icons/io5";
import { BsSquareFill } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { setDrawColor } from "../../store/reducers/ToolSlice";


const DrawTool = () => {
  const iconsArr = [<TbArrowWaveRightUp
    className='w-full h-full'
  />,
  <AiOutlineMinus
    className='w-full h-full'
  />,
  <BsArrowUpRight
    className='w-full h-full'
  />,
  <IoTriangleSharp />,
  <BsSquareFill />,
  <BsFillCircleFill />
  ]
  
  const { downTools } = useSelector((state) => state.toolReducer);
  const dispatch = useDispatch();

  const colorHandler = (color) => {
    dispatch(setDrawColor({ color }))
  }


  return (
    <div className='drawTools flex flex-row w-fit h-full mt-1 font-sans mx-auto space-x-6'>
      {console.log(color)}
      {downTools[3].tools.map((tool, index) => {
        return <div
          key={tool}
          className={`${tool} tools h-5/6 w-20 text-amber-200  border border-mainFontColor rounded-2xl cursor-pointer flex flex-col justify-center items-center content-center`}
          onClick={(e) => { }}
        >
          {iconsArr[index]}
        </div>
      })}
      <div className=' flex flex-col w-fit h-full'>
        <HuePicker
          width='200px'
          className='mx-auto mt-2 w-1'
          color={downTools[3].curColor}
          onChange={(color => colorHandler(color.rgb))}
        />
        <AlphaPicker
          width='200px'
          className='mx-0 mt-2 w-1'
          color={downTools[3].curColor}
          onChange={(color => colorHandler(color.rgb))}
        />
      </div>
    </div>
  )
}

export default DrawTool