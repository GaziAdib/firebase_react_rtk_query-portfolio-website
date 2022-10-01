import { Container, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'

// firebase database
import { database } from '../../../firebase'
// firebase database ref
import { ref, push, set } from '@firebase/database'


const AddSkill = () => {

    const [skillName, setSkillName] = useState('')
    const [skillScore, setSkillScore] = useState(0)



    const skillFormHandler = (e) => {

        e.preventDefault()

        // add skill to firebase
        const insertSkills = () => {

            const skillListRef = ref(database, 'skills')
            const newSkillRef = push(skillListRef)
            set(newSkillRef,{
                skillName: skillName,
                skillScore: skillScore
            }).then(() => {
                alert("Skills Data Stored Successfully!")
            }).catch((error) => {
                alert("Unsuccessful error "+error)
            })

        }

        insertSkills()

        //clear form
        const clearFormData = () => {
            setSkillName('')
            setSkillScore(0)
        }

        clearFormData()
        
    }

    return (
        <>

        <Container>
            <h2>Add Skills</h2>
            <hr />
            <br />

            <form onSubmit={skillFormHandler}>
                    <FormControl>
                        
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Skill Name Or Technology" variant="outlined" required type="text"  value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                        <TextField required  style={{margin: '5px', padding:'5px'}} id="outlined-basic" label="Skill Score" variant="outlined" type="number" required value={skillScore} onChange={(e) => setSkillScore(e.target.value)} />
                      

                        <button type="submit">Submit Skill Scores</button>

                    </FormControl>
                
                </form>

        </Container>
            
        </>
    )
}

export default AddSkill
