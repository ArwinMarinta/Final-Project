import axios from "axios";
import { VITE_API_URL } from "../../config/config";
import { setCategory, setPopular } from "../reducers/CourseReducer";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-category`);

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
    const response = await axios.get(`${VITE_API_URL}/course?popular=true`);

    const { value } = response.data;

    dispatch(setPopular(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response.data.message);
    }
  }
};
