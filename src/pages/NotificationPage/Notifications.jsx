import Navbar from "../../components/header";
import Arrow from "../../assets/arrow_left.svg";
import Data from "../../data/DataNotifikasi";
import Notification from "../../assets/notification.svg";

const notifications = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full relative">
        <div className="relative">
          <div className="bg-LightBlue5 h-[250px] drop-shadow-xl"></div>
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0 bottom-0">
            <div className="container flex flex-col    ">
              <div className="  flex flex-row items-center py-2 text-DARKBLUE05 font-Montserrat text-base font-bold">
                <img src={Arrow} />
                <p>Kembali ke Beranda</p>
              </div>
              <div className="flex flex-col border-2 mt-4 border-DARKBLUE05 rounded-2xl">
                <div className="bg-DARKBLUE05 rounded-t-xl text-white p-6 font-Montserrat font-bold text-xl text-center">
                  Notifikasi
                </div>
                <div className=" flex flex-col p-9 bg-white gap-4 w-full rounded-b-xl">
                  {Data.map((datas) => (
                    <div key={datas.id}>
                      <div className="flex flex-row container gap-2  justify-between">
                        <div className="flex flex-row gap-4 font-Montserrat">
                          <img src={Notification} />
                          <div className="flex flex-col ">
                            <h3 className="text-DARKBLUE05 font-normal text-xs">
                              {datas.nama}
                            </h3>
                            <p className="text-black font-semibold text-[10px]">
                              {datas.message}
                            </p>
                            <p className="text-DEEPGRAY text-[10px] font-normal">
                              {datas.keterangan}
                            </p>
                          </div>
                        </div>
                        <div className="text-[10px] font-semibold text-DEEPGRAY">
                          {datas.tanggal}
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

export default notifications;
