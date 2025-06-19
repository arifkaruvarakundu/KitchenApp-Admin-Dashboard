import { useState, useEffect } from "react";
import {
  // ActivitiesByCountry,
  // ActivitiesByDevices,
  // ActivityByTime,
  // ConversionRateBySource,
  Sidebar,
  Stats,
  Welcome,
} from "../components";
import { BarChart,
   LineGraph, PieChart 
  } from "../components/chart";
import axios from "axios";
import API_BASE_URL from "../../api_config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Landing = () => {

  const [orders, setOrders] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {

  //     const token = localStorage.getItem("token");

  //     axios
  //       .get(`${API_BASE_URL}/orders/`,{
  //         headers:{
  //           "Authorization": `Bearer ${token}`
  //         }
  //       }
  //       )
  //       .then((response) => {
  //         console.log("Orders data fetched successfully:", response.data);
          
  //         setOrders(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching product data:", error);
  //       });
  //   }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");

      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      setStartDate(thirtyDaysAgo);
      setEndDate(today);

      const fetchInitialOrders = async () => {
        try {
          const start = thirtyDaysAgo.toISOString().split("T")[0];
          const end = today.toISOString().split("T")[0];

          const response = await axios.get(
            `${API_BASE_URL}/orders/filter/?start_date=${start}&end_date=${end}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching initial orders:", error);
          setError("Failed to fetch default orders.");
        }
      };

      fetchInitialOrders();
    }, []);

    const fetchPdfReport = async () => {
      setError(null);

      if (!startDate || !endDate) {
        setError("Please select both dates.");
        return;
      }

      if (startDate > endDate) {
        setError("Start date must be before end date.");
        return;
      }

      const token = localStorage.getItem("token");
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];

      try {
        const response = await fetch(`${API_BASE_URL}/sales-report/?start_date=${start}&end_date=${end}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate report.");
        }

        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);

        // Trigger automatic download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `sales_report_${start}_to_${end}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileUrl);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchFilteredOrders = async () => {
  setError(null);

  if (!startDate || !endDate) {
    setError("Please select both dates for Orders Overview.");
    return;
  }

  const token = localStorage.getItem("token");
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  try {
    const response = await axios.get(
      `${API_BASE_URL}/orders/filter/?start_date=${start}&end_date=${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOrders(response.data);
  } catch (error) {
    console.error("Error fetching filtered orders:", error);
    setError("Could not fetch orders.");
  }
};

const handleStartDateChange = (date) => {
  setStartDate(date);
};

const handleEndDateChange = (date) => {
  setEndDate(date);
};

  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-emerald-50 text-stone-700">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
        <div>
          <div>
            <Welcome>
              <Welcome.Title>Hi, Admin 😀</Welcome.Title>
              <Welcome.Description>
                Here is the complete overview of your eCommerce store. Analyze
                the statistics and make smart decisions.
              </Welcome.Description>
              <Welcome.ActionButton onClick={() => console.log("Analyzing...")}>
                Analyze the statistics
              </Welcome.ActionButton>
            </Welcome>
            <div className="sm:w-[85%] mt-10 max-sm:w-[80%] bg-amber-100 dark:bg-blackSecondary p-4 rounded shadow-md">
            <h4 className="text-xl font-semibold mb-4 dark:text-white text-black">
              Filter Overview
            </h4>
            <div className="flex flex-row gap-4">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                maxDate={endDate}
                placeholderText="Start Date"
                className="px-2 py-1 border rounded"
              />
              <p>To</p>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                placeholderText="End Date"
                className="px-2 py-1 border rounded"
              />
              <button
                onClick={fetchFilteredOrders}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Filter
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </div>
            <Stats orders={orders}/>
          </div>
        <div className="sm:w-[85%] mt-10 max-sm:w-[80%]">
          <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
            Orders Overview
          </h3>
          <BarChart orders={orders} />
        </div>
          <div className="sm:w-[66%] mt-10 max-sm:w-[80%]">
            <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
              Traffic Overview
            </h3>
            <LineGraph />
          </div>
          <div className="sm:w-[50%] mt-10 max-sm:w-[70%]">
            <h3 className="text-3xl dark:text-whiteSecondary text-blackPrimary font-bold mb-7 max-sm:text-2xl">
              Source Overview
            </h3>
            <PieChart />
          </div>
          
        </div>
        <div className="lg:grid grid-cols-2 max-[2300px]:grid-cols-1 gap-x-20 gap-y-8 lg:px-5 max-[1700px]:grid-cols-2 max-[1700px]:mt-10 max-lg:w-full max-lg:pr-5 max-lg:flex max-lg:flex-col max-lg:gap-y-5">
          {/* <ActivitiesByDevices />
          <ActivitiesByCountry />
          <ActivityByTime />
          <ConversionRateBySource /> */}
          
          <div className="sm:w-[80%] mt-10 max-sm:w-[80%] bg-amber-100 dark:bg-blackSecondary p-4 rounded shadow-md">
            <h4 className="text-xl font-semibold mb-4 dark:text-white text-black">
              Generate Sales Report
            </h4>
            <div className="flex flex-col gap-4">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                maxDate={endDate}
                placeholderText="Start Date"
                className="px-2 py-1 border rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                placeholderText="End Date"
                className="px-2 py-1 border rounded"
              />
              <button
                onClick={fetchPdfReport}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Generate and Download Sales Report
              </button>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Landing;
