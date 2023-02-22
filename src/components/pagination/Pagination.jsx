import React from "react";
import ReactPaginate from "react-paginate";
import { Icon } from "../../images/icons";

import "./pagination.scss";

export default function Pagination({ currentPage, onChangePage, totalPages }) {
  return (
    <div className="pagination__container">
      <ReactPaginate
        nextLabel={<Icon id="arrowUp" className="next-page-label" />}
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        previousLabel={<Icon id="arrowUp" className="previous-page-label" />}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        breakLabel="..."
        breakClassName="break-page-item"
        breakLinkClassName="break-page-link"
        containerClassName="pagination__container"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-page-item"
        previousLinkClassName="previous-page-link"
        nextClassName="next-page-item"
        nextLinkClassName="next-page-link"
        activeClassName="active"
      />
    </div>
  );
}
