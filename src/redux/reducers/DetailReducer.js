import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseDetail: [],
  contentDetail: [],
  error: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },
    setContentDetail: (state, action) => {
      state.contentDetail = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCourseDetail, setContentDetail, setError } =
  detailSlice.actions;

export default detailSlice.reducer;
