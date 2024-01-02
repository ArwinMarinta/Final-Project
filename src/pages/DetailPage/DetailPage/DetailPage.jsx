import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BiLogoTelegram, BiSolidLock } from "react-icons/bi";
import { FaCirclePlay, FaCircleCheck } from "react-icons/fa6";
import { putProgress } from "../../../redux/actions/CourseActions";
import { getCourseFree } from "../../../redux/actions/CourseActions";
import {
  getCourseDetail,
  getCheckCourse,
} from "../../../redux/actions/DetailActions";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { checkCourse } = useSelector((state) => state.detail);
  const { token } = useSelector((state) => state.auth);

  const { courseId } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(getCourseDetail(courseId, true));
      dispatch(getCheckCourse(courseId));
    } else {
      dispatch(getCourseDetail(courseId, false));
    }
  }, [dispatch, courseId, token]);

  const handleLinkClick = (courseId, moduleId, contentId, userCourseId) => {
    dispatch(putProgress(userCourseId, contentId));

    navigate(
      `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
    );
  };

  const handleCourseFree = async (event, courseID) => {
    event.preventDefault();
    dispatch(getCourseFree(courseID));
  };

  return (
    <>
      <div className="mb-24 sm:mb-10">
        <div className=" container mx-auto py-5 md:my-5">
          <div className="flex flex-col sm:flex-row border rounded-md  p-6 shadow-sm drop-shadow-sm">
            <div>
              <img
                className="sm:max-w-xs w-full"
                src={courseDetail?.imageUrl}
                alt=""
              />
            </div>
            <div className="sm:pl-8 w-full">
              <div className="mb-3">
                <div className="mb-2">
                  <h1 className="text-3xl font-semibold text-gray-800">
                    {courseDetail?.title}
                  </h1>
                  <span>
                    by{" "}
                    <span className="capitalize">
                      {courseDetail?.instructor}
                    </span>
                  </span>
                </div>

                <div className=" flex flex-wrap -mx-4">
                  <div
                    className="w-1/3 p-4 border-r"
                    style={{ borderRight: "1px solid #DEE2E6" }}
                  >
                    <p>Level</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.level}
                    </span>
                  </div>
                  <div
                    className="w-1/3 p-4 border-r"
                    style={{ borderRight: "1px solid #DEE2E6" }}
                  >
                    <p>Kategori</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.category}
                    </span>
                  </div>
                  <div className="w-1/3  p-4">
                    <p>Durasi</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.duration} Menit
                    </span>
                  </div>
                </div>
                <hr />
              </div>
              <div className="flex flex-wrap justify-between w-full">
                {courseDetail?.type === "Premium" ? (
                  <>
                    {courseDetail?.discount === null ? (
                      <div
                        className="font-bold text-2xl "
                        style={{ color: "#29303B" }}
                      >
                        Rp.{" "}
                        {parseInt(courseDetail?.originalPrice).toLocaleString()}
                      </div>
                    ) : (
                      <div
                        className="flex items-center font-bold text-2xl whitespace-nowrap"
                        style={{ color: "#29303B" }}
                      >
                        <span className="line-through">
                          Rp.{" "}
                          {parseInt(
                            courseDetail?.originalPrice
                          ).toLocaleString()}
                        </span>
                        <div className="text-red-500">
                          <p className="text-sm">
                            discount {courseDetail?.discount}%
                          </p>
                          <span className="pl-2 ">
                            Rp. {""}
                            {parseInt(
                              courseDetail?.totalPrice
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className=" font-bold text-2xl"
                    style={{ color: "#29303B" }}
                  >
                    <span className="line-through">
                      Rp.{" "}
                      {parseInt(courseDetail?.originalPrice).toLocaleString()}
                    </span>
                    <span className="pl-2 text-red-500">
                      {courseDetail?.type}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2.5 mt-3 lg:mt-0">
                  <Link
                    to={courseDetail?.groupDiscussion}
                    className="flex gap-2 rounded-sm text-YELLOW05 items-center border-2 border-YELLOW05 hover:text-yellow-500 hover:border-yellow-500 w-max py-1.5 px-4"
                  >
                    <span className="font-semibold">Join Group Telegram</span>
                    <BiLogoTelegram className="text-xl" />
                  </Link>

                  {courseDetail.userCourseId === null ? (
                    <button className="text-white bg-YELLOW05 hover:bg-yellow-500 px-5 font-semibold py-1.5">
                      {courseDetail?.type === "Free" ? (
                        <button
                          onClick={(event) => {
                            handleCourseFree(event, courseDetail.courseId);
                          }}
                        >
                          Ambil Kelas
                        </button>
                      ) : (
                        <Link
                          to={`/detail/payment/${courseId}`}
                          className="flex flex-row gap-3"
                        >
                          Beli Kelas
                        </Link>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container flex flex-col-reverse md:flex-row gap-10 mx-auto md:my-8">
          <div className="" style={{ flex: "3" }}>
            <div>
              <h3 className="text-xl font-medium sm:mt-8">Tentang Kelas</h3>
              <p className="indent-8">{courseDetail?.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mt-8 mb-2.5">
                Kelas ini ditujukan untuk
              </h3>
              <ul className="list-decimal list-inside">
                {courseDetail?.requirements?.map((requirements, index) => (
                  <li key={index} className="pl-2 py-1">
                    {requirements?.requirement}
                  </li>
                ))}
              </ul>
            </div>
            <button className="bg-black text-white px-4 mt-5">
              Berikan Penilaianmu disini
            </button>
          </div>
          <div
            className="border shadow-sm drop-shadow-sm ring-offset-1 border-gray-400/20 rounded-sm h-max"
            style={{ flex: "2" }}
          >
            <div className="py-5 px-6">
              <div className="flex justify-between flex-wrap">
                <h3 className=" font-bold">Materi Belajar</h3>
                {courseDetail?.userCourseId === null ? (
                  ""
                ) : (
                  <div className=" flex flex-wrap items-center bg-gray-200 rounded-sm dark:bg-gray-700 h-full">
                    <p
                      className="bg-BLUE05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-white align-middle leading-none rounded-sm h-full px-4"
                      style={{
                        width: `${courseDetail?.learningProgress ?? "0"}%`,
                      }}
                    >
                      {courseDetail?.learningProgress}
                      {"% "}completed
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-2.5">
                {courseDetail?.modules?.map((module, moduleIndex) => (
                  <>
                    <div className="flex gap-4 justify-between text-sm w-full mt-5 mb-3">
                      <span className=" font-bold text-BLUE05">
                        Chapter {moduleIndex + 1} - {module?.title}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        {module?.duration} menit
                      </span>
                    </div>
                    {courseDetail?.modules?.[moduleIndex]?.contents?.map(
                      (content, contentIndex) => (
                        <div className="" key={contentIndex}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(
                                courseDetail?.courseId,
                                module?.moduleId,
                                content?.contentId,
                                courseDetail?.userCourseId
                              );
                            }}
                            className="flex items-center justify-between py-1 w-full"
                          >
                            <div className="flex items-center text-sm">
                              <span className="rounded-full bg-DARKBLUE04 text-sm font-medium py-1 px-3 mr-2.5">
                                {contentIndex + 1}
                              </span>
                              <span className="">{content?.title}</span>
                            </div>
                            <span className="text-xl">
                              {checkCourse?.status === "success" ? (
                                <>
                                  {content?.isFinished ? (
                                    <FaCircleCheck
                                      style={{ color: "#00CF6C" }}
                                    />
                                  ) : (
                                    <FaCirclePlay className="text-BLUE05" />
                                  )}
                                </>
                              ) : (
                                <>
                                  {content?.isDemo ? (
                                    <FaCirclePlay className="text-BLUE05" />
                                  ) : (
                                    <BiSolidLock className={"text-black/60"} />
                                  )}
                                </>
                              )}
                            </span>
                          </button>
                          <hr className="my-1" />
                        </div>
                      )
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
