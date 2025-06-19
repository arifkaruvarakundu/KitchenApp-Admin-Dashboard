import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const lightColors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(153, 102, 255, 0.8)",
  ];

  const darkColors = [
    "rgba(255, 255, 255, 0.9)",
    "rgba(200, 200, 200, 0.8)",
    "rgba(160, 160, 160, 0.7)",
    "rgba(120, 120, 120, 0.6)",
    "rgba(80, 80, 80, 0.5)",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: darkMode ? "#fff" : "#000",
        },
      },
    },
  };

  const data = {
    labels: ["Facebook", "Instagram", "Twitter", "YouTube", "LinkedIn"],
    datasets: [
      {
        label: "Time Spent",
        data: [120, 60, 30, 90, 45],
        backgroundColor: darkMode ? darkColors : lightColors,
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
