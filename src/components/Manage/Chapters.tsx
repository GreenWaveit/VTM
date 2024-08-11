import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa";
import Pagination from "../UI/Pagination"; // Import Pagination component
import styles from "./index.module.css";

interface Todo {
  subject: string;
  chapter: string;
}

const subjects = ["Math", "Science", "English", "History"]; // Example subjects

const ManageChapters: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset currentPage when itemsPerPage changes
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleAddTodo = () => {
    if (!selectedSubject) {
      setError("Please select a subject.");
      return;
    }
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex
            ? { subject: selectedSubject, chapter: inputValue }
            : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        if (
          filterSubject &&
          !updatedTodos.some((todo) => todo.subject === filterSubject)
        ) {
          setFilterSubject("");
        }
      } else {
        setTodos([...todos, { subject: selectedSubject, chapter: inputValue }]);
      }
      setInputValue("");
      setSelectedSubject("");
      setError(null);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEditTodo = (index: number) => {
    const todo = filteredTodos[index];
    setEditIndex(todos.indexOf(todo));
    setInputValue(todo.chapter);
    setSelectedSubject(todo.subject);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    // Adjust pagination if the last item on the current page is deleted
    const totalItems = updatedTodos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (editIndex !== null && editIndex === index) {
      setEditIndex(null);
      setInputValue("");
      setSelectedSubject("");
    }
    if (
      filterSubject &&
      !updatedTodos.some((todo) => todo.subject === filterSubject)
    ) {
      setFilterSubject("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = filterSubject
    ? todos.filter((todo) => todo.subject === filterSubject)
    : todos;

  const uniqueSubjects = Array.from(new Set(todos.map((todo) => todo.subject)));

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTodos.length);
  const displayedTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Manage Chapters</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new chapter"
          ref={inputRef}
        />
        <button
          onClick={handleAddTodo}
          className={editIndex !== null ? "updateButton" : "addButton"}
        >
          {editIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <select
        id="subjects"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className={styles.select}
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      {uniqueSubjects.length > 1 && (
        <div className={styles.filterContainer}>
          <div>
            <label htmlFor="filter">Filter by Subject:</label>
            <select
              id="filter"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All</option>
              {uniqueSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <ul className={styles.todoList}>
        {displayedTodos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              <span className={styles.chapter}>
                {startIndex + index + 1}.{" "}
                <span className={styles.highlight}>{todo.subject}</span> -{" "}
                {todo.chapter}
              </span>
            </span>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleEditTodo(startIndex + index)}
                className="editButton"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(startIndex + index)}
                className="deleteButton"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        totalItems={filteredTodos.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default ManageChapters;
