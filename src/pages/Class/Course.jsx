import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Checklist from "../../components/checklist/Checklist";
import CardPickCourse from "../../components/card/CardPickCourse";
import Search from "../../assets/search.svg";
import Header from "../../components/Navbar/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../redux/actions/CourseActions";

const Course = () => {
  const [typeButton, setTypeButton] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { hasil } = useSelector((state) => state.course);
  // const { nameCourse } = useParams();
  const linkFilter = `courses`;

  useEffect(() => {
    dispatch(getCourse());
  }, [typeButton]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const addFilter = () => {
    setFilter(!filter);
  };

  const handleClick = (value) => {
    setTypeButton(value);
  };
  return (
    <>
      <Header />
      <div className="bg-LightBlue5 min-h-screen flex justify-center w-full">
        <div className="container w-full">
          <div className=" mx-auto container w-auto">
            <div className="flex flex-wrap justify-between mt-7 items-center md:sticky md:top-0 z-50  h-14 min-h-fullbg-white/30 backdrop-blur">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold"
              >
                Topik Kelas
              </h1>

              <div className="md:w-auto">
                <div className="border-DARKBLUE05 w-full hidden md:block">
                  <div className="flex flex-row">
                    <input
                      type="search"
                      placeholder="Cari Kelas"
                      className="w-full outline-none  px-4 py-[6px] border-2 rounded-2xl border-[#6148FF]"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-[#6148FF] p-1"
                    >
                      <img src={Search} />
                    </button>
                  </div>
                </div>
                <div className="md:hidden text-blue-400 hover:text-blue-600 text-md">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="md:flex mt-5  justify-between gap-20">
              <div className="block md:hidden md:w-auto w-full">
                {filter && (
                  <Checklist
                    hasil={hasil}
                    setData={setData}
                    typeButton={typeButton}
                    linkFilter={linkFilter}
                  />
                )}
              </div>
              <div className="hidden md:block w-72 ">
                <Checklist
                  typeButton={typeButton}
                  hasil={hasil}
                  setData={setData}
                  linkFilter={linkFilter}
                />
              </div>
              <div className="w-full mt-5 md:mt-0 drop-shadow-lg ">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh] ">
                  <button
                    className="rounded-2xl bg-white px-2 md:px-4 py-2 w-1/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(``)}
                  >
                    All
                  </button>
                  <button
                    className="rounded-2xl bg-white px-2 md:px-4 py-2 w-3/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Premium`)}
                  >
                    Kelas Premium
                  </button>
                  <button
                    className="rounded-2xl bg-white px-2 md:px-4 py-2 w-3/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Free`)}
                  >
                    Kelas Gratis
                  </button>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 mt-4 mb-12 gap-2">
                  {data
                    .filter((item) => {
                      if (searchTerm === "") {
                        return item;
                      } else if (
                        item.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        item.category
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((item) => (
                      <div className=" w-full " key={item.id}>
                        <CardPickCourse key={item.id} data={item} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
