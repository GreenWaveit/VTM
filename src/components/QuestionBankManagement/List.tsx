import React, { useState, useCallback } from "react";
import SearchableSingleSelect from "../UI/SearchAbleDropDown";
import MultiSelectDropDown from "../UI/MultiSelectDropDown";
import styles from "../../styles/index.module.css";
import questionsData from "../../utils/QuestionsList.json";

interface Option {
  id: string;
  name: string;
}

interface Question {
  id: string;
  subject: string;
  chapter: string[];
  topic: string[];
  class: string;
  academicYear: string;
  question: string;
  options: string[];
  correctOption: string; // Ensure this matches your data field
}

const subjects: Option[] = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Physics" },
];

const chaptersData: { [subjectName: string]: Option[] } = {
  Mathematics: [
    { id: "1", name: "Algebra" },
    { id: "2", name: "Calculus" },
  ],
  Physics: [
    { id: "3", name: "Mechanics" },
    { id: "4", name: "Optics" },
  ],
};

const topicsData: { [chapterName: string]: Option[] } = {
  Algebra: [
    { id: "1", name: "Linear Equations" },
    { id: "2", name: "Quadratic Equations" },
  ],
  Calculus: [
    { id: "3", name: "Derivatives" },
    { id: "4", name: "Integrals" },
  ],
  Mechanics: [
    { id: "5", name: "Newton's Laws" },
    { id: "6", name: "Kinematics" },
  ],
  Optics: [
    { id: "7", name: "Refraction" },
    { id: "8", name: "Reflection" },
  ],
};

const classes: Option[] = [
  { id: "1", name: "Class 10" },
  { id: "2", name: "Class 11" },
];

const academicYears: Option[] = [
  { id: "1", name: "2024-2025" },
  { id: "2", name: "2023-2024" },
];

const transformQuestionsData = (data: any[]): Question[] => {
  return data.map((item) => ({
    id: item.id,
    subject: item.subject,
    chapter: item.chapter,
    topic: item.topic,
    class: item.class,
    academicYear: item.academicYear,
    question: item.question,
    options: item.options,
    correctOption: item.correctOption, // Ensure this matches your data
  }));
};

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(
    transformQuestionsData(questionsData)
  );
  const [filters, setFilters] = useState({
    subject: "",
    chapter: [] as string[],
    topic: [] as string[],
    class: "",
    academicYear: "",
    question: "", // Added filter for question
  });

  const [editingId, setEditingId] = useState<string | null>(null);

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

  const filteredQuestions = questions.filter((question) => {
    const isSubjectMatch =
      !filters.subject || question.subject === filters.subject;
    const isChapterMatch =
      !filters.chapter.length ||
      filters.chapter.some((ch) => question.chapter.includes(ch));
    const isTopicMatch =
      !filters.topic.length ||
      filters.topic.some((tp) => question.topic.includes(tp));
    const isClassMatch = !filters.class || question.class === filters.class;
    const isAcademicYearMatch =
      !filters.academicYear || question.academicYear === filters.academicYear;
    const isQuestionMatch =
      !filters.question ||
      question.question.toLowerCase().includes(filters.question.toLowerCase());

    return (
      isSubjectMatch &&
      isChapterMatch &&
      isTopicMatch &&
      isClassMatch &&
      isAcademicYearMatch &&
      isQuestionMatch
    );
  });

  const handleEditClick = (id: string) => {
    setEditingId(id);
  };

  const handleSaveClick = (id: string, updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? updatedQuestion : question
      )
    );
    setEditingId(null);
  };

  const handleDeleteClick = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleOptionChange = (
    questionId: string,
    optionIndex: number,
    newValue: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === optionIndex ? newValue : option
              ),
            }
          : question
      )
    );
  };

  const handleCorrectOptionChange = (
    questionId: string,
    correctOption: string
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, correctOption } : question
      )
    );
  };

  return (
    <div className="container">
      <div className="sectionHeader">List of Questions</div>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filter by Subject</label>
          <SearchableSingleSelect
            options={subjects}
            selectedValue={filters.subject}
            onChange={(value) => handleFilterChange("subject", value)}
            placeholder="Select subject"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Chapter</label>
          <MultiSelectDropDown
            options={chaptersData[filters.subject] || []}
            selectedValues={filters.chapter}
            onChange={(value) => handleFilterChange("chapter", value)}
            placeholder="Select chapters"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Topic</label>
          <MultiSelectDropDown
            options={filters.chapter.flatMap((ch) => topicsData[ch] || [])}
            selectedValues={filters.topic}
            onChange={(value) => handleFilterChange("topic", value)}
            placeholder="Select topics"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Class</label>
          <SearchableSingleSelect
            options={classes}
            selectedValue={filters.class}
            onChange={(value) => handleFilterChange("class", value)}
            placeholder="Select class"
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Academic Year</label>
          <SearchableSingleSelect
            options={academicYears}
            selectedValue={filters.academicYear}
            onChange={(value) => handleFilterChange("academicYear", value)}
            placeholder="Select academic year"
          />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label>Filter by Question</label>
        <input
          type="text"
          value={filters.question}
          onChange={(e) => handleFilterChange("question", e.target.value)}
          placeholder="Search question text"
        />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.questionsTable}>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Question</th>
              <th>Subject</th>
              <th>Chapter</th>
              <th>Topic</th>
              <th>Class</th>
              <th>Academic Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td>
                  {editingId === question.id ? (
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        setQuestions((prevQuestions) =>
                          prevQuestions.map((q) =>
                            q.id === question.id
                              ? { ...q, question: e.target.value }
                              : q
                          )
                        )
                      }
                    />
                  ) : (
                    question.question
                  )}
                  <div className={styles.optionContainer}>
                    {question.options.map((option, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          name={`correctOption-${question.id}`}
                          checked={question.correctOption === option}
                          onChange={() =>
                            handleCorrectOptionChange(question.id, option)
                          }
                        />
                        {editingId === question.id ? (
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                question.id,
                                index,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          option
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{question.subject}</td>
                <td>{question.chapter.join(", ")}</td>
                <td>{question.topic.join(", ")}</td>
                <td>{question.class}</td>
                <td>{question.academicYear}</td>
                <td>
                  {editingId === question.id ? (
                    <button
                      onClick={() => handleSaveClick(question.id, question)}
                      className="editButton"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(question.id)}
                      className="editButton"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(question.id)}
                    className="deleteButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionsList;
