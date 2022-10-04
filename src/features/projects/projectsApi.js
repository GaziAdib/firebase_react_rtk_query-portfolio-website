import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, query, get, orderByKey, remove } from '@firebase/database';

export const projectsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all projects
        fetchProjects: builder.query({
           async queryFn() {
            const projectRef = ref(database, "projects");
            const projectQuery = query(projectRef, orderByKey());
            const snapshot = await get(projectQuery);
            if (snapshot.exists()) {

                var projectList = [];
                
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key;
                    var data = childSnapshot.val();

                    projectList.push({
                        key: key,
                        projectTitle: data.projectTitle,
                        projectTag: data.projectTag,
                        projectDescription: data.projectDescription,
                        projectGitLink: data.projectGitLink,
                        projectDemoLink: data.projectDemoLink,
                        projectVideoLink: data.projectVideoLink,
                        projectImageUrl: data.projectImageUrl
                    });
                })

                return { data: [...projectList] };
            
             } else {
                
                console.log("Data Doesnot Exist!")
             }
                
            }
        }),

        // add project
        addProject: builder.mutation({
           async queryFn(data) {
            const projectListRef =  ref(database, 'projects');
            const newProjectRef = await push(projectListRef);
            try {
               await set(newProjectRef, data);
               return { data: data };
            } catch (err) {
                return { error: err ? err : null };
            }
           },

          async onQueryStarted(arg, { queryFulfilled, dispatch}){
            console.log(arg)
            try {
                const {data: addedProject} = await queryFulfilled;

                dispatch(rootApi.util.updateQueryData('fetchProjects', undefined, (draft) => {
                    draft?.push(addedProject)
                }))


            } catch(err) {
                console.log('error in catch block')
            }
          }
        }),

        // delete project by key
        deleteProject: builder.mutation({
            async queryFn(id) {
               try{

                await remove(ref(database, 'projects/' + id))

                return { data: 'ok' };
    
               } catch(err) {

                console.log(err)

               }
        
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch}){
                console.log('arg', arg);
                try {
                    await queryFulfilled;
    
                    dispatch(rootApi.util.updateQueryData('fetchProjects', undefined, (draft) => {

                        console.log(JSON.stringify(draft));

                        return draft.filter(
                            (project) => project?.key !== arg
                        );
                        
                    }))
    
    
                } catch(err) {
                    console.log('error in catch block')
                }
              },
            })
        })
    });


export const { useFetchProjectsQuery, useAddProjectMutation, useDeleteProjectMutation } = projectsApi


