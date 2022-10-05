import React from 'react';
import AdminCourseTable from '../../../components/AdminTables/AdminCourseTable';
import AdminProjectTable from '../../../components/AdminTables/AdminProjectTable';
import AdminSkillTable from '../../../components/AdminTables/AdminSkillTable';
import { useFetchCoursesQuery } from '../../../features/courses/coursesApi';
import { useFetchProjectsQuery } from '../../../features/projects/projectsApi';
import { useFetchSkillsQuery } from '../../../features/skills/skillsApi';

const Dashboard = () => {

  // GET Required Data from Projects Database

  const {data: projects, error: projectError, isLoading: projectIsLoading} = useFetchProjectsQuery() || {};

  const {data: courses, error: courseError, isLoading: courseIsLoading} = useFetchCoursesQuery() || {};

  const {data: skills, error: skillError, isLoading: skillIsLoading} = useFetchSkillsQuery() || {};

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
         
      
      </div>
   
    </div>
      
        
    </>   
  )
}

export default Dashboard