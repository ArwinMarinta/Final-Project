import Badge_Outline from "../../assets/badge_outline.svg";
import Book from "../../assets/book.svg";
import Start from "../../assets/star.svg";
import Time from "../../assets/time.svg";
import PropTypes from "prop-types";

const CardPickCourse = ({ data }) => {
  return (
    <div className="mt-2 flex flex-col  bg-white rounded-2xl m-auto shadow-lg mx-1 hover:w-full">
      <img src={data.Image} />
      <div className="flex flex-col mt-3 px-2 mb-3">
        <div className="flex flex-row justify-between font-Montserrat font-bold text-sm ">
          <h3 className="text-DARKBLUE05">{data.nama}</h3>
          <div className="flex flex-row gap-1">
            <img src={Start} />
            <p>{data.rating}</p>
          </div>
        </div>
        <h3
          className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {data.topic}
        </h3>
        <p className="my-1 font-Montserrat font-normal text-xs">
          {data.mentor}
        </p>
        <div className="flex pb-2 justify-between">
          <span className=" font-semibold text-xs text-[#6148FF] flex gap-x-1">
            <img src={Badge_Outline} className="w-3" /> {data.level}
          </span>
          <span className="font-semibold text-xs flex gap-x-1">
            <img src={Book} className="w-3" />
            {data.modul}
          </span>
          <span className="font-semibold text-xs flex gap-x-1">
            <img src={Time} className="w-3" />
            {data.durasi}
          </span>
        </div>
        <div>
          <button className="rounded-full bg-blue-600 hover:bg-blue-400 py-1 px-8 text-xs text-bold text-white">
            Mulai Kelas
          </button>
        </div>
      </div>
    </div>
  );
};

CardPickCourse.propTypes = {
  data: PropTypes.object,
};

export default CardPickCourse;
