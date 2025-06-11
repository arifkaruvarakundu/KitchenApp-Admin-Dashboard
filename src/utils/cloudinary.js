// utils/cloudinary.js
export const getCloudinaryUrl = (path) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  console.log(cloudName); // should now log 'dvdhtcsfz'

  return `https://res.cloudinary.com/${cloudName}/${path}`;
};
