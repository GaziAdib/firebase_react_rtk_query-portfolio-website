import React from 'react'

const JobExperienceCard = ({ experience }) => {

    const { key, jobTitle, jobPosition, jobResponsibility, jobCompany, jobStartedAt, jobEndedAt } = experience || {};


    return (
        <>
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                    <h3 className="text-xl font-semibold tracking-wide">{jobPosition} - ({jobCompany}) </h3>
                    <time className="text-xs tracking-wide uppercase dark:text-gray-400">{jobStartedAt} - {jobEndedAt}</time>
                    <p className="mt-3">{jobResponsibility}</p>
                </div>
            </div>

        </>
    )
}

export default JobExperienceCard


