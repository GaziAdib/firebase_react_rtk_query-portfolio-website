import React from 'react';
import TrashIcon from '../../assets/images/trash.png';
import AddIcon from '../../assets/images/edit.png';
import { Link } from 'react-router-dom';
import { useDeleteSkillMutation } from '../../features/skills/skillsApi';



const AdminSkillTable = ({ skills }) => {

    const [deleteSkill] = useDeleteSkillMutation();

    const deleteSkillHandler = (id) => {

    deleteSkill(id);
       
    }


  return (
    <>

    
<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Skill Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Skill Score
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

            {skills?.length > 0 ? (skills?.map((skill) => {

                const { key, skillName, skillScore } = skill || {};

                return  <tr key={key} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td class="py-4 px-6 dark:text-white font-semibold">
                    {skillName}
                </td>
                <td class="py-4 px-6 font-medium">
                    {skillScore}
                </td>
                <td class="py-4 px-6">
                    <Link to={'/addSkill'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><img src={AddIcon} height="30px" width="30px" alt="add" /></Link>
                </td>

                <td class="py-4 px-6">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:bg-red-400 rounded " onClick={() => deleteSkillHandler(key)}><img src={TrashIcon} height="30px" width="30px" alt="trash" /></button>
                </td>


            </tr>
            })
                
            ) : ('no data in skills table')}


           
            
        </tbody>
    </table>
</div>

    </>
  )
}

export default AdminSkillTable