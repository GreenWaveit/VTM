import React, { useState, ChangeEvent } from "react";
import { Select, Button, Modal, Input } from "antd";
import styles from "./index.module.css"; // Import your styles
import { FaEdit, FaTrash } from "react-icons/fa";

const { Option } = Select;

interface College {
  id: string;
  name: string;
}

interface Assignment {
  facultyName: string;
  colleges: string[];
}

const colleges: College[] = [
  { id: "1", name: "Harvard" },
  { id: "2", name: "MIT" },
  { id: "3", name: "Stanford" },
  { id: "4", name: "Oxford" },
]; // Example colleges

const FacultyToCollegeMapping: React.FC = () => {
  const [facultyName, setFacultyName] = useState<string>("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalFacultyName, setModalFacultyName] = useState<string>("");
  const [modalSelectedColleges, setModalSelectedColleges] = useState<string[]>(
    []
  );

  const handleFacultyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFacultyName(e.target.value);
  };

  const handleCollegesChange = (values: string[]) => {
    setSelectedColleges(values);
  };

  const handleSubmit = () => {
    if (facultyName && selectedColleges.length > 0) {
      if (editingIndex !== null) {
        const updatedAssignments = [...assignments];
        updatedAssignments[editingIndex] = {
          facultyName,
          colleges: selectedColleges,
        };
        setAssignments(updatedAssignments);
        setEditingIndex(null);
      } else {
        setAssignments((prevAssignments) => [
          ...prevAssignments,
          { facultyName, colleges: selectedColleges },
        ]);
      }
      setFacultyName("");
      setSelectedColleges([]);
    }
  };

  const handleEditAssignment = (index: number) => {
    const assignment = assignments[index];
    setModalFacultyName(assignment.facultyName);
    setModalSelectedColleges(assignment.colleges);
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleDeleteAssignment = (index: number) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((_, i) => i !== index)
    );
  };

  const handleModalOk = () => {
    if (modalFacultyName && modalSelectedColleges.length > 0) {
      const updatedAssignments = [...assignments];
      updatedAssignments[editingIndex as number] = {
        facultyName: modalFacultyName,
        colleges: modalSelectedColleges,
      };
      setAssignments(updatedAssignments);
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
      <div className={styles.sectionHeader}>Faculty to College Mapping</div>
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
          placeholder="Please select colleges (Multiple)"
          value={selectedColleges}
          onChange={handleCollegesChange}
        >
          {colleges.map((college) => (
            <Option key={college.id} value={college.name}>
              {college.name}
            </Option>
          ))}
        </Select>
        <button onClick={handleSubmit} className={styles.addButton}>
          {editingIndex !== null ? "Update" : "Submit"}
        </button>
      </div>
      <ul className={styles.todoList}>
        {assignments.length === 0 ? (
          <div className={styles.noDataMessage}></div>
        ) : (
          assignments.map((assignment, index) => (
            <li key={index} className={styles.todoItem}>
              <span>
                {index + 1}. <span>{assignment.facultyName}</span> -{" "}
                <span className={styles.highlight}>
                  {assignment.colleges.join(", ")}
                </span>
              </span>
              <div className={styles.buttonContainer}>
                <button
                  onClick={() => handleEditAssignment(index)}
                  className={styles.editButton}
                >
                  <FaEdit /> {/* Edit icon */}
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(index)}
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
          placeholder="Please select colleges"
          value={modalSelectedColleges}
          onChange={(values) => setModalSelectedColleges(values)}
        >
          {colleges.map((college) => (
            <Option key={college.id} value={college.name}>
              {college.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default FacultyToCollegeMapping;
