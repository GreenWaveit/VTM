import React, { useState } from "react";
import SearchableSingleSelect from "../UI/SearchAbleDropDown"; // Custom component for searchable single select
import MultiSelectDropDown from "../UI/MultiSelectDropDown"; // Custom component for multi-select dropdown
import styles from "./index.module.css"; // Import your styles
import { FaEdit, FaPlus, FaSyncAlt, FaTrash } from "react-icons/fa";
import Pagination from "../UI/Pagination"; // Import Pagination component

interface Option {
  id: string;
  name: string;
}

interface Assignment {
  facultyName: string;
  colleges: string[];
}

const colleges: Option[] = [
  { id: "1", name: "Harvard" },
  { id: "2", name: "MIT" },
  { id: "3", name: "Stanford" },
  { id: "4", name: "Oxford" },
]; // Example colleges

const facultyOptions: Option[] = [
  { id: "1", name: "Dr. Smith" },
  { id: "2", name: "Prof. Johnson" },
  { id: "3", name: "Ms. Davis" },
  { id: "4", name: "Mr. Brown" },
]; // Example faculty

const FacultyToCollegeMapping: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
  };

  const handleCollegesChange = (values: string[]) => {
    setSelectedColleges(values);
  };

  const handleSubmit = () => {
    if (selectedFaculty && selectedColleges.length > 0) {
      if (editingIndex !== null) {
        const updatedAssignments = [...assignments];
        updatedAssignments[editingIndex] = {
          facultyName: selectedFaculty,
          colleges: selectedColleges,
        };
        setAssignments(updatedAssignments);
        setEditingIndex(null);
      } else {
        setAssignments((prevAssignments) => [
          ...prevAssignments,
          { facultyName: selectedFaculty, colleges: selectedColleges },
        ]);
      }
      setSelectedFaculty("");
      setSelectedColleges([]);
    }
  };

  const handleEditAssignment = (index: number) => {
    const assignment = assignments[index];
    setSelectedFaculty(assignment.facultyName);
    setSelectedColleges(assignment.colleges);
    setEditingIndex(index);
  };

  const handleDeleteAssignment = (index: number) => {
    const actualIndex = index;
    setAssignments((prevAssignments) => {
      const newAssignments = prevAssignments.filter(
        (_, i) => i !== actualIndex
      );
      const totalPages = Math.ceil(newAssignments.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages); // Adjust current page if needed
      }
      return newAssignments;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredAssignments.length
  );
  const displayedAssignments = filteredAssignments.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Faculty to College Mapping</div>
      <div className={styles.inputContainer}>
        <SearchableSingleSelect
          options={facultyOptions}
          selectedValue={selectedFaculty}
          onChange={handleFacultyChange}
          placeholder="Select faculty"
        />
        <MultiSelectDropDown
          options={colleges}
          selectedValues={selectedColleges}
          onChange={handleCollegesChange}
          placeholder="Select colleges"
        />
        <button onClick={handleSubmit} className="addButton">
          {editingIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      {assignments.length > 2 && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search faculty"
          className={styles.searchBar}
        />
      )}
      <ul className={styles.todoList}>
        {filteredAssignments.length === 0 ? (
          searchTerm ? (
            <div className={styles.noDataMessage}>No data found</div>
          ) : null
        ) : (
          displayedAssignments.map((assignment, index) => (
            <li key={startIndex + index} className={styles.todoItem}>
              <span>
                {startIndex + index + 1}. <span>{assignment.facultyName}</span>{" "}
                -{" "}
                <span className={styles.highlight}>
                  {assignment.colleges.join(", ")}
                </span>
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditAssignment(startIndex + index)}
                  className="editButton"
                >
                  <FaEdit /> {/* Edit icon */}
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(startIndex + index)}
                  className="deleteButton"
                >
                  <FaTrash /> {/* Delete icon */}
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {filteredAssignments.length > itemsPerPage && (
        <Pagination
          totalItems={filteredAssignments.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default FacultyToCollegeMapping;
