import Header from "../../../components/Navbar/Header";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourseDetail,
  getContentDetail,
} from "../../../redux/actions/DetailActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailContent = () => {
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { contentDetail } = useSelector((state) => state.detail) || {};

  const { courseId } = useParams();
  const { contentId } = useParams();
  const { moduleId } = useParams();

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
    dispatch(getContentDetail(courseId, moduleId, contentId));
  }, [dispatch, courseId, moduleId, contentId]);

  return (
    <>
      <Header />
      <Desktop courseDetail={courseDetail} contentDetail={contentDetail} />
      <Mobile courseDetail={courseDetail} contentDetail={contentDetail} />
    </>
  );
};

export default DetailContent;
