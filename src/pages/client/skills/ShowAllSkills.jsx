import React, {useEffect,useState} from 'react'
import { ref,  get,  query, orderByKey } from "firebase/database"
import { database } from '../../../firebase'
import { Container } from '@mui/material'
import BarChart from '../../../components/BarChart'


const ShowAllSkills = () => {

    const[skills, setSkills] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {

        async function fetchSkills() {
            const skillRef = ref(database, "skills");
            const skillQuery = query(skillRef, orderByKey());

            const snapshot = await get(skillQuery);
            setLoading(false);

            if (snapshot.exists()) {
                console.log(snapshot.val())
                setSkills((prevSkills) => {
                    return [...prevSkills, ...Object.values(snapshot.val())];
                });
                
            } else {
                console.log("Data Does not Exist!")
            }
        }

        fetchSkills()
       
    },[])

    return (
            <>
                <Container className="skill-container">
                    <h2>My Skills</h2>
                    <hr />

                    {skills.length > 0 ? (
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








