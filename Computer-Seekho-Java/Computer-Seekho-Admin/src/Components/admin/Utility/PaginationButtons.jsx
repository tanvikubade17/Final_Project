import React from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./PaginationButtons.css"; // Ensure you import the CSS file

function PaginationButtons({ setCurrentPage, currentPage, totalPages }) {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <div className="pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          showNextButton ? (
            <span className="pagination-btn">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="pagination-btn">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="pagination-list"
        pageClassName="pagination-item"
        pageLinkClassName="pagination-link"
        activeClassName="active"
      />
    </div>
  );
}

export default PaginationButtons;
