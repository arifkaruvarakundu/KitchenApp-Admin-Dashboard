import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HiOutlineSave } from "react-icons/hi";
import {
  ImageUpload,
  InputWithLabel,
  Sidebar,
  SimpleInput,
  TextAreaInput,
} from "../components";
import { AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";

const EditCategory = () => {
   const [selectedImage, setSelectedImage] = useState(null); // for preview
   const navigate = useNavigate();

   const [categoryData, setCategoryData] = useState({
    category_name: "",
    category_name_ar: "",
    category_image: null
   });

  const { id } = useParams();

  useEffect(() => {
    
    const fetchCategoryDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category_details/${id}/`);
      const data = response.data;
      console.log("Fetched category details:", data);

      setCategoryData({
        category_name: data.category_name,
        category_name_ar: data.category_name_ar,
        category_image: data.category_image
      });
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  fetchCategoryDetails();
}, [id]);

const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("category_name", categoryData.category_name);
    formData.append("category_name_ar", categoryData.category_name_ar);
    if (categoryData.category_image instanceof File) {
      formData.append("category_image", categoryData.category_image);
    }

    try {
      await axios.put(`${API_BASE_URL}/editcategory/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Category updated successfully!");
      navigate("/categories"); // redirect after success
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Edit category
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
                onClick={handleSubmit}
                className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-blackSecondary duration-200 flex items-center justify-center gap-x-2"
              >
                <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
                <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                  Update category
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
                    placeholder="Enter a category title..."
                    value={categoryData.category_name}
                    onChange={(e) =>
                      setCategoryData({ ...categoryData, category_name: e.target.value })
                    }
                  />
                </InputWithLabel>
                <InputWithLabel label="Category title (Arabic)">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a category title..."
                    value={categoryData.category_name_ar}
                    onChange={(e) =>
                      setCategoryData({ ...categoryData, category_name_ar: e.target.value })
                    }
                  />
                </InputWithLabel>

                {/* <InputWithLabel label="Parent category (optional)">
                  <SelectInput
                    selectList={selectList}
                    value={inputObject.parentCategory}
                    onChange={(e) =>
                      setInputObject({
                        ...inputObject,
                        parentCategory: e.target.value,
                      })
                    }
                  />
                </InputWithLabel> */}
              </div>
              {/* <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackSecondary mt-16">
                SEO
              </h3> */}
              {/* <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Meta title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter a meta title..."
                    value={categoryData.metaTitle}
                    onChange={(e) =>
                      setCategoryData({ ...categoryData, metaTitle: e.target.value })
                    }
                  />
                </InputWithLabel>

                <InputWithLabel label="Meta description">
                  <TextAreaInput
                    placeholder="Enter a meta description..."
                    rows={4}
                    cols={50}
                    value={categoryData.metaDescription}
                    onChange={(e) =>
                      setCategoryData({
                        ...categoryData,
                        metaDescription: e.target.value,
                      })
                    }
                  />
                </InputWithLabel>
              </div> */}
            </div>

            {/* right div */}
            <div>
            <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Category image
            </h3>

            <ImageUpload
                onImageSelect={(file) => {
                    setCategoryData({ ...categoryData, category_image: file }); // Update actual image data
                    setSelectedImage(URL.createObjectURL(file)); // Preview URL
                }}
                />

            <div className="flex justify-center gap-x-2 mt-5 flex-wrap">
                {selectedImage ? (
                    <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-36 h-32 object-cover rounded border"
                    />
                ) : categoryData.category_image && typeof categoryData.category_image === "string" ? (
                    <img
                    src={categoryData.category_image}
                    alt="Existing"
                    className="w-36 h-32 object-cover rounded border"
                    />
                ) : null}
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCategory;
