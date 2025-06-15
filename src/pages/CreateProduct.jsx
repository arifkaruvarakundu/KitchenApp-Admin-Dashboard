import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import SimpleInput from "../components/SimpleInput";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../api_config";
// import { selectList, stockStatusList } from "../utils/data";
import { useNavigate } from "react-router-dom";

import ProductVariants from "../components/ProductVariantAdd";

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [variants, setVariants] = useState([]);
    const [productData, setProductData] = useState({
    product_name_en: "",
    product_name_ar: "",
    description_en: "",
    description_ar: "",
    use_and_care_en: "",
    use_and_care_ar: "",
    category: "",
    is_available: false,
    is_default: false,
    price: "",
    stock: ""
    });


    const navigate = useNavigate();

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        const response = await axios.get(`${API_BASE_URL}/categories/`);
        const formattedCategories = response.data.map((cat) => ({
            value: cat.id,
            label: cat.category_name,
        }));
        setCategories(formattedCategories);
        } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to load categories");
        }
    };

    fetchCategories();
    }, []);

    const removeVariantImage = (variantIndex, imageIndex, type = "existing") => {
      const updated = [...variants];
      if (type === "existing") {
        updated[variantIndex].variant_images.splice(imageIndex, 1);
      }
      setVariants(updated);
    };

    const handleSubmit = async () => {
      const formData = new FormData();

      // Add basic product data
      for (let key in productData) {
        formData.append(key, productData[key]);
      }

      // Add each variant
      variants.forEach((variant, index) => {
      formData.append(`variants[${index}][color_en]`, variant.color_en);
      formData.append(`variants[${index}][color_ar]`, variant.color_ar);
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(`variants[${index}][stock]`, variant.stock);
      formData.append(`variants[${index}][is_default]`, variant.is_default || false);
      formData.append(`variants[${index}][discount_percentage]`, variant.discount_percentage);

      // Upload new images
      variant.newImages?.forEach((imageFile, imgIndex) => {
        formData.append(`variants[${index}][images][]`, imageFile.file);
        if (variant.defaultImageIndex === imgIndex) {
          formData.append(`variants[${index}][default_image_index]`, imgIndex);
        }
      });

      // Existing image handling (if editing)
      variant.variant_images?.forEach((img, imgIdx) => {
        formData.append(`variants[${index}][existing_images][]`, img.image_url);
        if (variant.defaultImageIndex === `existing-${imgIdx}`) {
          formData.append(`variants[${index}][default_existing_image_index]`, imgIdx);
        }
      });
    });

      try {
        const response = await axios.post(`${API_BASE_URL}/addproduct/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product created successfully!");
        navigate("/products"); // ✅ Corrected: lowercase 'n' in navigate
        
        console.log("Product created successfully", response.data);
        // Optionally reset form or redirect
      } catch (err) {
        console.error("Error creating product", err);
      }
    };


  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
  <Sidebar />
  <div className="hover:bg-blackPrimary bg-whiteSecondary w-full ">
    <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
      <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
            Add new product
          </h2>
        </div>
        <div className="flex gap-x-2 max-[370px]:flex-col max-[370px]:gap-2 max-[370px]:items-center">
          <button className="dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 w-48 py-2 text-lg dark:hover:border-gray-500 hover:border-gray-400 duration-200 flex items-center justify-center gap-x-2">
            <AiOutlineSave className="dark:text-whiteSecondary text-blackPrimary text-xl" />
            <span className="dark:text-whiteSecondary text-blackPrimary font-medium">
              Save draft
            </span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg dark:hover:bg-white hover:bg-black duration-200 flex items-center justify-center gap-x-2"
          >
            <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
            <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
              Publish product
            </span>
          </button>
        </div>
      </div>

      {/* Add Product section here */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10">
        {/* left div */}
        <div>
          <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
            Basic information
          </h3>

          <div className="mt-4 flex flex-col gap-5">

            <InputWithLabel label="Title[EN]">
              <SimpleInput
                type="text"
                name="title_en"
                value={productData.product_name_en}
                onChange={(e) => setProductData({ ...productData, product_name_en: e.target.value })}
                placeholder="Enter title in English"
              />
            </InputWithLabel>

            <InputWithLabel label="Title[AR]">
              <SimpleInput 
                type="text" 
                name="title_ar"
                value={productData.product_name_ar}
                onChange={(e) => setProductData({ ...productData, product_name_ar: e.target.value })}
                placeholder="Enter a product title..." />
            </InputWithLabel>

            <InputWithLabel label="Description[EN]">
              <TextAreaInput
                placeholder="Enter a product description..."
                rows={4}
                cols={50}
                name="description_en"
                value={productData.description_en}
                onChange={(e) => setProductData({ ...productData, description_en: e.target.value })}
              />
            </InputWithLabel>

            <InputWithLabel label="Description[AR]">
              <TextAreaInput
                placeholder="Enter a product description..."
                rows={4}
                cols={50}
                name="description_ar"
                value={productData.description_ar}
                onChange={(e) => setProductData({ ...productData, description_ar: e.target.value })}
              />
            </InputWithLabel>

            <InputWithLabel label="Use and Care[EN]">
              <TextAreaInput
                placeholder="Enter a product description..."
                rows={4}
                cols={50}
                name="use_and_care_en"
                value={productData.use_and_care_en}
                onChange={(e) => setProductData({ ...productData, use_and_care_en: e.target.value })}
              />
            </InputWithLabel>

            <InputWithLabel label="Use and Care[AR]">
              <TextAreaInput
                placeholder="Enter a product description..."
                rows={4}
                cols={50}
                name="use_and_care_ar"
                value={productData.use_and_care_ar}
                onChange={(e) => setProductData({ ...productData, use_and_care_ar: e.target.value })}
              />
            </InputWithLabel>

            <InputWithLabel label="Category">
              <SelectInput
                selectList={categories}
                value={productData.category}
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
              />
            </InputWithLabel>

          </div>
            <ProductVariants
              variants={variants}
              setVariants={setVariants}
              removeVariantImage={removeVariantImage}
            />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default CreateProduct;
