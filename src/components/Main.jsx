import React, { Fragment, useContext } from "react";
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
          <th colSpan={2}>Away Team</th>

          {state?.events?.[0]?.markets[0].runners.length === 3 && (
            <th colSpan={2}>Draw</th>
          )}
        </tr>
        {state?.events?.map((evnt) => {
          const newRunners = evnt?.markets[0]?.runners.slice(0, 3);
          if (evnt.status !== "closed") {
            return (
              <tr
                className="main-table-tr"
                key={evnt.id}
                onClick={() => handleData(evnt)}
              >
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
                <td className="main-table-td">
                  <div className="td-flex">
                    <b>{evnt.name}</b>
                    <span>{evnt.volume.toFixed(2)}</span>
                  </div>
                </td>

                {newRunners &&
                  newRunners.map((runner, index) => {
                    const back = runner?.prices?.find((a) => a.side === "back");
                    const lay = runner?.prices?.find((a) => a.side === "lay");

                    return (
                      <Fragment key={runner.id}>
                        <td
                          className={
                            index === 0 || index % 2 === 0
                              ? "main-table-td-ltb"
                              : "main-table-td-rd"
                          }
                        >
                          {" "}
                          <div>
                            <span className="main-table-bold">
                              {back?.odds}
                            </span>
                            <br />
                            <span className="main-table-small-size">
                              {" "}
                              €{back?.["available-amount"].toFixed(2)}{" "}
                            </span>
                          </div>
                        </td>
                        <td
                          className={
                            index === 0 || index % 2 === 0
                              ? "main-table-td-ltb"
                              : "main-table-td-rd"
                          }
                        >
                          {" "}
                          <div>
                            <span className="main-table-bold">{lay?.odds}</span>
                            <br />
                            <span className="main-table-small-size">
                              {" "}
                              €{lay?.["available-amount"].toFixed(2)}{" "}
                            </span>
                          </div>
                        </td>
                      </Fragment>
                    );
                  })}
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}
