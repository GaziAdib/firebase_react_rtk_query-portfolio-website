import React, {useEffect,useState} from 'react'
import { ref,  get,  query, orderByKey } from "firebase/database"
import { database } from '../../../firebase'
import { Grid } from '@mui/material'
import { Container } from '@mui/material'
import AboutCard from '../../../components/AboutCard'



const ShowAbout = () => {

    
    const[abouts, setProjects] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {

        async function fetchAbouts() {
            const aboutRef = ref(database, "abouts");
            const aboutQuery = query(aboutRef, orderByKey());

            const snapshot = await get(aboutQuery);
            setLoading(false);

            if (snapshot.exists()) {
                console.log(snapshot.val())
                setProjects((prevAbouts) => {
                    return [...prevAbouts, ...Object.values(snapshot.val())];
                });
                
            } else {
                console.log("Data Does not Exist!")
            }
        }

        fetchAbouts()
       
    },[])


    return (
        <div>
            
        
                {
                     abouts.map((about) => {
                        return <AboutCard about={about}/>
                    })
                }

        
            
        </div>
    )
}

export default ShowAbout



