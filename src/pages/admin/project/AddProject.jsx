import React, {useState} from 'react'
import { FormControl, TextField, Container } from '@mui/material';

// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

// add database for data uploading
// import { database } from '../../../firebase';
// import {ref as dbRef, set, push } from '@firebase/database';

// import UUID

import { v4 as uuidv4 } from 'uuid'
import { useAddProjectMutation } from '../../../features/projects/projectsApi';
import { useNavigate } from 'react-router-dom';



const AddProject = () => {

    const [addProject] = useAddProjectMutation();

    const navigate = useNavigate();

    var id = uuidv4()

    const [progress, setProgress] = useState(0)
    const [pUrl, setUrl] = useState(null)

    const [projectImageUrl, setProjectImageUrl] = useState(null)
    const [projectTitle, setProjectTitle] = useState('')
    const [projectTag, setProjectTag] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectGitLink, setProjectGitLink] = useState('')
    const [projectVideoLink, setProjectVideoLink] = useState('')
    const [projectDemoLink, setProjectDemoLink] = useState('')

    const clearData = () => {
       
        setProjectTitle('')
        setProjectImageUrl(null)
        setProjectTag('')
        setProjectDescription('')
        setProjectVideoLink('')
        setProjectGitLink('')
        setProjectDemoLink('')
      
    }

    const formHandler = (e) => {
        e.preventDefault() 

        if(pUrl !== '') {
            addProject({
                id: uuidv4(),
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
        const localFile = e.target.files[0]
        const storageRef = ref(storage, `/projectImages/${localFile.name}`);
        await uploadBytes(storageRef, localFile);
        const urlImage = await getDownloadURL(storageRef);
        setUrl(urlImage)

    }



    return (
        <>
            <h1>Add Project</h1>
            <hr />

            <Container>
                <form onSubmit={formHandler} encType="multipart/form-data">
                    <FormControl>

                        <input
                            accept="image/*"
                            type="file"
                            onChange={fileHandler}
                        />

                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project Title" variant="outlined" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project Tag" variant="outlined" value={projectTag} onChange={(e) => setProjectTag(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project Description" variant="outlined" multiline value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project GitHub Link" variant="outlined" value={projectGitLink} onChange={(e) => setProjectGitLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project Video Link" variant="outlined" value={projectVideoLink} onChange={(e) => setProjectVideoLink(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Project Demo Link" variant="outlined" value={projectDemoLink} onChange={(e) => setProjectDemoLink(e.target.value)} />

                        <button type="submit">Submit</button>
                    </FormControl>
                
                </form>

                {/* <br/>

                <h3>Uploaded {progress} %</h3> */}
            </Container>

            
            
        </>
    )
}

export default AddProject
