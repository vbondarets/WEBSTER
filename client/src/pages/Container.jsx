import React from 'react'

const Container = ({component}) => {
  return (
    <div className='flex flex-col min-h-screen bg-mainColor text-mainFontColor'>
        <div>{component}</div>
    </div>
  )
}

export default Container