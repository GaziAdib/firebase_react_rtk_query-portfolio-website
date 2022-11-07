import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, query, get, orderByKey, remove } from '@firebase/database';

export const aboutApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all Abouts
        fetchAbouts: builder.query({
            async queryFn() {
                const aboutRef = ref(database, "abouts");
                const aboutQuery = query(aboutRef, orderByKey());
                const snapshot = await get(aboutQuery);
                if (snapshot.exists()) {

                    var aboutList = [];

                    snapshot.forEach((childSnapshot) => {
                        var key = childSnapshot.key;
                        var data = childSnapshot.val();

                        aboutList.push({
                            key: key,
                            aboutTitle: data.aboutTitle,
                            aboutSubTitle: data.aboutSubTitle,
                            aboutLocation: data.aboutLocation,
                            aboutShortDescription: data.aboutShortDescription,
                            aboutImageUrl: data.aboutImageUrl,
                            aboutResumeUrl: data?.aboutResumeUrl,
                            aboutShortVideo: data?.aboutShortVideo,
                            aboutSocialMediaFbLink: data.aboutSocialMediaFbLink,
                            aboutSocialMediaGitLink: data.aboutSocialMediaGitLink,
                            aboutSocialMediaLnLink: data.aboutSocialMediaLnLink,
                            aboutSocialMediaYtLink: data.aboutSocialMediaYtLink,
                        });
                    })

                    return { data: [...aboutList] };

                } else {

                    console.log("Data Does not Exist!")
                }

            }
        }),

        // add project
        addAbout: builder.mutation({
            async queryFn(data) {
                const aboutListRef = ref(database, 'abouts');
                const newAboutRef = await push(aboutListRef);
                try {
                    await set(newAboutRef, data);
                    return { data: data };
                } catch (err) {
                    return { error: err ? err : null };
                }
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg)
                try {
                    const { data: addedAbout } = await queryFulfilled;

                    dispatch(rootApi.util.updateQueryData('fetchAbouts', undefined, (draft) => {
                        draft?.push(addedAbout)
                    }))


                } catch (err) {
                    console.log('error in catch block')
                }
            }
        }),

        // delete project by key
        deleteAbout: builder.mutation({
            async queryFn(id) {
                try {

                    await remove(ref(database, 'abouts/' + id))

                    return { data: 'ok' };

                } catch (err) {

                    console.log(err)

                }

            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    await queryFulfilled;

                    dispatch(rootApi.util.updateQueryData('fetchAbouts', undefined, (draft) => {

                        return draft.filter(
                            (about) => about?.key !== arg
                        );

                    }))


                } catch (err) {
                    console.log('error in catch block')
                }
            },
        })
    })
});


export const { useFetchAboutsQuery, useAddAboutMutation, useDeleteAboutMutation } = aboutApi


