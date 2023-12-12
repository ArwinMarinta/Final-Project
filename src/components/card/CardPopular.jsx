import Badge_Outline from "../../assets/badge_outline.svg";
import Book from "../../assets/book.svg";
import Start from "../../assets/star.svg";
import Premium from "../../assets/diamond.svg";
import PropTypes from "prop-types";

const CardCourse = ({ data }) => {
  return (
    <div className="flex flex-col  bg-white rounded-2xl m-auto mr-1 ml-1  ">
      <img src={data.imageUrl} />
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
        <p className="mt-1 font-Montserrat font-normal text-xs">
          {data.mentor}
        </p>
        <div className="flex flex-row justify-between font-Montserrat text-xs mt-2 font-normal">
          <div className="flex flex-row gap-1">
            <img src={Badge_Outline} />
            <p>{data.level}</p>
          </div>
          <div className="flex flex-row gap-1">
            <img src={Book} />
            <p>{data.modul}</p>
          </div>
          <div>
            <p>{data.durasi}</p>
          </div>
        </div>
        <div>
          <button className="flex flex-row bg-LightBlue4 gap-4 px-6 py-1 rounded-xl font-Montserrat text-xs font-bold mt-3 text-white">
            <div className="flex flex-row gap-2">
              <img src={Premium} />
              <p>Beli</p>
            </div>
            <div className="flex flex-row gap-1">
              <p>Rp</p>
              {data.harga}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

CardCourse.propTypes = {
  data: PropTypes.object,
};

export default CardCourse;
