import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col mt-2 mb-6 gap-8 justify-center items-center text-white w-full max-w-7xl">
                <h1 className="text-3xl w-1/2 font-bold border-b pb-2 text-center">
                    About Us
                </h1>
                <div className="grid grid-cols-1 w-full px-6 md:w-2/3 lg:grid-cols-2 gap-6 items-center justify-center">
                    <div className="bg-mainFontColor w-hull h-full p-10 rounded-xl shadow-lg shadow-mainFontColor/50">
                        <h2 className="text-2xl border-b border-white pb-1 mb-3 font-bold">
                            Main Mission
                        </h2>
                        <p>
                            Our <strong>main mission</strong> was to create a
                            fast and feature-rich application that can do basic
                            photo editing with ease. This includes features such
                            as photo cropping, applying filters, editing, basic
                            photo transformation, and adding text to photos.
                            It's all included in our app. Enjoy using it!
                        </p>
                    </div>
                    <div className="bg-mainFontColor w-hull h-full p-10 rounded-xl shadow-lg shadow-mainFontColor/50">
                        <h2 className="text-2xl border-b border-white pb-1 mb-3 font-bold">
                            Our Vision
                        </h2>
                        <p>
                            What is our vision for a modern photo editing app?
                            First of all, this is a fast application, according
                            to the legend of which you can do almost everything
                            in a row. Secondly, it is something easy to perceive
                            on an intuitive level. And last but not least, it's
                            a multi-functional app where you can do whatever you
                            want with your photos!
                        </p>
                    </div>
                </div>
                <div className="flex flex-col w-full px-6 md:w-2/3 lg:w-1/2 items-center justify-center">
                    <div className="mb-6 bg-mainFontColor w-full p-10 rounded-xl shadow-lg shadow-mainFontColor/50">
                        <h2 className="text-2xl border-b border-white pb-1 mb-6 font-bold">
                            Our Team
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 text-xl">
                            <Link
                                to="https://github.com/determa"
                                target="_blank"
                                className="flex flex-col items-center"
                            >
                                <img
                                    className="w-full h-full max-w-[150px] rounded-full"
                                    src="https://lms.khpi.ucode-connect.study/media/profile_photo/ybobrov.png"
                                    alt="profile_photo"
                                ></img>
                                <p>YBOBROV</p>
                            </Link>
                            <Link
                                to="https://github.com/Spoty-O"
                                target="_blank"
                                className="flex flex-col items-center"
                            >
                                <img
                                    className="w-full h-full max-w-[150px] rounded-full"
                                    src="https://lms.khpi.ucode-connect.study/media/profile_photo/dkorotysh.png"
                                    alt="profile_photo"
                                ></img>
                                <p>DKOROTYSH</p>
                            </Link>
                            <Link
                                to="https://github.com/vbondarets"
                                target="_blank"
                                className="flex flex-col items-center"
                            >
                                <img
                                    className="w-full h-full max-w-[150px] rounded-full"
                                    src="https://avatars.githubusercontent.com/u/90688082?v=4"
                                    alt="profile_photo"
                                ></img>
                                <p>VBONDARETS</p>
                            </Link>
                            <Link
                                to="https://github.com/estfo"
                                target="_blank"
                                className="flex flex-col items-center"
                            >
                                <img
                                    className="w-full h-full max-w-[150px] rounded-full"
                                    src="https://lms.khpi.ucode-connect.study/media/profile_photo/idashchenk.png"
                                    alt="profile_photo"
                                ></img>
                                <p>IDASHCHENK</p>
                            </Link>
                        </div>
                    </div>
                    <div className="mb-6 bg-mainFontColor w-full p-10 rounded-xl shadow-lg shadow-mainFontColor/50">
                        <h2 className="text-2xl border-b border-white pb-1 mb-6 font-bold">
                            Stack Of Technologies
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-8 items-end">
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="h-12 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                                    alt="React"
                                />
                                <span>React</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="h-12 object-contain"
                                    src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png   "
                                    alt="RTK"
                                />
                                <span>RTK</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="h-12 object-contain"
                                    src="https://camo.qiitausercontent.com/44049127109ccf907500dba6026b174154388cb0/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f37353633332f38323938633065652d636430302d653634362d303465372d6338393264323165653566642e706e67"
                                    alt="JOI"
                                />
                                <span>JOI</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="h-12 object-contain"
                                    src="https://mui.com/static/logo.png"
                                    alt="MUI"
                                />
                                <span>MUI</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-20 h-10 object-contain"
                                    src="https://ies.solutions/wordpress/wp-content/uploads/jwt.png"
                                    alt="JWT"
                                />
                                <span>JWT</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="h-12 object-contain"
                                    src="https://mmg-gitlab.fjfi.cvut.cz/gitlab/uploads/-/system/project/avatar/6/tnl_logo_circle.png"
                                    alt="TNL"
                                />
                                <span>TNL</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png"
                                    alt="OpenAI"
                                />
                                <span>OpenAI</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/262px-Node.js_logo.svg.png"
                                    alt="NodeJS"
                                />
                                <span>NodeJS</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/400px-Expressjs.png"
                                    alt="Express"
                                />
                                <span>Express</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/155px-Postgresql_elephant.svg.png"
                                    alt="PostgreSQL"
                                />
                                <span>PostgreSQL</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/160px-Telegram_2019_Logo.svg.png"
                                    alt="Telegraf"
                                />
                                <span>Telegraf</span>
                            </div>
                            <div className="flex flex-col items-center text-xl">
                                <img
                                    className="w-30 h-10 object-contain"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/440px-Docker_%28container_engine%29_logo.svg.png"
                                    alt="Docker"
                                />
                                <span>Docker</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
