import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/main.css";
export default function Main() {
  const { state } = useContext(AppContext);

  const handleEvent = () => {
    console.log("first");
  };

  return (
    <table className="main-table">
      <tbody>
        <tr>
          <td className="main-table-td" />
          <td />
          <th colSpan={2}>Home Team</th>
          <th colSpan={2}>Draw</th>
          <th colSpan={2}>Away Team</th>
        </tr>
        {state?.events?.map((evnt) => {
          return (
            <tr className="main-table-tr" onClick={handleEvent} key={evnt.id}>
              <td className="main-table-td">
                <div className="main-table-date">
                  <span className="main-table-bold">
                    {new Date(evnt.start).toLocaleDateString()}
                  </span>
                  <br />
                  <span className="main-table-small-size">
                    {new Date(evnt.start).toLocaleTimeString()}
                  </span>
                </div>
              </td>
              <td className="main-table-td">
                <div className="td-flex">
                  <b>{evnt.name}</b>
                  <span>{evnt.volume}</span>
                </div>
              </td>

              <td className="main-table-td-ltb">
                {" "}
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
              <td className="main-table-td-rd">
                {" "}
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
              <td className="main-table-td-ltb">
                {" "}
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
              <td className="main-table-td-rd">
                {" "}
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
              <td className="main-table-td-ltb">
                {" "}
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
              <td className="main-table-td-rd">
                <div>
                  <span className="main-table-bold"> 8</span>
                  <br />
                  <span className="main-table-small-size"> $4 </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
