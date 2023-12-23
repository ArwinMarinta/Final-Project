import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseDetail: [],
  contentDetail: [],
  checkCourse: [],
  courseProgress: [],
  checkFinishContent: [],
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
    setCheckCourse: (state, action) => {
      state.checkCourse = action.payload;
    },
    setCourseProgress: (state, action) => {
      state.courseProgress = action.payload;
    },
    setCheckFinishContent: (state, action) => {
      state.checkFinishContent = action.payload;
    },
    resetContentDetail: (state) => {
      state.contentDetail = initialState.contentDetail;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourseDetail,
  setContentDetail,
  setCheckCourse,
  setCourseProgress,
  setCheckFinishContent,
  resetContentDetail,
  setError,
} = detailSlice.actions;

export default detailSlice.reducer;
