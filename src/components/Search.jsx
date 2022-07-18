import React, { useEffect, useState, useContext } from "react";
import useGetData from "../hooks/useGetData";
import AppContext from "../context/AppContext";
import "../styles/search.css";

export default function Search() {
  const { tree } = useGetData();
  const {
    filterByCompetition,
    sortByVolume,
    sortByDate,
    actualFilters,
    setActualFilters,
    setCurrentPage,
  } = useContext(AppContext);
  const [competitions, setCompetitions] = useState([]);
  const [countries, setCountries] = useState([]);

  const handleSport = (e) => {
    setCurrentPage(1);
    const select = e.target;
    const id = Number(select.children[select.selectedIndex].id);
    setActualFilters({
      ...actualFilters,
      id,
      sport: e.target.value,
      country: "",
      competition: "",
    });
    setCompetitions([]);
    setCountries([]);
    const sport = tree.find((element) => element.name === e.target.value);
    sport["meta-tags"].forEach((sprt) => {
      if (sprt.type === "COMPETITION") {
        setCompetitions((competitions) => [...competitions, sprt.name]);
      }
      if (sprt.type === "COUNTRY") {
        setCountries((countries) => [...countries, sprt.name]);
      }
    });
  };

  useEffect(() => {
    filterByCompetition(actualFilters, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualFilters]);

  const handleCountry = (e) => {
    setCurrentPage(1);
    setActualFilters({
      ...actualFilters,
      country: e.target.value,
      competition: "",
    });

    setCompetitions([]);
    const sport = tree.find((element) => element.name === actualFilters.sport);
    const res = sport["meta-tags"].find((elem) => elem.name === e.target.value);
    res["meta-tags"].forEach((tag) => {
      if (tag.type === "COMPETITION" || tag.type === "LOCATION")
        setCompetitions((competitions) => [...competitions, tag.name]);
    });
  };

  const handleCompetition = (e) => {
    setCurrentPage(1);
    setActualFilters({ ...actualFilters, competition: e.target.value });
  };

  return (
    <div className="search-content">
      <div className="search-filters">
        <select
          name="sports"
          className="select-style"
          onChange={handleSport}
          defaultValue=""
        >
          <option hidden>Sport</option>
          {tree.map(({ id, name, type }) =>
            type === "SPORT" ? (
              <option value={name} key={id} id={id}>
                {name}
              </option>
            ) : (
              ""
            )
          )}
        </select>

        <select
          name="country"
          className="select-style"
          onChange={handleCountry}
          defaultValue=""
          disabled={countries.length === 0 ? true : false}
        >
          <option hidden>Country</option>
          {countries.map((country, index) => (
            <option value={country} key={index}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="competitions"
          className="select-style"
          onChange={handleCompetition}
        >
          <option hidden value="">
            Competition
          </option>
          {competitions.map((competition, index) => (
            <option value={competition} key={index}>
              {competition}
            </option>
          ))}
        </select>
      </div>
      <div className="search-sorters">
        <span>Sort By</span>
        <button className="search-button" onClick={sortByDate}>
          Start Time
        </button>
        <button className="search-button" onClick={sortByVolume}>
          Volume
        </button>
      </div>
    </div>
  );
}
