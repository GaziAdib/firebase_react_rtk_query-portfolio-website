import React from 'react'
import FaqCard from '../../../components/FaqCard';
import { useFetchFaqsQuery } from '../../../features/faqs/faqsApi'

const ShowQNA = () => {


    const { data: faqs, isLoading, isError, error } = useFetchFaqsQuery() || {};

    let content;

    if (isLoading) {
        content = <div>Loading</div>;
    } else if (!isLoading && isError) {
        content = <div>Error-{error}</div>;
    } else if (!isLoading && !isError && faqs?.length === 0) {
        content = <div>Not Content To show</div>;
    } else {
        content = faqs?.map((faq) => {
            return <FaqCard faq={faq} key={faq.key} />
        })
    }




    return (
        <>
            <h1 className="text-center text-white mx-auto text-bold text-3xl my-3 px-2 py-2">Q N A Section</h1>

            <div className="mt-5 py-5 text-center bg-gray-800 items-center rounded">

                <div class="container mx-auto items-center mx-auto">
                    <h2 className="text-bold text-center text-slate-200 my-3 py-2 mx-auto text-3xl">Most Frequently Asked Question About me ? ☕</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 my-5 mx-2 px-2 py-5 items-center align-center">

                        {/* 
Each Card */}
                        {content}

                        {/* 
Each Card */}




                    </div>
                </div>

            </div>

        </>
    )
}

export default ShowQNA


{/* <div className="bg-white border-4 border-green-400 items-center align-center text-center my-4 py-4 mx-2 px-2 rounded-lg shadow-lg">
                            <h3 className="text-bold text-center my-2 py-2 mx-auto text-xl font-semibold">How We Manage Our Work ?</h3>
                            <p className="text-start text-slate-600 items-center my-3 py-3 mx-3 px-3">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>

                        <div className="bg-white border-4 border-green-400 items-center align-center text-center my-4 py-4 mx-2 px-2 rounded-lg shadow-lg">
                            <h3 className="text-bold text-center my-2 py-2 mx-auto text-xl font-semibold">How We Manage Our Work ?</h3>
                            <p className="text-start text-slate-600 items-center my-3 py-3 mx-3 px-3">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>

                        <div className="bg-white border-4 border-green-400 items-center align-center text-center my-4 py-4 mx-2 px-2 rounded-lg shadow-lg">
                            <h3 className="text-bold text-center my-2 py-2 mx-auto text-xl font-semibold">How We Manage Our Work ?</h3>
                            <p className="text-start text-slate-600 items-center my-3 py-3 mx-3 px-3">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div> */}