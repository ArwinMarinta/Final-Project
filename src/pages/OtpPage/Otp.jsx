import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import { MdOutlineArrowBack } from "react-icons/md";
import logo from "../../assets/Belajar_white 2.svg";
import { useState, useEffect } from "react";
import { resendOtp, verify } from "../../redux/actions/AuthActions";

// fungsi merubah format email
const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.slice(0, 2) + "*".repeat(localPart.length - 1);
  return `${maskedLocalPart}@${domain}`;
};

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(5); // Hitungan mundur awal
  const email = localStorage.getItem("registeredEmail"); //ambil value email sebelumnya
  const maskedEmail = maskEmail(email);

  const validateOtp = (otpValue) => {
    // membatasi input berupa angka
    const numberValue = otpValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 6
    const maxLength = 6;
    const truncatedValue = numberValue.slice(0, maxLength);

    setOtp(truncatedValue);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    console.log(otp);

    dispatch(verify(otp, navigate));
    // alert("OTP Berhasil Dikirim");
  };

  useEffect(() => {
    // Menunda hitungan mundur selama 3 detik sebelum dimulai
    const initialTimer = setTimeout(() => {
      // Mengecek apakah hitungan mundur sudah 0
      if (resendTimer > 0) {
        const timer = setInterval(() => {
          setResendTimer((prev) => prev - 1); // Mengurangi hitungan mundur setiap detik
        }, 1000);

        // Membersihkan timer setelah hitungan mundur mencapai 0
        return () => clearInterval(timer);
      }
    }, 2500);

    return () => clearTimeout(initialTimer);
  }, [resendTimer]);

  const handleResendOtp = () => {
    dispatch(resendOtp());
    // alert("OTP Berhasil Dikirim");
  };

  return (
    <>
      <div className="flex min-h-screen bg-DARKBLUE04">
        <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
          <form onSubmit={handleSubmitOtp} className="w-full">
            <div className="flex">
              <Link to={"/register"}>
                <MdOutlineArrowBack
                  className="mt-[10px] transition duration-300 transform hover:scale-150 hover:text-DARKBLUE03"
                  style={{ fontSize: "24px" }}
                />
              </Link>
            </div>
            <div>
              <h1 className="text-[26px] font-bold text-DARKBLUE05 my-5 lg:pl-8">
                Masukkan OTP
              </h1>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="font-Poppins text-[14px] my-[20px] text-center">
                  Ketik 6 digit kode yang dikirimkan ke{" "}
                  <span className="font-bold">{maskedEmail}</span>
                </label>
                <OTPInput
                  value={otp}
                  onChange={validateOtp}
                  numInputs={6}
                  containerStyle="my-6 flex justify-center items-center gap-[6px] lg:gap-[16px]"
                  inputStyle={{
                    width: "42px",
                    height: "42px",
                    border: "1px solid #6148FF",
                    borderRadius: "16px",
                  }}
                  renderInput={(props, index) => (
                    <input {...props} value={otp[index] || ""} />
                  )}
                />
              </div>
              <div className="flex flex-col">
                {resendTimer > 0 ? (
                  <label className="font-Poppins text-[13px] mb-[20px] text-center">
                    Kirim Ulang OTP dalam{" "}
                    <span className="font-bold">{resendTimer} detik</span>
                  </label>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleResendOtp()}
                    className="font-Poppins text-[13px] text-ALERTRED font-bold underline mb-[20px] text-center cursor-pointer"
                  >
                    Kirim Ulang OTP
                  </button>
                )}
              </div>
            </div>
            <button className="w-full font-Poppin text-[16px] font-medium bg-DARKBLUE05 text-white py-[10px] rounded-2xl mt-5 hover:bg-DARKBLUE03">
              Simpan
            </button>
          </form>
        </div>

        <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[50%] min-h-[100dvh]">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Otp;
