import React from "react";

const ExistingImagesSection = ({
  variant,
  variantIndex,
  removeVariantImage,
  setDefaultImage, // NEW: function to update the default
}) => {
  return (
    <div className="mb-3">
      <h5>Images</h5>
      {variant.existingImages && variant.existingImages.length > 0 && (
        <div className="image-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {variant.existingImages.map((image, imageIndex) => {
            const imageUrl = `https://res.cloudinary.com/dvdhtcsfz/${image.image}`;
            const isDefault = image.is_default;

            return (
              <div key={imageIndex} className="image-item" style={{ position: "relative" }}>
                <img
                  src={imageUrl}
                  alt={`Variant ${variantIndex} - Image ${imageIndex}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: isDefault ? "3px solid green" : "1px solid #ccc",
                  }}
                />
                {/* Checkbox for default */}
                <div style={{ marginTop: "5px", textAlign: "center" }}>
                  <input
                    type="radio"
                    name={`default-image-${variantIndex}`} // group by variant
                    checked={isDefault}
                    onChange={() => setDefaultImage(variantIndex, imageIndex)}
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeVariantImage(variantIndex, imageIndex, "existing")}
                  className="btn btn-danger btn-sm remove-btn"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExistingImagesSection;
