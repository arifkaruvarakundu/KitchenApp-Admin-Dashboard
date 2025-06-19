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
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ orders }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const labelColor = darkMode ? "#fff" : "#000";
  const barColor = darkMode ? "#4ade80" : "#2563eb";
  const borderColor = darkMode ? "#fff" : "#000";

  const orderMap = orders.reduce((acc, order) => {
  const isoDate = new Date(order.created_at).toISOString().split("T")[0];
  acc[isoDate] = (acc[isoDate] || 0) + 1;
  return acc;
}, {});

const sortedDates = Object.keys(orderMap).sort((a, b) => new Date(a) - new Date(b));

const labels = sortedDates.map((dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
);
const dataValues = sortedDates.map((dateStr) => orderMap[dateStr]);

  const maxOrders = Math.max(...dataValues);
  const stepSize = Math.ceil(maxOrders / 5) || 1; // Avoid stepSize = 0


  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: labelColor,
        },
      },
      title: {
        display: true,
        text: "Number of Orders per Day",
        color: labelColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: labelColor,
        },
        grid: {
          color: darkMode ? "#444" : "#ddd",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: labelColor,
          stepSize: stepSize,
          precision: 0,
          callback: function(value){
            return Number.isInteger(value) ? value : null;
          },
        },
        grid: {
          color: darkMode ? "#444" : "#ddd",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: dataValues,
        backgroundColor: barColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
