import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import {
  setCourseDetail,
  setCheckCourse,
  setContentDetail,
  setError,
} from "../reducers/DetailReducer";
import {} from "../reducers/DetailReducer";

export const getCourseDetail =
  (courseId, isLoggedIn) => async (dispatch, getState) => {
    try {
      let response;
      let { token } = getState().auth;

      if (isLoggedIn) {
        response = await axios.get(`${VITE_API_URL}/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.get(`${VITE_API_URL}/courses/${courseId}`);
      }

      const { value } = response.data;
      const data = value;
      dispatch(setCourseDetail(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response.data.message);
      }
    }
  };

export const getContentDetail =
  (courseId, moduleId, contentId, isLoggedIn) => async (dispatch, getState) => {
    try {
      let response;
      let { token } = getState().auth;

      if (isLoggedIn) {
        response = await axios.get(
          `${VITE_API_URL}/courses/${courseId}/modules/${moduleId}/contents/${contentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.get(
          `${VITE_API_URL}/courses/${courseId}/modules/${moduleId}/contents/${contentId}`
        );
      }

      const { value } = response.data;
      const data = value;
      // dispatch(setError(null));
      dispatch(setContentDetail(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setContentDetail(null));
        if (error.response.status === 401) {
          dispatch(setError(error.response.data.message));
        }
        if (error.response.status === 403) {
          dispatch(setError(error?.response?.data?.message));
        }
      }
    }
  };

export const getCheckCourse = (courseId) => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${VITE_API_URL}/check/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    dispatch(setCheckCourse(data));
  } catch (error) {
    dispatch(setCheckCourse(null));
  }
};
