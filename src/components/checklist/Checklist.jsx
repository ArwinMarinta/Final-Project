import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Checklist({ hasil, setData, typeButton }) {
  const checkboxesRef = useRef([]);
  const [filter, setFilter] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [typeCourse, setTypeCourse] = useState([]);
  const [useFilter, setUseFilter] = useState([]);

  const handleTypeCourse = (value) => {
    setTypeCourse((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
    console.log(typeCourse);
  };

  const handleChecklist = (value) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
  };

  const handleLevel = (value) => {
    setSelectedLevel((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
  };

  const applyFilter = () => {
    if (
      selectedCheckboxes.length === 0 &&
      selectedLevel.length === 0 &&
      typeButton === ""
    ) {
      setData(hasil);
    } else if (
      selectedCheckboxes.length === 0 &&
      typeButton &&
      selectedLevel.length === 0
    ) {
      const filter = hasil.filter((item) => item.type === typeButton);
      setData(filter);
      setUseFilter(filter);
    } else if (
      selectedCheckboxes.length === 0 &&
      typeButton &&
      selectedLevel.length > 0
    ) {
      const levelData = hasil.filter((item) =>
        selectedLevel.includes(item.level)
      );
      setData(levelData);
    } else if (selectedCheckboxes.length > 0 && typeButton === "") {
      const filteredData = hasil.filter((item) =>
        selectedCheckboxes.includes(item.category)
      );
      setData(filteredData);
    } else if (selectedCheckboxes.length > 0 && typeButton) {
      const filteredData = useFilter.filter((item) =>
        selectedCheckboxes.includes(item.category)
      );
      setData(filteredData);
    } else if (selectedLevel.length > 0 && typeButton) {
      const levelData = useFilter.filter(
        (item) =>
          selectedLevel.includes(item.level) && typeButton.includes(item.type)
      );
      setData(levelData);
    } else if (selectedLevel.length > 0 && typeButton === "") {
      const levelData = hasil.filter((item) =>
        selectedLevel.includes(item.level)
      );
      setData(levelData);
    }
    if (
      selectedLevel.length > 0 &&
      selectedCheckboxes.length > 0 &&
      typeButton === ""
    ) {
      const filteredData = hasil.filter(
        (item) =>
          selectedLevel.includes(item.level) &&
          selectedCheckboxes.includes(item.category)
      );

      setData(filteredData);
    }
    if (
      selectedLevel.length > 0 &&
      selectedCheckboxes.length > 0 &&
      typeButton
    ) {
      const filteredData = hasil.filter(
        (item) =>
          selectedLevel.includes(item.level) &&
          selectedCheckboxes.includes(item.category) &&
          typeButton.includes(item.type)
      );

      setData(filteredData);
    }
  };

  const unCheckAll = () => {
    checkboxesRef.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedCheckboxes([]);
    setSelectedLevel([]);
  };

  useEffect(() => {
    const filterData = async () => {
      try {
        const response = await axios.get(
          "https://backend-production-6687.up.railway.app/api/v1/course-category"
        );
        const { data } = response;
        setFilter(data.value);
      } catch (errors) {
        alert(errors?.message);
      }
    };
    applyFilter();
    filterData();
  }, [selectedCheckboxes, selectedLevel, setData, hasil]);

  return (
    <div
      style={{ backgroundColor: `white` }}
      className="w-full px-5 py-2.5 rounded-lg flex flex-col gap-y-2.5 h-max md:sticky top-[9vh] drop-shadow-xl"
    >
      <p className="font-bold text-sm">Filter</p>
      <ul>
        <li className="flex flex-row gap-3">
          <input
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            type="checkbox"
            className="border-inherit rounded-lg"
          />
          <label className="font-Montserrat text-xs">Paling Baru</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={typeCourse.includes("popular")}
            onChange={() => handleTypeCourse("popular")}
          />
          <label className="font-Montserrat text-xs">Paling Populer</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-xs">Paling Promo</label>
        </li>
      </ul>
      <p className="font-bold text-sm">Kategori</p>
      <ul>
        {filter.map((item) => (
          <li className="flex flex-row gap-y-9 gap-x-3 " key={item.id}>
            <input
              type="checkbox"
              className="border-inherit rounded-lg"
              ref={(element) => {
                checkboxesRef.current.push(element);
              }}
              checked={selectedCheckboxes.includes(item.name)}
              onChange={() => handleChecklist(item.name)}
            />
            <label className="font-Montserrat text-xs">{item.name}</label>
          </li>
        ))}
      </ul>
      <p className="font-bold text-sm">Level Kesulitan</p>
      <ul>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-xs">Semua Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Beginner")}
            onChange={() => handleLevel("Beginner")}
          />
          <label className="font-Montserrat text-xs">Beginner Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Intermediate")}
            onChange={() => handleLevel("Intermediate")}
          />
          <label className="font-Montserrat text-xs">Intermediate Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Advanced")}
            onChange={() => handleLevel("Advanced")}
          />
          <label className="font-Montserrat text-xs">Advanced Level</label>
        </li>
      </ul>
      <button
        onClick={unCheckAll}
        className="rounded-lg text-red-600 font-Montserrat text-sm"
      >
        Hapus Filter
      </button>
    </div>
  );
}
Checklist.propTypes = {
  setData: PropTypes.func,
  hasil: PropTypes.array,
  data: PropTypes.array,
  typeButton: PropTypes.string,
};

export default Checklist;
