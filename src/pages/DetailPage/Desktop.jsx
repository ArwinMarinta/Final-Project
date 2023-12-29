import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { RiShieldStarLine, RiBook2Line, RiTimeFill } from "react-icons/ri";
import { BiLogoTelegram, BiSolidLock } from "react-icons/bi";
import { FaCirclePlay, FaCircleCheck } from "react-icons/fa6";

const Desktop = ({
  courseDetail,
  contentDetail,
  checkCourse,
  handleLinkClick,
}) => {
  const video = contentDetail?.videoUrl;
  const isDemo = contentDetail?.isDemo;

  return (
    <>
      <div className="hidden sm:block">
        <div className="bg-DARKBLUE04">
          <div className="container mx-auto py-5">
            <Link to="/course" className="flex items-center w-max">
              <FaArrowLeft />
              <span className="font-bold pl-2.5">Kelas Lainnya</span>
            </Link>
            <div className="pt-5 pb-3">
              <h1 className="text-xl font-bold text-DARKBLUE05">
                {courseDetail?.category}
              </h1>
              <h2 className="text-lg font-bold">{courseDetail?.title}</h2>
              <span className="text-sm font-medium">
                by {courseDetail?.instructor}
              </span>
              <div className="flex pt-2 gap-10">
                <div className="flex items-center  font-medium">
                  <RiShieldStarLine className="text-lg text-ALERTGREEN" />
                  <span className="pl-1 text-sm text-DARKBLUE05">
                    {courseDetail?.level} Level
                  </span>
                </div>
                <div className="flex items-center  font-medium">
                  <RiBook2Line className="text-lg text-ALERTGREEN" />
                  <span className="pl-1 text-sm">
                    {courseDetail?.totalModule} modul
                  </span>
                </div>
                <div className="flex items-center  font-medium">
                  <RiTimeFill className="text-lg text-ALERTGREEN" />
                  <span className="pl-1 text-sm">
                    {courseDetail?.duration} menit
                  </span>
                </div>
              </div>
            </div>
            <Link
              to={courseDetail?.groupDiscussion}
              className="flex gap-2 rounded-full text-white items-center bg-ALERTGREEN w-max py-1.5 px-8"
            >
              <span className="font-bold">Join Group Telegram</span>
              <BiLogoTelegram className="text-xl " />
            </Link>
          </div>
        </div>

        <div className="container flex gap-10 mx-auto my-8">
          <div className="" style={{ flex: "2" }}>
            <iframe
              className="w-full aspect-video rounded-2xl bg-black"
              src={`${
                // checkCourse?.status === "success"?
                // ` https://www.youtube.com/embed/${video}`:
                `${isDemo ? `https://www.youtube.com/embed/${video}` : ""} `
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <div>
              <h3 className="text-xl font-medium mt-8">Tentang Kelas</h3>
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
          </div>
          <div
            className="border shadow-xl drop-shadow-2xl ring-offset-1 border-gray-400/20 rounded-xl h-max"
            style={{ flex: "1" }}
          >
            <div className="py-5 px-6">
              <div className="flex justify-between flex-wrap">
                <h3 className=" font-bold">Materi Belajar</h3>
                {courseDetail?.userCourseId === null ? (
                  ""
                ) : (
                  <div className="w-1/2 flex items-center bg-gray-200 rounded-full dark:bg-gray-700 h-full">
                    <p
                      className="bg-DARKBLUE05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-blue-100 align-middle leading-none rounded-full h-full pl-4"
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
                      <span className="text-DARKBLUE05 font-bold ">
                        Chapter {moduleIndex + 1} - {module?.title}
                      </span>
                      <span className="font-bold text-DARKBLUE03 whitespace-nowrap">
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
                                contentDetail?.userCourseId
                              );
                            }}
                            className="flex items-center justify-between py-1 w-full"
                          >
                            <div className="flex items-center text-sm">
                              <span className="rounded-full bg-DARKBLUE04 text-sm font-medium py-1 px-3 mr-2.5">
                                {contentIndex + 1}
                              </span>
                              <span className=" font-medium">
                                {content?.title}
                              </span>
                            </div>
                            <span className="text-xl">
                              {checkCourse?.status === "success" ? (
                                <>
                                  {content?.isFinished ? (
                                    <FaCircleCheck
                                      className={"text-DARKBLUE05"}
                                    />
                                  ) : (
                                    <FaCirclePlay
                                      className={"text-ALERTGREEN"}
                                    />
                                  )}
                                </>
                              ) : (
                                <>
                                  {content?.isDemo ? (
                                    <FaCirclePlay
                                      className={"text-ALERTGREEN"}
                                    />
                                  ) : (
                                    <BiSolidLock className={"text-black"} />
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

Desktop.propTypes = {
  courseDetail: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string,
    level: PropTypes.string,
    totalModule: PropTypes.number,
    duration: PropTypes.number,
    courseId: PropTypes.number,
    userCourseId: PropTypes.number,
    learningProgress: PropTypes.number,
    requirements: PropTypes.arrayOf(
      PropTypes.shape({
        requirement: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    groupDiscussion: PropTypes.string,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.number,
        contents: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            isDemo: PropTypes.bool,
            contentId: PropTypes.number,
            videoUrl: PropTypes.string,
            isFinished: PropTypes.bool,
          })
        ),
      })
    ),
  }),
  contentDetail: PropTypes.shape({
    videoUrl: PropTypes.string,
    isDemo: PropTypes.bool,
    userCourseId: PropTypes.number,
  }),
  checkCourse: PropTypes.shape({
    status: PropTypes.string,
  }),
  handleLinkClick: PropTypes.func.isRequired,
};

export default Desktop;
