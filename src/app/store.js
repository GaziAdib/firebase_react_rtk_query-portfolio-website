import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/rootApi/rootApi';
import projectsSliceReducer from '../features/projects/projectSlice';
import coursesSliceReducer from '../features/courses/courseSlice';
import skillSliceReducer from '../features/skills/skillSlice';
import aboutSliceReducer from '../features/abouts/aboutSlice';
import achievementSliceReducer from '../features/achievements/achievementSlice';
import experienceSliceReducer from '../features/experiences/experienceSlice';
import faqSliceReducer from '../features/faqs/faqSlice';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    projects: projectsSliceReducer,
    courses: coursesSliceReducer,
    skills: skillSliceReducer,
    abouts: aboutSliceReducer,
    achievements: achievementSliceReducer,
    experiences: experienceSliceReducer,
    faqs: faqSliceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rootApi.middleware),
});
