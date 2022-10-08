import React, {useState} from 'react'
import { Grid } from '@mui/material'
import ProjectCard from '../../../components/ProjectCard'
import { Container } from '@mui/material'
import { useFetchProjectsQuery } from '../../../features/projects/projectsApi'



const ShowAllProjects = () => {

   
    const {data: projects, isLoading, isError, error} = useFetchProjectsQuery() || {};

    const [loading,setLoading] = useState(true)

    
  let content;

  if(isLoading) {
      content = <div>Loading</div>;
  } else if(!isLoading && isError) {
      content = <div>Error-{error}</div>;
  } else if(!isLoading && !isError && projects?.length === 0) {
      content = <div>Not Content To show</div>;
  } else {
      content = projects?.map((project) => {
          return <ProjectCard project={project} key={project.key} />
      })
  }


  
    return (
        <div className='container items-center mx-auto px-1 py-5'>
            <h2 className='text-center items-center mx-auto py-2'>Read All Projects Data</h2>

            <div className='flex flex-row flex-wrap md:flex-wrap-reverse mx-2 my-2 px-1 py-1'>
                {content}
            </div>
           
           
        
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
