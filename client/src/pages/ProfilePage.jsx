import React from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { userAPI } from "../services/UserService";
import { imagesAPI } from "../services/ImageService";
import { useDispatch } from "react-redux";
import { setImage, setPreviewImg} from "../store/reducers/ToolSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { data } = userAPI.useGetOneUserQuery();
    const { data: image_data } = imagesAPI.useGetImagesQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            {(data && image_data) &&
                <div className="flex flex-col mt-4 items-center">
                    <div className="flex justify-center w-1/2 bg-mainFontColor text-white rounded-xl p-5">
                        <div className="mr-8">
                            <img className="w-36 h-36 rounded-full" src={data.photo} alt="profile_photo" />
                        </div>
                        <div className="flex flex-col justify-between mt-2">
                            <div className="flex items-center">
                                <AccountBoxIcon />
                                <h1 className="font-bold text-2xl">{data.login}</h1>
                            </div>
                            <div className="flex gap-4 ">
                                <div className="flex flex-col items-center">
                                    <span>Edited Photos <PhotoSizeSelectActualIcon /></span>
                                    <span>{image_data.edit_count.count}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>AI Generated <PhotoSizeSelectActualIcon /></span>
                                    <span>{image_data.AI_count.count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 mt-4 border-b"></div>
                    <div className="grid grid-cols-1 w-3/4 mt-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {image_data.photos.map((element) => {
                            console.log(element);
                            return <img
                                id={element.id}
                                className="rounded-xl cursor-pointer object-contain"
                                src={element.photo}
                                alt="edit_photo"
                                key={element.id}
                                onClick={() => {
                                    const toDataURL = url => fetch(url)
                                        .then(response => response.blob())
                                        .then(blob => new Promise((resolve, reject) => {
                                            const reader = new FileReader()
                                            reader.onloadend = () => resolve(reader.result)
                                            reader.onerror = reject
                                            reader.readAsDataURL(blob)
                                        }))


                                    toDataURL(element.photo)
                                        .then(dataUrl => {
                                            dispatch(setPreviewImg({ previewImg: dataUrl }));
                                            dispatch(setImage({ image: dataUrl }));
                                            navigate('/studio')
                                        })
                                }}
                            />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePage;