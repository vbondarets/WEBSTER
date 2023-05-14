import React from 'react'
import ToolBar from '../components/ToolBar'
import Canvas from '../components/Canvas'
import DownBar from '../components/DownBar'

const Studio = () => {
  return (
    <div className='flex flex-col w-full h-full'>
        <div className='flex flex-row w-full h-fit'>
            <ToolBar/>
            <Canvas/>
        </div>
        <DownBar/>
    </div>
  )
}

export default Studio