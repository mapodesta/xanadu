import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/main.css";
export default function Main({ setModal, setModalData }) {
  const { state } = useContext(AppContext);

  const handleData = (data) => {
    setModalData(data);
    setModal(true);
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
        {state?.events?.map(
          (evnt) =>
            evnt.status !== "closed" && (
              <tr className="main-table-tr" key={evnt.id}>
                <td className="main-table-td">
                  <div className="main-table-date">
                    <span className="main-table-bold">
                      {new Date(evnt.start).toLocaleDateString()}
                    </span>
                    <br />
                    <span className="main-table-small-size">
                      {new Date(evnt.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="main-table-td" onClick={() => handleData(evnt)}>
                  <div className="td-flex">
                    <b>{evnt.name}</b>
                    <span>{evnt.volume.toFixed(2)}</span>
                  </div>
                </td>
                {evnt?.markets[0]?.runners[0]?.prices.map((price, index) => (
                  <td
                    key={index}
                    className={
                      index === 0 || index % 2 === 0
                        ? "main-table-td-ltb"
                        : "main-table-td-rd"
                    }
                  >
                    {" "}
                    <div>
                      <span className="main-table-bold">{price.odds}</span>
                      <br />
                      <span className="main-table-small-size">
                        {" "}
                        €{price["available-amount"].toFixed(2)}{" "}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}
