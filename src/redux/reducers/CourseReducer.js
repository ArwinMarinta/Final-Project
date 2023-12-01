import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  popular: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
  },
});

export const { setCategory, setPopular } = courseSlice.actions;
export default courseSlice.reducer;
