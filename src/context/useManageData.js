/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const useManageData = () => {
  const initialState = {
    events: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await axios(
        `/edge/rest/events?offset=0&per-page=20&&after=${Math.floor(
          Date.now() / 1000
        )}&states=open%2Csuspended%2Cclosed%2Cgraded&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false`,
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

  return { filterEvents, filterByCountry, filterByCompetition, state };
};

export default useManageData;
