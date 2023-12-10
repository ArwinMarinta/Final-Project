import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  popular: [],
  hasil: [],
  filter: [],
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
    setHasil: (state, action) => {
      state.hasil = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setCategory, setPopular,setHasil,setFilter } = courseSlice.actions;
export default courseSlice.reducer;
