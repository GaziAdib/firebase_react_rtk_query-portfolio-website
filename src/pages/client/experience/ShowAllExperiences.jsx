import React from 'react'
import JobExperienceCard from '../../../components/JobExperienceCard';
import { useFetchExperiencesQuery } from '../../../features/experiences/experiencesApi';

const ShowAllExperiences = () => {


  const { data: experiences, isLoading, isError, error } = useFetchExperiencesQuery() || {};

  let content;

  if(isLoading) {
      content = <div>Loading</div>;
  } else if(!isLoading && isError) {
      content = <div>Error-{error}</div>;
  } else if(!isLoading && !isError && experiences?.length === 0) {
      content = <div>Not Content To show</div>;
  } else {
      content = experiences?.map((experience) => {
          return <JobExperienceCard experience={experience} key={experience.key} />
      })
  }



  return (
    <div className="container mx-auto items-center mt-2 mb-2 ml-2 mr-2 px-2 py-2">
      <h1 className="text-center text-purple-800 mt-2mb-2 px-2 py-2">Show All Experiences</h1>

     
      <div className="flex-row flex container items-center rounded ml-60 px-2 py-2">
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-5xl px-4 py-12 mx-auto">
              <div className="grid gap-4 mx-4 sm:grid-cols-12">
                  <div className="col-span-12 sm:col-span-3">
                      <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-400">
                          <h3 className="text-2xl font-semibold">Work Expericence</h3>
                          <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">Company</span>
                      </div>
                  </div>
                  <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">

                    {content}

                  </div>
              </div>
          </div>
        </section>
      </div>
    

    </div>
  )
}

export default ShowAllExperiences