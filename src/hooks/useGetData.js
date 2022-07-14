import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData() {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    const getSports = async () => {
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

  return { tree };
}
