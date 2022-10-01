import React, {useState} from 'react'
import { FormControl, TextField, Container } from '@mui/material';

// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

// add database for data uploading
import { database } from '../../../firebase';
import {ref as dbRef, set, push } from '@firebase/database';



const AddCourse = () => {

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

    const formHandler = (e) => {
        e.preventDefault() 
     
        const  InsertData =  () => {
            const courseListRef = dbRef(database, 'courses');
            const newCourseRef = push(courseListRef);
            set(newCourseRef, {
                courseImageUrl: pUrl,
                courseTitle: courseTitle,
                courseTag: courseTag,
                courseDescription: courseDescription,
                courseGitLink: courseGitLink,
                courseVideoLink: courseVideoLink,
                courseDemoLink: courseDemoLink
            }).then(() => {
                alert("Course Data stored successfully")
            }).catch((error) => {
                alert("Unsuccessful error "+error)
            });
        }

    InsertData()
    }

    const fileHandler = async (e) => {

        const localFile = e.target.files[0]
        const storageRef = ref(storage, `/courseImages/${localFile.name}`);
        await uploadBytes(storageRef, localFile);
        urlImage = await getDownloadURL(storageRef);
        setUrl(urlImage)

    }



    return (
        <>
            <h1>Add Course</h1>
            <hr />

            <Container>
                <form onSubmit={formHandler} encType="multipart/form-data">
                    <FormControl>

                        <input
                            accept="image/*"
                            type="file"
                            onChange={fileHandler}
                        />

                        {/* <button onClick={() => uploadFiles(projectImageUrl)}>Upload Image</button> */}
                        
                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course Title" variant="outlined" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course Tag" variant="outlined" value={courseTag} onChange={(e) => setCourseTag(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course Description" variant="outlined" multiline value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course GitHub Link" variant="outlined" value={courseGitLink} onChange={(e) => setCourseGitLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course Video Link" variant="outlined" value={courseVideoLink} onChange={(e) => setCourseVideoLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Course Demo Link" variant="outlined" value={courseDemoLink} onChange={(e) => setCourseDemoLink(e.target.value)} />

                        <button type="submit">Add Course</button>
                    </FormControl>
                
                </form>

                {/* <br/>

                <h3>Uploaded {progress} %</h3> */}
            </Container>

            
            
        </>
    )
}

export default AddCourse
