import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/Belajar_white 2.svg";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { register, resendOtp } from "../../redux/actions/AuthActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confPassword, setConfPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passworderror, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertstatus, setAlertStatus] = useState("");
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const validateNomor = (e) => {
    const inputValue = e.target.value;

    // membatasi input berupa angka dan simbol +
    const numberValue = inputValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 15
    const maxLength = 14;
    const truncateValueNomor = numberValue.slice(0, maxLength);

    setPhone(truncateValueNomor);
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
    passwordValidation(event.target.value, confPassword);
  };

  const handleConfirmPasswordMatch = (event) => {
    setConfPassword(event.target.value);
    passwordValidation(password, event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNotVerified = () => {
    if (!email) {
      setAlert("Email tidak boleh kosong, untuk melanjutkan verifikasi akun");
      setAlertStatus(false);
    } else {
      // Simpan email ke localStorage
      localStorage.setItem("registeredEmail", email);
      console.log("registeredEmail", email);
      dispatch(resendOtp(setIsLoadingResend, setAlert, setAlertStatus)).then(
        () => {
          navigate("/otp");
        }
      );
    }
  };

  const handleRegis = (e) => {
    e.preventDefault();

    dispatch(
      register(
        name,
        email,
        phone,
        password,
        confPassword,
        setIsLoading,
        setAlert,
        setAlertStatus,
        navigate
      )
    );
  };

  useEffect(() => {
    // Fungsi untuk menyembunyikan alert setelah 3000 milidetik (3 detik)
    const hideAlert = () => {
      setAlert(""); // Menghapus pesan alert
    };

    // Memulai timeout ketika alertMessage berubah
    if (alert) {
      const timeoutId = setTimeout(hideAlert, 3000);

      // Membersihkan timeout jika komponen di-unmount atau alertMessage berubah
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  return (
    <div className="flex min-h-screen bg-DARKBLUE04">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[128px] relative">
        <form onSubmit={handleRegis} className="w-full">
          <h1 className="text-[28px] font-Montserrat font-bold text-DARKBLUE05 mb-8">
            Daftar
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="font-Poppins text-[14px] mb-[4px]">Nama</label>
              <input
                type="text"
                className="border w-full py-2 px-3 rounded-2xl"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[14px] mb-[4px]">
                  Email
                </label>
                <Link onClick={handleNotVerified}>
                  <span className="font-Poppins text-[11px] text-DARKBLUE05 transition duration-300 ease-in-out hover:underline hover:border-DARKBLUE05">
                    {isLoadingResend
                      ? "Loading..."
                      : "Akun belum terverifikasi?"}
                  </span>
                </Link>
              </div>
              <div className="relative ">
                <input
                  type="email"
                  className="border w-full py-2 px-3 rounded-2xl"
                  placeholder="Contoh: johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-Poppins text-[14px] mb-[4px]">
                Nomor Telepon
              </label>
              <input
                type="tel"
                pattern="[0-9+]+"
                className="border w-full py-2 px-3 rounded-2xl appearance-none"
                placeholder="+62, contohnya 6281...."
                value={phone}
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
                  className="border w-full py-2 px-3 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={handlePasswordMatch}
                />
                {passworderror && (
                  <p
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                      password === confPassword
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
                  className="border w-full py-2 px-3 rounded-2xl pr-[3.5rem]"
                  placeholder="Masukkan konfirmasi password"
                  value={confPassword}
                  onChange={handleConfirmPasswordMatch}
                />
                {passworderror && (
                  <p
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 px-8 py-1 ${
                      password === confPassword
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
          <button
            type="submit"
            className="font-Poppins btn btn-primary w-full text-[14px] font-medium bg-DARKBLUE05 text-white py-[10px] rounded-2xl mt-10 hover:bg-DARKBLUE03"
          >
            {isLoading ? "Loading..." : "Daftar"}
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
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center w-full md:max-w-[50%]">
            {alert && (
              <div
                className={`py-2 flex justify-center w-full px-2 font-Poppins text-[14px] text-LightBlue5 font-medium rounded-lg text-center ${
                  alertstatus ? "bg-ALERTGREEN" : "bg-ALERTRED"
                }`}
              >
                {alert} !
              </div>
            )}
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
