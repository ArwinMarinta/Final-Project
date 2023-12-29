import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiShieldStarLine, RiBook2Line, RiTimeFill } from "react-icons/ri";
import { BiLogoTelegram, BiSolidLock } from "react-icons/bi";
import { FaCirclePlay, FaCircleCheck } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

const Mobile = ({
  courseDetail,
  contentDetail,
  checkCourse,
  courseProgress,
  handleLinkClick,
  checkFinishContent,
}) => {
  const [shift, setShift] = useState(true);

  const video = contentDetail?.videoUrl;
  const isDemo = contentDetail?.isDemo;

  const handleAboutClass = () => {
    setShift(true);
  };
  const handleClassList = () => {
    setShift(false);
  };

  return (
    <>
      <div className="sm:hidden">
        <iframe
          className="w-full aspect-video bg-black"
          src={`${
            checkCourse?.status === "success"
              ? ` https://www.youtube.com/embed/${video}`
              : `${isDemo ? `https://www.youtube.com/embed/${video}` : ""} `
          }`}
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="container">
          <div className="pt-5 pb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-DARKBLUE05">
                {courseDetail?.title}
              </h1>
              <div className="flex gap-0.5 items-center">
                <GoStarFill className="text-lg text-yellow-400" />
                <span className="font-extrabold pl-1">
                  {courseDetail?.rating}
                </span>
              </div>
            </div>
            <h2 className="text-lg font-bold">{courseDetail?.description}</h2>
            <span className="text-sm font-medium">
              by {courseDetail?.instructor}
            </span>
            <div className="flex pt-2 justify-between">
              <div className="flex items-center  font-medium">
                <RiShieldStarLine className="text-lg text-ALERTGREEN" />
                <span className="pl-1 text-sm text-DARKBLUE05">
                  {courseDetail?.level} Level
                </span>
              </div>
              <div className="flex items-center  font-medium">
                <RiBook2Line className="text-lg text-ALERTGREEN" />
                <span className="pl-1 text-sm">
                  {courseDetail?.totalModule} module
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
        </div>

        <div className="flex justify-around w-full mb-5">
          <button
            onClick={handleAboutClass}
            className={` ${
              shift
                ? "text-center font-medium bg-DARKBLUE05 text-white w-full py-3"
                : "text-center font-medium bg-DARKBLUE04 text-DARKBLUE03  w-full py-3"
            } `}
          >
            Tentang
          </button>
          <button
            onClick={handleClassList}
            className={` ${
              shift
                ? "text-center font-medium bg-DARKBLUE04 text-DARKBLUE03  w-full py-3"
                : "text-center font-medium bg-DARKBLUE05 text-white w-full py-3"
            } `}
          >
            Materi Kelas
          </button>
        </div>

        {shift ? (
          <div className="container mx-auto">
            <div className="flex justify-center my-6">
              <Link
                to={""}
                className="flex gap-2 text-center justify-center rounded-full text-white items-center bg-ALERTGREEN w-max py-2.5 px-10"
              >
                <span className="font-bold">Join Group Telegram</span>
                <BiLogoTelegram className="text-xl " />
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-medium">Tentang Kelas</h3>
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
        ) : (
          <div>
            <div className="container flex justify-between flex-wrap">
              <h3 className=" font-bold">Materi Belajar</h3>
              <div className="w-1/2 flex items-center bg-gray-200 rounded-full dark:bg-gray-700 h-full">
                <p
                  className="bg-DARKBLUE05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-blue-100 align-middle leading-none rounded-full h-full pl-4"
                  style={{
                    width: `${courseProgress?.learningProgress ?? "0"}%`,
                  }}
                >
                  {courseProgress?.learningProgress}
                  {"% "}completed
                </p>
              </div>
            </div>
            <div className="container pt-2.5">
              {courseDetail.modules?.map((module, moduleIndex) => (
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
                          onClick={() => {
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
                                {checkFinishContent === "success" ? (
                                  <FaCircleCheck
                                    className={"text-DARKBLUE05"}
                                  />
                                ) : (
                                  <FaCirclePlay className={"text-ALERTGREEN"} />
                                )}
                              </>
                            ) : (
                              <>
                                {content?.isDemo ? (
                                  <FaCirclePlay className={"text-ALERTGREEN"} />
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
        )}
      </div>
    </>
  );
};

Mobile.propTypes = {
  courseDetail: PropTypes.shape({
    courseId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string,
    level: PropTypes.string,
    totalModule: PropTypes.number,
    duration: PropTypes.number,
    rating: PropTypes.number,
    requirements: PropTypes.arrayOf(
      PropTypes.shape({
        requirement: PropTypes.string,
      })
    ),
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.number,
        contents: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            isDemo: PropTypes.bool,
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
  courseProgress: PropTypes.shape({
    learningProgress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  handleLinkClick: PropTypes.func.isRequired,
  checkFinishContent: PropTypes.string,
};

export default Mobile;
