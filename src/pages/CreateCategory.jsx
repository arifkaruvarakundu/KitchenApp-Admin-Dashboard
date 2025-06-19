import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSave } from "react-icons/hi";
import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import SelectInput from "../components/SelectInput";
// import { selectList, stockStatusList } from "../utils/data";
import { AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";
import {toast} from "react-toastify"; 

const CreateCategory = () => {

    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState({
      category_name: "",
      category_name_ar: "",
      category_slug: "",
      category_image: null,
    });

    
    const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("category_name_en", categoryData.category_name);
  formData.append("category_name_ar", categoryData.category_name_ar);
  if (categoryData.category_image) {
    formData.append("category_image", categoryData.category_image);
  }

  try {
    setLoading(true)
    const token = localStorage.getItem("token")
    const response = await axios.post(`${API_BASE_URL}/addcategory/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status === 201) {
      toast.success("Category created successfully!");
      navigate("/categories"); // Navigate to categories page after successful creation
      // Reset form or navigate
      setCategoryData({
        category_name: "",
        category_name_ar: "",
        category_slug: "",
        category_image: null,
      });
    }

  } catch (error) {
    if (error.response) {
      toast.error(`Error: ${error.response.data.detail}`);
    } else {
      toast.error("Something went wrong!");
    }
  }finally{
    setLoading(false)
  }
};


  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-emerald-50 text-stone-700">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Add new category
              </h2>
            </div>
            <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
              {/* <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
                <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
                <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
                  Save draft
                </span>
              </button> */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg flex items-center justify-center gap-x-2 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "dark:hover:bg-white hover:bg-black duration-200"
                }`}
              >
                {loading ? (
                  <span className="animate-spin border-2 border-whiteSecondary border-t-transparent rounded-full w-5 h-5" />
                ) : (
                  <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
                )}
                <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                  {loading ? "Publishing..." : "Publish category"}
                </span>
              </button>
            </div>
          </div>

          {/* Add Category section here  */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
            {/* left div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Basic information
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Category title">
                  <SimpleInput
                    type="text"
                    value={categoryData.category_name}
                    onChange={(e) =>
                        setCategoryData({ ...categoryData, category_name: e.target.value })
                    }
                    placeholder="Category Name (EN)"
                  />
                </InputWithLabel>

                <InputWithLabel label="Category title (AR)">
                  <SimpleInput
                    type="text"
                    value={categoryData.category_name_ar}
                    onChange={(e) =>
                        setCategoryData({ ...categoryData, category_name_ar: e.target.value })
                    }
                    placeholder="Category Name (AR)"
                  />
                </InputWithLabel>
              </div>
              {/* <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                SEO
              </h3>
              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Meta title">
                  <SimpleInput type="text" placeholder="Enter a meta title..." />
                </InputWithLabel>

                <InputWithLabel label="Meta description">
                  <TextAreaInput
                    placeholder="Enter a meta description..."
                    rows={4}
                    cols={50}
                  />
                </InputWithLabel>
              </div> */}
            </div>

            {/* right div */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Category image
              </h3>

              <ImageUpload onImageSelect={(file) => setCategoryData({ ...categoryData, category_image: file })} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCategory;
