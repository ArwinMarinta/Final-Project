import kategori from "../../data/DataKategori";

const CardKategori = () => {
  return (
    <div className=" flex mx-auto justify-center  bg-LightBlue5">
      <div className="flex w-full flex-col pt-[26px] pb-[14px] gap-5 container">
        <div className="flex flex-row justify-between container">
          <h2 className="text-xl font-Montserrat font-bold ">
            Kategori Belajar
          </h2>
          <p className="font-Montserrat font-extrabold text-xs max-w-fit text-DARKBLUE05">
            Lihat Semua
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 justify-between gap-3  w-full container">
          {kategori.map((data) => (
            <div key={data.id}>
              <div className="flex flex-col justify-center px-1 ">
                <img src={data.Image} />
                <div className="text-black font-Montserrat font-semibold text-xs py-3 self-center">
                  {data.nama}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardKategori;
