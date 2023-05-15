import React from 'react'
import ColorTools from './downTools/ColorTools'
import { useSelector } from 'react-redux';
import FilterTools from './downTools/FilterTools';
import CutTools from './downTools/CutTools';

const DownBar = () => {
  const { curTool } = useSelector((state) => state.toolReducer);
  
  return (
    <div className='h-24 w-full bg-[#131314] border-t-2 border-slate-700 flex flex-col'>
      {
        {
          'Cut': <CutTools/>,
          'Filters':<FilterTools/>,
          'Colors': <ColorTools/>,
          'Draw': <p>draw</p>,
          'Rotate':<p>rotate</p>,
          'Text': <p>text</p>,
          'Resize': <p>resize</p>,
          'Image':<p>image</p>,
        }[curTool]
      }
    </div>
  )
}

export default DownBar