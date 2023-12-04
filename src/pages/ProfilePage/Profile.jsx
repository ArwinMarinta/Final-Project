import Header from "../../components/Navbar/Header";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow_left.svg";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profile } from "../../redux/actions/AuthActions";
// import EditeProfileIcon from "../../assets/edite_profile.svg";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // const handleUpload = () => {
  //   // Lakukan sesuatu dengan selectedFile, misalnya unggah ke server
  //   console.log("Selected File:", selectedFile);
  // };

  // const [profile, setProfile] = useState({
  //   photoProfile: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   city: "",
  //   country: "",
  // });

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(profile(navigate, null, "/login"));
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      <Header />
      <div className="mx-auto w-full bg-white ">
        <div className="relative ">
          <div className="bg-LightBlue5 h-[250px] drop-shadow-xl "></div>
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0 bottom-0 ">
            <div className="container flex flex-col  ">
              <Link
                as={Link}
                to="/"
                className="container  flex flex-row items-center py-2 text-DARKBLUE05 font-Montserrat text-base font-bold"
              >
                <img src={Arrow} />
                <p>Kembali ke Beranda</p>
              </Link>
              <div className=" container flex flex-col  mt-4 drop-shadow-2xl ">
                <div className="bg-DARKBLUE05 border-2 border-DARKBLUE05 rounded-t-2xl  text-white p-6 font-Montserrat font-bold text-xl text-center">
                  Akun
                </div>
                <div className=" flex flex-row gap-10 border-DARKBLUE05 border-2 px-6 py-4 rounded-b-2xl mb-12 bg-white">
                  <div className="hidden lg:block lg:w-[40%] ">
                    <div className="flex flex-col ">
                      <div className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={EditeIcon} />
                        <div>Profile Saya</div>
                      </div>
                      <div className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={SettingIcon} />
                        <div>Ubah Password</div>
                      </div>
                      <div className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={ShopIcon} />
                        <div>Riwayat Pembelian</div>
                      </div>
                      <div className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={LogoutIcon} />
                        <div>Keluar</div>
                      </div>
                    </div>
                  </div>
                  <form className="flex flex-col lg:w-[60%] py-4  justify-center w-full gap-4 ">
                    <div className="w-[90px] h-[90px] relative rounded-full  self-center  border-[3px] border-DARKBLUE05  ">
                      <img src={user?.photoProfile} className="rounded-full " />
                      <button className="absolute bottom-0 right-1 bg-white p-[5px] rounded-full">
                        <input
                          type="file"
                          className="h-4 w-4"
                          accept="image/*"
                          // onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p>Nama</p>
                        <input
                          type="text"
                          className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                          value={user.name}
                        />
                      </div>
                      <div>
                        <p>Email</p>
                        <input
                          type="text"
                          className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                          value={user.email}
                        />
                      </div>
                      <div>
                        <p>Nomor Telepon</p>
                        <input
                          type="text"
                          className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                          value={user.phone}
                        />
                      </div>
                      <div>
                        <p>Negara</p>
                        <input
                          type="text"
                          className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                          value={user.city}
                          placeholder="Masukkan Negara tempat tinggal"
                        />
                      </div>
                      <div>
                        <p>Kota</p>
                        <input
                          type="text"
                          className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                          value={user.country}
                          placeholder="Masukkan kota tempat tinggal"
                        />
                      </div>
                    </div>
                    <button className="bg-DARKBLUE05 text-white p-3 rounded-3xl">
                      Simpan Profile Saya
                    </button>
                  </form>
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
