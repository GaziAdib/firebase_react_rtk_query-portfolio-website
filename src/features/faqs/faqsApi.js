import { rootApi } from "../rootApi/rootApi";

// firebase related imports

import { database } from "../../firebase";
import { ref, set, push, get, query, orderByKey, remove } from '@firebase/database';

export const faqsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchFaqs: builder.query({
            async queryFn() {
                const faqsRef = ref(database, "faqs");
                const faqsQuery = query(faqsRef, orderByKey());
                const snapshot = await get(faqsQuery);
                if (snapshot.exists()) {

                    var faqsList = [];

                    snapshot.forEach((childSnapshot) => {
                        var key = childSnapshot.key;
                        var data = childSnapshot.val();

                        faqsList.push({
                            key: key,
                            faqQuestion: data?.faqQuestion,
                            faqAnswer: data?.faqAnswer
                        });
                    })

                    return { data: [...faqsList] };

                } else {

                    console.log("Data Does not Exist in Faqs Table!")

                }

            }
        }),

        // add a Faq
        addFaq: builder.mutation({
            async queryFn(data) {
                try {
                    const faqListRef = ref(database, 'faqs');
                    const newFaqRef = await push(faqListRef);
                    await set(newFaqRef, data);
                } catch (error) {
                    console.log(error);
                }
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                console.log('faq args', arg)

                try {
                    const { data: addedFaq } = await queryFulfilled;

                    dispatch(rootApi.util.updateQueryData('fetchFaqs', undefined, (draft) => {
                        draft?.push(addedFaq);
                    }))

                } catch (err) {
                    console.log('error in catch block', err)
                }
            }
        }),

        // delete FAQ by key
        deleteFaq: builder.mutation({
            async queryFn(id) {
                try {

                    await remove(ref(database, 'faqs/' + id))

                    return { data: 'ok' };

                } catch (err) {

                    console.log(err)

                }

            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                try {
                    await queryFulfilled;

                    dispatch(rootApi.util.updateQueryData('fetchFaqs', undefined, (draft) => {

                        return draft.filter(
                            (faq) => faq?.key !== arg
                        );

                    }))


                } catch (err) {
                    console.log('error in catch block')
                }
            },
        })
    })
})



export const { useFetchFaqsQuery, useAddFaqMutation, useDeleteFaqMutation } = faqsApi