import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../../redux/actions/CourseActions";
import { VITE_API_URL } from "../../config/config";
import typeCourseData from "../../data/TypeCourseData";

function Checklist({ hasil, setData, typeButton, linkFilter }) {
  const checkboxesRef = useRef([]);
  const { filter } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [typeCourse, setTypeCourse] = useState([]);
  const navigate = useNavigate();

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

  const navigateToCourses = () => {
    const categoryParams = selectedCheckboxes
      .map((category) => `category=${category}`)
      .join("&");
    const levelParams = selectedLevel
      .map((level) => `level=${level}`)
      .join("&");
    // navigate(`/course/${categoryParams}`);
    const queryParams = [categoryParams, levelParams].filter(Boolean).join("&");

    navigate(`/course/${queryParams}`);
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
      typeButton === "" &&
      typeCourse.length === 0
    ) {
      setData(hasil);
    } else if (
      selectedCheckboxes.length === 0 &&
      typeButton &&
      selectedLevel.length === 0 &&
      typeCourse.length === 0
    ) {
      const filter = hasil.filter((item) => item.type === typeButton);
      setData(filter);
    } else if (selectedCheckboxes.length > 0) {
      checkbox(selectedCheckboxes);
    } else if (selectedLevel.length > 0) {
      checkbox(selectedLevel);
    } else if (typeCourse.length > 0) {
      checkbox(typeCourse);
    } else if (typeButton) {
      checkbox(typeButton);
    }
  };

  const checkbox = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/${linkFilter}`, {
        params: {
          type: typeButton,
          category: selectedCheckboxes,
          level: selectedLevel,
          ...typeCourse.reduce((acc, value) => {
            acc[value] = true;
            return acc;
          }, {}),
        },
      });
      const { data } = response;
      setData(data.value);
    } catch (errors) {
      alert(errors?.message);
    }
  };

  const unCheckAll = () => {
    checkboxesRef.current.forEach((checkbox) => {
      checkbox.checked = false;
      setSelectedCheckboxes([]);
      setSelectedLevel([]);
      setTypeCourse([]);
    });
  };

  useEffect(() => {
    applyFilter();
    dispatch(filterData());
    if (selectedCheckboxes.length > 0) {
      navigateToCourses();
    }
  }, [
    selectedCheckboxes,
    selectedLevel,
    setData,
    hasil,
    typeCourse,
    linkFilter,
  ]);

  return (
    <div
      style={{ backgroundColor: `white` }}
      className="w-full px-5 py-2.5 rounded-lg flex flex-col gap-y-2.5 h-max md:sticky top-[9vh] drop-shadow-xl"
    >
      <p className="font-bold text-sm">Filter</p>
      <ul>
        {typeCourseData.map((item) => (
          <li key={item.id} className="flex flex-row gap-3">
            <input
              ref={(element) => {
                checkboxesRef.current.push(element);
              }}
              type="checkbox"
              className="border-inherit rounded-lg"
              checked={typeCourse.includes(item.id)}
              onChange={() => handleTypeCourse(item.id)}
            />
            <label className="font-Montserrat text-xs">{item.label}</label>
          </li>
        ))}
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
              checked={selectedCheckboxes.includes(item.slug)}
              onChange={() => handleChecklist(item.slug)}
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
  setHasil: PropTypes.func,
  hasil: PropTypes.array,
  data: PropTypes.array,
  typeButton: PropTypes.string,
  linkFilter: PropTypes.string,
};

export default Checklist;
