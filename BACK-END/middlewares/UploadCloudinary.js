const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const crypto = require("crypto");
const uniqueSuffix = `${crypto.randomUUID()}`;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

const cloudStorageAvatar = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AuthorAvatarImage",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const clouStoragePost = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PostImage",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const AvatarImg = multer({ storage: cloudStorageAvatar });
const PostImg = multer({ storage: clouStoragePost });

module.exports = (AvatarImg, PostImg);
