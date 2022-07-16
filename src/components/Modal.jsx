import React from "react";
import "../styles/modal.css";
export default function Modal({ setOpenModal, modalData }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="title">
          <b>{modalData.name}</b>
        </div>
        <div className="modal-time-volume">
          <span>
            {" "}
            {new Date(modalData.start).toLocaleDateString()}
            <br />
            {new Date(modalData.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span>
            Market Volume: <br /> €{modalData.volume.toFixed(2)}{" "}
          </span>
        </div>

        <div className="modal-body-table">
          <div className="modal-marketname">
            <b>{modalData.markets[0].name}</b>
          </div>
          <table className="modal-table">
            <tbody>
              <tr>
                <td />
                <td>
                  <b>Back</b>
                </td>
                <td>
                  <b>Lay</b>
                </td>
              </tr>
              {modalData.markets[0].runners.map((runner) => {
                return (
                  <tr className="modal-table-tr" key={runner.id}>
                    <td className="modal-table-td-name">{runner.name}</td>
                    <td className="main-table-td-rd">
                      {" "}
                      <div>
                        <span className="main-table-bold">
                          {runner.prices[0].odds}
                        </span>
                        <br />
                        <span className="main-table-small-size">
                          {" "}
                          €{runner.prices[0]["available-amount"].toFixed(
                            2
                          )}{" "}
                        </span>
                      </div>
                    </td>
                    <td className="main-table-td-ltb">
                      {" "}
                      <div>
                        <span className="main-table-bold">
                          {" "}
                          {runner.prices[1].odds}
                        </span>
                        <br />
                        <span className="main-table-small-size">
                          €{runner.prices[1]["available-amount"].toFixed(2)}{" "}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
