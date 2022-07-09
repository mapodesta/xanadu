import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData() {
  const [countries, setCountries] = useState([]);
  const [sports, setSports] = useState([]);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getCountries = async () => {
      const data = await axios.get(
        "https://api.matchbook.com/edge/rest/locale",
        {
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-type": "application/json; charset=utf-8",
          },
        }
      );
      console.log(data);
      setCountries(data);
    };
    const getSports = async () => {
      const data = await axios(
        "https://api.matchbook.com/edge/rest/lookups/sports"
      );
      console.log(data);
      setSports(data);
    };
    getSports();
    getCountries();
  }, []);

  return { countries, sports };
}
