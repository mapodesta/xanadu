import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData() {
  const [countries, setCountries] = useState([]);
  const [sports, setSports] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    const getSports = async () => {
      const data = await axios(
        "/edge/rest/lookups/sports?offset=0&per-page=45",
        {
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      setSports(data.data.sports);
      const dataCountries = await axios("/bpapi/rest/lookups/countries", {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      setCountries(dataCountries.data.countries);
      //aca puedo traer el tree navigation
      const dataTree = await axios("/edge/rest/navigation", {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      setTree(dataTree.data[0]["meta-tags"]);
    };
    getSports();
  }, []);

  return { sports, countries, tree };
}
