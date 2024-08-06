import React, { useState, useRef, KeyboardEvent } from "react";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt } from "react-icons/fa"; // Import icons
import styles from "./index.module.css"; // Use the updated styles

const Subject = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field

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
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

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
          className={editIndex !== null ? styles.addButton : styles.addButton}
        >
          {editIndex !== null ? <FaSyncAlt /> : <FaPlus />}
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className={styles.todoList}>
        {todos.map((todo, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              {index + 1}. {todo}
            </span>
            <div className={styles.buttonContainer}>
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

export default Subject;
