import React from 'react';
import "./Pagination.css";


export default function Pagination({handleDeleteSelectedUsers,handlePageChange, currentPage, totalPages }) {
  return (
    <div className="pagination">
        <button 
        onClick={()=>handleDeleteSelectedUsers()}>
            Delete Selected
        </button>
        <button 
        onClick={() => handlePageChange(1)}>
            First Page
        </button>
        <button 
        onClick={() => handlePageChange(currentPage - 1)}>
            prev
        </button>
{Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
<button onClick={() => handlePageChange(currentPage + 1)}>next</button>
<button onClick={() => handlePageChange(totalPages)}>Last Page</button>
    </div>
  )
}
