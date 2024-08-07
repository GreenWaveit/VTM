import React, { useState, ChangeEvent } from "react";
import { Select, Button, Modal, Input } from "antd";
import styles from "./index.module.css"; // Import your styles
import { FaEdit, FaTrash } from "react-icons/fa";

const { Option } = Select;

interface Subject {
  id: string;
  name: string;
}

interface Mapping {
  facultyName: string;
  subjects: string[];
}

const subjects: Subject[] = [
  { id: "1", name: "Math" },
  { id: "2", name: "Science" },
  { id: "3", name: "English" },
  { id: "4", name: "History" },
]; // Example subjects

const FacultyToSubjectMapping: React.FC = () => {
  const [facultyName, setFacultyName] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalFacultyName, setModalFacultyName] = useState<string>("");
  const [modalSelectedSubjects, setModalSelectedSubjects] = useState<string[]>(
    []
  );

  const handleFacultyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFacultyName(e.target.value);
  };

  const handleSubjectsChange = (values: string[]) => {
    setSelectedSubjects(values);
  };

  const handleSubmit = () => {
    if (facultyName && selectedSubjects.length > 0) {
      if (editingIndex !== null) {
        const updatedMappings = [...mappings];
        updatedMappings[editingIndex] = {
          facultyName,
          subjects: selectedSubjects,
        };
        setMappings(updatedMappings);
        setEditingIndex(null);
      } else {
        setMappings((prevMappings) => [
          ...prevMappings,
          { facultyName, subjects: selectedSubjects },
        ]);
      }
      setFacultyName("");
      setSelectedSubjects([]);
    }
  };

  const handleEditMapping = (index: number) => {
    const mapping = mappings[index];
    setModalFacultyName(mapping.facultyName);
    setModalSelectedSubjects(mapping.subjects);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleDeleteMapping = (index: number) => {
    setMappings((prevMappings) => prevMappings.filter((_, i) => i !== index));
  };

  const handleModalOk = () => {
    if (modalFacultyName && modalSelectedSubjects.length > 0) {
      const updatedMappings = [...mappings];
      updatedMappings[editingIndex as number] = {
        facultyName: modalFacultyName,
        subjects: modalSelectedSubjects,
      };
      setMappings(updatedMappings);
      setIsModalVisible(false);
      setEditingIndex(null);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingIndex(null);
  };

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Faculty to Subject Mapping</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={facultyName}
          onChange={handleFacultyNameChange}
          placeholder="Enter faculty name"
        />
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select subject (Multiple)"
          value={selectedSubjects}
          onChange={handleSubjectsChange}
        >
          {subjects.map((subject) => (
            <Option key={subject.id} value={subject.name}>
              {subject.name}
            </Option>
          ))}
        </Select>
        <button onClick={handleSubmit} className={styles.addButton}>
          {editingIndex !== null ? "Update" : "Submit"}
        </button>
      </div>
      <ul className={styles.todoList}>
        {mappings.length === 0 ? (
          <div className={styles.noDataMessage}></div>
        ) : (
          mappings.map((mapping, index) => (
            <li key={index} className={styles.todoItem}>
              <span>
                {index + 1}. <span>{mapping.facultyName}</span> -{" "}
                <span className={styles.highlight}>
                  {mapping.subjects.join(", ")}
                </span>
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditMapping(index)}
                  className={styles.editButton}
                >
                  <FaEdit /> {/* Edit icon */}
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMapping(index)}
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

      <Modal
        title="Edit Mapping"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          value={modalFacultyName}
          onChange={(e) => setModalFacultyName(e.target.value)}
          placeholder="Enter faculty name"
        />
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Please select"
          value={modalSelectedSubjects}
          onChange={(values) => setModalSelectedSubjects(values)}
        >
          {subjects.map((subject) => (
            <Option key={subject.id} value={subject.name}>
              {subject.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default FacultyToSubjectMapping;
