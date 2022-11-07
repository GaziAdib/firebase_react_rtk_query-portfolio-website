import React from 'react'
import { useFetchAboutsQuery } from '../../../features/abouts/aboutsApi'

const HeroSection = () => {

    const { data: abouts, isLoading, error } = useFetchAboutsQuery() || {};

    console.log(abouts);

    return (
        <>

            <h1 className='mx-auto text-green-600 font-bold'>Hero Section</h1>
            {
                !isLoading && abouts?.map((about, index) => {
                    return <div key={index}>
                        <h2>Title: {about?.aboutTitle}</h2>
                        <h3>Expert :{about?.aboutSubTitle}</h3>
                        <a href={about?.aboutResumeUrl} download={about?.aboutResumeUrl} target="_blank" className='rounded-lg bg-green-600 border-dashed mx-1 my-1 px-1 py-1 text-white'>Download Resume</a>
                    </div>

                })
            }


        </>
    )
}

export default HeroSection