import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, get, query, orderByKey, remove } from '@firebase/database';

export const achievementsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all achievements
        fetchAchievements: builder.query({
            async queryFn() {
             const achievementRef = ref(database, "achievements");
             const achievementQuery = query(achievementRef, orderByKey());
             const snapshot = await get(achievementQuery);
             if (snapshot.exists()) {
 
                 var achievementList = [];
                 
                 snapshot.forEach((childSnapshot) => {
                     var key = childSnapshot.key;
                     var data = childSnapshot.val();
 
                     achievementList.push({
                        key: key,
                        achievementTitle: data.achievementTitle,
                        achievementTopics: data.achievementTopics,
                        achievementLink: data.achievementLink,
                        achievementLogo: data.achievementLogo,
                        achievementThumbnail: data.achievementThumbnail
                     });
                 })
 
                 return { data: [...achievementList] };
             
              } else {
                 
                 console.log("Data Does not Exist!")
              }
                 
             }
         }),

         // add an achievements
        addAchievement: builder.mutation({
           async queryFn(data) {

            const achieveListRef = ref(database, 'achievements');
            const newAchievementRef = await push(achieveListRef);

            try {
               await set(newAchievementRef, data);
            } catch (error) {
                console.log(error);
            }
           },

           async onQueryStarted(arg, { queryFulfilled, dispatch}){
            console.log(arg)
            try {
                const {data: addedAchievement} = await queryFulfilled;

                dispatch(rootApi.util.updateQueryData('fetchAchievements', undefined, (draft) => {
                    draft?.push(addedAchievement);
                }))


            } catch(err) {
                console.log('error in catch block')
            }
          }
        }),

        // delete an achievements

        deleteAchievement: builder.mutation({
            async queryFn(id) {
               try{

                await remove(ref(database, 'achievements/' + id))

                return { data: 'ok' };
    
               } catch(err) {

                console.log(err)

               }
        
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch}){

                try {
                    await queryFulfilled;
    
                    dispatch(rootApi.util.updateQueryData('fetchAchievements', undefined, (draft) => {

                        return draft.filter(
                            (achievement) => achievement?.key !== arg
                        );
                        
                    }))
    
    
                } catch(err) {
                    console.log('error in catch block')
                }
              },
            })
        })
    })
 


export const { useFetchAchievementsQuery, useAddAchievementMutation, useDeleteAchievementMutation } = achievementsApi