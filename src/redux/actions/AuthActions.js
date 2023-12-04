import axios from "axios";
import { setToken, setUser } from "../reducers/AuthReducer";
import { VITE_API_URL } from "../../config/config";
import { toastify } from "../../utils/toastify";

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
      toastify({
        message: error?.response?.data?.message,
        type: "error",
      });
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const profile =
  (navigate, navigatePathSuccess, navigatePathError) =>
  async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.get(`${VITE_API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.value);
      const { value } = response.data;
      const data = value;

      dispatch(setUser(data));

      // if navigatePath params is false/null/undefined, it will not executed
      if (navigatePathSuccess) navigate(navigatePathSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If token is not valid
        if (error.response.status === 401) {
          dispatch(logout());
          // if navigatePathError params is false/null/undefined, it will not executed
          if (navigatePathError) navigate(navigatePathError);
          console.log("eror 401");
          // return;
        }
        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

export const RequestPassword = (email, setIsLoading) => async () => {
  try {
    setIsLoading(true);
    await axios.post(`${VITE_API_URL}/auth/request-reset-password`, {
      email,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toastify({
        message: error.response.data.message,
        type: "error",
      });
    }
    setIsLoading(false);
  }
};
