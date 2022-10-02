import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, query, get, orderByKey } from '@firebase/database';

export const projectsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchProjects: builder.query({
           async queryFn() {
            const projectRef = ref(database, "projects");
            const projectQuery = query(projectRef, orderByKey());
            const snapshot = await get(projectQuery);
            if (snapshot.exists()) {
            
                //return [...Object.values(snapshot.val())];
                return { data: [...Object.values(snapshot.val())] };
               
                // setProjects((prevProjects) => {
                //     return [...prevProjects, ...Object.values(snapshot.val())];
                // });
                
             } else {
                
                console.log("Data Doesnot Exist!")
             }
                // return { data: 'ok' };
            }
        }),

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
    })
});

export const { useFetchProjectsQuery, useAddProjectMutation } = projectsApi
