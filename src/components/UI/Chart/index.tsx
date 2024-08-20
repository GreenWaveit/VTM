import React from "react";
import { Bar } from "react-chartjs-2";

interface MarksChartProps {
  subject: string;
  chapters: {
    name: string;
    marks: number;
  }[];
}

const MarksChart: React.FC<MarksChartProps> = ({ subject, chapters }) => {
  const data = {
    labels: chapters.map((chapter) => chapter.name),
    datasets: [
      {
        label: "Marks",
        data: chapters.map((chapter) => chapter.marks),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
      },
    },
  };

  return (
    <div>
      <h3>{subject}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MarksChart;
