import Header from "../../../components/Navbar/Header";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { useSelector, useDispatch } from "react-redux";
import { getCourseDetail } from "../../../redux/actions/DetailActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { courseDetail } = useSelector((state) => state.detail) || {};

  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
    // dispatch(getContentDetail(courseId));
  }, [dispatch, courseId]);

  // useEffect(() => {
  // }, [dispatch, courseId]);

  return (
    <>
      <Header />
      <Desktop courseDetail={courseDetail} />
      <Mobile courseDetail={courseDetail} />
    </>
  );
};

export default DetailPage;
