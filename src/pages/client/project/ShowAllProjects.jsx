import React, {useState} from 'react'
import ProjectCard from '../../../components/ProjectCard'
import { useFetchProjectsQuery } from '../../../features/projects/projectsApi';

// Slider Slick
import Slider from "react-slick";

import LeftArrow from "../../../assets/images/left-arrow.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";
import Loader from '../../../components/ui/Loader';


const ShowAllProjects = () => {

   
    const {data: projects, isLoading, isError, error} = useFetchProjectsQuery() || {};

    const [loading,setLoading] = useState(true);
    
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
      );
    
      const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} className="shadow-lg" alt="nextArrow" {...props} />
      );



    const settings = {
      arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ],
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        
      };

    
  let content;

  if(isLoading) {
      content = <div><Loader /></div>;
  } else if(!isLoading && isError) {
      content = <div>Error-{error}</div>;
  } else if(!isLoading && !isError && projects?.length === 0) {
      content = <div>No Content To Show</div>;
  } else {
      content = projects?.map((project) => {
          return <ProjectCard project={project} key={project.key} />
      })
  }

  
  return (
    <>

<h2 className='text-center text-3xl items-center text-bold text-white mb-5 my-2 py-5'>My Projects</h2>

<div id='projects' className="container items-center mx-auto px-2 py-5">

  <div className='flex-col rounded-md shadow-md md:flex-row px-3 py-3 mb-3 mt-2'>


  <Slider {...settings} className="flex-col sm:flex-row">
      {content}
  </Slider>
      

  </div>


</div>
    </>
    
      
   );



}

export default ShowAllProjects








//    return (
//     <div className='container grid items-center mx-auto px-1 py-5'>
//         <h2 className='text-center items-center mx-auto py-2'>MY PROJECTS</h2>
//         <hr />

//         <div className='flex flex-row flex-wrap md:flex-wrap-reverse mx-2 my-2 px-1 py-1'>

          
//             {content}
        
        
//         </div>
       
       
    
//     </div>
    
// )



// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, {Navigation, Pagination} from 'swiper';
// import 'swiper/swiper.min.css';




//   if(isLoading) {
//       content = <div>Loading</div>;
//   } else if(!isLoading && isError) {
//       content = <div>Error-{error}</div>;
//   } else if(!isLoading && !isError && projects?.length === 0) {
//       content = <div>Not Content To show</div>;
//   } else {
//       content = <Swiper
//         navigation
//         pagination
//         spaceBetween={30}
//         slidesPerView={3}
//         onSlideChange={() => console.log('Slide Change')}
//         onSwiper={swiper => console.log(swiper)}
//         onInit={(swiper) => console.log('Swipper Intitlized')}
//         onReachEnd={() => console.log('end reached')}
     
//       >
//         {
//             projects?.map((project) =>{
//                return <SwiperSlide key={project?.key}>
//                   <ProjectCard project={project} key={project.key} /> 
//                 </SwiperSlide>
//             })
//         }
//       </Swiper>
//   }





// return <Swiper
// spaceBetween={40}
// slidesPerView={3}
// onSlideChange={() => console.log('Slide Change')}
// onSwiper={swiper => console.log(swiper)}
// >
//    <SwiperSlide>
//     <ProjectCard project={project} key={project.key} />  
//    </SwiperSlide>

// </Swiper>
























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
