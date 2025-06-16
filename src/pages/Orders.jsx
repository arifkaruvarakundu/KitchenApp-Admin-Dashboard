
import { OrderTable, Pagination, RowsPerPage, Sidebar } from "../components";
import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AiOutlineExport } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Orders = () => {

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
      setCurrentPage(1);
    }, [rowsPerPage]);

  return (
   <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
  <Sidebar />
  <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
    <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
            All orders
          </h2>
          <p className="dark:text-whiteSecondary text-blackPrimary text-base font-normal flex items-center">
            <span>Dashboard</span>
            <HiOutlineChevronRight className="text-lg" />
            <span>All orders</span>
          </p>
        </div>
        <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
          {/* <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-32 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
            <AiOutlineExport className="dark:text-whiteSecondary text-blackPrimary text-base" />
            <span className="dark:text-whiteSecondary text-blackPrimary font-medium">Export</span>
          </button> */}
          {/* <Link
            to="/orders/create-order"
            className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-blackSecondary duration-200 flex items-center justify-center gap-x-1"
          >
            <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
            <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
              Add an order
            </span>
          </Link> */}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center mt-5 max-sm:flex-col max-sm:gap-2">
        {/* <div className="relative">
          <HiOutlineSearch className="text-gray-400 text-lg absolute top-3 left-3" />
          <input
            type="text"
            className="w-60 h-10 border dark:bg-blackPrimary bg-white border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 indent-10 dark:focus:border-gray-500 focus:border-gray-400"
            placeholder="Search orders..."
          />
        </div> */}
        <div>
          <select
            className="w-60 h-10 dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-3 pr-8 cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
            name="sort"
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            {/* <option value="az">A-Z</option>
            <option value="za">Z-A</option> */}
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <select
          className="w-60 h-10 dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary outline-0 pl-3 pr-8 cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
          name="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Order Confirmed">Order Confirmed</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Orders Table */}
      <OrderTable 
        statusFilter={selectedStatus}
        sortOption={sortOption}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setTotalItems={setTotalItems} 
      />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-6 max-sm:flex-col gap-4 max-sm:pt-6 max-sm:pb-0">
        <RowsPerPage
          rowsPerPage={rowsPerPage} 
          setRowsPerPage={setRowsPerPage} 
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalItems={setTotalItems}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  </div>
</div>
  )
}
export default Orders