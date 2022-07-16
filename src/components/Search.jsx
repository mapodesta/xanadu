import React, { useState, useContext } from "react";
import useGetData from "../hooks/useGetData";
import AppContext from "../context/AppContext";
import "../styles/search.css";

export default function Search() {
  const { tree } = useGetData();
  const {
    filterEvents,
    filterByCountry,
    filterByCompetition,
    sortByVolume,
    sortByDate,
  } = useContext(AppContext);
  const [competitions, setCompetitions] = useState([]);
  const [sportId, setSportId] = useState();
  const [countries, setCountries] = useState([]);

  const [actualFilters, setActualFilters] = useState({
    sport: "",
    country: "",
    competition: "",
  });

  const handleSport = (e) => {
    setActualFilters({ ...actualFilters, sport: e.target.value });
    setCompetitions([]);
    setCountries([]);
    const sport = tree.find((element) => element.name === e.target.value);
    setSportId(sport.id);
    filterEvents(sport.id, actualFilters);
    sport["meta-tags"].forEach((sprt) => {
      if (sprt.type === "COMPETITION") {
        setCompetitions((competitions) => [...competitions, sprt.name]);
      }
      if (sprt.type === "COUNTRY") {
        setCountries((countries) => [...countries, sprt.name]);
      }
    });
  };

  const handleCountry = (e) => {
    setActualFilters({ ...actualFilters, country: e.target.value });
    filterByCountry(sportId, e.target.value);
    setCompetitions([]);
    const sport = tree.find((element) => element.name === actualFilters.sport);
    const res = sport["meta-tags"].find((elem) => elem.name === e.target.value);
    res["meta-tags"].forEach((tag) => {
      if (tag.type === "COMPETITION" || tag.type === "LOCATION")
        setCompetitions((competitions) => [...competitions, tag.name]);
    });
  };

  const handleCompetition = (e) => {
    setActualFilters({ ...actualFilters, competition: e.target.value });
    filterByCompetition(sportId, actualFilters, e.target.value);
  };

  // useEffect(() => {
  //   console.log(actualFilters);
  // }, [actualFilters]);

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
          {tree.map((sprt) => {
            if (sprt.type === "SPORT") {
              return (
                <option value={sprt.name} key={sprt.id}>
                  {sprt.name}
                </option>
              );
            }
            return "";
          })}
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
          defaultValue=""
          onChange={handleCompetition}
        >
          <option hidden>Competition</option>
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
