import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dpblgnluu",
  api_key: "477145815125284",
  api_secret: "BST66RXJMBZWT9b4JoOA_OhPE3o",
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "E-Commerce Mern",
    format: () => "png",
    public_id: Date.now,
  },
});

const productParser = multer({ storage: productStorage });

export { productParser };