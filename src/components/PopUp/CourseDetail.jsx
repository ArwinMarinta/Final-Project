import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContentDetail } from "../../redux/actions/AuthActions";
import { useParams } from "react-router-dom";

const CourseDetail = ({ showPopUp, setShowPopUp, error }) => {
  // const dispatch = useDispatch();

  // const { courseId } = useParams();
  // const { contentId } = useParams();
  // const { moduleId } = useParams();

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <div className="flex fixed justify-center items-center bg-black bg-opacity-50 w-full h-full z-40">
        <button
          className="text-white bg-black bg-opacity-50 absolute border-0  w-full h-full"
          onClick={handleClosePopUp}
        >
          x
        </button>
        <div className="flex flex-col justify-center items-center bg-white w-64 z-50">
          <p className="font-bold text-md text-red-500">{error} yo</p>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
