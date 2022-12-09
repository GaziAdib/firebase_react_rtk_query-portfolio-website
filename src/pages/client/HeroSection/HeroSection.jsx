import React from 'react'
import { Link } from 'react-router-dom';
import { useFetchAboutsQuery } from '../../../features/abouts/aboutsApi'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import SocialLinks from '../../../components/SocialLinks';

const HeroSection = () => {

    const { data: abouts, isLoading, error } = useFetchAboutsQuery() || {};

    console.log(abouts);



    return (
        <>
            {abouts?.length > 0 &&
                abouts?.filter((f) => f?.aboutSubTitle.includes('software')).map((item) => {
                    return <section style={{ backgroundImage: `url("https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&w=1000&q=80")` }} class="bg-white dark:bg-gray-900 my-3 py-3">
                        <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div class="mr-auto place-self-center lg:col-span-7">
                                <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{item?.aboutTitle}</h1>
                                <p class="max-w-2xl mb-6 font-bold text-gray-500 lg:mb-8 md:text-lg lg:text-3xl dark:text-gray-400">{item?.aboutSubTitle}</p>
                                <Link to={'/'} class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                    About Me
                                    <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </Link>
                                <a href={item?.aboutResumeUrl} download target="_blank" class="inline-flex items-center justify-center px-5 py-3 mb-3 text-base font-bold text-center text-gray-900 rounded-lg shadow border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    Download Resume
                                </a>
                                <SocialLinks aboutSocialMediaFbLink={item?.aboutSocialMediaFbLink} aboutSocialMediaGitLink={item?.aboutSocialMediaGitLink} aboutSocialMediaYtLink={item?.aboutSocialMediaYtLink} aboutSocialMediaLnLink={item?.aboutSocialMediaLnLink} />
                            </div>
                            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                                <img src={item?.aboutImageUrl} alt="mockup" />
                            </div>
                        </div>




                    </section>
                })
            }


        </>
    )
}

export default HeroSection







{/* <h1 className='mx-auto text-green-600 font-bold'>Hero Section</h1>
            {
                !isLoading && abouts?.map((about, index) => {
                    return <div key={index}>
                        <h2>Title: {about?.aboutTitle}</h2>
                        <h3>Expert :{about?.aboutSubTitle}</h3>
                        <a href={about?.aboutResumeUrl} download={about?.aboutResumeUrl} target="_blank" className='rounded-lg bg-green-600 border-dashed mx-1 my-1 px-1 py-1 text-white'>Download Resume</a>
                    </div>

                })
            } */}
