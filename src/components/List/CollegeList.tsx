import React, { useState, ChangeEvent } from "react";
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
  { number: 10, name: "University College London (UCL)" },
  { number: 11, name: "University of Pennsylvania" },
  { number: 12, name: "University of California, Berkeley" },
  { number: 13, name: "Princeton University" },
  { number: 14, name: "University of California, Los Angeles (UCLA)" },
  { number: 15, name: "Yale University" },
  { number: 16, name: "University of Michigan, Ann Arbor" },
  { number: 17, name: "University of California, San Diego (UCSD)" },
  { number: 18, name: "University of Edinburgh" },
  { number: 19, name: "University of Toronto" },
  { number: 20, name: "University of California, Irvine (UCI)" },
  { number: 21, name: "University of Washington" },
  { number: 22, name: "University of Hong Kong (HKU)" },
  { number: 23, name: "University of Melbourne" },
  { number: 24, name: "University of Sydney" },
  { number: 25, name: "National University of Singapore (NUS)" },
];

const CollegeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredColleges = collegeData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredColleges.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedColleges = filteredColleges.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by college name"
          className={styles.searchInput}
        />
      </div>
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
