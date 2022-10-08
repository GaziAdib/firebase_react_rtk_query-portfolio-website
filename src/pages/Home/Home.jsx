import React from 'react'
import ShowAbout from '../client/about/ShowAbout'
import ShowAllCourses from '../client/course/ShowAllCourses'
import ShowAllProjects from '../client/project/ShowAllProjects'
import ShowAllSkills from '../client/skills/ShowAllSkills'
import ShowAchievements from '../admin/achievements/ShowAchievements';
import ShowAllExperiences from '../client/experience/ShowAllExperiences'

const Home = () => {
    return (
        <>
        <div className='container items-center mx-auto'>
            <ShowAllProjects/>
            <ShowAllCourses/>
            <ShowAllSkills/>
            <ShowAchievements />
            <ShowAllExperiences />
            <ShowAbout/>
        </div>
           
        </>
    )
}

export default Home
