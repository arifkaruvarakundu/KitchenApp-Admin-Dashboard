import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  if (darkMode) {
    ChartJS.defaults.color = "#fff";
    ChartJS.defaults.backgroundColor = "#fff";
    ChartJS.defaults.borderColor = "#fff";
  } else {
    ChartJS.defaults.color = "#000";
    ChartJS.defaults.backgroundColor = "#000";
    ChartJS.defaults.borderColor = "#000";
  }

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
        backgroundColor: darkMode
          ? [
              "rgba(255,255,255, 1)",
              "rgba(255,255,255, 0.8)",
              "rgba(255,255,255, 0.6)",
              "rgba(255,255,255, 0.4)",
              "rgba(255,255,255, 0.2)",
            ]
          : [
              "rgba(0,0,0, 1)",
              "rgba(0,0,0, 0.8)",
              "rgba(0,0,0, 0.6)",
              "rgba(0,0,0, 0.4)",
              "rgba(0,0,0, 0.2)",
            ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
