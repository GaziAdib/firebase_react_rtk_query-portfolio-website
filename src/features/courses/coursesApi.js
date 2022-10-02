import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, get, query, orderByKey } from '@firebase/database';

export const coursesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCourses: builder.query({
           async queryFn() {
            const courseRef = ref(database, "courses");
            const courseQuery = query(courseRef, orderByKey());
            const snapshot = await get(courseQuery);
            if (snapshot.exists()) {
                return { data: [...Object.values(snapshot.val())] };
            } else {
                console.log("Data Doesnot Exist!")
            }

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


export const {  useFetchCoursesQuery, useAddCourseMutation } = coursesApi