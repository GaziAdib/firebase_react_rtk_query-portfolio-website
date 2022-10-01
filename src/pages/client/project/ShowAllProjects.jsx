import React, {useEffect,useState} from 'react'

import { ref,  get,  query, orderByKey } from "firebase/database"
import { database } from '../../../firebase'
import { Grid } from '@mui/material'
import ProjectCard from '../../../components/ProjectCard'
import { Container } from '@mui/material'





const ShowAllProjects = () => {

    
    const[projects, setProjects] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {

        //const dbRef = ref(database, 'projects');

        const fetchProjects = async () => {
            const projectRef = ref(database, "projects");
            const projectQuery = query(projectRef, orderByKey());

            const snapshot = await get(projectQuery);
        
            setLoading(false);
            if (snapshot.exists()) {
                console.log(snapshot.val())
               
                setProjects((prevProjects) => {
                    return [...prevProjects, ...Object.values(snapshot.val())];
                });
                console.log(projects)
              
                
            } else {
                console.log("Data Doesnot Exist!")
            }
        }

        fetchProjects()
       
    },[])


    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Read All Projects Data</h2>

           <Container style={{ backgroundColor: '#e8f4f8', borderRadius: '10px' }}>
            <Grid container spacing={1} justifyContent="center">

                    {projects.length > 0 ? (
                         projects.map((project) => {
                            return  <Grid item xs={12} md={4} lg={4} sm={12} key={project.id}>
                                <ProjectCard project={project}/>
                            </Grid>
                        })
                   
                    ) : (<h2>No Data In Database</h2>)
                   
                }
    

    
                </Grid>
           </Container>

        
        </div>
        
    )
}

export default ShowAllProjects






































// import React, {useEffect,useState} from 'react'

// import { ref, child, get, onValue, query, orderByKey} from "firebase/database"
// import { database } from '../../../firebase'
// import { Container } from '@mui/material'
// import ProjectCard from '../../../components/ProjectCard'



// const ShowAllProjects = () => {

    
//     const[projects, setProjects] = useState([])
//     const [loading,setLoading] = useState(true)

//     useEffect(() => {

//         //const dbRef = ref(database, 'projects');

//         async function fetchProjects() {
//             const projectRef = ref(database, "projects");
//             const projectQuery = query(projectRef, orderByKey());

//             const snapshot = await get(projectQuery);
//             setLoading(false);

//             if (snapshot.exists()) {
//                 console.log(snapshot.val())
//                 setProjects((prevProjects) => {
//                     return [...prevProjects, ...Object.values(snapshot.val())];
//                 });
//             } else {
//                 console.log("Data Doesnot Exist!")
//             }
//         }

//         fetchProjects()

//         //console.log(projects)

       
//     },[])


//     return (
//         <div>
//             <h2>Read All Projects Data</h2>

//             <Container>
//                 {
//                     projects.map((project) => {
//                         return <ProjectCard project={project}/>
//                     })
//                 }
//             </Container>
     
    
//         </div>
//     )
// }

// export default ShowAllProjects
