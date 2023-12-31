import Start from "../../assets/star.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Verif from "../../assets/verif.svg";
import Type from "../../assets/type.svg";
import Module from "../../assets/module.svg";
import Taken from "../../assets/taken.svg";
import Time from "../../assets/jam.svg";

const CardCourse = ({ data }) => {
  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(angka);
  };
  return (
    <Link to={`/detail/course/${data.id}`}>
      <div className="flex flex-col  bg-white rounded-lg border-2 m-auto mr-1 ml-1 cursor-pointer max-w-sm ">
        <div className="rounded-t-lg">
          <img src={data.imageUrl} className="rounded-t-lg" />
        </div>
        <div className="flex flex-col mt-3 px-2 mb-3">
          <div className="flex flex-row justify-between font-Montserrat  text-sm ">
            <div className="flex flex-row gap-1">
              <h3 className="">{data.instructor}</h3>
              <img src={Verif} />
            </div>
            <div className="flex flex-row gap-1 font-bold">
              <img src={Start} />
              <p>{data.rating}</p>
            </div>
          </div>
          <h3
            className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {data.title}
          </h3>

          <div className="flex flex-row  font-Montserrat text-xs mt-2 font-normal">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex flex-row gap-1">
                <img src={Type} />
                <p>{data.level}</p>
              </div>
              <div className="flex flex-row gap-1">
                <img src={Module} />
                <p>{data.totalModule}</p>
                <p>Modul</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex flex-row gap-1">
                <img src={Taken} />
                <p>{data.taken}</p>
              </div>
              <div className="flex flex-row gap-1">
                <img src={Time} />
                <p>{data.duration}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-sm mt-2">
            {data.originalPrice !== data.totalPrice ? (
              <>
                <div className="flex flex-row gap-1">
                  <del className="text-red-500 ">
                    {formatRupiah(data.originalPrice)}
                  </del>
                  <span>{formatRupiah(data.totalPrice)}</span>
                </div>
              </>
            ) : (
              <span>{formatRupiah(data.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

CardCourse.propTypes = {
  data: PropTypes.object,
};

export default CardCourse;
