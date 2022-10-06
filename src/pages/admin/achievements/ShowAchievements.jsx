import React from 'react'
import AchievementCard from '../../../components/AchievementCard';
import { useFetchAchievementsQuery } from '../../../features/achievements/achievementsApi'

const ShowAchievements = () => {


  const { data: achievements, isLoading, isError, error } = useFetchAchievementsQuery() || {};

  let content;

  if(isLoading) {
      content = <div>Loading</div>;
  } else if(!isLoading && isError) {
      content = <div>Error-{error}</div>;
  } else if(!isLoading && !isError && achievements?.length === 0) {
      content = <div>Not Content To show</div>;
  } else {
      content = achievements?.map((achievement) => {
          return <AchievementCard achievement={achievement} key={achievement.key} />
      })
  }



  return (
    <div className="container mx-auto items-center mt-2 mb-2 ml-2 mr-2 px-2 py-2">
      <h1 className="text-center text-purple-800 mt-2mb-2 px-2 py-2">Show all Achievements</h1>

      <div className="container mx-auto items-center mt-2 mb-2 ml-2 mr-2 px-2 py-2">
          {content}
      </div>
       

    </div>
  )
}

export default ShowAchievements