import axios from "axios";
import { setToken } from "../reducers/AuthReducer";
import { VITE_API_URL } from "../../config/config";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/auth/login`, {
      email,
      password,
    });
    const { data } = response;
    const { token } = data.value;

    dispatch(setToken(token));
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error?.response?.error?.email?.message);
    }
  }
};
