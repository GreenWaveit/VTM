import React, { useState, useCallback, useMemo } from "react";
import SearchableSingleSelect from "../UI/SearchAbleDropDown";
import MultiSelectDropDown from "../UI/MultiSelectDropDown";
import styles from "../../styles/index.module.css";

interface Question {
  id: string;
  college: string;
  class: string;
  subject: string;
  chapter: string[];
  topic: string[];
  question: string;
}

const questionsData: Question[] = [
  {
    id: "1",
    college: "College A",
    class: "Class 10",
    subject: "Mathematics",
    chapter: ["Algebra"],
    topic: ["Linear Equations"],
    question: "Assessment 1",
  },
  {
    id: "2",
    college: "College B",
    class: "Class 11",
    subject: "Physics",
    chapter: ["Mechanics"],
    topic: ["Newton's Laws"],
    question: "Assessment 2",
  },
];

const AssignTest: React.FC = () => {
  const [filters, setFilters] = useState({
    college: "",
    class: "",
    subject: "",
    chapter: [] as string[],
    topic: [] as string[],
  });

  // Generate dropdown options dynamically from JSON data
  const uniqueColleges = useMemo(
    () => Array.from(new Set(questionsData.map((q) => q.college))),
    []
  );
  const uniqueClasses = useMemo(
    () => Array.from(new Set(questionsData.map((q) => q.class))),
    []
  );
  const uniqueSubjects = useMemo(
    () => Array.from(new Set(questionsData.map((q) => q.subject))),
    []
  );

  const uniqueChapters = useMemo(() => {
    const chaptersSet = new Set<string>();
    questionsData
      .filter((q) => q.subject === filters.subject)
      .forEach((q) => q.chapter.forEach((ch) => chaptersSet.add(ch)));
    return Array.from(chaptersSet);
  }, [filters.subject]);

  const uniqueTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    questionsData
      .filter((q) =>
        filters.chapter.length
          ? filters.chapter.some((ch) => q.chapter.includes(ch))
          : true
      )
      .forEach((q) => q.topic.forEach((tp) => topicsSet.add(tp)));
    return Array.from(topicsSet);
  }, [filters.chapter]);

  const handleFilterChange = useCallback(
    (field: keyof typeof filters, value: any) => {
      setFilters((prevFilters) => {
        let newFilters = { ...prevFilters, [field]: value };

        if (field === "subject") {
          newFilters.chapter = [];
          newFilters.topic = [];
        } else if (field === "chapter") {
          newFilters.topic = [];
        }

        return newFilters;
      });
    },
    []
  );

  const filteredQuestions = questionsData.filter((question) => {
    return (
      (!filters.college || question.college === filters.college) &&
      (!filters.class || question.class === filters.class) &&
      (!filters.subject || question.subject === filters.subject) &&
      (!filters.chapter.length ||
        filters.chapter.every((ch) => question.chapter.includes(ch))) &&
      (!filters.topic.length ||
        filters.topic.every((tp) => question.topic.includes(tp)))
    );
  });

  return (
    <div className="container">
      <div className="sectionHeader">Assign Test</div>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filter by College</label>
          <SearchableSingleSelect
            options={uniqueColleges.map((college) => ({
              id: college,
              name: college,
            }))}
            selectedValue={filters.college}
            onChange={(value) => handleFilterChange("college", value)}
            placeholder="Select college"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Class</label>
          <SearchableSingleSelect
            options={uniqueClasses.map((cls) => ({ id: cls, name: cls }))}
            selectedValue={filters.class}
            onChange={(value) => handleFilterChange("class", value)}
            placeholder="Select class"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Subject</label>
          <SearchableSingleSelect
            options={uniqueSubjects.map((sub) => ({ id: sub, name: sub }))}
            selectedValue={filters.subject}
            onChange={(value) => handleFilterChange("subject", value)}
            placeholder="Select subject"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Chapter</label>
          <MultiSelectDropDown
            options={uniqueChapters.map((ch) => ({ id: ch, name: ch }))}
            selectedValues={filters.chapter}
            onChange={(value) => handleFilterChange("chapter", value)}
            placeholder="Select chapters"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Topic</label>
          <MultiSelectDropDown
            options={uniqueTopics.map((tp) => ({ id: tp, name: tp }))}
            selectedValues={filters.topic}
            onChange={(value) => handleFilterChange("topic", value)}
            placeholder="Select topics"
          />
        </div>
      </div>

      <div className={styles.questionList}>
        <h3 style={{ marginBottom: 8 }}>Filtered Questions</h3>
        {filteredQuestions.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Test title</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question) => (
                <tr key={question.id}>
                  <td>{question.question}</td>
                  <td>{question.class}</td>
                  <td>
                    <button className="addButton">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            {filters.college ||
            filters.class ||
            filters.subject ||
            filters.chapter.length ||
            filters.topic.length
              ? "No data found."
              : "Filter to assign a test."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignTest;
