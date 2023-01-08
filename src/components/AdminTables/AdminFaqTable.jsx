import React from 'react';
import TrashIcon from '../../assets/images/trash.png';
import AddIcon from '../../assets/images/edit.png';
import { Link } from 'react-router-dom';
import { useDeleteFaqMutation } from '../../features/faqs/faqsApi';
import { toast } from 'react-toastify';




const AdminFaqTable = ({ faqs }) => {

    const [deleteFaq, { isError, isLoading, error }] = useDeleteFaqMutation() || {};

    const deleteFaqHandler = (id) => {

        deleteFaq(id);

        toast('FAQ Deleted Successfully 👌', {
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

            <div class="overflow-x-auto relative shadow-lg shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="py-3 px-6">
                                FAQ Question
                            </th>
                            <th scope="col" class="py-3 px-6">
                                FAQ Answer
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

                        {faqs?.length > 0 ? (faqs?.map((faq, index) => {

                            const { key, faqQuestion, faqAnswer } = faq || {};

                            return <tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                                <td class="py-4 px-6 dark:text-white font-semibold">
                                    {faqQuestion}
                                </td>

                                <td class="py-4 px-6 dark:text-white font-semibold">
                                    {
                                        faqAnswer?.length > 100 ? faqAnswer.slice(0, 99) : faqAnswer
                                    }
                                </td>

                                <td class="py-4 px-6">
                                    <Link to={'/addFaq'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><img src={AddIcon} height="30px" width="30px" alt="add" /></Link>
                                </td>

                                <td class="py-4 px-6">
                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:bg-red-400 rounded " onClick={() => deleteFaqHandler(key)}><img src={TrashIcon} height="30px" width="30px" alt="trash" /></button>
                                </td>


                            </tr>
                        })

                        ) : ('no data in Faq table')}



                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AdminFaqTable