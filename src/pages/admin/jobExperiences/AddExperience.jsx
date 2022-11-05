import React from 'react';
import { FormControl, TextField, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddExperienceMutation } from '../../../features/experiences/experiencesApi';
import Error from '../../../components/ui/Error';

const AddExperience = () => {

    const [addExperience, { isLoading, isError, error }] = useAddExperienceMutation();

    const navigate = useNavigate();


    const [jobTitle, setJobTitle] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [jobResponsibility, setJobResponsibility] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobStartedAt, setJobStartedAt] = useState('');
    const [jobEndedAt, setJobEndedAt] = useState('');


    const formSubmitHandler = (e) => {
        e.preventDefault();

        addExperience({
            jobTitle,
            jobPosition,
            jobResponsibility,
            jobCompany,
            jobStartedAt,
            jobEndedAt
        })

        navigate('/dashboard');
    }



    return (
        <>

            <div className="max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10">

                <div className="text-3xl mb-6 text-center ">
                    Add Job/Work <b className='text-green-600'>Experience</b> To Your Liking ❤️
                </div>
                <hr />
                <br />

                <form onSubmit={formSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2 lg:col-span-1">
                            <label>Select Job Start Date</label>
                            <br />
                            <input className='mx-1 my-1 px-1 py-1 border-2 rounded-lg border-green-400' required type='date' value={jobStartedAt} onChange={(e) => setJobStartedAt(e.target.value)} placeholder="start date like 2021/1/4" />
                        </div>


                        <div className="col-span-2 lg:col-span-1">
                            <label>Job End Date * Leave blank if currently working!</label>
                            <br />
                            <input className='mx-1 my-1 px-1 py-1 border-2 rounded-lg border-red-400' type='date' value={jobEndedAt} onChange={(e) => setJobEndedAt(e.target.value)} placeholder="start date like 2021/1/4" />
                        </div>



                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Job Title" />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <input type="text" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Job Position" />
                        </div>

                        <div className="col-span-2">
                            <textarea cols="30" rows="8" value={jobResponsibility} onChange={(e) => setJobResponsibility(e.target.value)} className="rounded-lg border-dashed border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Resposibilities"></textarea>
                        </div>


                        <div className="col-span-2">
                            <input type="text" value={jobCompany} onChange={(e) => setJobCompany(e.target.value)} className="rounded-lg border-solid border-slate-400 border-2 p-3 md:text-xl w-full" required placeholder="Company (Google, Apple etc)" />
                        </div>

                        <div className="col-span-2 text-right">
                            <button type='submit' disabled={isLoading ? isLoading : undefined} className="rounded-lg py-3 px-4 bg-green-500 text-white font-bold w-full sm:w-32 bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500">
                                Add Experience
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

export default AddExperience

