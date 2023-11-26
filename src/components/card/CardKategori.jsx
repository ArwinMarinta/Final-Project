import PropTypes from "prop-types";

const CardKategori = ({ data }) => {
  return (
    <div className="flex flex-col justify-center px-1 ">
      <img src={data.Image} />
      <div className="text-black font-Montserrat font-semibold text-xs py-3 self-center">
        {data.nama}
      </div>
    </div>
  );
};

CardKategori.propTypes = {
  data: PropTypes.object,
};

export default CardKategori;
