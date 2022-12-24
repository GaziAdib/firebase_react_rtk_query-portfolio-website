import React from 'react'
import { Container } from '@mui/material'
import BarChart from '../../../components/BarChart'
import { useFetchSkillsQuery } from '../../../features/skills/skillsApi'


const ShowAllSkills = () => {


    const { data: skills, isLoading, isError, error } = useFetchSkillsQuery() || {};


    return (
        <>
            <Container className="skill-container">

                <h2 className='text-center text-3xl  items-center text-bold text-blue-200 mb-5 my-2 py-1 underline decoration-wavy'>My Technological Skills</h2>



                {skills?.length > 0 ? (
                    <BarChart skills={skills} />
                )
                    :

                    ('<h2>No Skills Data in Database</h2>')
                }
            </Container>
        </>
    )



}

export default ShowAllSkills














