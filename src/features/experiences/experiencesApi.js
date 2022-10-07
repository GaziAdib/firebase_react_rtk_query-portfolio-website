import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, get, query, orderByKey, remove } from '@firebase/database';

export const experiencesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchExperiences: builder.query({
            async queryFn() {
             const experienceRef = ref(database, "experiences");
             const experienceQuery = query(experienceRef, orderByKey());
             const snapshot = await get(experienceQuery);
             if (snapshot.exists()) {
 
                 var experienceList = [];
                 
                 snapshot.forEach((childSnapshot) => {
                     var key = childSnapshot.key;
                     var data = childSnapshot.val();
 
                     experienceList.push({
                         key: key,
                         jobTitle: data.jobTitle,
                         jobPosition: data.jobPosition,
                         jobResponsibility: data.jobResponsibility,
                         jobCompany: data.jobCompany,
                         jobStartedAt: data.jobTitle,
                         jobEndedAt: data?.jobEndedAt ? data?.jobEndedAt : 'Current',
                     });
                 })
 
                 return { data: [...experienceList] };
             
              } else {
                 
                 console.log("Data Does not Exist!")
              }
                 
             }
         }),

         // add a course
        addExperience: builder.mutation({
           async queryFn(data) {

            const experienceListRef = ref(database, 'experiences');
            const newExperienceRef = await push(experienceListRef);

            try {
               await set(newExperienceRef, data);
            } catch (error) {
                console.log(error);
            }
           },

           async onQueryStarted(arg, { queryFulfilled, dispatch}){
            console.log(arg)
            try {
                const {data: addedExperience} = await queryFulfilled;

                dispatch(rootApi.util.updateQueryData('fetchExperiences', undefined, (draft) => {
                    draft?.push(addedExperience);
                }))


            } catch(err) {
                console.log('error in catch block')
            }
          }
        }),

        // delete course by key

        deleteExperience: builder.mutation({
            async queryFn(id) {
               try{

                await remove(ref(database, 'experiences/' + id))

                return { data: 'ok' };
    
               } catch(err) {

                console.log(err)

               }
        
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch}){

                try {
                    await queryFulfilled;
    
                    dispatch(rootApi.util.updateQueryData('fetchExperiences', undefined, (draft) => {

                        return draft.filter(
                            (experience) => experience?.key !== arg
                        );
                        
                    }))
    
    
                } catch(err) {
                    console.log('error in catch block')
                }
              },
            })
        })
    })
 


export const {  useFetchExperiencesQuery, useAddExperienceMutation, useDeleteExperienceMutation  } = experiencesApi