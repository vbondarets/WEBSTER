import React from 'react'
import { Link } from 'react-router-dom';
import StartIcon from '@mui/icons-material/Start';
import AddFileTutorial from '../assets/Instructions/Add_file.gif'
import CutTutor from '../assets/Instructions/Cut.gif'
import ColorTutor from '../assets/Instructions/Color.gif'
import RotateTutor from '../assets/Instructions/Rotate.gif'
import TextTutor from '../assets/Instructions/Text.gif'
import DownloadTutor from '../assets/Instructions/Download.gif'

const MainPage = () => {
  return (
    <div className='flex flex-col mt-4 items-center'>
      <div className='flex justify-center w-1/2 bg-mainFontColor text-white rounded-xl p-5 shadow-lg shadow-blue-400/50'>
        <h1 className='text-2xl font-bold border-b w-full text-center'>INSTRUCTION</h1>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p>With the help of the <b>Webster</b> program, you can do all kinds of manipulations with the processing and adjustment of photos. So how to use this program?</p>
        <p><b>1.</b> You need to click on the button "Get Started" or click on "Studio" on Navbar, that will take you to the studio window.</p>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>2.</b> In the studio, you need to transfer the photo you want to process or select a photo from your PC.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={AddFileTutorial} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>3.</b> In the studio, you can crop your image and apply this operation.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={CutTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>4.</b> In the studio, you can apply filters on your image and apply this operation.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={CutTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>5.</b> With help of "Color" you are able to change brightness, contrast and other setting of your photo.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={ColorTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>6.</b> With help of "Draw" you are able to draw smth on your photo.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={ColorTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>7.</b> Also you can rotate your image and apply this operation.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={RotateTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>8.</b> With hepl of "Text" you can write smth on your image and save result.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={TextTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>9.</b> Resize give you opportunity to change current size of your image.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={ColorTutor} alt="Gif"/>
      </div>
      <div className='flex justify-center flex-col mt-4 w-1/2 text-xl bg-mainFontColor text-white p-4 rounded-xl shadow-lg shadow-blue-400/50'>
        <p><b>10.</b> You can easily save all your changes and download new image with our last futures.</p>
        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={DownloadTutor} alt="Gif"/>
      </div>
      <Link
        to='/studio'
        className='p-5 mt-6 bg-indigo-500 rounded-full w-48 text-center shadow-lg shadow-indigo-500/50 text-white ease-in-out duration-300 text-lg hover:bg-mainFontColor hover:shadow-blue-400/50'
      >
        Get Started <StartIcon /> 
      </Link>
    </div>
  )
}

export default MainPage;
