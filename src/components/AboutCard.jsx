import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from './SocialLinks';



const AboutCard = ({ about }) => {

    const {key, aboutTitle, aboutSubTitle, aboutShortDescription, aboutImageUrl, aboutLocation, aboutSocialMediaFbLink, aboutSocialMediaGitLink, aboutSocialMediaYtLink, aboutSocialMediaLnLink
    } = about || {}


    console.log(aboutTitle, aboutImageUrl)

    return (
        <>

        <div className="main-about-container">
            <div className="left-content">
                <div className="my-image">
                    <img src={aboutImageUrl} alt="myimage" />
                </div>

                <div className="aboutTitleSubTitleContainer">
                    <h2 className="border-2 px-2 text-center bg-green-600 rounded">{aboutTitle}</h2>
                    <h3>{aboutSubTitle}</h3>
                </div>
                
            </div>



            <div className="right-content">

                <hr style={{background: 'gray', lineHeight: '1px', height: '0.4px'}} />
                <p>"{aboutShortDescription}"</p>
                <br />
              
        
                <hr style={{background: 'gray', lineHeight: '0.5px', height: '0.2px', width: '30%'}} />
            
                <p style={{color: '#00BCA5', fontWeight: '600'}}>Follow Me On This Social Platforms...</p>

                <SocialLinks aboutSocialMediaFbLink={aboutSocialMediaFbLink} aboutSocialMediaGitLink={aboutSocialMediaGitLink} aboutSocialMediaYtLink={aboutSocialMediaYtLink} aboutSocialMediaLnLink={aboutSocialMediaLnLink}/>

                <h5><FontAwesomeIcon icon={faLocationArrow} /> {aboutLocation}</h5>
               
                
            </div>

        </div>

               

                
       </>
    )
}

export default AboutCard
