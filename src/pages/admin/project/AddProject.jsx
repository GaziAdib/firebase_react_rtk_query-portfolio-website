import React, { useState } from 'react'
// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

import { useAddProjectMutation } from '../../../features/projects/projectsApi';
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
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });



const AddProject = () => {

    const [addProject, { isLoading, isError, error }] = useAddProjectMutation();

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0)
    const [pUrl, setUrl] = useState(null)

    const [projectImageUrl, setProjectImageUrl] = useState(null)
    const [projectTitle, setProjectTitle] = useState('')
    const [projectTag, setProjectTag] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectGitLink, setProjectGitLink] = useState('')
    const [projectVideoLink, setProjectVideoLink] = useState('')
    const [projectDemoLink, setProjectDemoLink] = useState('');


    // resize file function




    const clearData = () => {

        setProjectTitle('')
        setProjectImageUrl(null)
        setProjectTag('')
        setProjectDescription('')
        setProjectVideoLink('')
        setProjectGitLink('')
        setProjectDemoLink('')

    }

    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (pUrl !== '') {
            addProject({
                projectImageUrl: pUrl,
                projectTitle: projectTitle,
                projectTag: projectTag,
                projectDescription: projectDescription,
                projectGitLink: projectGitLink,
                projectVideoLink: projectVideoLink,
                projectDemoLink: projectDemoLink
            });
        }

        clearData();

        navigate('/');

    }


    const fileHandler = async (e) => {
        const localFile = e.target.files[0];
        const optimizedImage = await resizeFile(localFile);
        console.log('op image', optimizedImage?.name);
        if (optimizedImage?.name !== '') {

            const storageRef = ref(storage, `/projectImages/${optimizedImage?.name}`);
            await uploadBytes(storageRef, optimizedImage);
            const urlImage = await getDownloadURL(storageRef);
            setUrl(urlImage);
        }



    }




    // const fileHandler = async (e) => {
    //     const localFile = e.target.files[0];
    //     const storageRef = ref(storage, `/projectImages/${localFile.name}`);
    //     await uploadBytes(storageRef, localFile);
    //     const urlImage = await getDownloadURL(storageRef);
    //     setUrl(urlImage);

    // }

    return (
        <>

            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add <b className='text-green-600'>Projects</b> To Your Liking ❤️
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
                            {/* <img src={} height="200px" width="250px" /> */}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={projectTag} onChange={(e) => setProjectTag(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Tags" />
                        </div>

                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Description"></textarea>
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={projectGitLink} onChange={(e) => setProjectGitLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Git Link" />
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={projectVideoLink} onChange={(e) => setProjectVideoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Video Link" />
                        </div>

                        <div className="col-span-2">
                            <input type="text" value={projectDemoLink} onChange={(e) => setProjectDemoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Demo Link" />
                        </div>

                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add Project
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

export default AddProject

