import React from "react";


const AboutPage = () => {
    return (
        <div>
            <div className="text-center flex content-center">
                <h1 className="text-3xl mt-2 m-auto w-6/12 border-b pb-2">About Us</h1>
            </div>
            <div className="flex content-center items-center mt-5 justify-center">
                <div className="w-1/3 bg-mainFontColor h-64 mr-6 p-10 rounded-xl">
                    <h2 className="text-white text-xl border-b border-white font-bold">Main Mission</h2>
                    <p className="text-gray-900">Our <b>main mission</b> was to create a fast and feature-rich application that can do basic photo editing with ease. 
                        This includes features such as photo cropping, applying filters, editing, basic photo transformation, and adding text to photos. 
                        It's all included in our app. Enjoy using it!</p>
                </div>
                <div className="w-1/3 bg-mainFontColor h-64 p-10 rounded-xl">
                    <h2 className="text-white text-xl border-b border-white font-bold">Our Vision</h2>
                    <p className="text-gray-900">What is our vision for a modern photo editing app? 
                        First of all, this is a fast application, according to the legend of which you can do almost everything in a row. 
                        Secondly, it is something easy to perceive on an intuitive level. 
                        And last but not least, it's a multi-functional app where you can do whatever you want with your photos!</p>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4">
                <div className="mr-6 w-1/3 h-52 bg-mainFontColor p-10 rounded-xl">
                    <h2 className="text-xl font-bold text-white mb-4 border-b">Our Team</h2>
                    <div className="flex mb-3">
                        <img className="w-20 h-20 rounded-full mr-10" src="https://lms.khpi.ucode-connect.study/media/profile_photo/ybobrov.png" alt="Photo"></img>
                        <img className="w-20 h-20 rounded-full mr-10" src="https://lms.khpi.ucode-connect.study/media/profile_photo/dkorotysh.png" alt="Photo"></img>
                        <img className="w-20 h-20 rounded-full mr-10" src="https://avatars.githubusercontent.com/u/90688082?v=4" alt="Photo"></img>
                        <img className="w-20 h-20 rounded-full" src="https://lms.khpi.ucode-connect.study/media/profile_photo/idashchenk.png" alt="Photo"></img>
                    </div>
                </div>
                <div className="bg-mainFontColor h-52 p-10 rounded-xl w-1/3">
                    <h2 className="text-white font-bold text-2xl border-b mb-4">Stack Of Technologies</h2>
                    <div className="flex items-center">
                        <img 
                            className="w-10 h-10 mr-4"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" 
                            alt="React" 
                        />
                        <img 
                            className="w-10 h-10 mr-4"
                            src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png   " 
                            alt="RTK" 
                        />
                        <img 
                            className="w-10 h-10 mr-4"
                            src="https://camo.qiitausercontent.com/44049127109ccf907500dba6026b174154388cb0/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f37353633332f38323938633065652d636430302d653634362d303465372d6338393264323165653566642e706e67" 
                            alt="JOI" 
                        />
                        <img 
                            className="w-10 h-10 mr-4"
                            src="https://mui.com/static/logo.png" 
                            alt="MUI" 
                        />
                        <img 
                            className="w-20 h-10 mr-4"
                            src="https://ies.solutions/wordpress/wp-content/uploads/jwt.png" 
                            alt="JWT" 
                        />
                        <img 
                            className="w-10 h-10 mr-4"
                            src="https://mmg-gitlab.fjfi.cvut.cz/gitlab/uploads/-/system/project/avatar/6/tnl_logo_circle.png" 
                            alt="TNL" 
                        />
                        <img 
                            className="w-20 h-5"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png" 
                            alt="OpenAI" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;