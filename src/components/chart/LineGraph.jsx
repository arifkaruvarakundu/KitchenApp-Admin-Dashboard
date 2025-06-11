import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
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

  const options = {}; // Customize as needed

  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Traffic",
        data: [10000, 30000, 15000, 30000, 25000, 19000, 50000],
        borderColor: darkMode ? "#fff" : "#000",
        backgroundColor: darkMode ? "#ffffff55" : "#00000055",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
