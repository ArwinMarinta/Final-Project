import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/Belajar_white 2.svg";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passworderror, setPasswordError] = useState("");

  const validateNomor = (e) => {
    const inputValue = e.target.value;

    // membatasi input berupa angka dan simbol +
    const numberValue = inputValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 15
    const maxLength = 15;
    const truncateValueNomor = numberValue.slice(0, maxLength);

    setNomor(truncateValueNomor);
  };

  // Validasi password dengan konfirm password
  const passwordValidation = (password, confirm) => {
    if (!password || !confirm) {
      // Jika salah satu input kosong, tidak melakukan validasi
      setPasswordError("");
    } else if (password !== confirm) {
      setPasswordError(<MdCancel />);
    } else {
      setPasswordError(<FaCheckCircle />);
    }
  };

  const handlePasswordMatch = (event) => {
    setPassword(event.target.value);
    passwordValidation(event.target.value, confirmpassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfirmPassword(event.target.value);
    passwordValidation(password, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("nama:", nama);
    console.log("Email:", email);
    console.log("nomor:", nomor);
    console.log("Password:", password);
    console.log("Konfirm Password:", confirmpassword);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen bg-DARKBLUE04">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[128px] ">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-[28px] font-Montserrat font-bold text-DARKBLUE05 mb-8">
            Daftar
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="font-Poppins text-[14px] mb-[4px]">Nama</label>
              <input
                type="text"
                className="border w-full py-3 px-4 rounded-2xl"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-Poppins text-[14px] mb-[4px]">Email</label>
              <input
                type="email"
                className="border w-full py-3 px-4 rounded-2xl"
                placeholder="Contoh: johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-Poppins text-[14px] mb-[4px]">
                Nomor Telepon
              </label>
              <input
                type="tel"
                pattern="[0-9+]+"
                className="border w-full py-3 px-4 rounded-2xl appearance-none"
                placeholder="+62, contohnya 6281...."
                value={nomor}
                onChange={validateNomor}
                style={{ appearance: "none" }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Buat Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={handlePasswordMatch}
                  required
                />
                {passworderror && (
                  <p
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                      password === confirmpassword
                        ? "text-ALERTGREEN"
                        : "text-ALERTRED"
                    }`}
                  >
                    {passworderror}
                  </p>
                )}
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1"
                >
                  {showPassword ? (
                    <FiEyeOff className="border-none" />
                  ) : (
                    <FiEye className="border-none" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Konfirmasi Password
                </label>
                <div></div>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan konfirmasi password"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordMatch}
                />
                {passworderror && (
                  <p
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                      password === confirmpassword
                        ? "text-ALERTGREEN"
                        : "text-ALERTRED"
                    }`}
                  >
                    {passworderror}
                  </p>
                )}
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={toggleConfirmPassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
          <button className="font-Poppins btn btn-primary w-full text-[14px] font-medium bg-DARKBLUE05 text-white py-[10px] rounded-2xl mt-10 hover:bg-DARKBLUE03">
            Daftar
          </button>
          <div className="flex justify-center items-center gap-2 mt-6">
            <h1 className="font-Poppins text-[14px] font-normal">
              Sudah punya akun?
            </h1>
            <Link
              to="/login"
              className="font-Poppins text-DARKBLUE05 text-[14px] font-bold hover:underline hover:border-DARKBLUE05"
            >
              Masuk di sini
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[50%] min-h-[100dvh]">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Register;
