import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push } from '@firebase/database';

export const coursesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCourses: builder.query({
            queryFn() {
                return { data: 'ok' };
            }
        }),

        addCourse: builder.mutation({
           async queryFn(data) {

            const courseListRef = ref(database, 'courses');
            const newCourseRef = await push(courseListRef);

            try {
               await set(newCourseRef, data);
            } catch (error) {
                console.log(error);
            }
           }
        }),
    })
}); 
