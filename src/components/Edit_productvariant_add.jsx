import { useState, useCallback, useEffect } from "react";

import EditVariantItem from "./Edit_variantItem";

const EditProductVariants = ({ variants, setVariants, productImages, removeVariantImage, addVariant, removeImage }) => {

  const handleVariantChange = (index, event) => {
  const { name, value, type } = event.target;

  setVariants((prevVariants) => {
    return prevVariants.map((variant, i) => {
      // ✅ Handle setting ONE default variant
      if (name === "is_default") {
        const isChecked = value === true || value === "true";
        return {
          ...variant,
          is_default: i === index ? isChecked : false,
        };
      }

      // ✅ Handle default image index
      if (name === "defaultImageIndex") {
        return i === index
          ? {
              ...variant,
              defaultImageIndex: value,
            }
          : variant;
      }

      // ✅ Regular input updates
      return i === index
        ? {
            ...variant,
            [name]: type === "checkbox" ? value === true || value === "true" : value,
          }
        : variant;
    });
  });
};


    const setDefaultImage = (variantIndex, imageIndex) => {
      setVariants(prevVariants => {
        return prevVariants.map((variant, vIndex) => {
          if (vIndex !== variantIndex) return variant;

          const updatedImages = variant.existingImages.map((img, i) => ({
            ...img,
            is_default: i === imageIndex,
          }));

          return { ...variant, existingImages: updatedImages };
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
      <EditVariantItem
        key={index}
        index={index}
        variant={variant}
        productImages={productImages}
        removeVariantImage={removeVariantImage}
        handleVariantChange={handleVariantChange}
        setDefaultImage={setDefaultImage}
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

export default EditProductVariants;
