import React from 'react';
import TrashIcon from '../../assets/images/trash.png';
import AddIcon from '../../assets/images/edit.png';
import { Link } from 'react-router-dom';
import { useDeleteProjectMutation } from '../../features/projects/projectsApi';
import { toast } from 'react-toastify';

const AdminProjectTable = ({ projects }) => {

    const [deleteProject] = useDeleteProjectMutation();

    const deleteProjectHandler = (id) => {

        deleteProject(id);

        toast('Project Deleted Successfully 👌', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }


    return (
        <>


            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Title
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Tag
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Image
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

                        {projects?.length > 0 ? (projects?.map((project, index) => {
                            const { key, projectTitle, projectTag, projectImageUrl } = project || {};



                            return <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td class="py-4 px-6 dark:text-white font-semibold">
                                    {projectTitle}
                                </td>
                                <td class="py-4 px-6 font-medium">
                                    {projectTag}
                                </td>
                                <td class="py-4 px-6">

                                    <img src={projectImageUrl} height="80px" width="80px" alt="Apple Watch" />

                                </td>
                                <td class="py-4 px-6">
                                    <Link to={'/addProject'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><img src={AddIcon} height="30px" width="30px" alt="add" /></Link>
                                </td>

                                <td class="py-4 px-6">
                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:bg-red-400 rounded " onClick={() => deleteProjectHandler(key)}><img src={TrashIcon} height="30px" width="30px" alt="trash" /></button>
                                </td>


                            </tr>
                        })

                        ) : ('no data in projects table')}




                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AdminProjectTable