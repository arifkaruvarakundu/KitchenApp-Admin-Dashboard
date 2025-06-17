// *********************
// Role of the component: Order table component that displays the orders in a table
// Name of the component: OrderTable.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <OrderTable />
// Input parameters: no input parameters
// Output: OrderTable component that displays the orders in a table
// *********************

import {useState, useEffect} from 'react';
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import axios from 'axios';
import API_BASE_URL from "../../api_config";

const OrderTable = ({ statusFilter, sortOption, rowsPerPage, currentPage, setTotalItems }) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      axios
        .get(`${API_BASE_URL}/orders/`,{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        }
        )
        .then((response) => {
          console.log("Orders data fetched successfully:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }, []);

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
          const token = localStorage.getItem("token")
          const response = await axios.delete(`${API_BASE_URL}/delete_order/${orderId}/`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          });
          alert("Order deleted successfully.");
          // ❗ Remove the deleted category from the state
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
          // Optionally refresh the list or redirect
        } catch (error) {
          alert(error.response?.data?.detail || "Failed to delete order.");
        }
      };

  const filteredOrders = orders.filter((order) =>
    statusFilter === "All" ? true : order.status === statusFilter
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
  if (sortOption === "newest") {
    return new Date(b.created_at) - new Date(a.created_at);
  } else if (sortOption === "oldest") {
    return new Date(a.created_at) - new Date(b.created_at);
  } else {
    return 0; // No sorting
  }
});

const startIdx = (currentPage - 1) * rowsPerPage;
const endIdx = startIdx + rowsPerPage;
const paginatedOrders = sortedOrders.slice(startIdx, endIdx);

useEffect(() => {
  setTotalItems(sortedOrders.length);
}, [sortedOrders, setTotalItems]);

  return (
    <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>
      <thead className="border-b border-white/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th
            scope="col"
            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
          >
            Order ID
          </th>
          <th
            scope="col"
            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
          >
            Customer
          </th>
          <th
            scope="col"
            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
          >
            Invoice
          </th>
          <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
            Status
          </th>
          <th scope="col" className="py-2 pl-0 pr-8 font-semibold table-cell">
            Total
          </th>
          <th
            scope="col"
            className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20"
          >
            Date
          </th>
          <th
            scope="col"
            className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
      {paginatedOrders.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            No orders match your filter.
          </td>
        </tr>
      ) : (
        paginatedOrders.map((item) => (
          <tr key={nanoid()}>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                {/* <img
                  src={item.user.imageUrl}
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-800"
                /> */}
                <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.id}
                </div>
              </div>
            </td>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                {/* <img
                  src={item.user.imageUrl}
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-800"
                /> */}
                <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.user_name}
                </div>
              </div>
            </td>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <button
                  // onClick={handleDownload}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                >
                  Download
                </button>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 table-cell pr-8">
              <div className="flex gap-x-3">
                <div
                  className={`text-sm leading-6 py-1 px-2 ${
                    item.status === "Order Confirmed" &&
                    "dark:bg-green-900 bg-green-700 text-whiteSecondary font-semibold"
                  } ${
                    item.status === "Out for Delivery" &&
                    "dark:bg-yellow-900 bg-yellow-700 text-whiteSecondary font-semibold"
                  } ${
                    item.status === "Cancelled" &&
                    "dark:bg-red-900 bg-red-700 text-whiteSecondary font-semibold"
                  } ${
                    item.status === "Delivered" &&
                    "dark:bg-gray-900 bg-gray-700 text-whiteSecondary font-semibold"
                  } ${
                    item.status === "Pending" &&
                    "dark:bg-blue-900 bg-blue-700 text-whiteSecondary font-semibold"
                  }`}
                >
                  {item.status}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center gap-x-2 justify-start">
                <div className="dark:text-rose-200 text-rose-500 block font-bold">
                  {item.total}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
              {item.created_at.split("T")[0]}
            </td>
            <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
              <div className="flex gap-x-1 justify-end">
                <Link
                  to={`/edit-order/${item.id}`}
                  className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlinePencil className="text-lg" />
                </Link>
                {/* <Link
                  to="/orders/1"
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlineEye className="text-lg" />
                </Link> */}
                <button
                  key={item.id}
                  onClick={() => deleteOrder(item.id)}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 block flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlineTrash className="text-lg" />
                </button>
              </div>
            </td>
          </tr>
        )))}
      </tbody>
    </table>
  );
};

export default OrderTable;
