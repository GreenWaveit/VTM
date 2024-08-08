import React, { useState, ChangeEvent } from "react";
import styles from "./index.module.css"; // Import your styles

interface Faculty {
  number: number;
  name: string;
  subjects: string[];
}

const facultyData: Faculty[] = [
  { number: 1, name: "Dr. Smith", subjects: ["Math", "Science"] },
  { number: 2, name: "Prof. Johnson", subjects: ["English"] },
  { number: 3, name: "Ms. Davis", subjects: ["History", "Geography"] },
  { number: 4, name: "Mr. Brown", subjects: ["Math"] },
  { number: 5, name: "Dr. White", subjects: ["Biology", "Chemistry"] },
  { number: 6, name: "Prof. Black", subjects: ["Physics", "Math"] },
  { number: 7, name: "Ms. Green", subjects: ["English", "History"] },
  { number: 8, name: "Mr. Blue", subjects: ["Geography", "Math"] },
  { number: 9, name: "Dr. Gray", subjects: ["Science", "Biology"] },
  { number: 10, name: "Prof. Red", subjects: ["Chemistry", "Physics"] },
  { number: 11, name: "Prof. Black", subjects: ["Physics", "Math"] },
  { number: 12, name: "Ms. Green", subjects: ["English", "History"] },
  { number: 13, name: "Mr. Blue", subjects: ["Geography", "Math"] },
  { number: 14, name: "Dr. Gray", subjects: ["Science", "Biology"] },
];

const ListOfFaculty: React.FC = () => {
  const [facultySearchTerm, setFacultySearchTerm] = useState<string>("");
  const [subjectSearchTerm, setSubjectSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const handleFacultySearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFacultySearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleSubjectSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubjectSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredFaculty = facultyData.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(facultySearchTerm.toLowerCase()) &&
      faculty.subjects.some((subject) =>
        subject.toLowerCase().includes(subjectSearchTerm.toLowerCase())
      )
  );

  const totalItems = filteredFaculty.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedFaculty = filteredFaculty.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={facultySearchTerm}
          onChange={handleFacultySearchChange}
          placeholder="Search by faculty name"
          className={styles.searchInput}
        />
        <input
          type="text"
          value={subjectSearchTerm}
          onChange={handleSubjectSearchChange}
          placeholder="Search by subject"
          className={styles.searchInput}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Faculty Name</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {displayedFaculty.length === 0 ? (
            <tr>
              <td colSpan={3} className={styles.noDataMessage}>
                No data found
              </td>
            </tr>
          ) : (
            displayedFaculty.map((faculty) => (
              <tr key={faculty.number}>
                <td>{faculty.number}</td>
                <td>{faculty.name}</td>
                <td>{faculty.subjects.join(", ")}</td>
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

export default ListOfFaculty;
