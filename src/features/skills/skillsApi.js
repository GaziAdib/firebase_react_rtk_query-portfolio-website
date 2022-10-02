import { rootApi } from "../rootApi/rootApi";
import { database } from "../../firebase";
import { ref, set, push, query, get, orderByKey } from '@firebase/database';

export const skillsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all skills section
        fetchSkills: builder.query({
           async queryFn() {
            
            const skillsRef = ref(database, "skills");
            const skillsQuery = query(skillsRef, orderByKey());
            const snapshot = await get(skillsQuery);
            if (snapshot.exists()) {
                return { data: [...Object.values(snapshot.val())] };
            } else {
                console.log("Data Doesnot Exist!")
             }

           }
        }),

        // add skills section

        addSkill: builder.mutation({
            async queryFn(data) {
             const skillListRef =  ref(database, 'skills');
             const newSkillRef = await push(skillListRef);
             try {
                await set(newSkillRef, data);
                return { data: data };
             } catch (err) {
                 return { error: err ? err : null };
             }
            }
         }),

    })
})

export const { useFetchSkillsQuery, useAddSkillMutation } = skillsApi
