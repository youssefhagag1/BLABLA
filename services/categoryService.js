const CategoryModel = require("../models/categoryModel");
const factory = require("./handlersFactory");
const {v4 : uuid} = require("uuid");
const sharp = require("sharp");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");

const uploadCategoryImage = uploadSingleImage("image")

const processImage = async (req , res , next) => {
    const filename = `category-${uuid()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
    .resize(600 , 600)
    .toFormat("jpeg")
    .jpeg({quality : 30})
    .toFile(`uploads/categories/${filename}`);
    req.body.image = filename;
    next()
}

// @desc    Get Categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = factory.getAll(CategoryModel , "category")


// @desc    Get Single Category
// @route   Get /api/v1/categories/id
// @access  Public


const getCategory = factory.getOne(CategoryModel);

// @desc     Create Category
// @route    POST /api/v1/categories
// @access   Private

const createCategory = factory.createOne(CategoryModel)


// @desc    Update Category
// @route   PATCH /api/v1/categories/id
// @access  Private

const updateCategory = factory.updateOne(CategoryModel);

// @desc    delete Category
// @route   DELETE /api/v1/categories/id
// @access  Private

const deleteCategory = factory.deleteOne(CategoryModel);

module.exports = {uploadCategoryImage , processImage , getCategories , getCategory , createCategory , updateCategory, deleteCategory};