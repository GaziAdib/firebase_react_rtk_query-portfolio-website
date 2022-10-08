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
import { useDeleteProjectMutation } from '../features/projects/projectsApi';



const ProjectCard = ({ project }) => {

    const { key, projectTitle, projectDescription, projectTag, projectDemoLink, projectImageUrl, projectVideoLink, projectGitLink } = project || {};


const mainId = key; 

const [deleteProject] = useDeleteProjectMutation(mainId);
    
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

    const deleteSingleProject = () => {
        console.log('delete');

        deleteProject(mainId);

        
    }



    return (
        <>

                <div className="mx-2 my-1 px-1 py-1 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg h-48 w-full rounded shadow-lg hover:scale-25" src={projectImageUrl} alt="project image"/>
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{projectTitle.slice(0,40)}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{projectDescription.slice(0,80)}...</p>
                        <a href={projectGitLink} className="align-bottom inline-flex items-center mx-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-200 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Git
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href={projectVideoLink} className="align-bottom inline-flex mx-2 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Video
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>

        
                {/* <Card variant="elevation" style={{margin: '5px', padding: '5px', borderRadius: '10px'}} sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={project.projectImageUrl}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography onClick={deleteSingleProject} gutterBottom variant="h5" component="div">
                        delete
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.projectTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {project?.projectDescription.slice(0,40)}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small"><a href={project.projectVideoLink} target="_blank">Video</a></Button>
                    <Button size="small" onClick={openModal}>View</Button>
                    </CardActions>
                </Card> */}
          

            {/* <Modal isOpen={open}  onAfterClose={closeModal} style={customStyles}>
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
        */}

            
       
       </>
    )
}

export default ProjectCard
