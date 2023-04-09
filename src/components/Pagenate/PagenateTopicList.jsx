import React from "react";
import './PagenateTopicList.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function PagenateTopicList({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const goToPreviousPage = () => {
    onPageChange(currentPage - 1);
  }
  const goToNextPage = () => {
    onPageChange(currentPage + 1);
  }
  return (
    <div className="PagenateTopicList">
      {currentPage !== 1 && (
        <>
          <button onClick={goToPreviousPage} className="previousPage-button">
            <FaChevronLeft className="chevronLeft-icon" />  前のページへ
          </button>
        </>
      )}
      {currentPage !== 1 && currentPage !== totalPages && <span> | </span>}
      {currentPage !== totalPages && (
        <>
          <button onClick={goToNextPage} className="nextPage-button">
            次のページへ <FaChevronRight className="chevronRight-icon" />
          </button>
        </>
      )}
    </div>
  );
}

export default PagenateTopicList;