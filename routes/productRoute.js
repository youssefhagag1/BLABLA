const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadMultipleImage,
  processImages,
  addFilter
} = require('../services/productService');

const reviewRoute = require("../routes/reviewRoute")

const {protect , allowTo} = require("../services/authService")

const router = express.Router();

router.use("/:productId/reviews",reviewRoute)

router.route('/')
  .get(addFilter , getProducts)
  .post(protect , allowTo("admin" , "manger") , uploadMultipleImage , processImages ,createProductValidator, createProduct);
router.route('/:id')
  .get(getProductValidator, getProduct)
  .patch(protect , allowTo("admin" , "manger") , uploadMultipleImage , processImages  ,updateProductValidator, updateProduct)
  .delete(protect , allowTo("admin") , deleteProductValidator, deleteProduct);

module.exports = router;