import React from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import CropIcon from '@mui/icons-material/Crop';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';

const ToolBar = () => {
  return (
    <div className='ToolBar h-128 w-10 bg-[#131314] grid grid-cols-1 border-r-2 border-slate-700'>
        <CropIcon className=' ml-1 mt-2 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
        <TuneIcon className='ml-1 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
        <PaletteRoundedIcon className='ml-1 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
        <BrushIcon className='ml-1 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
        <RotateLeftRoundedIcon className='ml-1 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
        <FormatColorTextRoundedIcon className='ml-1 rounded-2xl hover:text-amber-200 hover:bg-[#333042] cursor-pointer'/>
    </div>
  )
}

export default ToolBar