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
  const { user } = useSelector((state) => state.auth);

  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
  }, [dispatch, courseId]);
  console.log(courseDetail);

  // useEffect(() => {
  // }, [dispatch, courseId]);

  return (
    <>
      <Header />
      <Desktop courseDetail={courseDetail} user={user} />
      <Mobile courseDetail={courseDetail} />
    </>
  );
};

export default DetailPage;
