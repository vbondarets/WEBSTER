import React from 'react'

const DownBar = () => {
  return (
    <div className='h-24 w-full bg-[#131314] border-t-2 border-slate-700 flex flex-row'>
        <div className='tool'>

        </div>
        <div className='mx-auto font-sans flex space-x-24'>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Brightness</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Contrast</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Saturation</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Exposure</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Temperature</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Gamma</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Clarity</p>
            <p className='p-2 h-fit hover:text-amber-200 hover:bg-[#333042] rounded-2xl cursor-pointer'>Vingette</p>
        </div>
    </div>
  )
}

export default DownBar