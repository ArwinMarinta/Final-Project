import { useState } from "react";
import {
  NavLink,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlinePersonOutline } from "react-icons/md";

const Mobile = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
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
      {path !== "/notification" && path !== "/profile" && (
        <form
          className="sticky top-0 p-3 sm:p-0"
          action="search"
          onSubmit={onSubmitHandler}
        >
          <div
            className="relative mx-auto w-full"
            style={{ maxWidth: "600px" }}
          >
            <svg
              // xmlns="http://www.w3.org/2000/svg"
              className="rounded-full sm:hidden absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              name="search"
              className=" sm:hidden text-black w-full py-1.5 pr-12 pl-4 border-0 outline-none rounded-sm focus:outline-none 
                                        ring-2  ring-gray-700/50 focus:ring-blue-500 duration-200"
              type="text"
              placeholder="Cari Kelas ..."
              value={keyword}
              onChange={onKeywordChangeHandler}
            />
          </div>
        </form>
      )}

      <nav className="sm:hidden flex items-center fixed bg-gray-100/50 border-t drop-shadow-2xl shadow-outline border-gray-300 w-full bottom-0 py-4">
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
          to="/class"
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

export default Mobile;
