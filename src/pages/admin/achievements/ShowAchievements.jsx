import React from 'react'
import AchievementCard from '../../../components/AchievementCard';
import { useFetchAchievementsQuery } from '../../../features/achievements/achievementsApi'

const ShowAchievements = () => {


  const { data: achievements, isLoading, isError, error } = useFetchAchievementsQuery() || {};

  let content;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (!isLoading && isError) {
    content = <div>Error-{error}</div>;
  } else if (!isLoading && !isError && achievements?.length === 0) {
    content = <div>Not Content To show</div>;
  } else {
    content = achievements?.map((achievement) => {
      return <AchievementCard achievement={achievement} key={achievement.key} />
    })
  }



  return (

    <>

      <h2 className='text-center text-3xl  items-center text-bold text-blue-200 mb-5 my-2 py-2'>My Achievements</h2>

      <div id="achievements" className="container items-center align-center px-2 py-3">


        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-3 my-5 mx-2 px-2 py-5 items-center align-center">
          {content}
        </div>


      </div>
    </>





  )
}

export default ShowAchievements

