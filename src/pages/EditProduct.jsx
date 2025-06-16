import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { useParams, Link } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import SimpleInput from "../components/SimpleInput";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../api_config";
// import { selectList, stockStatusList } from "../utils/data";
import { useNavigate } from "react-router-dom";
import EditProductVariants from "../components/Edit_productvariant_add";

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [variants, setVariants] = useState([]);
    const [productData, setProductData] = useState({
    product_name: "",
    product_name_ar: "",
    description: "",
    description_ar: "",
    use_and_care: "",
    use_and_care_ar: "",
    category: "",
    is_active: true,
    is_default: false,
    price: "",
    stock: ""
    });


    const navigate = useNavigate();

    useEffect(() => {
    
    const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product_details/${id}/`);
      const data = response.data;
      console.log("Fetched product details:", data);

      // Group product_images by variant ID
      const variantImageMap = {};
      data.product_images.forEach((img) => {
        const variantId = img.variant?.id;
        if (variantId != null) {
          if (!variantImageMap[variantId]) {
            variantImageMap[variantId] = [];
          }
          variantImageMap[variantId].push({
            ...img,
            image_url: img.image, // for consistency with your remove logic
          });
        }
      });

      // Enrich each variant with images
      const enrichedVariants = (data.variants || []).map((variant) => ({
        ...variant,
        existingImages: variantImageMap[variant.id] || [],
        newImages: [],
      }));

      setProductData(data || {});
      setVariants(enrichedVariants);
      setProductImages(data.product_images || []);
    } catch (err) {
      console.error("Error fetching product details", err);
      setError("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

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
      }
    };

    fetchProductDetails();
    fetchCategories();
  }, [id]);

  const addVariant = () => {
    setVariants((prevVariants) => {
      console.log("Previous Variants:", JSON.stringify(prevVariants, null, 2)); // Log before updating
  
      const updatedVariants = [
        ...prevVariants.map((variant) => ({
          ...variant,
          existingImages: variant.existingImages || [], 
          newImages: variant.newImages || [], 
        })),
        {
          brand: "",
          price: "",
          stock: "",
          discount_percentage: "",
          color: "",
          color_ar: "",
          existingImages: [],  
          newImages: [],  
        },
      ];
  
      console.log("Updated Variants:", JSON.stringify(updatedVariants, null, 2)); // Log after updating
  
      return updatedVariants;
    });
  };

    const removeVariantImage = (variantIndex, imageIndex, type = "existing") => {
      const updated = [...variants];
      const variant = updated[variantIndex];

      if (type === "existing" && Array.isArray(variant.existingImages)) {
        const removedImage = variant.existingImages.splice(imageIndex, 1)[0];
        if (!variant.existingImagesDeleted) {
          variant.existingImagesDeleted = [];
        }
        if (removedImage.id) {
          variant.existingImagesDeleted.push(removedImage.id);
        }
      }

      setVariants(updated);
    };

    const removeImage = (variantIndex, imgIndex, type) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
  
      if (type === "existing") {
        updatedVariants[variantIndex].existingImages.splice(imgIndex, 1);
      } else {
        updatedVariants[variantIndex].newImages.splice(imgIndex, 1);
      }
  
      return updatedVariants;
    });
  };

    const handleSubmit = async () => {
      const formData = new FormData();

      const cleanedData = {
        ...productData,
        category: typeof productData.category === "object"
          ? productData.category.id
          : productData.category,
      };

      for (let key in cleanedData) {
        if (cleanedData[key] !== undefined && cleanedData[key] !== null) {
          formData.append(key, cleanedData[key]);
          
        }
      }
      formData.append("is_active", productData.is_active ? "true" : "false");

      // ✅ Use correct key for deleted images
      const cleanVariants = variants.map((variant) => ({
        id: variant.id,
        color: variant.color,
        color_ar: variant.color_ar,
        price: variant.price,
        stock: variant.stock,
        is_default: variant.is_default || false,
        discount_percentage: variant.discount_percentage,
        imagesToDelete: variant.existingImagesDeleted || [],
        existingImages: variant.existingImages || [],
        defaultImageIndex: variant.defaultImageIndex ?? null, // ✅ ADD THIS
      }));

      formData.append("variants", JSON.stringify(cleanVariants));

      variants.forEach((variant, index) => {
        variant.newImages?.forEach((imageFile, imgIndex) => {
          formData.append(`new_images_${index}_${imgIndex}`, imageFile.file);
        });
      });

      try {
        const response = await axios.put(`${API_BASE_URL}/editproduct/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Product updated successfully!");
        navigate("/products");
        console.log("Product updated successfully", response.data);
      } catch (err) {
        console.error("Error updating product", err.response?.data || err);
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
            Edit Product
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
              Edit Product
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
                value={productData.product_name}
                onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
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
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
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
                value={productData.use_and_care}
                onChange={(e) => setProductData({ ...productData, use_and_care: e.target.value })}
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

            <div className="flex items-center gap-3 text-lg dark:text-whiteSecondary text-blackPrimary">
                    <input
                        type="checkbox"
                        checked={productData.is_active}
                        onChange={(e) =>
                        setProductData({ ...productData, is_active: e.target.checked })
                        }
                    />
                    Is Active
                    </div>

            <InputWithLabel label="Category">
              <SelectInput
                selectList={categories}
                value={productData.category?.id || ''} // Get just the ID
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: parseInt(e.target.value),
                  })
                }
              />
            </InputWithLabel>

          </div>
            <EditProductVariants
              variants={variants}
              productImages={productImages}
              setVariants={setVariants}
              removeImage={removeImage}
              addVariant={addVariant}
              removeVariantImage={removeVariantImage}
            />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
export default EditProduct;
