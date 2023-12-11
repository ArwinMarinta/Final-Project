import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import { setCourseDetail } from "../reducers/DetailReducer";

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
