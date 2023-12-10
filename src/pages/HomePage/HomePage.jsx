import CardKategori from "../../components/card/CardKategori";
import CardCourse from "../../components/card/CardPopular";
import Header from "../../components/Navbar/Header";
import PeopleHome from "../../assets/people_homepage.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../utils/responsiveCarousel";
import { responsive2 } from "../../utils/responsiveCarousel";
import "../../utils/CssConfig.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getPopular } from "../../redux/actions/CourseActions";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { category, popular } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPopular());
  }, [dispatch]);

  const handleLinkClick = () => {
    // Panggil fungsi getPopular saat tautan diklik
    dispatch(getPopular());
  };

  return (
    <>
      <Header />
      <div className="mx-auto">
        {/* bagian 1 di homepage */}
        <div className="mx-auto flex flex-col lg:flex-row bg-DARKBLUE05">
          <div className="lg:w-[60%] relative">
            <img src={PeopleHome} className="w-full lg:w-full z-0" />
            <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-l from-DARKBLUE05 via-transparent to-transparent"></div>
          </div>
          <div className=" flex  container py-4 lg:w-[40%] ">
            <div className="flex flex-col justify-center lg:gap-4 pl-4 lg:pl-0 gap-2">
              <div className="flex flex-col font-Montserrat font-bold  lg:text-2xl text-white lg:gap-3 gap-2">
                <h1>Belajar</h1>
                <h1>dari Praktisi Terbaik!</h1>
              </div>
              <Link
                as={Link}
                to="/course/:nameCourse"
                className="bg-white text-DARKBLUE05 font-Montserrat font-bold text-sm lg:text-base rounded-[10px] lg:py-2 py-[6px] w-[100%] text-center"
              >
                IKUTI KELAS
              </Link>
            </div>
          </div>
        </div>

        {/* Bagian Kategori Belajar */}
        <div className=" flex mx-auto justify-center  bg-LightBlue5">
          <div className="flex w-full flex-col pt-[26px] pb-[14px] gap-5 container">
            <div className="flex flex-row justify-between container">
              <h2 className="text-xl font-x font-bold ">Kategori Belajar</h2>
              <button
                onClick={handleLinkClick}
                className="font-Montserrat font-extrabold text-xs max-w-fit text-DARKBLUE05 self-center"
              >
                Lihat Semua
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 justify-between gap-3  w-full container">
              {category.map((data) => (
                <>
                  <Link as={Link} to={`/course/category=${data.slug}`}>
                    <CardKategori key={data.category} data={data} />
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kursus Populer */}
      <div className="mx-auto flex justify-center ">
        <div className="flex flex-col container gap-5 pt-[26px] pb-[53px]">
          <div className="flex flex-row container font-Montserrat  justify-between">
            <h2 className="font-bold text-xl">Kursus Populer</h2>
            <Link
              as={Link}
              to="/course"
              className="font-extrabold text-xs text-DARKBLUE05 self-center"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="container">
            <Carousel responsive={responsive2}>
              <Link
                as={Link}
                className=" rounded-2xl w-full font-Montserrat font-bold text-xs bg-LightBlue5 py-2 whitespace-nowrap text-center line-clamp-2 "
              >
                All
              </Link>
              {category.map((datas) => (
                <div key={datas.id} className="ml-1 mr-1">
                  <button className=" rounded-2xl w-full font-Montserrat font-bold text-xs bg-LightBlue5 py-2 whitespace-nowrap text-center line-clamp-2 ">
                    <div>{datas.name}</div>
                  </button>
                </div>
              ))}
            </Carousel>
          </div>

          <div className=" drop-shadow-xl container mx-auto">
            <Carousel responsive={responsive}>
              {popular.map((data) => (
                <CardCourse key={data.id} data={data} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
