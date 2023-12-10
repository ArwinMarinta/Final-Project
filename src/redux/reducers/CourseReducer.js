import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  popular: [],
  history: [],
  notification: [],
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
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setCategory, setPopular, setHistory, setNotification } =
  courseSlice.actions;
export default courseSlice.reducer;
