import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faYoutube, faGithub, faCodepen } from '@fortawesome/free-brands-svg-icons';



const ProjectCard = ({ project }) => {

    
const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


    const[open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }



    return (
        <>

        
                <Card variant="elevation" style={{margin: '5px', padding: '5px', borderRadius: '10px'}} sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={project.projectImageUrl}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.projectTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {project.projectDescription.slice(0,40)}...
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small"><a href={project.projectVideoLink} target="_blank">Video</a></Button>
                    <Button size="small" onClick={openModal}>View</Button>
                    </CardActions>
                </Card>
          

            <Modal isOpen={open}  onAfterClose={closeModal} style={customStyles}>
                <Card variant="outlined" style={{margin: '5px', padding: '5px', borderRadius: '5px'}} sx={{ maxWidth: 600 }}>
                        <img src={project.projectImageUrl} height='300px' width='500px'/>
                        <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {project.projectTitle}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div">
                            {project.projectTag}
                        </Typography>
                        <hr />
                        <Typography variant="body1" color="text.secondary">
                        {project.projectDescription}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button style={{padding: '5px', fontSize: '30px'}}><a href={project.projectVideoLink} target="_blank"><FontAwesomeIcon icon={faYoutube}/></a></Button>
                        <Button style={{padding: '5px', fontSize: '30px'}}><a href={project.projectGitLink} target="_blank"><FontAwesomeIcon icon={faGithub}/></a></Button>
                        <Button style={{padding: '5px', fontSize: '30px'}}><a href={project.projectDemoLink} target="_blank"><FontAwesomeIcon icon={faCodepen}/></a></Button>
            
                    
                        </CardActions>
                    </Card>

                    <Button onClick={closeModal}>Close Modal</Button>
          
            </Modal>
       

            
       
       </>
    )
}

export default ProjectCard
