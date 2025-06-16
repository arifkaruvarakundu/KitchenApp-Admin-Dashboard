import {useState, useEffect} from 'react';
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import axios from 'axios';
import API_BASE_URL from "../../api_config";

const UserTable = ({searchQuery, sortOption, rowsPerPage, currentPage, setTotalItems}) => {

     const [users, setUsers] = useState([]);

    useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/`)
      .then((response) => {
        console.log("Users data fetched successfully:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;

      try {
        await axios.delete(`${API_BASE_URL}/delete_user/${id}/`);
        alert("User deleted successfully");
        // Refresh the users list after deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error);
        alert("Failed to delete user");
      }
    };

    // Filter products based on search query
  const filteredUsers = users.filter((user) =>
  user?.first_name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
);

const sortedUsers = [...filteredUsers].sort((a, b) => {
  if (sortOption === "az") {
    return a.first_name.localeCompare(b.first_name);
  } else if (sortOption === "za") {
    return b.first_name.localeCompare(a.first_name);
  // } else if (sortOption === "newest") {
  //   return new Date(b.created_at) - new Date(a.created_at);
  // } else if (sortOption === "oldest") {
  //   return new Date(a.created_at) - new Date(b.created_at);
  } else {
    return 0; // No sorting
  }
});

const startIdx = (currentPage - 1) * rowsPerPage;
const endIdx = startIdx + rowsPerPage;
const paginatedUsers = sortedUsers.slice(startIdx, endIdx);

useEffect(() => {
  setTotalItems(sortedUsers.length);
}, [sortedUsers, setTotalItems]);

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
          <th className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">User</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Email address</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Role</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Status</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">Date of join</th>
          <th className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
      {paginatedUsers.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            No products match your search.
          </td>
        </tr>
      ) : (
        paginatedUsers.map((item) => (
          <tr key={nanoid()}>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <img
                  src={item?.profile_img}
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-800"
                />
                <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                {item?.first_name} {item?.last_name}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 table-cell pr-8">
              <div className="flex gap-x-3">
                <div className="text-sm leading-6 py-1 dark:text-whiteSecondary text-blackPrimary">
                  {item.email}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center gap-x-2 justify-start">
                <div className="dark:text-whiteSecondary text-blackPrimary block font-medium">
                    {item.is_superuser
                        ? "Superuser"
                        : item.is_admin
                        ? "Admin"
                        : item.is_staff
                        ? "Admin"
                        : "Customer"}
                    </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 table-cell pr-8">
              <div className="flex gap-x-3">
                <div className="text-sm leading-6 py-1 dark:text-whiteSecondary text-blackPrimary">
                  {item.is_active ? "Active" : "InActive"}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell lg:pr-20">
              {item.created_at.split("T")[0]}
            </td>
            <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
              <div className="flex gap-x-1 justify-end">
                <Link
                  to={`/edit-user/${item.id}`}
                  className="dark:bg-blackPrimary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlinePencil className="text-lg" />
                </Link>
                {/* <Link
                  to="/users/1"
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlineEye className="text-lg" />
                </Link> */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer dark:hover:border-gray-500 hover:border-gray-400"
                >
                  <HiOutlineTrash className="text-lg text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        )))}
      </tbody>
    </table>
  );
};

export default UserTable;
