import axios from "axios";
import { useEffect, useState } from "react";

export default function useEvents() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const data = await axios(
        "/edge/rest/events?offset=0&per-page=20&states=open%2Csuspended%2Cclosed%2Cgraded&exchange-type=back-lay&odds-type=DECIMAL&include-prices=false&price-depth=3&price-mode=expanded&include-event-participants=false&exclude-mirrored-prices=false",

        {
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      setAllEvents(data.data.events);
    };

    getAllEvents();
  }, []);

  return { allEvents };
}
