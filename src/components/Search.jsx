import React from "react";
import useGetData from "../hooks/useGetData";
import "../styles/search.css";

export default function Search() {
  const { sports, countries } = useGetData();
  console.log(sports, countries);
  const handleCountry = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className="search-content">
      <div className="search-filters">
        <select
          name="sports"
          className="select-style"
          onChange={handleCountry}
          defaultValue=""
        >
          <option hidden>Sport</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>

        <select name="country" className="select-style" defaultValue="">
          <option hidden>Country</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>

        <select name="competitions" className="select-style" defaultValue="">
          <option hidden>Competition</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div className="search-sorters">
        <span>Sort By</span>
        <button className="search-button">Start Time</button>
        <button className="search-button">Volume</button>
      </div>
    </div>
  );
}
