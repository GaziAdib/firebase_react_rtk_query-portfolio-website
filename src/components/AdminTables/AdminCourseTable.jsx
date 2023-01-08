import React from 'react';
import TrashIcon from '../../assets/images/trash.png';
import AddIcon from '../../assets/images/edit.png';
import { Link } from 'react-router-dom';
import { useDeleteCourseMutation } from '../../features/courses/coursesApi';
import { toast } from 'react-toastify';


const AdminCourseTable = ({ courses }) => {

    const [deleteCourse] = useDeleteCourseMutation();

    const deleteCourseHandler = (id) => {

        deleteCourse(id);

        toast('Course Deleted Successfully 👌', {
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

                        {courses?.length > 0 ? (courses?.map((course, index) => {

                            const { key, courseTitle, courseTag, courseImageUrl } = course || {};

                            return <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td class="py-4 px-6 dark:text-white font-semibold">
                                    {courseTitle}
                                </td>
                                <td class="py-4 px-6 font-medium">
                                    {courseTag}
                                </td>
                                <td class="py-4 px-6">

                                    <img src={courseImageUrl} height="80px" width="80px" alt="image" />

                                </td>
                                <td class="py-4 px-6">
                                    <Link to={'/addCourse'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><img src={AddIcon} height="30px" width="30px" alt="add" /></Link>
                                </td>

                                <td class="py-4 px-6">
                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:bg-red-400 rounded " onClick={() => deleteCourseHandler(key)}><img src={TrashIcon} height="30px" width="30px" alt="trash" /></button>
                                </td>


                            </tr>
                        })

                        ) : ('no data in courses table')}




                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AdminCourseTable