const sharp = require("sharp");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const brandModel = require("../models/brandModel");
const factory = require("./handlersFactory");
const {v4 : uuid} = require("uuid");

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

// @desc    Get Brands
// @route   GET /api/v1/brands
// @access  Public
const getBrands = factory.getAll(brandModel , "brands")


// @desc    Get Single Brand
// @route   Get /api/v1/brands/id
// @access  Public


const getBrand = factory.getOne(brandModel);
// @desc     Create Brand
// @route    POST /api/v1/brands
// @access   Private

const createBrand = factory.createOne(brandModel)


// @desc    Update Brands
// @route   PATCH /api/v1/brands/id
// @access  Private

const updateBrand = factory.updateOne(brandModel);

// @desc    delete Brands
// @route   DELETE /api/v1/brands/id
// @access  Private

const deleteBrand = factory.deleteOne(brandModel);

module.exports = {uploadCategoryImage , processImage , getBrands , getBrand , createBrand , updateBrand, deleteBrand};