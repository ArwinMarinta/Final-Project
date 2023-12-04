import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Arrow from "../../assets/arrow_left.svg";
import Header from "../../components/Navbar/Header";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import { useState } from "react";

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState({
    passwordOld: "",
    passwordNew: "",
    passwordConfNew: "",
  });
  const [showPassword, setShowPassword] = useState({
    passwordOld: false,
    passwordNew: false,
    passwordConfNew: false,
  });
  const togglePassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

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
                      <Link
                        as={Link}
                        to="/profile"
                        className="flex flex-row py-3 gap-2 border-b-2"
                      >
                        <img src={EditeIcon} />
                        <div>Profile Saya</div>
                      </Link>
                      <Link className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat font-bold text-DARKBLUE05 ">
                        <img src={SettingIcon} />
                        <div>Ubah Password</div>
                      </Link>
                      <Link className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={ShopIcon} />
                        <div>Riwayat Pembelian</div>
                      </Link>
                      <button className="flex flex-row py-3 gap-2 border-b-2">
                        <img src={LogoutIcon} />
                        <div>Keluar</div>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col lg:w-[60%] py-4 w-full gap-6 ">
                    <div className="font-bold font-Montserrat text-2xl text-center">
                      Ubah Password
                    </div>
                    <form className="flex flex-col justify-center gap-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label className="font-Poppins text-[15px] mb-[4px]">
                            Masukkan Password Lama
                          </label>
                        </div>
                        <div className="relative ">
                          <input
                            type={
                              showPassword.passwordOld ? "text" : "password"
                            }
                            className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                            placeholder="Masukkan password"
                            value={changePassword.passwordOld}
                            onChange={(e) => {
                              setChangePassword({
                                ...ChangePassword,
                                passwordOld: e.target.value,
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => togglePassword("passwordOld")}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                          >
                            {showPassword.passwordOld ? (
                              <FiEyeOff className="border-none" />
                            ) : (
                              <FiEye className="border-none" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label className="font-Poppins text-[15px] mb-[4px]">
                            Masukkan Password Baru
                          </label>
                        </div>
                        <div className="relative ">
                          <input
                            type={
                              showPassword.passwordNew ? "text" : "password"
                            }
                            className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                            placeholder="Masukkan password"
                            value={changePassword.passwordNew}
                            onChange={(e) => {
                              setChangePassword({
                                ...changePassword,
                                passwordNew: e.target.value,
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => togglePassword("passwordNew")}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                          >
                            {showPassword.passwordNew ? (
                              <FiEyeOff className="border-none" />
                            ) : (
                              <FiEye className="border-none" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label className="font-Poppins text-[15px] mb-[4px]">
                            Ulangi Password Baru
                          </label>
                        </div>
                        <div className="relative ">
                          <input
                            type={
                              showPassword.passwordConfNew ? "text" : "password"
                            }
                            className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                            placeholder="Masukkan password"
                            value={changePassword.passwordConfNew}
                            onChange={(e) => {
                              setChangePassword({
                                ...changePassword,
                                passwordConfNew: e.target.value,
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => togglePassword("passwordConfNew")}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1 "
                          >
                            {showPassword.passwordConfNew ? (
                              <FiEyeOff className="border-none" />
                            ) : (
                              <FiEye className="border-none" />
                            )}
                          </button>
                        </div>
                        <button className="bg-DARKBLUE05 text-white p-3 rounded-3xl mt-6">
                          Simpan Profile Saya
                        </button>
                      </div>
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

export default ChangePassword;
