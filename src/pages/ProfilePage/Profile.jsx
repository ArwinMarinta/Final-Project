import Header from "../../components/Navbar/Header";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow_left.svg";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaCameraRotate } from "react-icons/fa6";
import {
  profile,
  logout,
  UpdateProfile,
  UpdatePicture,
} from "../../redux/actions/AuthActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = useRef();

  const { user, token } = useSelector((state) => state.auth);
  const [photoProfile, setPhotoProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  //merender user jika terdapat pembaharuan
  useEffect(() => {
    setPhotoProfile(user?.photoProfile);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setCity(user?.city || "");
    setCountry(user?.country || "");
  }, [user]);

  // console.log(setPhotoProfile);
  //fungsi untuk update foto profile
  const handleChange = (selectedFile) => {
    if (token) {
      dispatch(UpdatePicture(selectedFile));
    }
  };

  //fungsi untuk menampilkan profile
  useEffect(() => {
    if (token) {
      dispatch(profile(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);

  //fungsi untuk update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(UpdateProfile(name, email, phone, city, country));
    }
  };

  //fungsi untuk logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChangeProfile = (event) => {
    event.preventDefault();

    const selectedFile = event.target.files[0];

    console.log(selectedFile);
    if (selectedFile) {
      const newProfilePicture = URL.createObjectURL(selectedFile);
      setPhotoProfile(newProfilePicture);

      handleChange(selectedFile);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto w-full bg-white ">
        <div className="relative ">
          <div className="bg-LightBlue5 h-[250px] drop-shadow-xl "></div>
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0  ">
            <div className="container flex flex-col  ">
              <div className="hidden lg:block">
                <Link
                  as={Link}
                  to="/"
                  className="container  flex flex-row items-center py-2 text-DARKBLUE05 font-Montserrat text-base font-bold"
                >
                  <img src={Arrow} />
                  <p>Kembali ke Beranda</p>
                </Link>
              </div>
              <div className=" container flex flex-col mb-20 mt-4 drop-shadow-2xl ">
                <div className="hidden lg:block">
                  <div className="bg-DARKBLUE05 border-2 border-DARKBLUE05 rounded-t-2xl  text-white p-6 font-Montserrat font-bold text-xl text-center">
                    Akun
                  </div>
                </div>
                {/* responsive di mobile */}
                <div className="lg:hidden">
                  <div className="flex flex-row rounded-t-2xl  bg-NEUTRAL02 border-t-2 border-DARKBLUE05">
                    <Link
                      as={Link}
                      to="/profile"
                      className="bg-NEUTRAL05 py-[24px] w-full  rounded-tl-2xl border-r-2 border-DARKBLUE05 justify-center items-center flex border-l-2"
                    >
                      <img src={EditeIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/change-password"
                      className="py-[24px] w-full  justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={SettingIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/history"
                      className="py-[24px] w-full justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={ShopIcon} />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-[24px] w-full rounded-tr-2xl  justify-center items-center flex border-r-2 border-DARKBLUE05"
                    >
                      <img src={LogoutIcon} />
                    </button>
                  </div>
                </div>
                <div className=" flex flex-row lg:gap-10 gap-5 border-DARKBLUE05 border-2 px-6 md:px-6 py-4 rounded-b-2xl mb-12 bg-white">
                  <div className="hidden lg:block lg:w-[40%] lg:pr-16">
                    <div className="flex flex-col ">
                      <Link
                        as={Link}
                        to="/profile"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat font-bold text-DARKBLUE05 "
                      >
                        <img src={EditeIcon} />
                        <div>Profile Saya</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/change-password"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={SettingIcon} />
                        <div>Ubah Password</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/history"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={ShopIcon} />
                        <div>Riwayat Pembelian</div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={LogoutIcon} />
                        <div>Keluar</div>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:w-[60%] py-4  justify-center w-full gap-4 lg:px-16">
                    <div className="w-[90px] h-[90px] relative rounded-full self-center border-[3px] border-DARKBLUE05">
                      <img
                        src={photoProfile}
                        className="w-full h-full rounded-full border-DARKBLUE05 object-cover object-top"
                        alt="Profile"
                      />
                      <button
                        onClick={() => img.current.click()}
                        className="absolute bottom-0 right-1 bg-white p-[5px] rounded-full"
                      >
                        <FaCameraRotate />
                        <input
                          type="file"
                          className="h-4 w-4"
                          ref={img}
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleChangeProfile}
                          // onChange={(e) => {
                          //   let pic = URL.createObjectURL(e.target.files[0]);
                          //   setPhotoProfile(pic);
                          // }}
                        />
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col gap-4 font-Poppins ">
                        <div>
                          <p>Nama</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Email</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={email}
                            onChange={() => setEmail(user?.email)}
                          />
                        </div>
                        <div>
                          <p>Nomor Telepon</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Negara</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Masukkan Negara tempat tinggal"
                          />
                        </div>
                        <div>
                          <p>Kota</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Masukkan kota tempat tinggal"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-DARKBLUE05 text-white p-3 rounded-3xl font-Poppins"
                      >
                        Simpan Profile Saya
                      </button>
                    </form>
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
