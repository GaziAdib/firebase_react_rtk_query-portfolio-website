import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from './SocialLinks';



const AboutCard = ({ about }) => {
    return (
        <>

        <div className="main-about-container">
            <div className="left-content">
                <div className="my-image">
                    <img src={about.aboutImageUrl} alt="myimage" />
                </div>

                <div className="aboutTitleSubTitleContainer">
                    <h2>{about.aboutTitle}</h2>
                    <h3>{about.aboutSubTitle}</h3>
                </div>
                
            </div>



            <div className="right-content">

                <hr style={{background: 'gray', lineHeight: '1px', height: '0.4px'}} />
                <p>"{about.aboutShortDescription}"</p>
                <br />
              
        
                <hr style={{background: 'gray', lineHeight: '0.5px', height: '0.2px', width: '30%'}} />
            
                <p style={{color: '#00BCA5', fontWeight: '600'}}>Follow Me On This Social Platforms...</p>

                <SocialLinks aboutSocialMediaFbLink={about.aboutSocialMediaFbLink} aboutSocialMediaGitLink={about.aboutSocialMediaGitLink} aboutSocialMediaYtLink={about.aboutSocialMediaYtLink}/>

                <h5><FontAwesomeIcon icon={faLocationArrow} /> {about.aboutLocation}</h5>
               
                
            </div>

        </div>

               

                
                    
                
                   
               
          
    
       </>
    )
}

export default AboutCard
