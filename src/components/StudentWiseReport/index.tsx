import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./index.module.css"; // Import CSS module
import SearchableSingleSelect from "../UI/SearchAbleDropDown"; // Import your dropdown component
import { useParams } from "react-router-dom";

// Register the required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Chapter {
  name: string;
  marks: number;
  rank: number;
  classAverage: number;
}

interface StudentReportProps {
  subjects: {
    [key: string]: Chapter[];
  };
}

const StudentReport: React.FC<StudentReportProps> = ({ subjects }) => {
  const { studentName } = useParams<{ studentName: string }>(); // Get student name from URL params
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  // Get the list of subjects from the data
  const subjectOptions = Object.keys(subjects).map((subject) => ({
    id: subject,
    name: subject,
  }));

  // Prepare data for the selected subject
  const selectedSubjectData = selectedSubject
    ? subjects[selectedSubject] || []
    : [];

  const getChartData = (data: Chapter[]) => ({
    labels: data.map((chapter) => chapter.name),
    datasets: [
      {
        label: "Marks",
        data: data.map((chapter) => chapter.marks),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Class Average",
        data: data.map((chapter) => chapter.classAverage),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  });

  const getChartOptions = () => ({
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 120, // Set maximum value for the y-axis
      },
    },
  });

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  return (
    <div className="container">
      <div className={styles.heading}>
        <h2>SADVIDYA COMPOSITE PU COLLEGE, MYSORE COMPETITIVE EXAM REPORT</h2>
        <p>
          STD: <span>PUC-1</span> Section: <span>JEE</span> Name of the Student:
          <span> {studentName || "[Student Name]"}</span>
        </p>
      </div>

      <div className={styles.filterGroup}>
        <label>Select Subject:</label>
        <SearchableSingleSelect
          options={[...subjectOptions]}
          selectedValue={selectedSubject || ""}
          onChange={handleSubjectChange}
          placeholder="Select subject"
        />
      </div>

      {selectedSubject === "" ? (
        // Display data for all subjects
        Object.keys(subjects).map((subject) => {
          const data = subjects[subject];
          return (
            <div key={subject} className={styles.subjectSection}>
              <h3>Subject: {subject}</h3>
              <table className={styles.studentReportTable}>
                <thead>
                  <tr>
                    <th>SL NO</th>
                    <th>NAME OF CHAPTER</th>
                    <th>MARKS</th>
                    <th>RANK</th>
                    <th>CLASS AVERAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((chapter, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{chapter.name}</td>
                      <td>{chapter.marks}</td>
                      <td>{chapter.rank}</td>
                      <td>{chapter.classAverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.studentReportChart}>
                <h4>{subject} Marks Distribution</h4>
                <Bar data={getChartData(data)} options={getChartOptions()} />
              </div>
            </div>
          );
        })
      ) : selectedSubjectData.length > 0 ? (
        <>
          <h3>{selectedSubject}</h3>
          <table className={styles.studentReportTable}>
            <thead>
              <tr>
                <th>SL NO</th>
                <th>NAME OF CHAPTER</th>
                <th>MARKS</th>
                <th>RANK</th>
                <th>CLASS AVERAGE</th>
              </tr>
            </thead>
            <tbody>
              {selectedSubjectData.map((chapter, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{chapter.name}</td>
                  <td>{chapter.marks}</td>
                  <td>{chapter.rank}</td>
                  <td>{chapter.classAverage}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.studentReportChart}>
            <h4>{selectedSubject} Marks Distribution</h4>
            <Bar
              data={getChartData(selectedSubjectData)}
              options={getChartOptions()}
            />
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default StudentReport;
