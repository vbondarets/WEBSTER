import React from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useSelector } from "react-redux";
import { userAPI } from "../services/UserService";

const ProfilePage = () => {
    const {id} = useSelector((state) => state.userReducer)
    const { data } = userAPI.useGetOneUserQuery(id);
    return (
        <div>
            <div className="flex flex-col mt-4 items-center">
                <div className="flex justify-center w-1/2 bg-mainFontColor text-white rounded-xl p-5">
                    <div className="mr-8">
                        <img className="w-36 h-36 rounded-full" src={data ? (data.photo && data.photo) : ""} alt="profile_photo" />
                    </div>
                    <div className="flex flex-col justify-between mt-2">
                        <div className="flex items-center">
                            <AccountBoxIcon />
                            <h1 className="font-bold text-2xl">{data ? (data.login && data.login) : "Username"}</h1>
                        </div>
                        <div className="flex gap-4 ">
                            <div className="flex flex-col items-center">
                                <span>Edited Photos <PhotoSizeSelectActualIcon /></span>
                                <span>100</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span>AI Generated <PhotoSizeSelectActualIcon /></span>
                                <span>10</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 mt-4 border-b"></div>
                <div className="grid grid-cols-1 w-3/4 mt-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <img className="rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3icouyJ2zxy9aBl_nh3yRYO2D3aycyntZO9CtkzJSrS-JqUmF9sOtqUgq4lF2rtr29FY&usqp=CAU" alt="edit_photo" />
                    <img className="rounded-xl" src="https://static.lsm.lv/media/2022/08/large/1/isdm.jpg" alt="edit_photo" />
                    <img className="rounded-xl" src="https://i.lb.ua/074/05/5814b4c8a4966.jpeg" alt="edit_photo" />
                    <img className="rounded-xl" src="https://static.lsm.lv/media/2022/08/large/1/isdm.jpg" alt="edit_photo" />
                    <img className="rounded-xl" src="https://i.lb.ua/074/05/5814b4c8a4966.jpeg" alt="edit_photo" />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;