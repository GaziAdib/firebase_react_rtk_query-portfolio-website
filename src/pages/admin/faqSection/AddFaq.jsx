import React, { useState } from 'react'
import { useAddFaqMutation } from '../../../features/faqs/faqsApi';
import Error from '../../../components/ui/Error';
import { useNavigate } from 'react-router-dom';

const AddFaq = () => {


    const [addFaq, { isLoading, isError, error }] = useAddFaqMutation() || {};

    const navigate = useNavigate();


    const [faqQuestion, setFaqQuestion] = useState('');

    const [faqAnswer, setFaqAnswer] = useState('');


    const formSubmitHandler = (e) => {
        e.preventDefault();

        // Functionality to Add FAQ Section 

        addFaq({
            faqQuestion,
            faqAnswer
        })

        navigate('/');

    }


    return (
        <>

            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add <b className='text-green-600'>FAQ Question</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2 lg:col-span-2">
                            <input type="text" value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="FAQ Question" />
                        </div>



                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="FAQ Description"></textarea>
                        </div>


                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add FAQ
                            </button>
                        </div>

                    </div>
                </form>
                <div className="flex items-center justify-between">
                    {!isLoading && error && <Error message={error} />}
                </div>
            </div>



        </>
    )
}

export default AddFaq