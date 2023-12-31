import Header from "../../../components/Navbar/Header";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { putProgress } from "../../../redux/actions/CourseActions";
import {
  getCourseDetail,
  getCheckCourse,
  postTestimonial,
} from "../../../redux/actions/DetailActions";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { checkCourse } = useSelector((state) => state.detail);

  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
    dispatch(getCheckCourse(courseId));
  }, [dispatch, courseId]);

  const navigate = useNavigate();

  const handleLinkClick = (courseId, moduleId, contentId, userCourseId) => {
    dispatch(putProgress(userCourseId, contentId));
    navigate(
      `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
    );
  };

  const handlePostTestiClick = (testimonial, rating) => {
    dispatch(postTestimonial(testimonial, rating));
  };

  return (
    <>
      <Header />
      <Desktop
        courseDetail={courseDetail}
        checkCourse={checkCourse}
        handleLinkClick={handleLinkClick}
      />
      <Mobile
        courseDetail={courseDetail}
        checkCourse={checkCourse}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
};

export default DetailPage;
