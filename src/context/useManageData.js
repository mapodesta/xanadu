/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const useManageData = () => {
  const initialState = {
    totalRecords: 0,
    events: [],
  };

  const [actualFilters, setActualFilters] = useState({
    id: 0,
    sport: "",
    country: "",
    competition: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [state, setState] = useState(initialState);
  const [asc, setAsc] = useState(true);
  const [timeAsc, setTimeAsc] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await axios(
        `/edge/rest/events?offset=0&per-page=20&&after=${Math.floor(
          Date.now() / 1000
        )}&states=open%2Csuspended%2Cclosed%2Cgraded&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&markets-limit=1&exclude-mirrored-prices=false`,
        {
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      setState({
        totalRecords: data.data.total,
        events: data.data.events,
      });
    };

    getAllEvents();
  }, []);

  const filterByCompetition = async (actualFilters, pag) => {
    let tags = "";
    let category = "";
    let sprt = "";
    if (actualFilters.competition !== "")
      category = actualFilters?.competition?.replace(/ /g, "-").toLowerCase();

    if (actualFilters.country !== "") {
      tags = `${actualFilters?.country?.toLowerCase()},${category}`;
    } else {
      tags = category;
    }

    if (actualFilters.id !== 0) {
      sprt = `sport-ids=${actualFilters.id}&`;
    }
    const data = await axios(
      `/edge/rest/events?offset=${pag}&per-page=20&after=${Math.floor(
        Date.now() / 1000
      )}&before=${
        Math.floor(Date.now() / 1000) + 500000
      }&${sprt}states=open%2Csuspended%2Cclosed%2Cgraded&tag-url-names=${tags}&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false`,
      {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    setState({
      totalRecords: data.data.total,
      events: data.data.events,
    });
  };

  const sortByVolume = () => {
    asc
      ? setState({
          ...state,
          events: state.events.sort((a, b) => a.volume - b.volume),
        })
      : setState({
          ...state,
          events: state.events.sort((a, b) => b.volume - a.volume),
        });
    setAsc(!asc);
  };

  const sortByDate = () => {
    timeAsc
      ? setState({
          ...state,
          events: state.events.sort(
            (a, b) => new Date(a.start) - new Date(b.start)
          ),
        })
      : setState({
          ...state,
          events: state.events.sort(
            (a, b) => new Date(b.start) - new Date(a.start)
          ),
        });
    setTimeAsc(!timeAsc);
  };

  return {
    filterByCompetition,
    sortByVolume,
    sortByDate,
    actualFilters,
    setActualFilters,
    currentPage,
    setCurrentPage,
    state,
  };
};

export default useManageData;
