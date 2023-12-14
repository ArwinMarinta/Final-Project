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
  const error = useSelector((state) => state.detail.error); // Gunakan state yang berisi pesan error
  const { user, token } = useSelector((state) => state.auth);

  const [showPopUp, setShowPopUp] = useState(true);

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
      {error && showPopUp && (
        <CourseDetail
          courseDetail={courseDetail}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          error={error}
        />
      )}

      <Header />
      <Desktop
        courseDetail={courseDetail}
        contentDetail={contentDetail}
        user={user}
        setShowPopUp={setShowPopUp}
        // handleShowPopUp={handleShowPopUp}
      />
      <Mobile courseDetail={courseDetail} contentDetail={contentDetail} />
    </>
  );
};

export default DetailContent;
