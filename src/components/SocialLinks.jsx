import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


const SocialLinks = ({ aboutSocialMediaFbLink, aboutSocialMediaGitLink, aboutSocialMediaYtLink, aboutSocialMediaLnLink }) => {
    return (
        <>
            <div className="items-center text-center text-xl md:text-2xl lg:text-3xl my-4 py-3 shadow-lg rounded-lg">
                <a id="fb" href={aboutSocialMediaFbLink} target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
                <a id="git" href={aboutSocialMediaGitLink} target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                <a id="yt" href={aboutSocialMediaYtLink} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
                <a id="ln" href={aboutSocialMediaLnLink} target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
        </>
    )
}

export default SocialLinks
