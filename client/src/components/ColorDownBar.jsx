import { Slider } from '@mui/material'
import React from 'react'

const DownBar = () => {
  return (
    <div className='h-24 w-full bg-[#131314] border-t-2 border-slate-700 flex flex-col'>
      <div className='tool w-3/6 mx-auto'>
        <Slider
          aria-label="Temperature"
          defaultValue={100}
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={5}
          marks={true}
          min={0}
          max={200}
        />
      </div>
      <div className='colorsBar mt-1 mx-auto font-sans flex space-x-24'>
        <p
          className='colors p-2 h-fit text-amber-200 bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Brightness
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Contrast
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Saturation
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Exposure
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Temperature
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Gamma
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Clarity
        </p>
        <p
          className='colors p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'
          onClick={(e) => { }}
        >
          Vingette
        </p>
      </div>
    </div>
  )
}

export default DownBar