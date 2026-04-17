const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const UserModle = require("../models/userModel.js");
const factory = require("./handlersFactory");
const {v4 : uuid} = require("uuid");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError.js");
const createToken = require("../utils/createToken.js");

const uploadUserImage = uploadSingleImage("profileImage")

const processImage = async (req , res , next) => {
    const filename = `user-${uuid()}-${Date.now()}.jpeg`;
    if(req.file){
        await sharp(req.file.buffer)
        .resize(600 , 600)
        .toFormat("jpeg")
        .jpeg({quality : 30})
        .toFile(`uploads/users/${filename}`);
        req.body.profileImage = filename;
    }
    next()
}

// @desc    Get Users
// @route   GET /api/v1/users
// @access  Private
const getUsers = factory.getAll(UserModle , "users")


// @desc    Get Single User
// @route   Get /api/v1/users/id
// @access  Private


const getUser = factory.getOne(UserModle);

// @desc     Create User
// @route    POST /api/v1/users
// @access   Private

const createUser = factory.createOne(UserModle)


// @desc    Update User
// @route   PATCH /api/v1/users/id
// @access  Private

const updateUser = asyncHandler(async (req , res , next) => {
    const {id} = req.params;
    const {name , email , phone , role , profileImage , slug} = req.body;
    const user = await UserModle.findByIdAndUpdate(id , {
        name , email , phone , role , profileImage , slug
    } , {new : true});
    if(!user){
      return  next(new ApiError(`No user for this id ${id}` , 404))
    }
    res.status(200).json({data : user})
})

// @desc    delete Users
// @route   DELETE /api/v1/users/id
// @access  Private

const updateUserPassword = asyncHandler(async (req , res , next) => {
    const {id} = req.params;
    const {password} = req.body;
    const user = await UserModle.findByIdAndUpdate(id , {
        password : await bcrypt.hash(password , 12),
        passwordChangedAt : Date.now() 
    } , {new : true});
    if(!user){
      return  next(new ApiError(`No user for this id ${id}` , 404))
    }
    res.status(200).json({data : user})
})

const deleteUser = factory.deleteOne(UserModle);


const updateLoggedUserPassword = asyncHandler(async (req , res , next) => {
    const id = req.user._id;
    const {password} = req.body;
    const user = await UserModle.findByIdAndUpdate(id , {
        password : await bcrypt.hash(password , 12),
        passwordChangedAt : Date.now() 
    } , {new : true});
    if(!user){
      return  next(new ApiError(`No user for this id ${id}` , 404))
    }
    const token = await createToken({id})
    res.status(200).json({token , data : user})
})
const editId = asyncHandler(async (req , res , next) => {
    req.params.id = req.user._id;
    next()    
})

module.exports = {editId, updateLoggedUserPassword, uploadUserImage , processImage , getUsers , getUser , updateUserPassword , createUser , updateUser, deleteUser};