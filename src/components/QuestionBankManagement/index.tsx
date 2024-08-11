import React, { useState, useEffect, useCallback } from "react";
import SearchableSingleSelect from "../UI/SearchAbleDropDown";
import styles from "../../styles/index.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Option {
  id: string;
  name: string;
}

interface Question {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  class: string;
  academicYear: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
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

const QuestionBankManagement: React.FC = () => {
  const [formData, setFormData] = useState<Question>({
    id: "",
    subject: "",
    chapter: "",
    topic: "",
    class: "",
    academicYear: "",
    question: "",
    answers: ["", "", "", ""],
    correctAnswerIndex: -1,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Option[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Option[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // Handle subject change
  useEffect(() => {
    if (formData.subject) {
      setFilteredChapters(chaptersData[formData.subject] || []);
      if (!isEdit) {
        // Reset chapter and topic only when not in edit mode
        setFormData((prevData) => ({
          ...prevData,
          chapter: "",
          topic: "",
        }));
      }
    }
  }, [formData.subject, isEdit]);

  // Handle chapter change
  useEffect(() => {
    if (formData.chapter) {
      setFilteredTopics(topicsData[formData.chapter] || []);
      if (!isEdit) {
        // Reset topic only when not in edit mode
        setFormData((prevData) => ({
          ...prevData,
          topic: "",
        }));
      }
    }
  }, [formData.chapter, isEdit]);

  const handleInputChange = useCallback(
    (field: keyof Question, value: string) => {
      setFormData((prevData) => {
        const newFormData = {
          ...prevData,
          [field]: value,
        };
        if (field === "subject") {
          return {
            ...newFormData,
            chapter: "", // Reset chapter
            topic: "", // Reset topic
          };
        }
        if (field === "chapter") {
          return {
            ...newFormData,
            topic: "", // Reset topic
          };
        }

        // Return updated form data for other fields
        return newFormData;
      });
    },
    []
  );

  const handleAnswerChange = useCallback(
    (index: number, value: string) => {
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        answers: newAnswers,
      }));
    },
    [formData.answers]
  );

  const handleCorrectAnswerChange = useCallback((index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      correctAnswerIndex: index,
    }));
  }, []);

  const handleAddQuestion = useCallback(() => {
    const newQuestion = { ...formData, id: new Date().toISOString() };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    resetForm();
  }, [formData]);

  const handleUpdateQuestion = useCallback(() => {
    console.log("Updating question with id:", formData.id); // Debug log
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === formData.id ? { ...formData } : q))
    );
    resetForm();
  }, [formData]);

  const handleEditQuestion = useCallback(
    (id: string) => {
      const questionToEdit = questions.find((q) => q.id === id);
      if (questionToEdit) {
        setFormData(questionToEdit);
        setIsEdit(true);
        // Ensure correct chapter and topic filtering
        setFilteredChapters(chaptersData[questionToEdit.subject] || []);
        setFilteredTopics(topicsData[questionToEdit.chapter] || []);
      }
    },
    [questions]
  );

  const handleDeleteQuestion = useCallback((id: string) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      id: "",
      subject: "",
      chapter: "",
      topic: "",
      class: "",
      academicYear: "",
      question: "",
      answers: ["", "", "", ""],
      correctAnswerIndex: -1,
    });
    setFilteredChapters([]);
    setFilteredTopics([]);
    setIsEdit(false);
  }, []);

  const isFormValid = () => {
    return (
      formData.subject &&
      formData.chapter &&
      formData.topic &&
      formData.class &&
      formData.academicYear &&
      formData.question &&
      formData.correctAnswerIndex !== -1
    );
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.sectionHeader}>Question Bank Management</div>
      <div className={styles.searchLayout}>
        <SearchableSingleSelect
          options={subjects}
          selectedValue={formData.subject}
          onChange={(value) => handleInputChange("subject", value)}
          placeholder="Select subject"
        />
        <SearchableSingleSelect
          options={filteredChapters}
          selectedValue={formData.chapter}
          onChange={(value) => handleInputChange("chapter", value)}
          placeholder="Select chapter"
        />
        <SearchableSingleSelect
          options={filteredTopics}
          selectedValue={formData.topic}
          onChange={(value) => handleInputChange("topic", value)}
          placeholder="Select topic"
        />
        <SearchableSingleSelect
          options={classes}
          selectedValue={formData.class}
          onChange={(value) => handleInputChange("class", value)}
          placeholder="Select class"
        />
        <SearchableSingleSelect
          options={academicYears}
          selectedValue={formData.academicYear}
          onChange={(value) => handleInputChange("academicYear", value)}
          placeholder="Select academic year"
        />
      </div>
      <textarea
        value={formData.question}
        onChange={(e) => handleInputChange("question", e.target.value)}
        placeholder="Enter the question"
        className={styles.questionInput}
      />
      <div className={styles.answerContainer}>
        {formData.answers.map((answer, index) => (
          <div key={index} className={styles.answerRow}>
            <input
              type="radio"
              checked={formData.correctAnswerIndex === index}
              onChange={() => handleCorrectAnswerChange(index)}
              className={styles.correctAnswerCheckbox}
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Answer ${index + 1}`}
              className={styles.answerInput}
            />
          </div>
        ))}
        <button
          onClick={isEdit ? handleUpdateQuestion : handleAddQuestion}
          className="addButton"
          disabled={!isFormValid()} // Disable if form is not valid
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
      <div className={styles.questionsList}>
        {questions.map((question, id) => (
          <div key={question.id} className={styles.questionItem}>
            <div className={styles.questionContainer}>
              <div className={styles.questionText}>
                <strong>
                  Subject: {question.subject} | Chapter: {question.chapter} |
                  Topic: {question.topic}
                </strong>
                <br />
                <strong>
                  Class: {question.class} | Academic Year:{" "}
                  {question.academicYear}
                </strong>
                <div className={styles.question}>
                  Question {id + 1}: {question.question}
                </div>
              </div>
              <div className={styles.answerContainer}>
                {question.answers.map((answer, index) => (
                  <div key={index} className={styles.answerRow}>
                    <input
                      type="radio"
                      checked={question.correctAnswerIndex === index}
                      readOnly
                      className={styles.correctAnswerCheckbox}
                    />
                    <span>{answer}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => handleEditQuestion(question.id)}
                className="editButton"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteQuestion(question.id)}
                className="deleteButton"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBankManagement;
