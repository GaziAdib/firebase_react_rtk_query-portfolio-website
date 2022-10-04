import { rootApi } from "../rootApi/rootApi";
import { database } from "../../firebase";
import { ref, set, push, query, get, orderByKey, remove } from '@firebase/database';

export const skillsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all skills section
        fetchSkills: builder.query({
            async queryFn() {
             const skillRef = ref(database, "skills");
             const skillQuery = query(skillRef, orderByKey());
             const snapshot = await get(skillQuery);
             if (snapshot.exists()) {
 
                 var skillList = [];
                 
                 snapshot.forEach((childSnapshot) => {
                     var key = childSnapshot.key;
                     var data = childSnapshot.val();
 
                     skillList.push({
                        key: key,
                        skillName: data.skillName,
                        skillScore: data.skillScore
                     });
                 })
 
                 return { data: [...skillList] };
             
              } else {
                 
                 console.log("Data Doesnot Exist!")
              }
                 
             }
         }),

        // add skills section
        addSkill: builder.mutation({
            async queryFn(data) {
             const skillsListRef =  ref(database, 'skills');
             const newskillRef = await push(skillsListRef);
             try {
                await set(newskillRef, data);
                return { data: data };
             } catch (err) {
                 return { error: err ? err : null };
             }
            },
 
           async onQueryStarted(arg, { queryFulfilled, dispatch}){
             console.log(arg)
             try {
                 const {data: addedSkill} = await queryFulfilled;
 
                 dispatch(rootApi.util.updateQueryData('fetchSkills', undefined, (draft) => {
                     draft?.push(addedSkill)
                 }))
 
 
             } catch(err) {
                 console.log('error in catch block')
             }
           }
        }),

        // delete skill by key

        deleteSkill: builder.mutation({
            async queryFn(id) {
               try{

                await remove(ref(database, 'skills/' + id))

                return { data: 'ok' };
    
               } catch(err) {

                console.log(err)

               }
        
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch}){
    
                try {
                    await queryFulfilled;
    
                    dispatch(rootApi.util.updateQueryData('fetchSkills', undefined, (draft) => {


                        return draft.filter(
                            (skill) => skill?.key !== arg
                        );
                        
                    }))
    
    
                } catch(err) {
                    console.log('error in catch block')
                }
              },
        })
        })

    })


export const { useFetchSkillsQuery, useAddSkillMutation, useDeleteSkillMutation } = skillsApi
