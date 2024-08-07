import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Select } from "antd";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";

const { Option } = Select;

interface SelfStudyMaterial {
  name: string;
  chapter: string;
  class: string;
  college: string;
  fileUrl: string;
  file: File | null;
}

const chapters = ["Algebra", "Geometry", "Calculus"]; // Example chapters
const colleges = ["College A", "College B", "College C"]; // Example colleges

const SelfStudy: React.FC = () => {
  const [materials, setMaterials] = useState<SelfStudyMaterial[]>([]);
  const [name, setName] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>(chapters[0]);
  const [selectedClass, setSelectedClass] = useState<string>("1 PU");
  const [selectedCollege, setSelectedCollege] = useState<string>(colleges[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewFileUrl, setViewFileUrl] = useState<string | null>(null);
  const [viewFileName, setViewFileName] = useState<string | null>(null);
  const [modalFileIndex, setModalFileIndex] = useState<number | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChapterChange = (value: string) => {
    setSelectedChapter(value);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
  };

  const handleCollegeChange = (value: string) => {
    setSelectedCollege(value);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setSelectedFile(acceptedFiles[0]);
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setSelectedFileUrl(fileUrl);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const handleSubmit = () => {
    if (
      name &&
      selectedChapter &&
      selectedClass &&
      selectedCollege &&
      selectedFile
    ) {
      const fileUrl = URL.createObjectURL(selectedFile);
      const newMaterial: SelfStudyMaterial = {
        name,
        chapter: selectedChapter,
        class: selectedClass,
        college: selectedCollege,
        fileUrl,
        file: selectedFile,
      };

      if (editIndex !== null) {
        const updatedMaterials = [...materials];
        URL.revokeObjectURL(updatedMaterials[editIndex].fileUrl); // Revoke the old URL to avoid memory leaks
        updatedMaterials[editIndex] = newMaterial;
        setMaterials(updatedMaterials);
        setEditIndex(null);
      } else {
        setMaterials([...materials, newMaterial]);
      }

      setName("");
      setSelectedChapter(chapters[0]);
      setSelectedClass("1 PU");
      setSelectedCollege(colleges[0]);
      setSelectedFile(null);
      setSelectedFileUrl(null);
    }
  };

  const handleEditMaterial = (index: number) => {
    const material = materials[index];
    setName(material.name);
    setSelectedChapter(material.chapter);
    setSelectedClass(material.class);
    setSelectedCollege(material.college);
    setSelectedFile(material.file);
    setSelectedFileUrl(material.fileUrl);
    setEditIndex(index);
  };

  const handleDeleteMaterial = (index: number) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    URL.revokeObjectURL(materials[index].fileUrl); // Revoke the URL to avoid memory leaks
    setMaterials(updatedMaterials);
  };

  const handleViewMaterial = (index: number) => {
    const material = materials[index];
    setViewFileUrl(material.fileUrl);
    setViewFileName(material.name);
    setModalFileIndex(index);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    setViewFileUrl(null);
    setViewFileName(null);
  };

  return (
    <div className="container">
      <div className={styles.sectionHeader}>Self Study</div>
      <div className={styles.inputContainerSelf}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
          className={styles.input}
        />
        <Select
          value={selectedChapter}
          onChange={handleChapterChange}
          className={styles.select}
          style={{ height: "100%" }}
        >
          {chapters.map((chapter) => (
            <Option key={chapter} value={chapter}>
              {chapter}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedClass}
          onChange={handleClassChange}
          className={styles.select}
          style={{ height: "100%" }}
        >
          <Option value="1 PU">1 PU</Option>
          <Option value="2 PU">2 PU</Option>
        </Select>
        <Select
          value={selectedCollege}
          onChange={handleCollegeChange}
          className={styles.select}
          style={{ height: "100%" }}
        >
          {colleges.map((college) => (
            <Option key={college} value={college}>
              {college}
            </Option>
          ))}
        </Select>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {selectedFile ? (
            <p>{selectedFile.name}</p>
          ) : (
            <p>Add study material</p>
          )}
        </div>
        <button onClick={handleSubmit} className={styles.addButton}>
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </div>

      <ul className={styles.todoList}>
        {materials.map((material, index) => (
          <li key={index} className={styles.todoItem}>
            <span>
              {index + 1}. <span>{material.name}</span> -{" "}
              <span className={styles.highlight}>{material.chapter}</span> -{" "}
              <span className={styles.highlight}>{material.class}</span> -{" "}
              <span className={styles.highlight}>{material.college}</span>
            </span>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleEditMaterial(index)}
                className={styles.editButton}
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteMaterial(index)}
                className={styles.deleteButton}
              >
                <FaTrash /> Delete
              </button>
              <a
                href={material.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.viewButton}>
                  <FaEye /> View
                </button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelfStudy;
