import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import { setContentDetail, setCourseDetail } from "../reducers/DetailReducer";

export const getCourseDetail = (courseId) => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses/${courseId}`);

    const { value } = response.data;
    const data = value;
    dispatch(setCourseDetail(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response.data.message);
    }
  }
};

export const getContentDetail =
  (courseId, moduleId, contentId) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/courses/${courseId}/modules/${moduleId}/contents/${contentId}`
      );

      const { value } = response.data;
      const data = value;
      console.log("axios true");
      console.log(data);
      dispatch(setContentDetail(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("axios false");
        // console.log(data);
        alert(error.response.data.message);
      }
    }
  };
