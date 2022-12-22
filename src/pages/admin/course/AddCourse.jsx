import React, { useState } from 'react'

// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

import { useAddCourseMutation } from '../../../features/courses/coursesApi';
import { useNavigate } from 'react-router-dom';
import Error from '../../../components/ui/Error';

// optimize images before upload
import Resizer from 'react-image-file-resizer';
// import base64ToImage from 'base64-to-image';


const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            90,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });




const AddCourse = () => {

    const [addCourse, { isLoading, isError, error }] = useAddCourseMutation();

    const navigate = useNavigate();

    var urlImage;

    const [progress, setProgress] = useState(0)
    const [pUrl, setUrl] = useState(null)

    const [courseImageUrl, setCourseImageUrl] = useState(null)
    const [courseTitle, setCourseTitle] = useState('')
    const [courseTag, setCourseTag] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseGitLink, setCourseGitLink] = useState('')
    const [courseVideoLink, setCourseVideoLink] = useState('')
    const [courseDemoLink, setCourseDemoLink] = useState('')

    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (courseImageUrl !== '') {
            addCourse({
                courseImageUrl: pUrl,
                courseTitle: courseTitle,
                courseTag: courseTag,
                courseDescription: courseDescription,
                courseGitLink: courseGitLink,
                courseVideoLink: courseVideoLink,
                courseDemoLink: courseDemoLink
            })
        }

        navigate('/');

    }



    const fileHandler = async (e) => {
        const localFile = e.target.files[0];
        const optimizedImage = await resizeFile(localFile);
        console.log('op image', optimizedImage?.name);
        if (optimizedImage?.name !== '') {
            const storageRef = ref(storage, `/courseImages/${optimizedImage?.name}`);
            await uploadBytes(storageRef, optimizedImage);
            const urlImage = await getDownloadURL(storageRef);
            setUrl(urlImage);
        }

    }



    return (
        <>
            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add <b className='text-green-600'>Course</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2">
                            <input
                                accept="image/*"
                                type="file"
                                onChange={fileHandler}
                            />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={courseTag} onChange={(e) => setCourseTag(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Tags" />
                        </div>

                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Description"></textarea>
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={courseGitLink} onChange={(e) => setCourseGitLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Git Link" />
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={courseVideoLink} onChange={(e) => setCourseVideoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Video Link" />
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={courseDemoLink} onChange={(e) => setCourseDemoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Demo Link" />
                        </div>

                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add Course
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

export default AddCourse
