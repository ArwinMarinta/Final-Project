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
  setData,
  setErrors,
  setPage,
  setMyCourse,
  setTotalPage,
  setCoursePromo,
} from "../reducers/CourseReducer";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/course-categories`);

    const { value } = response.data;
    dispatch(setCategory(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
  }
};

export const getPopular = () => async (dispatch) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/courses?popular=true`);

    const { value } = response.data;

    dispatch(setPopular(value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
    }
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
      console.log(error.response.data.message);
    }
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
      console.log(error.response.data.message);
    }
  }
};

export const getCourse = (pageNumber) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/courses?page=${pageNumber}`
    );
    const { data } = response;
    dispatch(setHasil(data.value));
    const pageArray = [];
    for (let index = 1; index <= data.totalPage; index++) {
      pageArray.push(index);
    }
    dispatch(setPage(pageArray));
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    } else {
      console.log(error?.response?.data?.message);
    }
  }
};
export const getSearchCourse = (pageNumber, nameCourse) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/courses?search=${nameCourse}`
    );
    const { data } = response;
    dispatch(setData(data.value));
    const pageArray = [];
    for (let index = 1; index <= data.totalPage; index++) {
      pageArray.push(index);
    }
    dispatch(setPage(pageArray));
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    } else {
      console.log(error.response.data.message);
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

export const getMyCourse = (errors) => async (dispatch, getState) => {
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
      dispatch(setErrors("Silahkan login untuk melihat kelas yang diambil"));
    } else if (error.response.status === 404) {
      dispatch(setErrors("Tidak ada kelas yang diambil"));
    }
  }
};

export const getCourseFree = (courseId, navigate) => async (_, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.post(
      `${VITE_API_URL}/orders/${courseId}/free`,
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
  }
};

export const putProgress = (userCourseId, contentId) => async (_, getState) => {
  try {
    let { token } = getState().auth;

    await axios.put(
      `${VITE_API_URL}/learning-progress/${userCourseId}/contents/${contentId}`,
      {
        userCourseId: Number(userCourseId),
        contentId: Number(contentId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data?.message);
    }
  }
};

export const checkbox =
  (
    typeButton,
    selectedCheckboxes,
    selectedLevel,
    typeCourse,
    linkFilter,
    pageNumber
  ) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/${linkFilter}?page=${pageNumber}`,
        {
          params: {
            type: typeButton,
            category: selectedCheckboxes,
            level: selectedLevel,
            ...typeCourse.reduce((acc, value) => {
              acc[value] = true;
              return acc;
            }, {}),
          },
        }
      );
      const { data } = response;
      dispatch(setData(data.value));
      const pageArray = [];
      for (let index = 1; index <= data.totalPage; index++) {
        pageArray.push(index);
      }
      dispatch(setTotalPage(data.totalPage));
      dispatch(setPage(pageArray));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };

export const searchCheckbox =
  (typeButton, selectedLevel, typeCourse, nameCourse) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/courses?search=${nameCourse}`,
        {
          params: {
            type: typeButton,
            level: selectedLevel,
            ...typeCourse.reduce((acc, value) => {
              acc[value] = true;
              return acc;
            }, {}),
          },
        }
      );
      const { data } = response;
      dispatch(setData(data.value));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };

export const myCheckbox =
  (status, selectedCategory, selectedLevel, typeCourse) =>
  async (dispatch, getState) => {
    let { token } = getState().auth;
    try {
      const response = await axios.get(`${VITE_API_URL}/user-courses`, {
        params: {
          learningStatus: status,
          category: selectedCategory,
          level: selectedLevel,
          ...typeCourse.reduce((acc, value) => {
            acc[value] = true;
            return acc;
          }, {}),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const coursesData = response.data.value;
      dispatch(setMyCourse(coursesData));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setErrors("kelas yang di pilih tidak ada"));
      }
    }
  };

export const getCoursePromo = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;

    const response = await axios.get(
      `${VITE_API_URL}/courses?limit=10&page=1&promo=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setCoursePromo(response.data.value));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data?.message);
    }
  }
};
