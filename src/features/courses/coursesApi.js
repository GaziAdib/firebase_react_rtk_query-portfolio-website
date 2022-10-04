import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, get, query, orderByKey, remove } from '@firebase/database';

export const coursesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchCourses: builder.query({
            async queryFn() {
             const courseRef = ref(database, "courses");
             const courseQuery = query(courseRef, orderByKey());
             const snapshot = await get(courseQuery);
             if (snapshot.exists()) {
 
                 var courseList = [];
                 
                 snapshot.forEach((childSnapshot) => {
                     var key = childSnapshot.key;
                     var data = childSnapshot.val();
 
                     courseList.push({
                         key: key,
                         courseTitle: data.courseTitle,
                         courseTag: data.courseTag,
                         courseDescription: data.courseDescription,
                         courseGitLink: data.courseGitLink,
                         courseDemoLink: data.courseDemoLink,
                         courseVideoLink: data.courseVideoLink,
                         courseImageUrl: data.courseImageUrl
                     });
                 })
 
                 return { data: [...courseList] };
             
              } else {
                 
                 console.log("Data Doesnot Exist!")
              }
                 
             }
         }),

         // add a course
        addCourse: builder.mutation({
           async queryFn(data) {

            const courseListRef = ref(database, 'courses');
            const newCourseRef = await push(courseListRef);

            try {
               await set(newCourseRef, data);
            } catch (error) {
                console.log(error);
            }
           },

           async onQueryStarted(arg, { queryFulfilled, dispatch}){
            console.log(arg)
            try {
                const {data: addedCourse} = await queryFulfilled;

                dispatch(rootApi.util.updateQueryData('fetchCourses', undefined, (draft) => {
                    draft?.push(addedCourse);
                }))


            } catch(err) {
                console.log('error in catch block')
            }
          }
        }),

        // delete course by key

        deleteCourse: builder.mutation({
            async queryFn(id) {
               try{

                await remove(ref(database, 'courses/' + id))

                return { data: 'ok' };
    
               } catch(err) {

                console.log(err)

               }
        
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch}){

                try {
                    await queryFulfilled;
    
                    dispatch(rootApi.util.updateQueryData('fetchCourses', undefined, (draft) => {

                        return draft.filter(
                            (course) => course?.key !== arg
                        );
                        
                    }))
    
    
                } catch(err) {
                    console.log('error in catch block')
                }
              },
            })
        })
    })
 


export const {  useFetchCoursesQuery, useAddCourseMutation, useDeleteCourseMutation } = coursesApi