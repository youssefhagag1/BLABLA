const express = require("express");
const {uploadCategoryImage  , getCategories , getCategory , createCategory , updateCategory , deleteCategory, processImage} = require("../services/categoryService");
const { getValidator, createValidator, updateValidator, deleteValidator } = require("../utils/validators/categoryValidator");
const subCategoriesRoute = require("./subCategoryRoute");
const {protect , allowTo} = require("../services/authService")
const router = express.Router();

router.use("/:categoryId/subCategories" , subCategoriesRoute)

router.route("/")
        .get(getCategories)
        .post(protect , allowTo("admin" , "manger") , uploadCategoryImage , processImage, createValidator , createCategory)
router.route("/:id")
        .get(getValidator,getCategory)
        .patch(protect , allowTo("admin" , "manger") ,uploadCategoryImage , processImage, updateValidator , updateCategory)
        .delete(protect , allowTo("admin") ,deleteValidator , deleteCategory)

module.exports = router;