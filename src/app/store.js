import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from '../features/rootApi/rootApi';
import projectsSliceReducer from '../features/projects/projectSlice';
import coursesSliceReducer from '../features/courses/courseSlice';
import skillSliceReducer from '../features/skills/skillSlice';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    projects: projectsSliceReducer,
    courses: coursesSliceReducer,
    skills: skillSliceReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rootApi.middleware),
});
