import React, { useState, useRef, KeyboardEvent } from "react";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa"; // Import icons
import styles from "./index.module.css"; // Use the updated styles

interface Todo {
  subject: string;
  chapter: string;
}

const subjects = ["Math", "Science", "English", "History"]; // Example subjects

const ManageChapters = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [filterSubject, setFilterSubject] = useState<string>(""); // State for filter
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Update existing todo
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex
            ? { subject: selectedSubject, chapter: inputValue }
            : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        // Check if the updated subject matches the filter, if not reset the filter
        if (
          filterSubject &&
          !updatedTodos.some((todo) => todo.subject === filterSubject)
        ) {
          setFilterSubject("");
        }
      } else {
        // Add new todo
        setTodos([...todos, { subject: selectedSubject, chapter: inputValue }]);
      }
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus(); // Focus on input field
      }
    }
  };

  const handleEditTodo = (index: number) => {
    const todo = filteredTodos[index]; // Get todo from filteredTodos
    setEditIndex(todos.indexOf(todo)); // Update editIndex to match the index in todos
    setInputValue(todo.chapter);
    setSelectedSubject(todo.subject); // Set selectedSubject correctly
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on input field
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    // Reset edit state if deleting the edited todo
    if (editIndex !== null && editIndex === index) {
      setEditIndex(null);
      setInputValue("");
    }
    // Reset filter if necessary
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

  // Filter todos based on the selected filterSubject
  const filteredTodos = filterSubject
    ? todos.filter((todo) => todo.subject === filterSubject)
    : todos;

  // Extract unique subjects from todos
  const uniqueSubjects = Array.from(new Set(todos.map((todo) => todo.subject)));

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
          ref={inputRef} // Attach the ref to the input field
        />
        <select
          id="subjects"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className={styles.select}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTodo}
          className={
            editIndex !== null ? styles.updateButton : styles.addButton
          }
        >
          {editIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
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
        {filteredTodos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              <span className={styles.chapter}>
                {index + 1}.{" "}
                <span className={styles.highlight}>{todo.subject}</span> -{" "}
                {todo.chapter}
              </span>
            </span>
            <div className={styles.buttonContainer}>
              {/* <span className={styles.highlight} style={{ marginRight: 20 }}>
                {todo.subject}
              </span> */}
              <button
                onClick={() => handleEditTodo(index)}
                className={styles.editButton}
              >
                <FaEdit /> {/* Edit icon */}
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(index)}
                className={styles.deleteButton}
              >
                <FaTrash /> {/* Delete icon */}
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageChapters;
