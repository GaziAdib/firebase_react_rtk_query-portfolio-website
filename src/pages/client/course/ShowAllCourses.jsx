import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'
import CourseCard from '../../../components/CourseCard'
import { useFetchCoursesQuery } from '../../../features/courses/coursesApi'

const ShowAllCourses = () => {

    const { data: courses, isLoading, isError, error } = useFetchCoursesQuery() || {};

    const [loading, setLoading] = useState(true)

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>MY COURSES</h2>

            <Container style={{ backgroundColor: '#e8f4f8', borderRadius: '10px' }}>
                <Grid container spacing={1} justifyContent="center">

                    {courses?.length > 0 ? (
                        courses?.map((course) => {
                            return <Grid item xs={12} md={4} lg={4} sm={12} key={course.key}>
                                <CourseCard course={course} />
                            </Grid>
                        })

                    ) : (<h2>No Course Data In Database</h2>)

                    }

                </Grid>
            </Container>


        </>
    )
}

export default ShowAllCourses












