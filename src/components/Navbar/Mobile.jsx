import { useState } from "react";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlinePersonOutline } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import Search from "../../assets/search.svg";
import { GoX } from "react-icons/go";
import PropTypes from "prop-types";
import LoginIcon from "../../assets/log_in.svg";

const Mobile = ({ user }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [openSearch, setOpenSearch] = useState(false);
  const query = searchParams.get("query");

  const path = location.pathname;

  const [keyword, setKeyword] = useState(query || "");
  const navigate = useNavigate();

  //searching kelas
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const searchQuery = keyword.trim();
    if (searchQuery === "") {
      // Jika input kosong, arahkan ke halaman beranda atau URL yang sesuai.
      navigate("/");
    } else {
      const searchUrl = `/search?query=${searchQuery}`;
      navigate(searchUrl);
    }
  };

  const onKeywordChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      {path !== "/notification" &&
        path !== "/profile" &&
        path !== "/change-password" &&
        path !== "/history" && (
          <form
            className="sticky top-0 p-3 sm:p-0 bg-DARKBLUE05 z-[999]"
            action="search"
            onSubmit={onSubmitHandler}
          >
            <div
              className="relative mx-auto w-full flex flex-row justify-between sm:hidden "
              style={{ maxWidth: "600px" }}
            >
              <Link as={Link} to="/" className="flex flex-row ">
                <SiCodechef className="text-3xl" />
                <p className="text-xl font-bold">iLearnTech</p>
              </Link>
              <div className="flex flex-row gap-4 mr-[7px]">
                {user ? (
                  <button
                    className="border-2 p-[1px] rounded-lg"
                    onClick={() => setOpenSearch(true)}
                  >
                    <img src={Search} />
                  </button>
                ) : (
                  <>
                    <button
                      className="border-2 p-[1px] rounded-lg"
                      onClick={() => setOpenSearch(true)}
                    >
                      <img src={Search} />
                    </button>
                    <Link
                      as={Link}
                      to="/login"
                      className="border-2 p-[1px] rounded-lg"
                    >
                      <img src={LoginIcon} />
                    </Link>
                  </>
                )}
              </div>

              {openSearch && (
                <>
                  <div className=" sm:hidden absolute flex flex-row gap-2 h-full w-full border-0 outline-none rounded-lg  ">
                    <form className="flex flex-row relative  w-full">
                      <input
                        name="search"
                        className=" text-black w-full py-1.5 pr-12 pl-4 border-0 outline-none rounded-lg focus:outline-none 
                                        ring-2  ring-gray-700/50 focus:ring-blue-500 duration-200"
                        type="text"
                        placeholder="Cari Kelas ..."
                        value={keyword}
                        onChange={onKeywordChangeHandler}
                      />
                      <button className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-DARKBLUE05 p-[1px]">
                        <img src={Search} />
                      </button>
                    </form>
                    <button
                      className="bg-white px-2 rounded-lg "
                      onClick={() => setOpenSearch(false)}
                    >
                      <GoX className="text-xl " />
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        )}

      <nav className="sm:hidden flex items-center fixed bg-white border-t drop-shadow-2xl shadow-outline border-gray-300 w-full bottom-0 py-4 z-[999]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between gap-2.5 items center flex-col text-blue-500"
              : "flex justify-between gap-2.5 items center flex-col"
          }
          style={{ flex: "1" }}
        >
          <GrHomeRounded className="text-3xl self-center" />
          <p className="self-center text-sm font-medium h-full align-bottom leading-none">
            Beranda
          </p>
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
              : "flex justify-between gap-2.5 items center flex-col"
          }
          style={{ flex: "1" }}
        >
          <IoMdNotificationsOutline className="text-3xl self-center" />

          <p className="self-center text-sm font-medium align-bottom leading-none">
            Notifikasi
          </p>
        </NavLink>

        <NavLink
          to="/my-course"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
              : "flex justify-between gap-2.5 items center flex-col"
          }
          style={{ flex: "1" }}
        >
          <BsPlayCircle className="text-3xl self-center" />

          <p className="self-center text-sm font-medium h-full align-bottom leading-none">
            Kelas
          </p>
        </NavLink>

        <NavLink
          to="/course"
          className={({ isActive }) =>
            isActive
              ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
              : "flex justify-between gap-2.5 items center flex-col"
          }
          style={{ flex: "1" }}
        >
          <LuClipboardList className="text-3xl self-center" />

          <p className="self-center text-sm font-medium align-bottom leading-none">
            Kursus
          </p>
        </NavLink>

        <NavLink
          to="/profile "
          className={({ isActive }) =>
            isActive
              ? "flex justify-between gap-2.5 items center flex-col text-blue-500 "
              : "flex justify-between gap-2.5 items center flex-col"
          }
          style={{ flex: "1" }}
        >
          <MdOutlinePersonOutline className="text-3xl self-center" />
          <p className="self-center text-sm font-medium align-bottom leading-3">
            Akun
          </p>
        </NavLink>
      </nav>
    </>
  );
};

Mobile.propTypes = {
  user: PropTypes.object,
};

export default Mobile;
