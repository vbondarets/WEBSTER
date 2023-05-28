import React from 'react'
import { HuePicker, AlphaPicker } from 'react-color'
import { useSelector } from 'react-redux';
import { TbArrowWaveRightUp } from "react-icons/tb";
import { AiOutlineMinus } from "react-icons/ai";
// import { BsArrowUpRight } from "react-icons/bs";
import { IoTriangleSharp } from "react-icons/io5";
import { BsSquareFill } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { setDrawColor, setDrawSize } from "../../store/reducers/ToolSlice";
import { setDrawTool } from "../../store/reducers/ToolSlice";
import { Slider } from '@mui/material';
import OpenWithIcon from '@mui/icons-material/OpenWith';

const DrawTool = () => {
  const iconsArr = [
  <TbArrowWaveRightUp
    className='w-full h-full'
  />,
  <AiOutlineMinus
    className='w-full h-full'
  />,
  <IoTriangleSharp />,
  <BsSquareFill />,
  <BsFillCircleFill />
  ]

  const { downTools, canvas } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
  const dispatch = useDispatch();

  const colorHandler = (color) => {
    dispatch(setDrawColor({ color }))
    const fillColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`

    canvas.getActiveObjects().forEach(element => {
      console.log(element.type)
      element.set({fill: element.type !=="path" && fillColor, stroke: fillColor})
    });
    canvas.renderAll()
  }

  return (
    <div className='drawTools flex w-full h-full font-sans justify-center gap-3'>
      <div 
        className={`move ${"move" === downTools[3].curTool && "text-amber-200 border border-mainFontColor"} h-20 w-20 rounded-2xl cursor-pointer flex flex-col justify-center items-center hover:text-amber-200 hover:bg-[#333042]`}
        onClick={(e) => { dispatch(setDrawTool({tool: 'move'}))}}
      >
        <OpenWithIcon/>
      </div>
      {downTools[3].tools.map((tool, index) => {
        return <div
          key={tool}
          className={`${tool} ${tool === downTools[3].curTool && "text-amber-200 border border-mainFontColor"} h-20 w-20 rounded-2xl cursor-pointer flex flex-col justify-center items-center hover:text-amber-200 hover:bg-[#333042]`}
          onClick={(e) => { dispatch(setDrawTool({tool}))}}
        >
          {iconsArr[index]}
        </div>
      })}
      <div className='flex flex-col ml-3 w-fit h-full'>
        <HuePicker
          width='200px'
          className='mx-auto mt-2 w-1'
          color={downTools[3].curColor}
          onChange={(color => colorHandler(color.rgb))}
        />
        <AlphaPicker
          width='200px'
          className='mx-0 mt-2 w-1'
          color={downTools[3].curColor.rgb}
          onChange={(color => colorHandler(color.rgb))}
        />
         <Slider
                aria-label="discrete-slider"
                value={downTools[3].size}
                valueLabelDisplay="auto"
                step={1}
                marks={true}
                min={1}
                max={100}
                onChange={(e, value) => {
                    dispatch(setDrawSize({ size: value }));
                }}
            />
      </div>
    </div>
  )
}

export default DrawTool