import { useRef } from "react";
function Checklist() {
  const checkboxesRef = useRef([]);

  const unCheckAll = () => {
    checkboxesRef.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div
      style={{ backgroundColor: `white` }}
      className="w-full px-5 py-2.5 rounded-lg flex flex-col gap-y-2.5 h-max lg:sticky top-[9vh]"
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
          <label className="font-Montserrat text-sm">Paling Baru</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Paling Populer</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Paling Promo</label>
        </li>
      </ul>
      <p className="font-bold text-sm">Kategori</p>
      <ul>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">UI/UX Design</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Web Development</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Android Development</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Data Science</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">
            Business Intelligence
          </label>
        </li>
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
          <label className="font-Montserrat text-sm">Semua Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Beginner Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Intermediate Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
          />
          <label className="font-Montserrat text-sm">Advanced Level</label>
        </li>
      </ul>
      <button className="rounded-lg text-blue-600 hover:text-blue-400 font-Montserrat text-sm">
        Terapkan Filter
      </button>
      <button
        onClick={unCheckAll}
        className="rounded-lg text-red-600 font-Montserrat text-sm"
      >
        Hapus Filter
      </button>
    </div>
  );
}

export default Checklist;
