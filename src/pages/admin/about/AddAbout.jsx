import React, {useState} from 'react'
import { FormControl, TextField, Container } from '@mui/material';

// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

// add database for data uploading
import { database } from '../../../firebase';
import {ref as dbRef, set, push } from '@firebase/database';



const AddAbout = () => {

    var urlImage;
    var urlVideo;

    const [progress, setProgress] = useState(0)
    const [pUrl, setUrl] = useState(null)
    const [vUrl, setVideoUrl] = useState(null)

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
     

    const formHandler = (e) => {
        e.preventDefault() 
     
        const  InsertData =  () => {
            const aboutListRef = dbRef(database, 'abouts');
            const newAboutRef = push(aboutListRef);
            set(newAboutRef, {
                aboutImageUrl: pUrl,
                aboutTitle: aboutTitle,
                aboutSubTitle: aboutSubTitle,
                aboutShortDescription: aboutShortDescription,
                aboutShortVideo: vUrl,
                aboutSocialMediaFbLink: aboutSocialMediaFbLink,
                aboutSocialMediaGitLink: aboutSocialMediaGitLink,
                aboutSocialMediaYtLink: aboutSocialMediaYtLink,
                aboutSocialMediaLnLink: aboutSocialMediaLnLink,
                aboutLocation: aboutLocation
            }).then(() => {
                alert("About Data stored successfully")
            }).catch((error) => {
                alert("Unsuccessful error "+error)
            });
        }

    InsertData()

    
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



    return (
        <>
            <h1>Add About Information</h1>
            <hr />

            <Container>
                <form onSubmit={formHandler} encType="multipart/form-data">
                    <FormControl>

                    <label style={{marginTop: "5px", padding: '5px'}}>Upload Image</label>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={imageFileHandler}
                        />

                    <label style={{marginTop: "5px", padding: '5px'}}>Upload Video</label>
                        <input
                            accept="video/*"
                            type="file"
                            onChange={videoFileHandler}
                        />

                       
                        
                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Title" variant="outlined" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
                        <TextField required style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About SubTitle" variant="outlined" value={aboutSubTitle} onChange={(e) => setAboutSubTitle(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Short Description" variant="outlined" multiline value={aboutShortDescription} onChange={(e) => setAboutShortDescription(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About FB Link" variant="outlined" value={aboutSocialMediaFbLink} onChange={(e) => setSocialMediaFbLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Git Link" variant="outlined" value={aboutSocialMediaGitLink} onChange={(e) => setSocialMediaGitLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Yt Link" variant="outlined" value={aboutSocialMediaYtLink} onChange={(e) => setSocialMediaYtLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Ln Link" variant="outlined" value={aboutSocialMediaLnLink} onChange={(e) => setSocialMediaLnLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="About Location" variant="outlined" value={aboutLocation} onChange={(e) => setLocation(e.target.value)} />

                        <button type="submit">Submit About Info</button>
                    </FormControl>
                
                </form>

                {/* <br/>

                <h3>Uploaded {progress} %</h3> */}
            </Container>

            
            
        </>
    )
}

export default AddAbout
