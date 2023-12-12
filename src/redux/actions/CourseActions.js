import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import {
  setCategory,
  setPopular,
  setHasil,
  setFilter,
} from "../reducers/CourseReducer";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);

    const { value } = response.data;
    dispatch(setCategory(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response.data.message);
    }
  }
};

export const getPopular = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?popular=true`);

    const { value } = response.data;

    dispatch(setPopular(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response.data.message);
    }
  }
};

export const getCourse = (setError) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?page=1&limit=15`);
    const { data } = response;
    dispatch(setHasil(data.value));
  } catch (error) {
    if (error.response.status === 404) {
      setError("Tidak ada kelas yang diambil");
    }
  }
};

export const filterData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);
    const { data } = response;
    dispatch(setFilter(data.value));
  } catch (errors) {
    alert(errors?.message);
  }
};

export const getMyCourse =
  (Navigate, setError, errors) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${VITE_API_URL}/user-courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const coursesData = response.data.value;
      if (errors) {
        dispatch(setHasil([]));
      } else if (errors == null) {
        dispatch(setHasil(coursesData));
      }
    } catch (error) {
      if (error.response.status === 500) {
        setError("Silahkan login untuk melihat kelas yang diambil");
      } else if (error.response.status === 404) {
        setError("Tidak ada kelas yang diambil");
      }
    }
  };
