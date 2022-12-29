import React from 'react'

const FaqCard = ({ faq }) => {

    const { faqQuestion, faqAnswer } = faq || {};


    return (
        <div className="bg-gray-800 border-2 border-purple-900 hover:border-purple-400 items-center align-center text-center my-4 py-4 mx-2 px-2 rounded-lg shadow-lg">
            <h3 className="text-bold text-purple-200 text-center my-2 py-2 mx-auto text-xl font-semibold"> {faqQuestion} ?</h3>
            <hr className="w-1/3 mx-auto border-2 rounded-lg shadow-lg" />
            <p className="text-start leading-relaxed text-slate-200 items-center my-3 py-3 mx-3 px-3">{faqAnswer}</p>
        </div>
    )
}

export default FaqCard