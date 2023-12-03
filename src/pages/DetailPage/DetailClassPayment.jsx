import Leave from "../../assets/arrow_left.svg";
import Header from "../../components/header";
import mastercard from "../../assets/mastercard_logo.svg";
import visa from "../../assets/visa_logo.svg";
import ameks from "../../assets/ameks_logo.svg";
import paypal from "../../assets/paypal_logo.svg";

export default function DetailClassPayment() {
  return (
    <>
      <Header />
      <div className="container">
        <button className="font-bold flex my-4 items-center">
          <img src={Leave} className="mx-4" />
          Kembali
        </button>
      </div>
      <div className="flex justify-center">
        <div className="container w-auto flex justify-center">
          <div className="container w-[1000px] mx-auto flex justify-center">
            <p className="bg-[#F00] px-3 py-2 rounded-lg w-[800px] flex justify-center text-white font-semibold">
              Selesaikan Pembayaran Sampai 10 Maret 2023 12.00
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center m-4">
        <div className="container flex justify-between">
          <div className="w-1/2 pt-4">
            <button className="w-full bg-stone-800 hover:bg-stone-600 text-white text-left m-1 p-2 rounded-lg">
              Bank Transfer
            </button>
            <button className="w-full bg-blue-600 text-white text-left m-1 p-2 rounded-lg">
              Credit Card
            </button>
            <div className="container p-5 m-2 border-2 drop-shadow-lg rounded-lg">
              <div className="flex gap-5 justify-center">
                <img src={mastercard} alt="" />
                <img src={visa} alt="" />
                <img src={ameks} alt="" />
                <img src={paypal} alt="" />
              </div>
            </div>
          </div>
          <div className="w-1/2 pt-4"></div>
        </div>
      </div>
    </>
  );
}
