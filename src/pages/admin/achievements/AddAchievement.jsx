import React from 'react';
import { FormControl, TextField, Container } from '@mui/material';
import { useState } from 'react';
// add storage for uploading image data
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { useAddAchievementMutation } from '../../../features/achievements/achievementsApi';

// tags input in react
import { TagsInput } from 'react-tag-input-component';
import { useNavigate } from 'react-router-dom';

const AddAchievement = () => {

    const [AddAchievement] = useAddAchievementMutation();

    const navigate = useNavigate();


    const [selectedTopics, setSelectedTopics] = useState(["react"]);
    const [ThumbnailUrl, setThumbnailUrl] = useState(undefined);
    const [logoUrl, setLogoUrl] = useState(undefined);

    //const [achievementThumbnail, setAchievementThumbnail] = useState(undefined);
    const [achievementTitle, setAchievementTitle] = useState('');
    const [achievementLink, setAchievementLink] = useState('');
    //const [achievementLogo, setAchievementLogo] = useState(undefined);
    //const [achievementTopics, setAchievementTopics] = useState('');


    // upload images for Thumbnail
    const fileHandlerThumbnail = async (e) => {
        const localFile = e.target.files[0];
        const storageRef = ref(storage, `/achievementThumnails/${localFile.name}`);
        await uploadBytes(storageRef, localFile);
        const urlThumnail = await getDownloadURL(storageRef);
        setThumbnailUrl(urlThumnail);

    }

    // upload logo

    const fileHandlerLogo = async (e) => {
        const localFile2 = e.target.files[0];
        const storageRef2 = ref(storage, `/achievementLogos/${localFile2.name}`);
        await uploadBytes(storageRef2, localFile2);
        const urlLogo = await getDownloadURL(storageRef2);
        setLogoUrl(urlLogo);
    }
    


    const formHandler = (e) => {
        e.preventDefault();

        if(ThumbnailUrl !== undefined  && logoUrl !== undefined) {
            AddAchievement({
                achievementTitle,
                achievementTopics: selectedTopics,
                achievementLink,
                achievementThumbnail: ThumbnailUrl,
                achievementLogo: logoUrl,
            })
        }

        navigate('/dashboard');
    }



  return (
    <>
        <h1>Add Achievements</h1>
        <hr />

        <Container>
                <form onSubmit={formHandler} encType="multipart/form-data">
                    <FormControl>
                        <br />
                        <label>Upload Achievement Thumbnail</label>
                        <br />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={fileHandlerThumbnail}
                        />
                        <br />
                        <label>Upload Achievement Logo</label>
                        <br />
                            <input
                            accept="image/*"
                            type="file"
                            onChange={fileHandlerLogo}
                        />

                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Title" variant="outlined" value={achievementTitle} onChange={(e) => setAchievementTitle(e.target.value)} />
{/* 
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Topics" variant="outlined" value={achievementTopics} onChange={(e) => setAchievementTopics(e.target.value)} /> */}


                        <TagsInput
                            value={selectedTopics}
                            onChange={setSelectedTopics}
                            name="topics"
                            placeHolder="enter topics"
                        />


                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Link Url" variant="outlined" value={achievementLink} onChange={(e) => setAchievementLink(e.target.value)} />
                       

                        <button type="submit">Submit</button>

                    </FormControl>
                
                </form>

                {/* <br/>

                <h3>Uploaded {progress} %</h3> */}
        </Container>

        </>
  )
}

export default AddAchievement