const express = require("express");
const {uploadCategoryImage , processImage , getBrands , getBrand , createBrand , updateBrand, deleteBrand} = require("../services/brandService");
const { getValidator, createValidator, updateValidator, deleteValidator } = require("../utils/validators/brandValidator");
const {protect , allowTo} = require("../services/authService")
const router = express.Router();

router.route("/")
        .get(getBrands)
        .post(protect , allowTo("admin" , "manger") , uploadCategoryImage , processImage , createValidator , createBrand)
router.route("/:id")
        .get(getValidator,getBrand)
        .patch(protect , allowTo("admin" , "manger") , uploadCategoryImage , processImage , updateValidator , updateBrand)
        .delete(protect , allowTo("admin") , deleteValidator , deleteBrand)

module.exports = router;