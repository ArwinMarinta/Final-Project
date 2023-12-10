import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiShieldStarLine } from "react-icons/ri";
import { RiBook2Line } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { BiLogoTelegram } from "react-icons/bi";
import { FaCirclePlay } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { BiSolidLock } from "react-icons/bi";

const Mobile = ({ courseDetail }) => {
  const [shift, setShift] = useState(true);

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
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/AgG-VMJ_TJg?si=n0jgthUuzfdmAQos"
          title="YouTube video player"
          frameBorder="0"
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

        <div className="flex justify-around w-full">
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
              <p className="indent-8">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
                exercitationem ea libero alias. Aperiam cumque autem a, quisquam
                quibusdam laudantium corrupti, iste saepe pariatur dolor minima
                illo? Mollitia in cumque praesentium qui doloribus optio
                assumenda minima eos hic molestias earum beatae, animi
                voluptatibus, quidem eius voluptas dolorem, quibusdam quam
                reiciendis velit temporibus ut. Cum quia, placeat, explicabo
                quas odit quaerat libero nobis soluta excepturi, quidem
                voluptatum vel. Atque cumque tempora placeat? Eaque ad ipsa sit
                minima facere, accusamus eos, quo mollitia debitis delectus,
                omnis doloribus vel. Sapiente quae beatae perspiciatis suscipit,
                neque saepe consequuntur officiis dolorem recusandae
                temporibaboriosam eum quos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mt-8 mb-2.5">
                Kelas ini ditujukan untuk
              </h3>
              <ul className="list-decimal list-inside">
                <li className="pl-2 py-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                  fuga!
                </li>
                <li className="pl-2 py-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                  iusto.
                </li>
                <li className="pl-2 py-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, nostrum!
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
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
                        <Link className="flex items-center justify-between py-1">
                          <div className="flex items-center text-sm">
                            <span className="rounded-full bg-DARKBLUE04 text-sm font-medium py-1 px-3 mr-2.5">
                              {contentIndex + 1}
                            </span>
                            <span className=" font-medium">
                              {content?.title}
                            </span>
                          </div>
                          <span className="text-xl">
                            {content?.isDemo === true ? (
                              <FaCirclePlay className="text-NEUTRAL02" />
                            ) : (
                              <BiSolidLock className="text-black" />
                            )}
                          </span>
                        </Link>
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
    title: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.string,
    level: PropTypes.string,
    totalModule: PropTypes.number,
    duration: PropTypes.number,
    rating: PropTypes.number,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        duration: PropTypes.number,
        contents: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            isDemo: PropTypes.bool,
            // Tambahkan prop lainnya sesuai kebutuhan
          })
        ),
      })
    ),
  }),
  freeContents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isDemo: PropTypes.bool,
      // Tambahkan prop lainnya sesuai kebutuhan
    })
  ),
  premiumContents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isFree: PropTypes.bool, // Mengubah isFree dari isDemo sesuai dengan kebutuhan
      // Tambahkan prop lainnya sesuai kebutuhan
    })
  ),
};

export default Mobile;
