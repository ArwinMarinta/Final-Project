import PropTypes from "prop-types";

const CardKategori = ({ data }) => {
  return (
    <div className="flex flex-col justify-center px-1 ">
      <img src={data.urlPhoto} className="rounded-3xl" />
      <div className="text-black font-Montserrat font-semibold text-xs py-3 self-center">
        {data.name}
      </div>
    </div>
  );
};

CardKategori.propTypes = {
  data: PropTypes.object,
};

export default CardKategori;
