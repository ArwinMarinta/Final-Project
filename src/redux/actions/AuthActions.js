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

export const register =
  (name, email, phone, password, confPassword, navigate) => async () => {
    try {
      const response = await axios.post(`${VITE_API_URL}/auth/register`, {
        name,
        email,
        phone,
        password,
        confPassword,
      });

      if (response.status === 201) {
        const { email } = response.data.value;

        // Menyimpan email ke dalam localStorage
        localStorage.setItem("registeredEmail", email);

        alert(response.data.message); // Menampilkan pesan dari respons API
        setTimeout(() => {
          // Menunggu 3 detik sebelum navigasi ke halaman OTP
          navigate("/otp");
        }, 3000);
      }
      // else {
      //   alert("Registrasi Gagal!, Mohon Coba Lagi!");
      // }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
      }
    }
  };

export const verify = (otp, navigate) => async () => {
  try {
    const registeredEmail = localStorage.getItem("registeredEmail");
    console.log("Registered Email:", registeredEmail);
    const response = await axios.post(`${VITE_API_URL}/auth/verify-user`, {
      email: registeredEmail, // Menggunakan nilai yang diambil dari local storage
      otp,
    });

    // Check for successful registration
    if (response.status === 200) {
      alert(response.data.message);
      setTimeout(() => {
        // Menunggu 3 detik sebelum navigasi ke halaman Login
        localStorage.removeItem("registeredEmail");
        navigate("/login");
      }, 3000);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error?.response?.data?.message);
      return;
    }
    alert(error?.message);
  }
};

export const resendOtp = () => async () => {
  try {
    const registeredEmail = localStorage.getItem("registeredEmail");
    const response = await axios.post(`${VITE_API_URL}/auth/resend-otp`, {
      email: registeredEmail, // Menggunakan nilai yang diambil dari local storage
    });

    // Jika suksess akan menampilkan respon
    if (response.status === 200) {
      alert(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error?.response?.data?.message);
      return;
    }
    alert(error?.message);
  }
};
