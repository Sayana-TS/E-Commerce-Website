import express from "express";
import { admin, protect } from "../middlewares/authMiddlewares.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import { productParser } from "../config/upload.js";

const productRoute = express.Router();

productRoute
  .route("/")
  .get(getProducts)
  .post(protect, admin, productParser.single("image"), createProduct);

productRoute
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, productParser.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);


export default productRoute