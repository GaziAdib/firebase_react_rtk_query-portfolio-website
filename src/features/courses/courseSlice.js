import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const courseSlice = createSlice({
    name: 'courses',
    initialState, 
});

export default courseSlice.reducer;