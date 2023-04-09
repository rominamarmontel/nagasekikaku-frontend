import React from "react";
import './PagenateTopicDetails.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function PagenateTopicDetails({ currentPage, itemsPerPage, totalItems, onPageChange, currentTopics }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginate = (pageNumber, topics) => {
    if (!Array.isArray(topics)) {
      return [];
    }
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return topics.slice(startIndex, endIndex);
  };
  const renderedTopics = currentTopics ? paginate(currentPage, currentTopics) : [];

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="PagenateTopicDetails">
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

export default PagenateTopicDetails;