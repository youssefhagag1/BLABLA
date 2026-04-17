const {v4 : uuid} = require("uuid");
const ProductModel = require("../models/productModel");
const factory = require("./handlersFactory");
const sharp = require("sharp");
const { uploadMixImages } = require("../middleware/uploadImageMiddleware");



const uploadMultipleImage = uploadMixImages([
    {name : "imageCover" , maxCount : 1},
    {name : "images" , maxCount : 5},
])

const processImages = async (req , res , next) => {
    const filename = `category-${uuid()}-${Date.now()}-cover.jpeg`;
    if(req.files.imageCover){
        await sharp(req.files.imageCover[0].buffer)
        .resize(2000 , 1333)
        .toFormat("jpeg")
        .jpeg({quality : 95})
        .toFile(`uploads/products/${filename}`)
        req.body.imageCover = filename;
    }
    if(req.files.images){
        req.body.images = [];
        await Promise.all(req.files.images.map(async (image , index) => {
        const filename = `category-${uuid()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(image.buffer)
            .resize(600 , 600)
            .toFormat("jpeg")
            .jpeg({quality : 90})
            .toFile(`uploads/products/${filename}`)
            req.body.images.push(filename);
        }))
    }
    next()
}

const addFilter = (req , res, next) => {
    const filterObj = {};
    if(req.params.productId){
        filterObj.product = req.params.productId;
    }
    req.filterObj = filterObj;
    next()
}

// @desc    Get Products
// @route   GET /api/v1/products
// @access  Public
const getProducts = factory.getAll(ProductModel , "products")

// @desc    Get Single Product
// @route   Get /api/v1/products/id
// @access  Public


const getProduct = factory.getOne(ProductModel , true);

const addProductIdAndUserId = (req , res , next) => {
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user._id;
    next()
}

// @desc     Create Product
// @route    POST /api/v1/products
// @access   Private

const createProduct = factory.createOne(ProductModel)


// @desc    Update Product
// @route   PATCH /api/v1/products/id
// @access  Private

const updateProduct = factory.updateOne(ProductModel);

// @desc    delete Product
// @route   DELETE /api/v1/products/id
// @access  Private

const deleteProduct = factory.deleteOne(ProductModel);


module.exports = {addFilter , uploadMultipleImage , processImages , getProducts , createProduct , getProduct , updateProduct, deleteProduct};