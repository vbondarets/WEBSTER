import React from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import CropIcon from '@mui/icons-material/Crop';
import BrushIcon from '@mui/icons-material/Brush';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import AddToPhotosRoundedIcon from '@mui/icons-material/AddToPhotosRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useDispatch } from 'react-redux';
import { setTool} from "../store/reducers/ToolSlice";

const ToolBar = () => {
  const dispatch = useDispatch();

  const setActiveTool = (e) => {
    dispatch(setTool({curTool: e.currentTarget.classList[0]}))
    e.currentTarget.parentNode.childNodes.forEach(el => el.classList = [`${el.classList[0]} mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center`])
    e.currentTarget.classList = [`${e.currentTarget.classList[0]} mx-auto mt-2 rounded-2xl text-amber-200 cursor-pointer h-fit w-fit p-2 flex flex-col justify-center`]
  }

  return (
    <div className='ToolBar h-128 w-fit px-2 bg-[#131314] grid grid-cols-1 border-r-2 border-slate-700 mr-auto'>
      <div className='Cut mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <CropIcon className='mx-auto'/>
        <p>Cut</p>
      </div>
      <div className='Filters mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <TuneIcon className='mx-auto'/>
        <p>Filters</p>
      </div>
      <div className='Colors mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <PaletteRoundedIcon className='mx-auto'/>
        <p>Colors</p>
      </div>
      <div className='Draw mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <BrushIcon className='mx-auto'/>
        <p>Draw</p>
      </div>
      <div className='Rotate mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <RotateLeftRoundedIcon className='mx-auto'/>
        <p>Rotate</p>
      </div>
      <div className='Text mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <FormatColorTextRoundedIcon className='mx-auto'/>
        <p>Text</p>
      </div>
      <div className='Resize mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <AspectRatioRoundedIcon className='mx-auto'/>
        <p>Resize</p>
      </div>
      <div className='Image mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={setActiveTool}>
        <AddToPhotosRoundedIcon className='mx-auto'/>
        <p>Image</p>
      </div>
      <div className='Download mx-auto mt-2 rounded-2xl hover:text-amber-200 hover:bg-toolBg cursor-pointer h-fit w-fit p-2 flex flex-col justify-center' onClick={() => console.log("download")}>
        <DownloadRoundedIcon className='mx-auto'/>
        <p className='hidden'>Download</p>
      </div>
    </div>
  )
}

export default ToolBar