// utils/cloudinary.js
export const getCloudinaryUrl = (path) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/${path}`;
};
