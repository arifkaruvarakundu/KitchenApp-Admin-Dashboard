
import { useDropzone } from "react-dropzone";
import ExistingImagesSection from "./Existing_image_section"; 

const VariantItem = ({ index, productImages, variant, handleVariantChange, onDrop, removeImage, removeVariant, removeVariantImage }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => onDrop(index, acceptedFiles),
  });
  

  return (
    <div className="border p-3 mb-3">
      <div className="d-flex gap-3">
        <div>
          <label className="form-label">Color [En]</label>
          <input
            type="text"
            name="color_en"
            value={variant.color}
            onChange={(e) => handleVariantChange(index, e)}
            className="form-control"
            placeholder="Enter color in English"
          />
        </div>
        <div>
          <label className="form-label">Color [Ar] </label>
          <input
            type="text"
            name="color_ar"
            value={variant.color_ar}
            onChange={(e) => handleVariantChange(index, e)}
            className="form-control"
            placeholder="Enter color in Arabic"
          />
        </div>
      </div>

      {/* Price */}
      <label className="form-label">Price</label>
      <input
        type="number"
        name="price"
        value={variant.price}
        onChange={(e) => handleVariantChange(index, e)}
        className="form-control"
        placeholder="Enter price"
      />

      {/* Stock */}
      <label className="form-label">Stock</label>
      <input
        type="number"
        name="stock"
        value={variant.stock}
        onChange={(e) => handleVariantChange(index, e)}
        className="form-control"
        placeholder="Enter stock"
      />

      {/* Discount */}
      <label className="form-label"> Discount (%)</label>
      <input
        type="number"
        name="discount_percentage"
        value={variant.discount_percentage}
        onChange={(e) => handleVariantChange(index, e)}
        className="form-control"
        placeholder="Enter discount percentage"
      />

      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="is_default"
          checked={variant.is_default || false}
          onChange={(e) =>
            handleVariantChange(index, {
              target: {
                name: "is_default",
                value: e.target.checked,
                type: "checkbox",
              },
            })
          }
          id={`defaultVariant-${index}`}
        />
        <label className="form-check-label" htmlFor={`defaultVariant-${index}`}>
          Set as Default Variant
        </label>
      </div>

      {/* Existing Images Section */}
      <ExistingImagesSection
        variant={variant}
        variantIndex={index}
        productImages={productImages}
        removeVariantImage={removeVariantImage} 
      />

     {/* New Image Upload */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #aaa",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop images here</p> : <p>Drag and drop images</p>}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
        {variant.newImages &&
  variant.newImages.map((file, imgIndex) => (
    <div key={imgIndex} style={{ position: "relative" }}>
      <img
        src={file.preview}
        alt={file.name}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          border: variant.defaultImageIndex === imgIndex ? "3px solid green" : "1px solid #ccc",
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          removeImage(index, imgIndex, "new");
        }}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      {/* Mark as default image button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleVariantChange(index, {
            target: {
              name: "defaultImageIndex",
              value: imgIndex,
              type: "defaultImage",
            },
          });
        }}
        style={{
          position: "absolute",
          bottom: "5px",
          left: "5px",
          background: variant.defaultImageIndex === imgIndex ? "green" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "2px 6px",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        {variant.defaultImageIndex === imgIndex ? "Default" : "Set Default"}
      </button>
    </div>
  ))}
        </div>
      </div>
      {/* Remove Variant Button */}
      <button type="button" onClick={() => removeVariant(index)} className="btn btn-danger mt-2">
        Remove Variant
      </button>
    </div>
  );
};

export default VariantItem;