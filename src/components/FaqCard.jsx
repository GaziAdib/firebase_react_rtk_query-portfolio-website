import React from 'react'

const FaqCard = ({ faq }) => {

    const { faqQuestion, faqAnswer } = faq || {};


    return (
        <div className="bg-white border-4 border-green-400 items-center align-center text-center my-4 py-4 mx-2 px-2 rounded-lg shadow-lg">
            <h3 className="text-bold text-center my-2 py-2 mx-auto text-xl font-semibold"> {faqQuestion} ?</h3>
            <p className="text-start text-slate-600 items-center my-3 py-3 mx-3 px-3">{faqAnswer}</p>
        </div>
    )
}

export default FaqCard