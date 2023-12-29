import Badge_Outline from "../../assets/badge_outline.svg";
import Book from "../../assets/book.svg";
import Start from "../../assets/star.svg";
import Time from "../../assets/time.svg";
import PropTypes from "prop-types";
import Premium from "../../assets/diamond.svg";

const CardHistori = ({ data }) => {
  const { courses } = data;

  return (
    <div className="mt-2 flex flex-col  bg-white rounded-2xl m-auto shadow-lg  w-full">
      <img src={courses.imageUrl} className="w-full max-h-56" />
      <div className="flex flex-col mt-3 px-2 mb-3">
        <div className="flex flex-row justify-between font-Montserrat font-bold text-sm ">
          <h3 className="text-DARKBLUE05">{courses.category}</h3>
          <div className="flex flex-row gap-1">
            <img src={Start} />
            <p>{courses.rating}</p>
          </div>
        </div>
        <h3
          className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {data.description}
        </h3>
        <p className="my-1 font-Montserrat font-normal text-xs">
          {courses.instructor}
        </p>
        <div className="flex pb-2 justify-between font-Montserrat">
          <span className=" font-semibold text-xs text-[#6148FF] flex gap-x-1">
            <img src={Badge_Outline} className="w-3" /> {courses.level}
          </span>
          <span className="font-semibold text-xs flex gap-x-1">
            <img src={Book} className="w-3" />
            {courses.totalModule}
            <p>Modul</p>
          </span>
          <span className="font-semibold text-xs flex gap-x-1">
            <img src={Time} className="w-3" />
            {courses.totalDuration}
            <p>Menit</p>
          </span>
        </div>

        <div
          className={`flex flex-row max-w-fit gap-2 px-6 py-1 rounded-xl font-Montserrat text-xs font-bold mt-3 ${
            data.status === "Success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex flex-row gap-1">
            <img src={Premium} />
          </div>
          {data.status}
        </div>
      </div>
    </div>
  );
};

CardHistori.propTypes = {
  data: PropTypes.object,
};

export default CardHistori;
