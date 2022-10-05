import React from 'react'
import AboutCard from '../../../components/AboutCard'
import { useFetchAboutsQuery } from '../../../features/abouts/aboutsApi'



const ShowAbout = () => {

    
    const {data: abouts, isLoading, isError, error} = useFetchAboutsQuery() || {};


    let content;

    if(isLoading) {
        content = <div>Loading</div>;
    } else if(!isLoading && isError) {
        content = <div>Error-{error}</div>;
    } else if(!isLoading && !isError && abouts.length === 0) {
        content = <div>Not Content To show</div>;
    } else {
        content = abouts?.map((about) => {
            return <AboutCard about={about} key={about.key} />
        })
    }
   

  
    return (
        <div>
        
           {content}

        </div>
    )
}

export default ShowAbout



