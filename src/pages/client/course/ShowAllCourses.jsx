import React, {useState} from 'react'
import { Container, Grid } from '@mui/material'
import CourseCard from '../../../components/CourseCard'
import { useFetchCoursesQuery } from '../../../features/courses/coursesApi'




const ShowAllCourses = () => {

    const { data: courses, isLoading, isError, error } = useFetchCoursesQuery();

    //console.log(courses);

    
    //const[courses, setCourses] = useState([])
    const [loading,setLoading] = useState(true)

    // useEffect(() => {

    //     //const dbRef = ref(database, 'courses');

    //     const fetchCourses = async () => {
    //         const courseRef = ref(database, "courses");
    //         const courseQuery = query(courseRef, orderByKey());

    //         const snapshot = await get(courseQuery);
    //         setLoading(false);

    //         if (snapshot.exists()) {
    //             console.log(snapshot.val())
    //             setCourses((prevCourses) => {
    //                 return [...prevCourses, ...Object.values(snapshot.val())];
    //             });
    //         } else {
    //             console.log("Data Doesnot Exist!")
    //         }
    //     }

    //     fetchCourses()

       
    // },[])


    return (
        <>
            <h2 style={{textAlign: 'center'}}>Read All Courses Data</h2>

           <Container style={{ backgroundColor: '#e8f4f8', borderRadius: '10px' }}>
                <Grid container spacing={1} justifyContent="center">

                    {courses?.length > 0 ? (
                        courses?.map((course) => {
                            return  <Grid item xs={12} md={4} lg={4} sm={12}>
                                <CourseCard course={course} key={course.id}/>
                            </Grid>
                        })
                       
                    ) : (<h2>No Data In Database</h2>)
                   
                }

                </Grid>
           </Container>

         
        </>
    )
}

export default ShowAllCourses












