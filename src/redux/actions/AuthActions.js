import axios from "axios";
import { setToken } from "../reducers/AuthReducer";
import { VITE_API_URL } from "../../config/config";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/v1/auth/login`, {
      email,
      password,
    });

    console.log(response?.value?.token);
    // const { token } = response.value;
    // const { token } = data;
    //menyimpan ke local storage
    // console.log(token);
    dispatch(setToken());
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error?.response?.error?.email?.message);
    }
    alert(error?.message);
  }
};
