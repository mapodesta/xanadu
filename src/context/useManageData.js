/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const useManageData = () => {
  const initialState = {
    events: [],
  };

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
        events: data.data.events,
      });
    };

    getAllEvents();
  }, []);

  const filterEvents = async (sportId) => {
    const data = await axios(
      `/edge/rest/events?offset=0&per-page=20&after=${Math.floor(
        Date.now() / 1000
      )}&sport-ids=${sportId}&states=open%2Csuspended%2Cclosed%2Cgraded&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false`,
      {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    setState({
      events: data.data.events,
    });
  };

  const filterByCountry = async (sportId, value) => {
    const country = value.replace(/ /g, "-").toLowerCase();
    const data = await axios(
      `/edge/rest/events?offset=0&per-page=100&after=${Math.floor(
        Date.now() / 1000
      )}&before=${
        Math.floor(Date.now() / 1000) + 500000
      }&sport-ids=${sportId}&states=open%2Csuspended%2Cclosed%2Cgraded&tag-url-names=${country}&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false`,
      {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    setState({
      events: data.data.events,
    });
  };

  const filterByCompetition = async (sportId, actualFilters, value) => {
    const category = value.replace(/ /g, "-").toLowerCase();
    const data = await axios(
      `/edge/rest/events?offset=0&per-page=100&after=${Math.floor(
        Date.now() / 1000
      )}&before=${
        Math.floor(Date.now() / 1000) + 500000
      }&sport-ids=${sportId}&states=open%2Csuspended%2Cclosed%2Cgraded&tag-url-names=${
        (actualFilters.country.toLowerCase(), category)
      }&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false`,
      {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    setState({
      events: data.data.events,
    });
  };

  const sortByVolume = () => {
    asc
      ? setState({
          events: state.events.sort((a, b) => a.volume - b.volume),
        })
      : setState({
          events: state.events.sort((a, b) => b.volume - a.volume),
        });
    setAsc(!asc);
  };

  const sortByDate = () => {
    timeAsc
      ? setState({
          events: state.events.sort(
            (a, b) => new Date(a.start) - new Date(b.start)
          ),
        })
      : setState({
          events: state.events.sort(
            (a, b) => new Date(b.start) - new Date(a.start)
          ),
        });
    setTimeAsc(!timeAsc);
  };

  return {
    filterEvents,
    filterByCountry,
    filterByCompetition,
    sortByVolume,
    sortByDate,
    state,
  };
};

export default useManageData;
