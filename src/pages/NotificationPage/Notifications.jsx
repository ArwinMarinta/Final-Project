import Navbar from "../../components/Navbar/Header";
import Arrow from "../../assets/arrow_left.svg";
import Notification from "../../assets/notification.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NotificationUser } from "../../redux/actions/CourseActions";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.course);

  useEffect(() => {
    if (token) {
      dispatch(NotificationUser(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full relative">
        <div className="relative">
          <div className="bg-LightBlue5 h-[250px] drop-shadow-xl"></div>
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0 bottom-0">
            <div className="container flex flex-col    ">
              <Link
                as={Link}
                to="/"
                className="  flex flex-row items-center py-2 text-DARKBLUE05 font-Montserrat text-base font-bold"
              >
                <img src={Arrow} />
                <p>Kembali ke Beranda</p>
              </Link>
              <div className="flex flex-col border-2 mt-4 border-DARKBLUE05 rounded-2xl">
                <div className="bg-DARKBLUE05 rounded-t-xl text-white p-6 font-Montserrat font-bold text-xl text-center">
                  Notifikasi
                </div>
                <div className=" flex flex-col p-9 bg-white gap-4 w-full rounded-b-xl">
                  {notification.map((datas) => (
                    <div key={datas?.id}>
                      <div className="flex flex-row container gap-2  justify-between">
                        <div className="flex flex-row gap-4 font-Montserrat">
                          <img src={Notification} />
                          <div className="flex flex-col ">
                            <h3 className="text-DARKBLUE05 font-normal text-xs">
                              {datas?.type}
                            </h3>
                            <p className="text-black font-semibold text-[10px]">
                              {datas?.message}
                            </p>
                            <p className="text-DEEPGRAY text-[10px] font-normal">
                              {datas?.keterangan}
                            </p>
                          </div>
                        </div>
                        <div className="text-[10px] font-semibold text-DEEPGRAY">
                          {datas?.createdAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
