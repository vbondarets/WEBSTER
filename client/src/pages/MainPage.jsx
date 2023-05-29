import React from 'react'
import { Link } from 'react-router-dom';
import StartIcon from '@mui/icons-material/Start';
import AddFileTutorial from '../assets/Instructions/Add_file.gif'
import CutTutor from '../assets/Instructions/Cut.gif'
import ColorTutor from '../assets/Instructions/Color.gif'
import RotateTutor from '../assets/Instructions/Rotate.gif'
import TextTutor from '../assets/Instructions/Text.gif'
import DownloadTutor from '../assets/Instructions/Download.gif'
import FilterTutor from '../assets/Instructions/Filter.gif'
import DrawTutor from '../assets/Instructions/Draw.gif'
import ResizeTutor from '../assets/Instructions/Resize.gif'

const MainPage = () => {
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div className='flex flex-col mt-2 mb-6 gap-2 justify-center items-center text-white w-full max-w-7xl'>
                {/* <div className='flex justify-center w-1/2 bg-mainFontColor rounded-xl p-5 shadow-lg shadow-blue-400/50'>
                    <h1 className='text-2xl font-bold border-b w-full pb-1 text-center'>INSTRUCTION</h1>
                </div> */}
                <h1 className="text-3xl w-full sm:w-1/2 font-bold border-b pb-2 text-center">
                    INSTRUCTION
                </h1>
                <div className='flex flex-col w-full px-6 md:w-2/3 gap-4 text-xl'>
                    <div className='mt-3 flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p>With the help of the <strong>Webster</strong> program, you can do all kinds of manipulations with the processing and adjustment of photos. So how to use this program?</p>
                        <p><strong>1.</strong> You need to click on the button "Get Started" or click on "Studio" on Navbar, that will take you to the studio window.</p>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>2.</strong> In the studio, you need to transfer the photo you want to process or select a photo from your PC.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={AddFileTutorial} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>3.</strong> In the studio, you can crop your image and apply this operation.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={CutTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>4.</strong> In the studio, you can apply filters on your image and apply this operation.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={FilterTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>5.</strong> With help of "Color" you are able to change brightness, contrast and other setting of your photo.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={ColorTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>6.</strong> With help of "Draw" you are able to draw smth on your photo.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={DrawTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>7.</strong> Also you can rotate your image and apply this operation.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={RotateTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>8.</strong> With hepl of "Text" you can write smth on your image and save result.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={TextTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>9.</strong> Resize give you opportunity to change current size of your image.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={ResizeTutor} alt="Gif"/>
                    </div>
                    <div className='flex justify-center flex-col bg-mainFontColor p-6 rounded-xl shadow-lg shadow-blue-400/50 gap-3'>
                        <p><strong>10.</strong> You can easily save all your changes and download new image with our last futures.</p>
                        <img className='mt-2 mb-2 rounded-xl shadow-lg shadow-indigo-500/50' src={DownloadTutor} alt="Gif"/>
                    </div>
                    <Link
                        to='/studio'
                        className='p-5 mt-6 bg-indigo-500 rounded-full w-48 text-center shadow-lg shadow-indigo-500/50 ease-in-out duration-300 text-lg hover:bg-mainFontColor hover:shadow-blue-400/50'
                    >
                        Get Started <StartIcon /> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainPage;
