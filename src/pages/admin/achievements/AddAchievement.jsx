import React from 'react';
import { useState } from 'react';
// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useAddAchievementMutation } from '../../../features/achievements/achievementsApi';

// tags input in react
import { TagsInput } from 'react-tag-input-component';
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/ui/Error';

// optimized image
import Resizer from 'react-image-file-resizer';
// import base64ToImage from 'base64-to-image';
import { toast } from 'react-toastify';


const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            95,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });



const AddAchievement = () => {

    const [AddAchievement, { isLoading, isError, error }] = useAddAchievementMutation();

    const navigate = useNavigate();


    const [selectedTopics, setSelectedTopics] = useState(["react"]);
    const [ThumbnailUrl, setThumbnailUrl] = useState(undefined);
    const [logoUrl, setLogoUrl] = useState(undefined);

    const [achievementTitle, setAchievementTitle] = useState('');
    const [achievementLink, setAchievementLink] = useState('');



    // upload images for Thumbnail
    const fileHandlerThumbnail = async (e) => {
        const localFile = e.target.files[0];
        const optimizedImage = await resizeFile(localFile);
        if (optimizedImage?.name !== '') {
            const storageRef = ref(storage, `/achievementThumnails/${optimizedImage?.name}`);
            await uploadBytes(storageRef, optimizedImage);
            const urlImage = await getDownloadURL(storageRef);
            setThumbnailUrl(urlImage);
        }

    }

    // upload logo

    const fileHandlerLogo = async (e) => {
        const localFile2 = e.target.files[0];
        const optimizedImage2 = await resizeFile(localFile2);
        const storageRef2 = ref(storage, `/achievementLogos/${optimizedImage2?.name}`);
        await uploadBytes(storageRef2, optimizedImage2);
        const urlLogo = await getDownloadURL(storageRef2);
        setLogoUrl(urlLogo);
    }


    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (ThumbnailUrl !== undefined && logoUrl !== undefined) {
            AddAchievement({
                achievementTitle,
                achievementTopics: selectedTopics,
                achievementLink,
                achievementThumbnail: ThumbnailUrl,
                achievementLogo: logoUrl,
            })
        }

        toast('New Achievements Added Successfully 👌', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate('/dashboard');
    }


    return (
        <>

            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add <b className='text-green-600'>Achievements</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2">
                            <label>Upload Thumbnail</label>
                            <br />
                            <input
                                accept="image/*"
                                type="file"
                                onChange={fileHandlerThumbnail}
                            />
                        </div>

                        <div className="col-span-2">
                            <label>Upload Logo</label>
                            <br />
                            <input
                                accept="image/*"
                                type="file"
                                onChange={fileHandlerLogo}
                            />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={achievementTitle} onChange={(e) => setAchievementTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <TagsInput
                                value={selectedTopics}
                                onChange={setSelectedTopics}
                                name="topics"
                                placeHolder="enter topics"
                            />
                        </div>



                        <div className="col-span-2">
                            <input type="text" value={achievementLink} onChange={(e) => setAchievementLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Certification Link" />
                        </div>


                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add
                            </button>
                        </div>

                    </div>
                </form>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>
            </div>


        </>
    )
}

export default AddAchievement





