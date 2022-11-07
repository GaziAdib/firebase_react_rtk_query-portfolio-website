import React, { useState } from 'react'


// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

// add database for data uploading
import { useNavigate } from 'react-router-dom';
import { useAddAboutMutation } from '../../../features/abouts/aboutsApi';


// adding CKEDITOR and HTMl Parser
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Error from '../../../components/ui/Error';




const AddAbout = () => {

    var urlImage;
    var urlVideo;
    var urlResumeFile;

    const [addAbout, { isError, isSuccess, isLoading, error }] = useAddAboutMutation() || {};

    const [progress, setProgress] = useState(0)
    const [pUrl, setUrl] = useState(null)
    const [vUrl, setVideoUrl] = useState(null)
    const [resumeUrl, setResumeUrl] = useState(null)

    const [aboutProfileImageUrl, setAboutProfileImageUrl] = useState(null)
    const [aboutTitle, setAboutTitle] = useState('')
    const [aboutSubTitle, setAboutSubTitle] = useState('')
    const [aboutShortDescription, setAboutShortDescription] = useState('')
    const [aboutShortVideo, setAboutShortVideo] = useState('')
    const [aboutSocialMediaFbLink, setSocialMediaFbLink] = useState('')
    const [aboutSocialMediaGitLink, setSocialMediaGitLink] = useState('')
    const [aboutSocialMediaYtLink, setSocialMediaYtLink] = useState('')
    const [aboutSocialMediaLnLink, setSocialMediaLnLink] = useState('')
    const [aboutLocation, setLocation] = useState('')

    const navigate = useNavigate();


    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (resumeUrl !== '') {
            addAbout({
                aboutImageUrl: pUrl,
                aboutTitle: aboutTitle,
                aboutSubTitle: aboutSubTitle,
                aboutShortDescription: aboutShortDescription,
                aboutShortVideo: vUrl,
                aboutResumeUrl: resumeUrl,
                aboutSocialMediaFbLink: aboutSocialMediaFbLink,
                aboutSocialMediaGitLink: aboutSocialMediaGitLink,
                aboutSocialMediaYtLink: aboutSocialMediaYtLink,
                aboutSocialMediaLnLink: aboutSocialMediaLnLink,
                aboutLocation: aboutLocation
            })
        }

        navigate('/');

    }



    // uplading local images to server
    const imageFileHandler = async (e) => {
        const localFile = e.target.files[0]
        const storageRef = ref(storage, `/aboutImages/${localFile.name}`);
        await uploadBytes(storageRef, localFile);
        urlImage = await getDownloadURL(storageRef);
        setUrl(urlImage)

    }

    // uploading my intro  video to sever
    const videoFileHandler = async (e) => {
        const localVideoFile = e.target.files[0]
        const videoStorageRef = ref(storage, `/aboutVideos/${localVideoFile.name}`);
        await uploadBytes(videoStorageRef, localVideoFile);
        urlVideo = await getDownloadURL(videoStorageRef);
        setVideoUrl(urlVideo)
    }


    // upload Resume 
    const resumeFileHandler = async (e) => {
        const localPdfFile = e.target.files[0];
        const pdfFileStorageRef = ref(storage, `/aboutResume/${localPdfFile.name}`);
        await uploadBytes(pdfFileStorageRef, localPdfFile);
        urlResumeFile = await getDownloadURL(pdfFileStorageRef)
        setResumeUrl(urlResumeFile)
    }



    return (
        <>

            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add <b className='text-green-600'>About</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2">
                            <label style={{ marginTop: "5px", padding: '5px' }}>Upload Image</label>
                            <br />
                            <input
                                accept="image/*"
                                type="file"
                                onChange={imageFileHandler}
                            />
                        </div>

                        <div className="col-span-2">
                            <label style={{ marginTop: "5px", padding: '5px' }}>Upload Video</label>
                            <br />
                            <input
                                accept="video/*"
                                type="file"
                                onChange={videoFileHandler}
                            />
                        </div>

                        <label style={{ marginTop: "5px", padding: '5px' }}>Upload Resume</label>
                        <br />
                        <div className="col-span-2">
                            <input
                                type="file"
                                onChange={resumeFileHandler}
                            />
                        </div>



                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="About Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutSubTitle} onChange={(e) => setAboutSubTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="About SubTitle" />
                        </div>



                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={aboutShortDescription} onChange={(e) => setAboutShortDescription(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Short Description"></textarea>
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutSocialMediaFbLink} onChange={(e) => setSocialMediaFbLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="FB Link" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutSocialMediaGitLink} onChange={(e) => setSocialMediaGitLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Git Link" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutSocialMediaYtLink} onChange={(e) => setSocialMediaYtLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Youtube Link" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={aboutSocialMediaLnLink} onChange={(e) => setSocialMediaLnLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Linked In" />
                        </div>


                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add About
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

export default AddAbout



// <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

// <div className="text-3xl mb-6 text-center ">
//     Add <b className='text-green-600'>Course</b> To Your Liking ❤️
// </div>
// <hr />
// <br />

// <form onSubmit={formSubmitHandler}>
//     <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

//         <div className="col-span-2">
//             <input
//                 accept="image/*"
//                 type="file"
//                 onChange={fileHandler}
//             />
//         </div>

//         <div className="col-span-2 lg:col-span-1">
//             <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Title" />
//         </div>

//         <div className="col-span-2 lg:col-span-1">
//             <input type="text" value={courseTag} onChange={(e) => setCourseTag(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Tags" />
//         </div>

//         <div className="col-span-2">
//             <textarea cols="30" rows="8" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Description"></textarea>
//         </div>

//         <div className="col-span-2">
//             <input type="text" value={courseGitLink} onChange={(e) => setCourseGitLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Git Link" />
//         </div>

//         <div className="col-span-2">
//             <input type="text" value={courseVideoLink} onChange={(e) => setCourseVideoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Video Link" />
//         </div>

//         <div className="col-span-2">
//             <input type="text" value={courseDemoLink} onChange={(e) => setCourseDemoLink(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Demo Link" />
//         </div>

//         <div className="col-span-2 text-right">
//             <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
//                 Add Course
//             </button>
//         </div>

//     </div>
// </form>
// <div className="flex items-center justify-between">
//     {!isLoading && error && <Error message={error} />}
// </div>
// </div>

{/* <CKEditor
editor={ClassicEditor}
data={aboutShortDescription}
onReady={(editor) => {
    editor.editing.view.change((writer) => {
        writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
        );
    });
}}
onChange={(e, editor) => {
    const data = editor.getData()
    setAboutShortDescription(data);
}}
onBlur={(e, editor) => {
    console.log('Blur.', editor);
}}


/> */}





{/* <Container>
<form onSubmit={formSubmitHandler} encType="multipart/form-data">
    <FormControl>

        <label style={{ marginTop: "5px", padding: '5px' }}>Upload Image</label>
        <input
            accept="image/*"
            type="file"
            onChange={imageFileHandler}
        />

        <label style={{ marginTop: "5px", padding: '5px' }}>Upload Video</label>
        <input
            accept="video/*"
            type="file"
            onChange={videoFileHandler}
        />

        <label style={{ marginTop: "5px", padding: '5px' }}>Upload Resume</label>
        <input
            type="file"
            onChange={resumeFileHandler}
        />






        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Title" variant="outlined" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About SubTitle" variant="outlined" value={aboutSubTitle} onChange={(e) => setAboutSubTitle(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Short Description" variant="outlined" multiline value={aboutShortDescription} onChange={(e) => setAboutShortDescription(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About FB Link" variant="outlined" value={aboutSocialMediaFbLink} onChange={(e) => setSocialMediaFbLink(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Git Link" variant="outlined" value={aboutSocialMediaGitLink} onChange={(e) => setSocialMediaGitLink(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Yt Link" variant="outlined" value={aboutSocialMediaYtLink} onChange={(e) => setSocialMediaYtLink(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Ln Link" variant="outlined" value={aboutSocialMediaLnLink} onChange={(e) => setSocialMediaLnLink(e.target.value)} />
        <TextField required style={{ margin: '5px', padding: '5px' }} id="outlined-basic" label="About Location" variant="outlined" value={aboutLocation} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Submit About Info</button>
    </FormControl>

</form>

{/* <br/>

<h3>Uploaded {progress} %</h3> */}
// </Container > * /}