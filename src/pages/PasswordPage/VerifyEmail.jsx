import { useState } from "react";
import logo from "../../assets/Belajar_white 2.svg";
import { useDispatch } from "react-redux";
import { RequestPassword } from "../../redux/actions/AuthActions";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(RequestPassword(email, setIsLoading));
  };

  return (
    <div className="flex min-h-screen bg-DARKBLUE04 ">
      <div className="w-[100%] lg:w-[50%] flex justify-start items-center mx-[23px] lg:px-[145px] ">
        <form onSubmit={handleSubmit} className="w-full ">
          <h1 className="text-[24px] font-bold text-DARKBLUE05 font-Montserrat mb-8">
            Verifikasi Email
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <label className="font-Poppins text-[15px] mb-[4px]">
                  Masukkan Email
                </label>
              </div>
              <input
                type="email"
                className="border w-full py-3 px-4 rounded-2xl pr-[3.5rem] "
                placeholder="Contoh: wynn@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-Poppins bg-DARKBLUE05 text-white py-[10px] rounded-2xl mt-5 hover:bg-DARKBLUE03"
          >
            {isLoading ? "Loading..." : "Kirim"}
          </button>
        </form>
      </div>
      <div className="hidden lg:flex justify-center items-center bg-DARKBLUE05 w-[50%] min-h-[100dvh]">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default VerifyEmail;
