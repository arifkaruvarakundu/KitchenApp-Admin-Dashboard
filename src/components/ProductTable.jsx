import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import API_BASE_URL from "../../api_config";
import { getCloudinaryUrl } from '../utils/cloudinary';
import {toast} from "react-toastify"

const inStockClass =
  "text-green-400 bg-green-400/10 flex-none rounded-full p-1";
const outOfStockClass =
  "text-rose-400 bg-rose-400/10 flex-none rounded-full p-1";

const ProductTable = ({ searchQuery, sortOption, rowsPerPage, currentPage, setTotalItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

    const confirmDelete = async (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await handleDeleteProduct(productId); // 🔧 Add await here
      }
    };

    const handleDeleteProduct = async (productId) => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        await axios.delete(`${API_BASE_URL}/deleteproduct/${productId}/`,{
          headers:{
          "Authorization": `Bearer ${token}`
        }});
        toast.success("Product deleted successfully!");

        // ❗ Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );

        // Don't navigate if you're already on the list
        // navigate("/products"); // optional, only use if not on /products
        return true;
      } catch (err) {
        console.error("Failed to delete product", err);
        toast.error("Failed to delete product");
        return false;
      }finally{
        setLoading(false)
      }
    };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/`)
      .then((response) => {
        console.log("Product data fetched successfully:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

   // Filter products based on search query
  const filteredProducts = products.filter((product) =>
  product?.product_name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
);

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "az") {
    return a.product_name.localeCompare(b.product_name);
  } else if (sortOption === "za") {
    return b.product_name.localeCompare(a.product_name);
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
const paginatedProducts = sortedProducts.slice(startIdx, endIdx);

useEffect(() => {
  setTotalItems(sortedProducts.length);
}, [sortedProducts, setTotalItems]);

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
          <th className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
            Product
          </th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Category</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell">Status</th>
          <th className="py-2 pl-0 pr-8 font-semibold table-cell lg:pr-20">
            Price
          </th>
          <th className="py-2 pl-0 pr-4 text-right font-semibold table-cell sm:pr-6 lg:pr-8">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
      {paginatedProducts.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            No products match your search.
          </td>
        </tr>
      ) : (
        paginatedProducts.map((item) => (
          <tr key={nanoid()}>
            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <img
                  src={getCloudinaryUrl(item?.default_image?.image)}
                  alt=""
                  className="h-8 w-8 rounded-full bg-gray-800"
                />
                <div className="truncate text-sm font-medium leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.product_name}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 table-cell pr-8">
              <div className="flex gap-x-3">
                <div className="font-mono text-sm leading-6 dark:text-whiteSecondary text-blackPrimary">
                  {item.category?.category_name}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center gap-x-2 justify-start">
                <div
                  className={
                    item.status === "In stock" ? inStockClass : outOfStockClass
                  }
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-current" />
                </div>
                <div className="dark:text-whiteSecondary text-blackPrimary block">
                  {item.is_active ? "Active" : "InActive"}
                </div>
              </div>
            </td>
            <td className="py-4 pl-0 pr-8 text-sm leading-6 dark:text-rose-200 text-rose-600 font-medium table-cell lg:pr-20">
              {item.price}
            </td>
            <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 dark:text-whiteSecondary text-blackPrimary table-cell pr-6 lg:pr-8">
              <div className="flex gap-x-1 justify-end">
                <Link
                  to={`/edit-product/${item.id}`}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlinePencil className="text-lg" />
                </Link>
                {/* <Link
                  to={`/products/${item.id}`}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlineEye className="text-lg" />
                </Link> */}
                <button
                  onClick={() => confirmDelete(item.id)}
                  className="dark:bg-blackPrimary bg-whiteSecondary dark:text-whiteSecondary text-blackPrimary border border-gray-600 w-8 h-8 flex justify-center items-center cursor-pointer hover:border-gray-400"
                >
                  <HiOutlineTrash className="text-lg text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        ))
)}
      </tbody>
    </table>
  );
};

export default ProductTable;
