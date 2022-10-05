import { Container, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAddSkillMutation } from '../../../features/skills/skillsApi'


const AddSkill = () => {

    const [addSkill] = useAddSkillMutation();

    const [skillName, setSkillName] = useState('')
    const [skillScore, setSkillScore] = useState(0)

    const navigate = useNavigate();



    const skillFormHandler = (e) => {

        e.preventDefault()

        // add skill to firebase

        if(skillName !== '' && skillScore !== 0) {
            addSkill({
                skillName,
                skillScore
            });
        }
        setSkillName('')
        setSkillScore(0)

        navigate('/dashboard');

    }

    return (
        <>

        <Container>
            <h2>Add Skills</h2>
            <hr />
            <br />

            <form onSubmit={skillFormHandler}>
                    <FormControl>
                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Skill Name Or Technology" variant="outlined" type="text"  value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Skill Score" variant="outlined" type="number" value={skillScore} onChange={(e) => setSkillScore(e.target.value)} />
                      

                        <button type="submit">Submit Skill Scores</button>

                    </FormControl>
                
                </form>

        </Container>
            
        </>
    )
}

export default AddSkill
