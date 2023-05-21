import React from 'react'
import ColorTools from './downTools/ColorTools'
import { useSelector } from 'react-redux';
import FilterTools from './downTools/FilterTools';
import CutTools from './downTools/CutTools';
import DrawTool from './downTools/DrawTools';
import TextTools from './downTools/TextTools';
import RotateTools from './downTools/RotateTools';

const DownBar = () => {
  const { curTool } = useSelector((state) => state.toolReducer);
  
  return (
    <div className='flex flex-col items-center justify-center h-24 w-full z-20 bg-[#131314] border-t-2 border-slate-700'>
      {
        {
          'Cut': <CutTools/>,
          'Filters':<FilterTools/>,
          'Colors': <ColorTools/>,
          'Draw': <DrawTool/>,
          'Rotate':<RotateTools/>,
          'Text': <TextTools/>,
          'Resize': <p>resize</p>,
          'Image':<p>image</p>,
        }[curTool]
      }
    </div>
  )
}

export default DownBar