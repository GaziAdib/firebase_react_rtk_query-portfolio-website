import React, {useState} from 'react'
import { Container } from '@mui/material'
import BarChart from '../../../components/BarChart'
import { useFetchSkillsQuery } from '../../../features/skills/skillsApi'


const ShowAllSkills = () => {

    // const[skills, setSkills] = useState([])
   
    // useEffect(() => {

    //     async function fetchSkills() {
    //         const skillRef = ref(database, "skills");
    //         const skillQuery = query(skillRef, orderByKey());

    //         const snapshot = await get(skillQuery);
    //         setLoading(false);

    //         if (snapshot.exists()) {
    //             console.log(snapshot.val())
    //             setSkills((prevSkills) => {
    //                 return [...prevSkills, ...Object.values(snapshot.val())];
    //             });
                
    //         } else {
    //             console.log("Data Does not Exist!")
    //         }
    //     }

    //     fetchSkills()
       
    // },[])

    const {data: skills, isLoading, isError, error } = useFetchSkillsQuery(); 


    return (
            <>
                <Container className="skill-container">
                    <h2>My Skills</h2>
                    <hr />

                    {skills?.length > 0 ? (
                        <BarChart skills={skills}/>
                    )
                     : 

                    ('<h2>No Skills Data in Database</h2>')
                    }
                </Container>
            </>
        )


   
}

export default ShowAllSkills










{/* <Container>
                    <h2>My Skills</h2>
                    <hr />
                    <br />

                    {skills.length > 0 ? (
                        skills.map((skill) => {
                            return <SkillProgressBox skill={skill} />
                        })
                    )
                     : 

                    ('<h2>No Skills Data in Database</h2>')
                    }
                </Container> */}








