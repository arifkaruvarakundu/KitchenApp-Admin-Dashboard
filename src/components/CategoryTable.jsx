// *********************
// Role of the component: Displays categories table on the admin category page
// Name of the component: CategoryTable.jsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryTable />
// Input parameters: No input parameters
// Output: Table with categories
// *********************
import {useState, useEffect} from 'react';
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import axios from 'axios';
import API_BASE_URL from "../../api_config";
import {toast} from "react-toastify";
// import { getCloudinaryUrl } from '../utils/cloudinary';

const CategoryTable = ({searchQuery, sortOption, rowsPerPage, currentPage, setTotalItems}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      axios
        .get(`${API_BASE_URL}/categories/`)
        .then((response) => {
          console.log("category data fetched successfully:", response.data);
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }, []);

      const deleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
          setLoading(true)
          const token = localStorage.getItem("token")
          const response = await axios.delete(`${API_BASE_URL}/deletecategory/${categoryId}/`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          });
          toast.success("Category deleted successfully.");
          // ❗ Remove the deleted category from the state
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
          // Optionally refresh the list or redirect
        } catch (error) {
          toast.error(error.response?.data?.detail || "Failed to delete category.");
        } finally{
          setLoading(false)
        }
      };

       // Filter products based on search query
  const filteredCategories = categories.filter((category) =>
  category?.category_name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
);

const sortedCategories = [...filteredCategories].sort((a, b) => {
  if (sortOption === "az") {
    return a.category_name.localeCompare(b.category_name);
  } else if (sortOption === "za") {
    return b.category_name.localeCompare(a.category_name);
  } else if (sortOption === "newest") {
    return new Date(b.created_at) - new Date(a.created_at);
  } else if (sortOption === "oldest") {
    return new Date(a.created_at) - new Date(b.created_at);
  } else {
    return 0; // No sorting
  }
});

const startIdx = (currentPage - 1) * rowsPerPage;
const endIdx = startIdx + rowsPerPage;
const paginatedOrders = sortedCategories.slice(startIdx, endIdx);

useEffect(() => {
  setTotalItems(sortedCategories.length);
}, [sortedCategories, setTotalItems]);

  return (
    <table className="mt-6 w-full whitespace-nowrap text-left max-lg:block max-lg:overflow-x-scroll">
      <colgroup>
        <col className="w-full sm:w-4/12" />
        <col className="lg:w-4/12" />
        <col className="lg:w-2/12" />
        <col className="lg:w-1/12" />
        <col className="lg:w-1/12" />
      </colgroup>

      <thead className="border-b dark:border-white/10 border-black/10 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
        <tr>
          <th className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Category</th>
          {/* <th className="py-2 pl-0 pr-8 font-semibold table-cell">Slug</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Number of products</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">Parent category</th> */}
          <th className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-white/5">
      {paginatedOrders.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            No categories match your search.
          </td>
        </tr>
      ) : (
        paginatedOrders.map((item) => (
          <tr key={nanoid()}>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <img
                  src={item?.category_image}
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-800"
                />
                <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item?.category_name}
                </div>
              </div>
            </td>

            {/* <td className="py-4 pl-0 pr-4 table-cell pr-8">
              <div className="flex gap-x-3">
                <div className="text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.slug}
                </div>
              </div>
            </td>

            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center gap-x-2 justify-start">
                <div className="dark:text-whiteSecondary text-blackPrimary block">
                  {item.productsNumber}
                </div>
              </div>
            </td>

            <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
              {item.parentCategory}
            </td> */}

            <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
              <div className="flex gap-x-1 justify-end">
                <Link
                  to={`/edit-category/${item.id}`}
                  className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center hover:border-gray-500"
                >
                  <HiOutlinePencil className="text-lg" />
                </Link>
                {/* <Link
                  to="/categories/1"
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center hover:border-gray-500"
                >
                  <HiOutlineEye className="text-lg" />
                </Link> */}
                <button
                  key={item.id}
                  onClick={() => deleteCategory(item.id)}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center hover:border-gray-500"
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

export default CategoryTable;
