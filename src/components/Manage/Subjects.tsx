import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa"; // Import icons
import Pagination from "../UI/Pagination"; // Import Pagination component
import styles from "./index.module.css"; // Use the updated styles

const Subject: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field

  useEffect(() => {
    // Reset currentPage when itemsPerPage changes
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Update existing todo
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? inputValue : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, inputValue]);
      }
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus(); // Focus on input field
      }
    }
  };

  const handleEditTodo = (index: number) => {
    setEditIndex(index);
    setInputValue(todos[index]);
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on input field
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
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // Calculate the items to display based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, todos.length);
  const displayedTodos = todos.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Manage Subjects</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new subject"
          ref={inputRef} // Attach the ref to the input field
        />
        <button
          onClick={handleAddTodo}
          className={editIndex !== null ? "addButton" : "addButton"}
        >
          {editIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className={styles.todoList}>
        {displayedTodos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              {startIndex + index + 1}. {todo}
            </span>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleEditTodo(startIndex + index)}
                className="editButton"
              >
                <FaEdit /> {/* Edit icon */}
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(startIndex + index)}
                className="deleteButton"
              >
                <FaTrash /> {/* Delete icon */}
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        totalItems={todos.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default Subject;
