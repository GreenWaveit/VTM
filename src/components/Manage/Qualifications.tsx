import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa";
import Pagination from "../UI/Pagination"; // Import Pagination component
import styles from "./index.module.css";

const Qualification: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset currentPage when itemsPerPage changes
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? inputValue : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, inputValue]);
      }
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEditTodo = (index: number) => {
    setEditIndex(index);
    setInputValue(todos[index]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const totalItems = todos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedTodos = todos.slice(startIndex, endIndex);

  // Handle the case where the last item on the last page is deleted
  useEffect(() => {
    if (todos.length > 0 && startIndex >= todos.length) {
      setCurrentPage(currentPage - 1);
    }
  }, [todos.length, startIndex, currentPage]);
  // This useEffect is added to handle pagination adjustment when the last item on the last page is deleted

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Manage Qualification</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new qualification"
          ref={inputRef}
        />
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
      <ul className={styles.todoList}>
        {displayedTodos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              {startIndex + index + 1}. {todo}
            </span>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleEditTodo(startIndex + index)}
                className={styles.editButton}
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(startIndex + index)}
                className={styles.deleteButton}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length > itemsPerPage && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
      {/* This condition ensures Pagination is only rendered when necessary */}
    </div>
  );
};

export default Qualification;
