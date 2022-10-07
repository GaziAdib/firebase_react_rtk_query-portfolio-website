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

      <div className="flex-row flex container items-center mt-2 mb-2 ml-2 mr-2 px-2 py-2">
          {content}
      </div>
       

    </div>
  )
}

export default ShowAllExperiences