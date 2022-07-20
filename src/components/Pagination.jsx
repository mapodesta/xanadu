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
        {currentPage === 1 && total > 1 && (
          <>
            <li key={currentPage} className="pagination-active-page">
              <a
                onClick={() => handlePagination(actualFilters, currentPage)}
                className="page-link"
                href="/#"
              >
                {currentPage}
              </a>
            </li>
            <li key={currentPage + 1} className="pagination-page">
              <a
                onClick={() => handlePagination(actualFilters, currentPage + 1)}
                className="page-link"
                href="/#"
              >
                {currentPage + 1}
              </a>
            </li>
          </>
        )}
        {currentPage > 1 && currentPage < total && (
          <>
            <li key={currentPage - 1} className={"pagination-page"}>
              <a
                onClick={() => handlePagination(actualFilters, currentPage - 1)}
                className="page-link"
                href="/#"
              >
                {currentPage - 1}
              </a>
            </li>
            <li key={currentPage} className="pagination-active-page">
              <a
                onClick={() => handlePagination(actualFilters, currentPage)}
                className="page-link"
                href="/#"
              >
                {currentPage}
              </a>
            </li>
            <li key={currentPage + 1} className="pagination-page">
              <a
                onClick={() => handlePagination(actualFilters, currentPage + 1)}
                className="page-link"
                href="/#"
              >
                {currentPage + 1}
              </a>
            </li>
          </>
        )}

        {currentPage < total - 1 && (
          <>
            <span>...</span>
            <li
              key={total}
              className={
                currentPage === total
                  ? "pagination-active-page"
                  : "pagination-page"
              }
            >
              <a
                onClick={() => handlePagination(actualFilters, total)}
                className="page-link"
                href="/#"
              >
                {total}
              </a>
            </li>
          </>
        )}

        {currentPage === total && total > 1 && (
          <>
            <li key={currentPage - 1} className={"pagination-page"}>
              <a
                onClick={() => handlePagination(actualFilters, currentPage - 1)}
                className="page-link"
                href="/#"
              >
                {currentPage - 1}
              </a>
            </li>
            <li key={currentPage} className="pagination-active-page">
              <a
                onClick={() => handlePagination(actualFilters, currentPage)}
                className="page-link"
                href="/#"
              >
                {currentPage}
              </a>
            </li>
          </>
        )}

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
