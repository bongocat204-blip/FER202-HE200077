import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-buttons">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        [Truoc]
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={currentPage === num ? "active-page" : ""}
          onClick={() => onPageChange(num)}
        >
          [{num}]
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        [Sau]
      </button>
    </div>
  );
}
