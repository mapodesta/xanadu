import React, { useEffect, useState, useContext, useCallback } from "react";
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
  const [competitions, setCompetitions] = useState([
    "Competitions",
    "Competitions",
  ]);
  const [countries, setCountries] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");

  const handleSport = useCallback(
    (e) => {
      setSelectedSport(e.target.value);
      setCurrentPage(1);
      setCompetitions(["Competitions", "Competitions"]);
      setCountries([]);
      const select = e.target;
      const id = Number(select.children[select.selectedIndex].id);
      setActualFilters({
        ...actualFilters,
        id,
        sport: e.target.value,
        country: "",
        competition: "",
      });
    },
    [actualFilters, setActualFilters, setCurrentPage]
  );

  useEffect(() => {
    const sport = tree?.find((element) => element.name === selectedSport);
    sport &&
      sport["meta-tags"].forEach((sprt) => {
        if (sprt.type === "COMPETITION") {
          setCompetitions((competitions) => [...competitions, sprt.name]);
        }
        if (sprt.type === "COUNTRY") {
          setCountries((countries) => [...countries, sprt.name]);
        }
      });
  }, [selectedSport, tree]);

  useEffect(() => {
    filterByCompetition(actualFilters, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualFilters]);

  const handleCountry = useCallback(
    (e) => {
      setCurrentPage(1);
      setActualFilters({
        ...actualFilters,
        country: e.target.value,
        competition: "",
      });

      setCompetitions(["Competitions", "Competitions"]);
      const sport = tree.find(
        (element) => element.name === actualFilters.sport
      );
      const res = sport["meta-tags"].find(
        (elem) => elem.name === e.target.value
      );
      res["meta-tags"].forEach((tag) => {
        if (tag.type === "COMPETITION" || tag.type === "LOCATION")
          setCompetitions((competitions) => [...competitions, tag.name]);
      });
    },
    [actualFilters, setActualFilters, setCurrentPage, tree]
  );

  const handleCompetition = useCallback(
    (e) => {
      setCurrentPage(1);
      setActualFilters({ ...actualFilters, competition: e.target.value });
    },
    [actualFilters, setActualFilters, setCurrentPage]
  );

  return (
    <div className="search-content">
      <div className="search-filters">
        <select
          name="sports"
          className="select-style"
          onChange={handleSport}
          defaultValue="placeholder"
        >
          <option disabled value="placeholder">
            Sport
          </option>
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
          defaultValue={competitions[0]}
          onChange={handleCompetition}
        >
          {competitions.map((competition, index) => (
            <option
              value={competition}
              key={index}
              hidden={!index}
              disabled={index === 1}
            >
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
