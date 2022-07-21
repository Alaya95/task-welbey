import React from "react";
import "./pagination.scss";

export const Pagination = ({ currentPage, pageCount, onChoosePage }) => {
  const pages = [...Array(pageCount)].map((undefined, index) => index + 1);
  return (
    <div className="pagination">
      {pages.map((page) => (
        <span
          key={page}
          className={
            page === currentPage
              ? "pagination__page pagination__page-active"
              : "pagination__page"
          }
          onClick={() => onChoosePage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};
