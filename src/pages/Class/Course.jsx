import { useState, useEffect } from "react";
import Checklist from "../../components/checklist/Checklist";
import CardPickCourse from "../../components/card/CardPickCourse";
import course from "../../data/DataCourse";
import Search from "../../assets/search.svg";
import Header from "../../components/header";

const Course = () => {
  const [typeButton, setTypeButton] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const addFilter = () => {
    setFilter(!filter);
  };
  const getItemsByName = (name) => {
    if (name === "all") {
      return course.filter((item) => item.Kategori);
    } else {
      return course.filter((item) => item.Kategori === name);
    }
  };
  useEffect(() => {
    const fetchData = () => {
      if (typeButton === "") {
        setData(course);
      } else {
        setData(getItemsByName(typeButton));
      }
    };
    fetchData();
  }, [typeButton]);

  const handleClick = (value) => {
    setTypeButton(value);
  };
  console.log(typeButton);
  return (
    <>
      <Header />
      <div className="bg-LightBlue5 min-h-screen flex justify-center w-full">
        <div className="container w-full">
          <div className=" mx-auto container   w-auto">
            <div className="flex flex-wrap justify-between mt-14 items-center md:sticky md:top-0 md:backdrop-blur  md:neon-slate md:h-[9vh]">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold "
              >
                Topik Kelas
              </h1>

              <div className="md:w-auto">
                <div className="  border-DARKBLUE05 w-full  hidden md:block">
                  <form className="relative flex flex-row">
                    <input
                      type="search"
                      placeholder="Cari Kelas"
                      className="w-full outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-[#6148FF]"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-[#6148FF] p-1"
                    >
                      <img src={Search} />
                    </button>
                  </form>
                </div>
                <div className="md:hidden text-blue-400 hover:text-blue-600">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="flex  mt-8  justify-between gap-20">
              <div className="block md:hidden md:w-auto w-full">
                {filter && <Checklist />}
              </div>
              <div className="hidden md:block w-72 ">
                <Checklist />
              </div>
              <div className="w-full mt-5 md:mt-0 drop-shadow-lg ">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh]">
                  <button
                    className="rounded-2xl bg-white px-2 md:px-4 py-2 w-1/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`all`)}
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
                    onClick={() => handleClick(`Gratis`)}
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
                        item.nama
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        item.topic
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
