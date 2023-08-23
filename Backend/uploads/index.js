const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "HC_Travel", // Cloudinary folder where the files will be stored
        allowedFormats: ["jpeg", "png", "jpg"], // Allowed file formats
    },
});

module.exports = {
    cloudinary,
    cloudinaryStorage,
};
