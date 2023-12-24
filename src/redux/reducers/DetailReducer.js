 import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

const initialState = {
  courseDetail: [],
  contentDetail: [],
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
  },
});

export const { setCourseDetail, setContentDetail } = detailSlice.actions;
export default detailSlice.reducer;
