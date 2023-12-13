import axios from "axios";
import { toastify } from "../../utils/toastify";
import { VITE_API_URL } from "../../config/config";
import {
  setCategory,
  setPopular,
  setHistory,
  setNotification,
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
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
  }
};

export const getPopular = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?popular=true`);

    const { value } = response.data;

    dispatch(setPopular(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
  }
};

export const HistoryUser = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { value } = response.data;
    dispatch(setHistory(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
  }
};

export const NotificationUser = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${VITE_API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    dispatch(setNotification(data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
  }
};

export const getCourse = (setErrors) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?page=1&limit=15`);
    const { data } = response;
    dispatch(setHasil(data.value));
  } catch (error) {
    if (error.response.status === 404) {
      setErrors("Tidak ada kelas yang diambil");
    }
  }
};

export const filterData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);
    const { data } = response;
    dispatch(setFilter(data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    toastify({
      message: error?.message,
      type: "error",
    });
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

export const getCourseFree = (courseId, navigate) => async (_, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.post(
      `${VITE_API_URL}/orders/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toastify({
      message: response.data.message,
      type: "success",
    });
    if (response.status === 201) {
      navigate("/my-course");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
    // toastify({
    //   message: error?.message,
    //   type: "error",
    // });
  }
};
