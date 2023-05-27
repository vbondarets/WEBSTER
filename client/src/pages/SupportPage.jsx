import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Link } from "react-router-dom";

const SupportPage = () => {
    return (
        <div>
            <div className="flex-col m-auto my-40 bg-mainFontColor content-center p-10 items-center w-2/5 rounded-xl">
                <div className="flex content-center justify-center">
                    <h1 className="text-4xl text-white border-b w-full text-center font-bold">Contact Us</h1>
                </div>
                <div className="flex-col mt-3">
                    <div className="flex items-center">
                        <PhoneIcon className="text-white"/>
                        <span className="text-white"> +380000000000</span>
                    </div>
                    <div className="flex mt-2">
                        <EmailIcon className="text-white mr-1"/>
                        <span className="text-white"> andreyveluchkoo@gmail.com</span>
                    </div>
                    <div className="flex mt-2">
                        <LocationOnIcon className="text-white mr-1"/>
                        <span className="text-white">вулиця Алчевських, 48а, Харків, Харківська область, 61000</span>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            to="https://www.google.com/maps/place/Innovation+campus+%D0%9D%D0%A2%D0%A3+%22%D0%A5%D0%9F%D0%86%22/@50.0071928,36.246077,18z/data=!4m6!3m5!1s0x4127a120940dda53:0x74b92c98a4c5a2c0!8m2!3d50.0071927!4d36.247071!16s%2Fg%2F11rnnwn51l?authuser=0"
                            target="_blank"
                            className="text-mainFontColor bg-white p-4 rounded-full ease-in-out duration-300 hover:text-white hover:bg-mainFontColor">
                            Show Location <GpsFixedIcon/>
                        </Link>
                        <Link 
                            to="mailto:andreyveluchkoo@gmail.com"
                            target="_blank"
                            className="text-mainFontColor bg-white p-4 rounded-full ease-in-out duration-300 hover:text-white hover:bg-mainFontColor">
                            Write now <SendIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportPage;