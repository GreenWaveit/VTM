import React, { useState, useRef, ChangeEvent } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons
import styles from "./index.module.css"; // Use your styles

interface Topic {
  subject: string;
  chapter: string;
  topic: string;
}

const subjects = ["Math", "Science", "English", "History"]; // Example subjects
const chapters: Record<string, string[]> = {
  Math: ["Algebra", "Geometry", "Calculus"],
  Science: ["Physics", "Chemistry", "Biology"],
  English: ["Literature", "Grammar", "Writing"],
  History: ["Ancient", "Medieval", "Modern"],
}; // Example chapters based on subjects

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
  const inputRef = useRef<HTMLInputElement>(null); // Reference for the input field

  const handleAddTopic = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Update existing topic
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
        setEditIndex(null); // Reset edit index
        setInputValue(""); // Clear input value
      } else {
        // Add new topic
        setTopics([
          ...topics,
          {
            subject: selectedSubject,
            chapter: selectedChapter,
            topic: inputValue,
          },
        ]);
        setInputValue(""); // Clear input value
      }
      if (inputRef.current) {
        inputRef.current.focus(); // Focus on input field
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
        inputRef.current.focus(); // Focus on input field
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
      // Reset edit state if deleting the edited topic
      if (editIndex !== null && editIndex === actualIndex) {
        setEditIndex(null);
        setInputValue("");
      }
      setFilterSubject(filterSubject); // Maintain current filters
      setFilterChapter(filterChapter);
    }
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSubject = e.target.value;
    setSelectedSubject(newSubject);
    setSelectedChapter(chapters[newSubject][0]); // Reset chapter to the first option
  };

  const handleFilterSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterSubject(e.target.value);
    setFilterChapter(""); // Reset chapter filter when subject changes
  };

  const handleFilterChapterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterChapter(e.target.value);
  };

  // Filter topics based on selected filterSubject and filterChapter
  const filteredTopics = topics.filter((topic) => {
    const subjectMatch = filterSubject ? topic.subject === filterSubject : true;
    const chapterMatch = filterChapter ? topic.chapter === filterChapter : true;
    return subjectMatch && chapterMatch;
  });

  // Determine unique subjects and chapters from the topics
  const uniqueSubjects = Array.from(
    new Set(topics.map((topic) => topic.subject))
  );
  const uniqueChapters = Array.from(
    new Set(topics.map((topic) => topic.chapter))
  );

  // Determine if filter options should be shown
  const showFilterOptions =
    uniqueSubjects.length > 1 || uniqueChapters.length > 1;

  // Reset filters if no data matches the current filters
  React.useEffect(() => {
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
          ref={inputRef} // Attach the ref to the input field
        />
        <select
          id="subjects"
          value={selectedSubject}
          onChange={handleSubjectChange}
          className={styles.select}
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
          className={styles.select}
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
      {/* Render filter options only if there are more than one unique subject or chapter */}
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
                <label htmlFor="filter">Filter by Chapter:</label>
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
          filteredTopics.map((topic, index) => (
            <li key={index} className={styles.todoItem}>
              <span>
                {index + 1}.{" "}
                <span className={styles.highlight}>{topic.subject}</span> -{" "}
                <span className={styles.highlight}>{topic.chapter}</span> :{" "}
                {topic.topic}
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditTopic(index)}
                  className={styles.editButton}
                >
                  <FaEdit /> {/* Edit icon */}
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTopic(index)}
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
    </div>
  );
};

export default ManageTopic;
