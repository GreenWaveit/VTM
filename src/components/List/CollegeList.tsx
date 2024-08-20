import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./index.module.css"; // Import your styles

interface College {
  number: number;
  name: string;
}

const collegeData: College[] = [
  { number: 1, name: "Harvard University" },
  { number: 2, name: "Massachusetts Institute of Technology (MIT)" },
  { number: 3, name: "Stanford University" },
  { number: 4, name: "University of Oxford" },
  { number: 5, name: "University of Cambridge" },
  { number: 6, name: "California Institute of Technology (Caltech)" },
  { number: 7, name: "University of Chicago" },
  { number: 8, name: "Imperial College London" },
  { number: 9, name: "ETH Zurich" },
];

const CollegeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Filter the entire dataset
  const filteredColleges = collegeData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredColleges.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Determine the range of colleges to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedColleges = filteredColleges.slice(startIndex, endIndex);

  useEffect(() => {
    // Reset to the first page when search term changes
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <div className="sectionHeader">List of Colleges</div>
      <div className={styles.filters}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by college name"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>Number</th>
              <th>College Name</th>
            </tr>
          </thead>
          <tbody>
            {displayedColleges.length === 0 ? (
              <tr>
                <td colSpan={2} className={styles.noDataMessage}>
                  No colleges found
                </td>
              </tr>
            ) : (
              displayedColleges.map((college) => (
                <tr key={college.number}>
                  <td data-label="Number">{college.number}</td>
                  <td data-label="College Name">{college.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalItems > itemsPerPage && (
        <div className={styles.paginationContainer}>
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={i + 1 === currentPage ? styles.activePage : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CollegeList;
