import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "../styles/pagination.css";

const Pagination = () => {
  const {
    filterByCompetition,
    state,
    actualFilters,
    currentPage,
    setCurrentPage,
  } = useContext(AppContext);

  const total = Math.round(state.totalRecords / 20);

  const handlePagination = (actualFilters, pag) => {
    setCurrentPage(pag);
    if (pag === 1) {
      filterByCompetition(actualFilters, pag);
    } else {
      filterByCompetition(actualFilters, (pag - 1) * 20);
    }
  };

  const pageNumbers = [...Array(total + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== total) {
      setCurrentPage(currentPage + 1);
      handlePagination(actualFilters, currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handlePagination(actualFilters, currentPage - 1);
    }
  };

  return (
    <nav className="pagination-nav">
      <ul className="pagination-ul">
        {currentPage > 1 && (
          <li className="page-item">
            <a className="page-link" onClick={prevPage} href="/#">
              Previous
            </a>
          </li>
        )}

        {pageNumbers.map((pgNumber) => {
          if (pgNumber < 4 || pgNumber === total) {
            return (
              <li
                key={pgNumber}
                className={
                  currentPage === pgNumber ? "pagination-active-page" : ""
                }
              >
                <a
                  onClick={() => handlePagination(actualFilters, pgNumber)}
                  className="page-link"
                  href="/#"
                >
                  {pgNumber}
                </a>
              </li>
            );
          }
          return ".";
        })}
        {currentPage !== total && total !== 0 && (
          <li className="page-item">
            <a className="page-link" onClick={nextPage} href="/#">
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
