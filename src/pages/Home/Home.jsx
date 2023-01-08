import React from 'react'
import ShowAbout from '../client/about/ShowAbout'
import ShowAllCourses from '../client/course/ShowAllCourses'
import ShowAllProjects from '../client/project/ShowAllProjects'
import ShowAllSkills from '../client/skills/ShowAllSkills'
import ShowAchievements from '../admin/achievements/ShowAchievements';
import ShowAllExperiences from '../client/experience/ShowAllExperiences'
import ShowQNA from '../client/QASection/ShowQNA'
import Navbar from '../../components/Navbar'



const Home = () => {
    return (
        <>
            {/* items-center my-5 py-1 px-1 mx-auto bg-gray-900 */}
            <div className='items-center  mx-auto bg-gray-900'>
                <Navbar />
                <ShowAbout />
                <ShowQNA />
                <ShowAllProjects />
                <ShowAllCourses />
                <ShowAllSkills />
                <ShowAchievements />
                <ShowAllExperiences />
                <ShowAbout />
            </div>

        </>
    )
}

export default Home
