import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  popular: [],
  history: [],
  notification: [],
  hasil: [],
  filter: [],
  data: [],
  errors: "",
  page: [],
  totalPage: [],
  myCourse: [],
  getData: [],
  discussion: [],
  detailDiscussion: [],
  comentar: [],
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
    setHasil: (state, action) => {
      state.hasil = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setMyCourse: (state, action) => {
      state.myCourse = action.payload;
    },
    setGetData: (state, action) => {
      state.getData = action.payload;
    },
    setDiscussion: (state, action) => {
      state.discussion = action.payload;
    },
    setDetailDiscussion: (state, action) => {
      state.detailDiscussion = action.payload;
    },
    setComentar: (state, action) => {
      state.comentar = action.payload;
    },
  },
});

export const {
  setCategory,
  setPopular,
  setHistory,
  setNotification,
  setHasil,
  setFilter,
  setData,
  setErrors,
  setPage,
  setTotalPage,
  setMyCourse,
  setGetData,
  setDiscussion,
  setComentar,
  setDetailDiscussion,
} = courseSlice.actions;

export default courseSlice.reducer;
