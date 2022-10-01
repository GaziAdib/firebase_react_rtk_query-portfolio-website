import React from 'react'
import ShowAbout from '../client/about/ShowAbout'
import ShowAllCourses from '../client/course/ShowAllCourses'
import ShowAllProjects from '../client/project/ShowAllProjects'
import ShowAllSkills from '../client/skills/ShowAllSkills'

const Home = () => {
    return (
        <>
            <ShowAllProjects/>
            <ShowAllCourses/>
            <ShowAllSkills/>
            <ShowAbout/>
        </>
    )
}

export default Home
