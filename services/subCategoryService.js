const SubCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlersFactory");


// @desc    Get Sub Categories
// @route   GET /api/v1/subCategories
// @access  Public

const addFilter = (req , res, next) => {
    const filterObj = {};
    if(req.params.categoryId){
        filterObj.category = req.params.categoryId;
    }
    req.filterObj = filterObj;
    next()
}

const getSubCategories = factory.getAll(SubCategoryModel , "subCategories")


// @desc    Get Single Sub Category
// @route   Get /api/v1/subCategories/id
// @access  Public


const getSubCategory = factory.getOne(SubCategoryModel);

const addCategoryId = (req , res , next) => {
    if(!req.body.category) req.body.category = req.params.categoryId;
    next()
}

// @desc     Create Sub Category
// @route    POST /api/v1/subCategories
// @access   Private

const createSubCategory = factory.createOne(SubCategoryModel)


// @desc    Update Sub Category
// @route   PATCH /api/v1/subCategories/id
// @access  Private

const updateSubCategory = factory.updateOne(SubCategoryModel);

// @desc    delete Sub Category
// @route   DELETE /api/v1/subCategories/id
// @access  Private

const deleteSubCategory = factory.deleteOne(SubCategoryModel);

module.exports = {createSubCategory , getSubCategory , getSubCategories , updateSubCategory , deleteSubCategory , addCategoryId , addFilter}