import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { resendOtp, verify } from "../../redux/actions/AuthActions";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(20); // Hitungan mundur awal
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingresend, setIsLoadingResend] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertstatus, setAlertStatus] = useState("");
  const email = localStorage.getItem("registeredEmail"); //ambil value email sebelumnya

  // fungsi merubah format email
  const maskEmail = (email) => {
    if (!email) return null; // Handle null or undefined email
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.slice(0, 2) + "*".repeat(localPart.length - 1);
    return `${maskedLocalPart}@${domain}`;
  };
  const maskedEmail = maskEmail(email);

  const validateOtp = (otpValue) => {
    // membatasi input berupa angka
    const numberValue = otpValue.replace(/[^\d]/g, "");

    // membatasi inputan nomor menjadi 6
    const maxLength = 6;
    const truncatedValue = numberValue.slice(0, maxLength);

    setOtp(truncatedValue);
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

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    dispatch(verify(otp, setIsLoading, setAlert, setAlertStatus, navigate));
  };

  const handleResendOtp = () => {
    dispatch(resendOtp(setIsLoadingResend, setAlert, setAlertStatus));
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
    <>
      <div className="flex min-h-screen bg-WHITE05 justify-center">
        <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] relative ">
          <form
            onSubmit={handleSubmitOtp}
            className="w-full border-2 rounded-lg shadow-xl px-6 py-6 bg-YELLOW04"
          >
            <div>
              <h1 className="text-[26px] font-bold text-DARKBLUE05 my-5 sm:pl-8 lg:pl-8">
                Masukkan OTP
              </h1>
            </div>

            {email ? (
              // Render OTP input dan tombol resend button
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
                      {isLoadingresend ? "Loading..." : "Kirim Ulang OTP"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Render a message if email is not present in local storage
              <div className="mt-[65px] font-Poppin text-[18px] font-medium text-center text-ALERTRED">
                Data diri tidak ditemukan.
                <p>Silahkan melengkapi data diri terlebih dahulu!</p>
                <div className="mt-[45px]">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-1 font-Poppin font-bold text-[14px] text-blue-500 hover:underline hover:border-DARKBLUE05"
                  >
                    Halaman Masuk
                  </Link>
                  <div className="relative mt-4 flex w-full items-center justify-center border border-t">
                    <div className="absolute text-black font-Poppin text-[13px] px-5 bg-DARKBLUE04">
                      atau
                    </div>
                  </div>
                  <Link
                    to="/register"
                    className="mt-4 flex items-center justify-center px-4 py-1 font-Poppin font-bold text-[14px] text-blue-500 hover:underline hover:border-DARKBLUE05"
                  >
                    Halaman Daftar
                  </Link>
                </div>
              </div>
            )}

            {/* Render the button only if email is present */}
            {email && (
              <button className="w-full font-Poppin text-[16px] font-semibold bg-YELLOW05  text-white py-[10px] rounded-xl mt-5 ">
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            )}
          </form>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center w-full md:max-w-[50%]">
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
        </div>
      </div>
    </>
  );
};

export default Otp;
