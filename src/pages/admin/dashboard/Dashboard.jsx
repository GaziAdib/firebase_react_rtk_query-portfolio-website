import React from 'react';
import AdminAboutTable from '../../../components/AdminTables/AdminAboutTable';
import AdminAchievementTable from '../../../components/AdminTables/AdminAchievementTable';
import AdminCourseTable from '../../../components/AdminTables/AdminCourseTable';
import AdminExperienceTable from '../../../components/AdminTables/AdminExperienceTable';
import AdminProjectTable from '../../../components/AdminTables/AdminProjectTable';
import AdminSkillTable from '../../../components/AdminTables/AdminSkillTable';
import { useFetchAboutsQuery } from '../../../features/abouts/aboutsApi';
import { useFetchAchievementsQuery } from '../../../features/achievements/achievementsApi';
import { useFetchCoursesQuery } from '../../../features/courses/coursesApi';
import { useFetchExperiencesQuery } from '../../../features/experiences/experiencesApi';
import { useFetchProjectsQuery } from '../../../features/projects/projectsApi';
import { useFetchSkillsQuery } from '../../../features/skills/skillsApi';

const Dashboard = () => {

  // GET Required Data from Projects Database

  const {data: projects, error: projectError, isLoading: projectIsLoading} = useFetchProjectsQuery() || {};

  const {data: courses, error: courseError, isLoading: courseIsLoading} = useFetchCoursesQuery() || {};

  const {data: skills, error: skillError, isLoading: skillIsLoading} = useFetchSkillsQuery() || {};

  const {data: abouts, error: aboutError, isLoading: aboutIsLoading} = useFetchAboutsQuery() || {};

  const {data: achievements, error: achievementError, isLoading: achievementIsLoading} = useFetchAchievementsQuery() || {};

  const {data: experiences, error: experienceError, isLoading: experienceIsLoading} = useFetchExperiencesQuery() || {};

  return (
    <>
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen h-full'>

    <h1 className='text-lg text-center underline font-bold text-white m-2 px-2 py-2'>Admin Dashboard</h1>
      <br />

      <div className='container mx-auto px-2 py-3'>

        {/* // table 1 */}

        <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>My Projects</h2>
         <AdminProjectTable projects={projects} />
         <br />
         <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>My Courses</h2>
         <AdminCourseTable courses={courses} />
         <br />
         <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>My Skills</h2>
         <AdminSkillTable skills={skills} />
         <br />
         <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>My Abouts</h2>
         <AdminAboutTable abouts={abouts} />
         <br />
         <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>My Achievements</h2>
         <AdminAchievementTable achievements={achievements} />
         <br />
         <h2 className='text-lg text-center font-bold text-white m-2 px-2 py-2'>Work Experience</h2>
         <AdminExperienceTable experiences={experiences} />
         
      
      </div>
   
    </div>
      
        
    </>   
  )
}

export default Dashboard