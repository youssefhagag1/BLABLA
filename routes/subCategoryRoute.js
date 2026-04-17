const express = require("express");
const {addCategoryId , addFilter , createSubCategory , getSubCategories , getSubCategory , updateSubCategory , deleteSubCategory} = require("../services/subCategoryService");
const { createValidator , getValidator , updateValidator , deleteValidator } = require("../utils/validators/subCategoryValidator");
const {protect , allowTo} = require("../services/authService")

const router = express.Router({mergeParams : true})

router.route("/")
        .get(addFilter , getSubCategories)
        .post(protect , allowTo("admin" , "manger") ,addCategoryId , createValidator,createSubCategory)
router.route("/:id")
        .get(getValidator , getSubCategory)
        .patch(protect , allowTo("admin" , "manger") , updateValidator , updateSubCategory)
        .delete(protect , allowTo("admin" ) ,deleteValidator , deleteSubCategory)

module.exports = router;