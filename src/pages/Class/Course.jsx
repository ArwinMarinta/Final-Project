import { useState, useEffect } from "react";
import Checklist from "../../components/checklist/Checklist";
import CardPickCourse from "../../components/card/CardPickCourse";
import course from "../../data/DataCourse";
import search from "../../assets/search_admin.svg";
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
      setData(course)
     }else{
      setData(getItemsByName(typeButton))
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
      <div className="bg-LightBlue5 min-h-screen">
        <div>
          <div className="container mx-auto px-4  md:w-[1000px] w-auto">
            <div className="flex flex-wrap justify-between pt-2 items-center md:sticky md:top-0 md:backdrop-blur md:shadow-sm md:neon-slate md:h-[9vh]">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold "
              >
                Topik Kelas
              </h1>

              <div className="md:w-auto">
                <div className="pt-2 rounded-full border-2 border-blue-600 md:w-200 w-full flex flex-row p-2 justify-between hidden md:block">
                  <input
                    type="text"
                    style={{ outline: `none` }}
                    className="rounded-full border-1 w-[160px] bg-transparent placeholder:MONTSERRAT placeholder:text-slate-400"
                    placeholder="Cari Kelas..."
                    value={searchTerm}
                    onChange={handleInputChange}
                  ></input>
                  <button>
                    <img src={search} className="w-full lg:w-full z-0" />
                  </button>
                </div>
                <div className="md:hidden text-blue-400 hover:text-blue-600">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="flex flex-wrap mt-8 gap-x-8 lg:gap-x-16 justify-between">
              <div className="block md:hidden md:w-auto w-full">
                {filter && <Checklist />}
              </div>
              <div className="hidden md:block">
                <Checklist />
              </div>
              <div className="md:w-8/12 w-full mt-5 md:mt-0">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh]">
                  <button
                    className="rounded-lg bg-white px-2 md:px-4 py-2 w-1/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`all`)}
                  >
                    All
                  </button>
                  <button
                    className="rounded-lg bg-white px-2 md:px-4 py-2 w-3/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Premium`)}
                  >
                    Kelas Premium
                  </button>
                  <button
                    className="rounded-lg bg-white px-2 md:px-4 py-2 w-3/5 hover:bg-[#6148FF] hover:text-white font-semibold text-slate-400"
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Gratis`)}
                  >
                    Kelas Gratis
                  </button>
                </div>
                <div className="flex flex-wrap md:justify-between justify-center items-center">
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
                      <div className="md:w-1/2 w-full" key={item.id}>
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
