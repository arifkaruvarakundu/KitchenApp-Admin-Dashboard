import { CategoryTable, Pagination, RowsPerPage, Sidebar, WhiteButton } from "../components";
import { HiOutlinePlus, HiOutlineChevronRight, HiOutlineSearch } from "react-icons/hi";
import { AiOutlineExport } from "react-icons/ai";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery, rowsPerPage]);

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />

      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="py-10">

          {/* Header Section */}
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                All categories
              </h2>
              <p className="text-base font-normal flex items-center dark:text-whiteSecondary text-blackPrimary">
                <span>Dashboard</span>
                <HiOutlineChevronRight className="text-lg mx-1" />
                <span>All categories</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              {/* <button className="border border-gray-600 w-32 py-2 text-lg hover:border-gray-500 duration-200 flex items-center justify-center gap-x-2 dark:bg-blackPrimary bg-whiteSecondary">
                <AiOutlineExport className="text-base dark:text-whiteSecondary text-blackPrimary" />
                <span className="font-medium dark:text-whiteSecondary text-blackPrimary">Export</span>
              </button> */}

              <WhiteButton
                link="/categories/create-category"
                text="Add a category"
                textSize="lg"
                py="2"
                width="48"
              >
                <HiOutlinePlus className="dark:text-blackPrimary text-whiteSecondary" />
              </WhiteButton>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center mt-5 max-sm:flex-col max-sm:gap-2">
            {/* Search Input */}
            <div className="relative">
              <HiOutlineSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-60 h-10 border border-gray-600 indent-10 outline-0 dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary dark:focus:border-gray-500 focus:border-gray-400"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              name="sort"
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-60 h-10 pl-3 pr-8 cursor-pointer outline-0 border border-gray-600 bg-whiteSecondary dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary dark:hover:border-gray-500 hover:border-gray-400"
            >
              <option value="default">Sort by</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              {/* <option value="newest">Newest</option>
              <option value="oldest">Oldest</option> */}
            </select>
          </div>

          {/* Category Table */}
          <CategoryTable
            searchQuery={searchQuery} 
            sortOption={sortOption} 
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setTotalItems={setTotalItems}
          />

          {/* Pagination and Rows Per Page */}
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
  );
};

export default Categories;
