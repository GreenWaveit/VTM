import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Pagination from "../UI/Pagination";
import styles from "./index.module.css";

interface Topic {
  subject: string;
  chapter: string;
  topic: string;
}

const subjects = ["Math", "Science", "English", "History"];
const chapters: Record<string, string[]> = {
  Math: ["Algebra", "Geometry", "Calculus"],
  Science: ["Physics", "Chemistry", "Biology"],
  English: ["Literature", "Grammar", "Writing"],
  History: ["Ancient", "Medieval", "Modern"],
};

const ManageTopic: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);
  const [selectedChapter, setSelectedChapter] = useState<string>(
    chapters[subjects[0]][0]
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [filterChapter, setFilterChapter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, filterSubject, filterChapter]);

  const handleAddTopic = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedTopics = topics.map((topic, index) =>
          index === editIndex
            ? {
                subject: selectedSubject,
                chapter: selectedChapter,
                topic: inputValue,
              }
            : topic
        );
        setTopics(updatedTopics);
        setEditIndex(null);
        setInputValue("");
      } else {
        setTopics([
          ...topics,
          {
            subject: selectedSubject,
            chapter: selectedChapter,
            topic: inputValue,
          },
        ]);
        setInputValue("");
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEditTopic = (index: number) => {
    const actualIndex = filteredTopics[index]
      ? topics.indexOf(filteredTopics[index])
      : -1;
    if (actualIndex !== -1) {
      setEditIndex(actualIndex);
      setInputValue(filteredTopics[index].topic);
      setSelectedSubject(filteredTopics[index].subject);
      setSelectedChapter(filteredTopics[index].chapter);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleDeleteTopic = (index: number) => {
    const actualIndex = filteredTopics[index]
      ? topics.indexOf(filteredTopics[index])
      : -1;
    if (actualIndex !== -1) {
      const updatedTopics = topics.filter((_, i) => i !== actualIndex);
      setTopics(updatedTopics);

      // If the current page becomes empty after deletion, go back one page
      const maxPage = Math.ceil(updatedTopics.length / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      }

      if (editIndex !== null && editIndex === actualIndex) {
        setEditIndex(null);
        setInputValue("");
      }
    }
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSubject = e.target.value;
    setSelectedSubject(newSubject);
    setSelectedChapter(chapters[newSubject][0]);
  };

  const handleFilterSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterSubject(e.target.value);
    setFilterChapter("");
  };

  const handleFilterChapterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterChapter(e.target.value);
  };

  const filteredTopics = topics.filter((topic) => {
    const subjectMatch = filterSubject ? topic.subject === filterSubject : true;
    const chapterMatch = filterChapter ? topic.chapter === filterChapter : true;
    return subjectMatch && chapterMatch;
  });

  const uniqueSubjects = Array.from(
    new Set(topics.map((topic) => topic.subject))
  );
  const uniqueChapters = Array.from(
    new Set(topics.map((topic) => topic.chapter))
  );

  const showFilterOptions =
    uniqueSubjects.length > 1 || uniqueChapters.length > 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTopics.length);
  const displayedTopics = filteredTopics.slice(startIndex, endIndex);

  useEffect(() => {
    if (filteredTopics.length === 0 && (filterSubject || filterChapter)) {
      setFilterSubject("");
      setFilterChapter("");
    }
  }, [filteredTopics.length, filterSubject, filterChapter]);

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Manage Topics</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new topic"
          ref={inputRef}
        />
        <select
          id="subjects"
          value={selectedSubject}
          onChange={handleSubjectChange}
          className={styles.selectTopics}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <select
          id="chapters"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className={styles.selectTopics}
        >
          {chapters[selectedSubject].map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTopic}
          className={
            editIndex !== null ? styles.updateButton : styles.addButton
          }
        >
          {editIndex !== null ? <FaEdit /> : <FaPlus />}
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      {showFilterOptions && (
        <div className={styles.filterContainer}>
          <div className={styles.firstContainer}>
            {uniqueSubjects.length > 1 && (
              <>
                <label htmlFor="filter">Filter by Subject:</label>
                <select
                  id="filter"
                  value={filterSubject}
                  onChange={handleFilterSubjectChange}
                  className={styles.filterSelect}
                >
                  <option value="">All</option>
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div>
            {uniqueChapters.length > 1 && (
              <>
                <label htmlFor="filter" className="chapterContainer">
                  Filter by Chapter:
                </label>
                <select
                  id="filter"
                  value={filterChapter}
                  onChange={handleFilterChapterChange}
                  className={styles.filterSelect}
                >
                  <option value="">All</option>
                  {(filterSubject
                    ? chapters[filterSubject]
                    : uniqueChapters
                  ).map((chapter) => (
                    <option key={chapter} value={chapter}>
                      {chapter}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      )}

      <ul className={styles.todoList}>
        {filteredTopics.length === 0 && (filterSubject || filterChapter) ? (
          <div className={styles.noDataMessage}>No data found</div>
        ) : (
          displayedTopics.map((topic, index) => (
            <li key={index} className={styles.todoItem}>
              <span>
                {startIndex + index + 1}.{" "}
                <span className={styles.highlight}>{topic.subject}</span> -{" "}
                <span className={styles.highlight}>{topic.chapter}</span> :{" "}
                {topic.topic}
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditTopic(index)}
                  className={styles.editButton}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteTopic(index)}
                  className={styles.deleteButton}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <Pagination
        totalItems={filteredTopics.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default ManageTopic;
