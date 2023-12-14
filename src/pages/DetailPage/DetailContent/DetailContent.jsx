import Header from "../../../components/Navbar/Header";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { useSelector, useDispatch } from "react-redux";
import { getCourseDetail } from "../../../redux/actions/DetailActions";
import { getContentDetail } from "../../../redux/actions/AuthActions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../../../components/PopUp/CourseDetail";

const DetailContent = () => {
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { contentDetail } = useSelector((state) => state.detail) || {};
  const { user, token } = useSelector((state) => state.auth);

  const { courseId } = useParams();
  const { contentId } = useParams();
  const { moduleId } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(getCourseDetail(courseId));
      dispatch(getContentDetail(courseId, moduleId, contentId));
    }
  }, [dispatch, courseId, moduleId, contentId, token]);

  return (
    <>
      <CourseDetail courseDetail={courseDetail} />

      <Header />
      <Desktop
        courseDetail={courseDetail}
        contentDetail={contentDetail}
        user={user}
      />
      <Mobile courseDetail={courseDetail} contentDetail={contentDetail} />
    </>
  );
};

export default DetailContent;
