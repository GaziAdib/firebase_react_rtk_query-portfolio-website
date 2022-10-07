import React from 'react';
import { FormControl, TextField, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddExperienceMutation } from '../../../features/experiences/experiencesApi';

const AddExperience = () => {

    const [addExperience] = useAddExperienceMutation();

    const navigate = useNavigate();

    
    const [jobTitle, setJobTitle] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [jobResponsibility, setJobResponsibility] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobStartedAt, setJobStartedAt] = useState('');
    const [jobEndedAt, setJobEndedAt] = useState('');
   
    
    const formHandler = (e) => {
        e.preventDefault();

        addExperience({
            jobTitle,
            jobPosition,
            jobResponsibility,
            jobCompany,
            jobStartedAt,
            jobEndedAt
        })
        
        navigate('/dashboard');
    }



  return (
    <>
        <h1>Add Achievements</h1>
        <hr />

        <Container>
                <form onSubmit={formHandler} encType="multipart/form-data">
                    <FormControl>
               
                    
                        <label>Job Start Date</label>
                        <input required type='date' value={jobStartedAt} onChange={(e) => setJobStartedAt(e.target.value)} style={{margin: '5px', padding:'5px'}} placeholder="start date like 2021/1/4" />
                    
                        <label>Job Ended Date</label>
                        <input type='date' value={jobEndedAt} onChange={(e) => setJobEndedAt(e.target.value)} style={{margin: '5px', padding:'5px'}} placeholder="end date like 2021/1/28" />
                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Job Title" variant="outlined" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Job Position" variant="outlined" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} />

                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Job Responsibilties" variant="outlined" value={jobResponsibility} onChange={(e) => setJobResponsibility(e.target.value)} />

                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Job Company" variant="outlined" value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} />
                       
                        <button type="submit">Submit</button>

                    </FormControl>
                
                </form>

                {/* <br/>

                <h3>Uploaded {progress} %</h3> */}
        </Container>

        </>
  )
}

export default AddExperience




