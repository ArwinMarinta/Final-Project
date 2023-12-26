"use client";
import orderCourseIMG from "../../../assets/order-course.png";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../components/Navbar/Header";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { putProgress } from "../../../redux/actions/CourseActions";
import { resetContentDetail } from "../../../redux/reducers/DetailReducer";
import {
  getCourseDetail,
  getCheckCourse,
  getContentDetail,
} from "../../../redux/actions/DetailActions";

const DetailContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { contentDetail } = useSelector((state) => state.detail) || {};
  const { checkCourse } = useSelector((state) => state.detail);
  const { token } = useSelector((state) => state.auth);

  const [showPopUp, setShowPopUp] = useState(false);

  const { courseId } = useParams();
  const { contentId } = useParams();
  const { moduleId } = useParams();
  const userCourse = DetailContent?.userCourseId;

  const handleLinkClick = (courseId, moduleId, contentId, userCourseId) => {
    dispatch(resetContentDetail());
    if (contentDetail === null || contentDetail.length == 0) {
      setShowPopUp(true);
    }
    dispatch(putProgress(userCourseId, contentId));
    navigate(
      `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
    );
    if (token) {
      dispatch(getContentDetail(courseId, moduleId, contentId, true));
    } else {
      dispatch(getContentDetail(courseId, moduleId, contentId, false));
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(getCourseDetail(courseId, true));
      dispatch(getContentDetail(courseId, moduleId, contentId, true));
      dispatch(getCheckCourse(courseId));
    } else {
      dispatch(getCourseDetail(courseId, false));
      dispatch(getContentDetail(courseId, moduleId, contentId, false));
    }
  }, [dispatch, courseId, moduleId, contentId, userCourse, token]);

  return (
    <>
      {checkCourse === null && showPopUp === true && contentDetail === null && (
        <div className="flex fixed justify-center items-center bg-black bg-opacity-50 w-full h-full z-40">
          <div className="rounded-xl bg-gray-100 max-w-sm w-full z-50">
            <div className="w-full flex justify-end">
              <button onClick={handleClosePopUp} className="text-2xl pt-4 pr-4">
                <MdOutlineClose />
              </button>
            </div>
            <div className="px-10 pb-8">
              <div>
                <h1 className="text-2xl text-center font-bold">
                  Selangkah lagi menuju
                </h1>
                <h2 className="text-2xl text-center font-bold text-DARKBLUE05">
                  Kelas Premium
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <img src={orderCourseIMG} className="w-2/3" alt="" />
              </div>
              <div className="w-full flex justify-center">
                <button className="flex justify-between items-center bg-DARKBLUE05 w-4/5 text-white font-semibold rounded-full py-1.5 mt-2">
                  <span className="ml-5">{""}</span>
                  Belajar Sekarang <FaArrowRight className="mr-5 mt-0.5" />
                </button>
              </div>
            </div>
          </div>
          <button
            className="text-white bg-black bg-opacity-50 absolute border-0  w-full h-full"
            onClick={handleClosePopUp}
          >
            x
          </button>
        </div>
      )}

      <Header />
      <Desktop
        courseDetail={courseDetail}
        contentDetail={contentDetail}
        checkCourse={checkCourse}
        handleLinkClick={handleLinkClick}
      />
      <Mobile
        courseDetail={courseDetail}
        contentDetail={contentDetail}
        checkCourse={checkCourse}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
};

export default DetailContent;
