import axios from "axios";
import { setToken, setUser } from "../reducers/AuthReducer";
import { VITE_API_URL } from "../../config/config";

// import { toastify } from "../../utils/toastify";

export const login =
  (email, password, setIsLoading, setAlert, navigate) => async (dispatch) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_API_URL}/auth/login`, {
        email,
        password,
      });
      const { data } = response;
      const { token } = data.value;

      dispatch(setToken(token));
      navigate("/");

      // setAlert(data.message);
      // setAlertStatus(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response.data.message ===
          "Akun belum terverifikasi. Periksa email masuk untuk verifikasi kode Otp"
        ) {
          navigate("/otp");
        } else {
          setAlert(error.response.data.message);
          // setAlertStatus(false);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const profile =
  (navigate, navigatePathSuccess) => async (dispatch, getState) => {
    try {
      let { token } = getState().auth;

      const response = await axios.get(`${VITE_API_URL}/profile`, {
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
        // if (error.response.status === 401) {
        //   dispatch(logout());
        //   // if navigatePathError params is false/null/undefined, it will not executed
        //   if (navigatePathError) navigate(navigatePathError);
        //   console.log("eror 401");
        //   return;
        // }
        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

export const RequestPassword =
  (email, setIsLoading, setAlert, setAlertStatus) => async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_API_URL}/auth/request-reset-password`,
        {
          email,
        }
      );

      setAlert(response.data.message);
      setAlertStatus(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAlert(error.response.data.message);
        setAlertStatus(false);
        setIsLoading(false);
      }
      setIsLoading(false);
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

export const ResetPasswordUser =
  (id, password, confPassword, navigate) => async () => {
    try {
      await axios.post(`${VITE_API_URL}/auth/reset-password`, {
        resetToken: id,
        password,
        confPassword,
      });

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
      }
      alert(error.message);
    }
  };

export const ChangePasswordUser =
  (oldPassword, newPassword, confPassword) => async (_, getState) => {
    try {
      let { token } = getState().auth;
      // console.log(passwordOld);
      await axios.post(
        `${VITE_API_URL}/auth/change-password`,
        {
          oldPassword,
          newPassword,
          confPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
      }
      alert(error.message);
    }
  };

export const UpdateProfile =
  (name, email, phone, city, country) => async (_, getState) => {
    try {
      let { token } = getState().auth;
      await axios.put(
        `${VITE_API_URL}/profile`,
        {
          name,
          email,
          phone,
          city,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
      }
      alert(error.message);
    }
  };

export const UpdatePicture = (selectedFile) => async (_, getState) => {
  try {
    let { token } = getState().auth;
    const formData = new FormData();
    formData.append("photoProfile", selectedFile);
    await axios.put(
      `${VITE_API_URL}/profile/images`,
      {
        photoProfile: selectedFile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response.data.message);
    }
    alert(error.message);
  }
};
