import { useState, useCallback, useEffect } from "react";

import VariantItem from "./VariantItem";

const ProductVariants = ({ variants, setVariants, removeVariantImage }) => {
//   const defaultVariant = {
//     color_en: "",
//     color_ar: "",
//     price: "",
//     stock: "",
//     discount_percentage: "",
//     newImages: [],           // ✅ Required for new image previews
//     variant_images: [],      // ✅ Required for existing image display
//   };

// const [variants, setVariants] = useState([defaultVariant]);

  const handleVariantChange = (index, event) => {
  const { name, value, type } = event.target;

  setVariants((prevVariants) => {
    return prevVariants.map((variant, i) => {
      // Enforce only one default variant
      if (name === "is_default") {
        return {
          ...variant,
          is_default: i === index ? value : false,
        };
      }

      // Enforce one default image per variant
      if (name === "defaultImageIndex") {
        return i === index
          ? {
              ...variant,
              defaultImageIndex: value,
            }
          : variant;
      }

      if (name === "is_default" && value === false) {
        const isOnlyOneSelected = prevVariants.filter(v => v.is_default).length === 1;
        if (isOnlyOneSelected && prevVariants[index].is_default) {
          return prevVariants; // ignore deselecting last one
        }
      }

      // Regular input updates
      return i === index
        ? {
            ...variant,
            [name]: type === "checkbox" ? value : value,
          }
        : variant;
    });
  });
};


 const onDrop = (variantIndex, acceptedFiles) => {
  setVariants((prevVariants) => {
    const updatedVariants = [...prevVariants];
    const currentVariant = updatedVariants[variantIndex];

    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    // Prevent duplicates by checking name and size
    const existing = currentVariant.newImages || [];
    const uniqueImages = newImages.filter(
      (newImg) =>
        !existing.some(
          (existingImg) =>
            existingImg.name === newImg.name && existingImg.size === newImg.size
        )
    );

    currentVariant.newImages = [...existing, ...uniqueImages];
    return updatedVariants;
  });
};


useEffect(() => {
  return () => {
    variants.forEach((variant) => {
      variant.newImages?.forEach((img) => URL.revokeObjectURL(img.preview));
    });
  };
}, []);

  const removeImage = (variantIndex, imageIndex, type = "new") => {
  setVariants((prevVariants) => {
    const updatedVariants = [...prevVariants];
    if (type === "new") {
      updatedVariants[variantIndex].newImages.splice(imageIndex, 1);
    } else {
      updatedVariants[variantIndex].variant_images.splice(imageIndex, 1);
    }
    return updatedVariants;
  });
};


  const addVariant = () => {
    setVariants([
      ...variants,
      {
        price: "",
        stock: "",
        color_en: "",
        color_ar: "",
        discount_percentage: "",
        newImages: [],           // ✅ Required for new image previews
        variant_images: [],
      },
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  return (
  <div className="mt-10">
    <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
      Product Variant Details
    </h3>

    {variants.map((variant, index) => (
      <VariantItem
        key={index}
        index={index}
        variant={variant}
        handleVariantChange={handleVariantChange}
        onDrop={onDrop}
        removeImage={removeImage}
        removeVariant={removeVariant}
      />
    ))}

    <button
      type="button"
      onClick={addVariant}
      className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      ➕ Add Variant
    </button>
  </div>
);
}

export default ProductVariants;
