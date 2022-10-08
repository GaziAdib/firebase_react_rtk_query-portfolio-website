import React from 'react';
import TrashIcon from '../../assets/images/trash.png';
import AddIcon from '../../assets/images/edit.png';
import { Link } from 'react-router-dom';
import { useDeleteAchievementMutation } from '../../features/achievements/achievementsApi';

const AdminAchievementTable = ({ achievements }) => {

    const [deleteAchievement] = useDeleteAchievementMutation();

    const deleteAchievementHandler = (id) => {

        deleteAchievement(id);
       
    }


  return (
    <>

    
<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Thumbnail
                </th>
                <th scope="col" class="py-3 px-6">
                    Title
                </th>
                <th scope="col" class="py-3 px-6">
                    Topics
                </th>
                <th scope="col" class="py-3 px-6">
                    Add
                </th>
                <th scope="col" class="py-3 px-6">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>

            {achievements?.length > 0 ? (achievements?.map((achievement, index) => {
                const {key, achievementTitle, achievementThumbnail, achievementTopics} = achievement || {};



                return  <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td class="py-4 px-6">
            
                <img src={achievementThumbnail} height="80px" width="80px" alt="achievement thumbnail"/>
        
                </td>
                <td class="py-4 px-6 dark:text-white font-semibold">
                    {achievementTitle}
                </td>
                <td class="py-4 px-6 font-medium">
                    {achievementTopics.map((item) => {
                        return <span className='text-center text-green-400'> {item}, </span>
                    })}
                </td>
               
                <td class="py-4 px-6">
                    <Link to={'/addAchievement'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><img src={AddIcon} height="30px" width="30px" alt="add" /></Link>
                </td>

                <td class="py-4 px-6">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:bg-red-400 rounded " onClick={() => deleteAchievementHandler(key)}><img src={TrashIcon} height="30px" width="30px" alt="trash" /></button>
                </td>


            </tr>
            })
                
            ) : ('no data in achievementss table')}


           
            
        </tbody>
    </table>
</div>

    </>
  )
}

export default AdminAchievementTable