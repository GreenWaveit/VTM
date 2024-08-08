import React, { useState, useEffect } from "react";
import SearchableSingleSelect from "../UI/SearchAbleDropDown"; // Import the custom dropdown component
import styles from "./index.module.css"; // Import your styles
import { FaEdit, FaPlus, FaSyncAlt, FaTrash } from "react-icons/fa";
import MultiSelectDropDown from "../UI/MultiSelectDropDown";
import Pagination from "../UI/Pagination"; // Import Pagination component

interface Option {
  id: string;
  name: string;
}

interface Mapping {
  facultyName: string;
  subjects: string[];
}

const subjects: Option[] = [
  { id: "1", name: "Math" },
  { id: "2", name: "Science" },
  { id: "3", name: "English" },
  { id: "4", name: "History" },
]; // Example subjects

const facultyOptions: Option[] = [
  { id: "1", name: "Dr. Smith" },
  { id: "2", name: "Prof. Johnson" },
  { id: "3", name: "Ms. Davis" },
  { id: "4", name: "Mr. Brown" },
]; // Example faculty

const FacultyToSubjectMapping: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value);
  };

  const handleSubjectsChange = (values: string[]) => {
    setSelectedSubjects(values);
  };

  const handleSubmit = () => {
    if (selectedFaculty && selectedSubjects.length > 0) {
      if (editingIndex !== null) {
        const updatedMappings = [...mappings];
        updatedMappings[editingIndex] = {
          facultyName: selectedFaculty,
          subjects: selectedSubjects,
        };
        setMappings(updatedMappings);
        setEditingIndex(null);
      } else {
        setMappings((prevMappings) => [
          ...prevMappings,
          {
            facultyName: selectedFaculty,
            subjects: selectedSubjects,
          },
        ]);
      }
      setSelectedFaculty("");
      setSelectedSubjects([]);
    }
  };

  const handleEditMapping = (index: number) => {
    const mapping = mappings[index];
    setSelectedFaculty(mapping.facultyName);
    setSelectedSubjects(mapping.subjects);
    setEditingIndex(index);
  };

  const handleDeleteMapping = (index: number) => {
    const actualIndex = index;
    const updatedMappings = mappings.filter((_, i) => i !== actualIndex);
    setMappings(updatedMappings);

    // Pagination adjustment
    const maxPage = Math.ceil(updatedMappings.length / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearchPerformed(true); // Set search performed to true on input change
  };

  const filteredMappings = mappings.filter((mapping) =>
    mapping.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredMappings.length);
  const displayedMappings = filteredMappings.slice(startIndex, endIndex);

  useEffect(() => {
    if (filteredMappings.length === 0 && isSearchPerformed) {
      setSearchTerm("");
    }
  }, [filteredMappings.length, isSearchPerformed]);

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Faculty to Subject Mapping</div>
      <div className={styles.inputContainer}>
        <SearchableSingleSelect
          options={facultyOptions}
          selectedValue={selectedFaculty}
          onChange={handleFacultyChange}
          placeholder="Select faculty"
        />
        <MultiSelectDropDown
          options={subjects}
          selectedValues={selectedSubjects}
          onChange={handleSubjectsChange}
          placeholder="Select subjects"
        />
        <button onClick={handleSubmit} className={styles.addButton}>
          {editingIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      {mappings.length > 2 && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search faculty"
          className={styles.searchBar}
        />
      )}
      <ul className={styles.todoList}>
        {filteredMappings.length === 0 && isSearchPerformed ? (
          <div className={styles.noDataMessage}>No data found</div>
        ) : (
          displayedMappings.map((mapping, index) => (
            <li key={startIndex + index} className={styles.todoItem}>
              <span>
                {startIndex + index + 1}. <span>{mapping.facultyName}</span> -{" "}
                <span className={styles.highlight}>
                  {mapping.subjects.join(", ")}
                </span>
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditMapping(startIndex + index)}
                  className={styles.editButton}
                >
                  <FaEdit /> {/* Edit icon */}
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMapping(startIndex + index)}
                  className={styles.deleteButton}
                >
                  <FaTrash /> {/* Delete icon */}
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      {filteredMappings.length > itemsPerPage && (
        <Pagination
          totalItems={filteredMappings.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default FacultyToSubjectMapping;
