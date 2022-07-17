import axios from "axios";
import { useEffect, useState } from "react";

export default function useLocation() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      const data = await axios.get(
        "https://api.matchbook.com/edge/rest/locale",
        {
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      setLocation(data.data);
    };

    getLocation();
  }, []);

  return { location };
}
