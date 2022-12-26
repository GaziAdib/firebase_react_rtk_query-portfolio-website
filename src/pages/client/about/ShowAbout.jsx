import React from 'react'
import AboutCard from '../../../components/AboutCard'
import SocialLinks from '../../../components/SocialLinks'
import { useFetchAboutsQuery } from '../../../features/abouts/aboutsApi'



const ShowAbout = () => {


    const { data: abouts, isLoading, isError, error } = useFetchAboutsQuery() || {};

    let aboutData = "";

    if (abouts?.length > 0) {
        aboutData = abouts[1];
        console.log(aboutData);
    }


    // let content;

    // if(isLoading) {
    //     content = <div>Loading</div>;
    // } else if(!isLoading && isError) {
    //     content = <div>Error-{error}</div>;
    // } else if(!isLoading && !isError && abouts.length === 0) {
    //     content = <div>Not Content To show</div>;
    // } else {
    //     content = abouts?.map((about) => {
    //         return <AboutCard about={about} key={about.key} />
    //     })
    // }



    return (

        <div className='flex flex-col md:flex-row items-center justify-center rounded shadow-lg gap-10 md:gap-20 py-20 bg-gray-800'>
            <div className='w-full md:w-6/12 mx-1 px-1'>
                <h2 className='text-center text-5xl text-purple-200 text-bold px-1 py-1 my-2 mx-2'>{aboutData?.aboutTitle}</h2>
                <h2 className='text-center text-2xl md:text-3xl lg:text-3xl text-purple-400 border-2 border-purple-600 border-dashed text-bold px-1 py-2 my-1 mx-1'>{aboutData?.aboutSubTitle}</h2>
                <p className='text-gray-200  text-md text-left items-center mx-2 px-2 py-2 text-gray-200 mt-4 md:text-xl lg:text-2xl'>Hi I am a Gazi Adib . I like to make apps specially android and I am also pretty well in web design and development . feel free to see code of mine!! share too!</p>
                <a href="mailto:greatadib82@gmail.com" className='block mt-3 text-md md:text-lg font-bold text-center text-gray-700 underline hover:text-indigo-500'>greatadib82@gmail.com</a>
                <a href="#" className='block mt-3 text-md md:text-lg font-bold text-center text-gray-700 underline hover:text-indigo-500'>{aboutData?.aboutLocation}</a>
                <SocialLinks
                    aboutSocialMediaFbLink={aboutData?.aboutSocialMediaFbLink}
                    aboutSocialMediaGitLink={aboutData?.aboutSocialMediaGitLink}
                    aboutSocialMediaYtLink={aboutData?.aboutSocialMediaYtLink}
                    aboutSocialMediaLnLink={aboutData?.aboutSocialMediaLnLink} />
            </div>

            <img src='https://pbs.twimg.com/media/FirD77HVUAAZ4LV?format=jpg&name=small' alt='gaziadib' className='w-full md:w-4/12 round-lg object-cover rounded-lg shadow-lg border-2 border-dashed mt-2 mb-2' />
        </div>


    )
}

export default ShowAbout



