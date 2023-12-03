import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Arrow from "../../assets/arrow_left.svg";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import data from "../../data/user.json";

const Profile = () => {
  return (
    <>
      <Header />
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
              <div className="flex flex-col border-2 mt-4 border-DARKBLUE05 rounded-2xl ">
                <div className="bg-DARKBLUE05 rounded-t-xl text-white p-6 font-Montserrat font-bold text-xl text-center">
                  Akun
                </div>
                <div className="flex flex-row container">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row py-2 gap-2 border-b-2">
                      <img src={EditeIcon} />
                      <div>Profile Saya</div>
                    </div>
                    <div className="flex flex-row py-2 gap-2 border-b-2">
                      <img src={SettingIcon} />
                      <div>Ubah Password</div>
                    </div>
                    <div className="flex flex-row py-2 gap-2 border-b-2">
                      <img src={ShopIcon} />
                      <div>Riwayat Pembelian</div>
                    </div>
                    <div className="flex flex-row py-2 gap-2 border-b-2">
                      <img src={LogoutIcon} />
                      <div>Keluar</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {data.map((data) => (
                      <div key={data.id}>
                        <div>{data.photoProfile}</div>
                        <div className="flex flex-col"></div>
                        <button>Simpan Profil Saya</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
