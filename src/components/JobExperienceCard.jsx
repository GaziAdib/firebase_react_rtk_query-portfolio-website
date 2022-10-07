import React from 'react'

const JobExperienceCard = ({ experience }) => {

    const { key, jobTitle, jobPosition, jobResponsibility, jobCompany, jobStartedAt, jobEndedAt } = experience || {};

  
    return (
        <>
    
    <div className="justify-between items-center mx-1 my-1 px-2 py-3 w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 pb-2">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{jobTitle}</h5>
            </a>
            <div className="flex justify-between items-center">
                <h4 className='text-white mt-1 mb-1 p-1 text-center font-sm'>{jobPosition}</h4>
                <span className="ml-2 mr-2 px-1 py-1 text-sm dark:text-white">
                    {jobResponsibility} - at Company :  <span>{jobCompany}</span>
                </span>
                <div className='text-white text-sm'> Job Started: {jobStartedAt} - {jobEndedAt ? jobEndedAt : ''} </div>
            </div>
        </div>
    </div>
       
        

        </>
      )
}

export default JobExperienceCard