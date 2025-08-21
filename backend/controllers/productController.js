import Products from "../models/productModel.js";
import Users from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 4;
  let page = Number(req.query.pageNumber) || 1;

  let keywordCondition = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  let count = await Products.countDocuments({ ...keywordCondition });

  let products = await Products.find({ ...keywordCondition })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  let product = await Products.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, description, price, countInStock } = req.body;
  const image = req.file ? req.file.path : null;

  const product = await Products.create({
    user: req.user._id,
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    image,
  });

  if (product) {
    return res.status(201).json(product);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  let { name, brand, category, description, price, countInStock } = req.body;

  let product = await Products.findById(req.params.id);

  if (product) {
    (product.name = name || product.name),
      (product.brand = brand || product.brand),
      (product.category = category || product.category),
      (product.description = description || product.description),
      (product.price = price || product.price),
      (product.countInStock = countInStock || product.countInStock),
      (product.image = req.file ? req.file.path : product.image);

    const productUpdate = await product.save();

    res.json(productUpdate);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Products.findById(req.params.id);

  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  res.json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
