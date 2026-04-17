const crypto = require("node:crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const createToken = require("../utils/createToken")
const sendEmail = require("../utils/sendEmail")



const signup = asyncHandler(async (req , res , next) => {
    const {name , email , password} = req.body;
    const user = await User.create({name , email , password});
    const token = await createToken({id : user._id});
    res.status(201).json({data : user , token});
})

const login = asyncHandler(async (req , res , next) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password , user.password))){
        return next(new ApiError("invalid email or password" , 400));
    }
    const token = await createToken({id : user._id});
    res.status(201).json({data : user , token});
})

const protect = asyncHandler( async (req , res , next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else{
        return next(new ApiError("Authorization is required" , 401));
    }

    const decoded = await jwt.verify(token , process.env.SECRET_KEY);
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new ApiError("User not longer exist" , 404));
    }

    const passwordUpdatedDate = parseInt(currentUser.passwordChangedAt / 1000 , 10);

    if(passwordUpdatedDate > decoded.iat){
        return next(new ApiError("Invalid Token , please Login again" , 401));
    }
    req.user = currentUser;
    next();
}
)

const allowTo = (...roles) => {
   return asyncHandler(async (req , res , next) => {
        if(!roles.includes(req.user.role)){
            return next(new ApiError("permission denaied" , 403))
        }
        next();
    })
}

const allowedTo = allowTo;


const forgetPassword = asyncHandler(async (req , res , next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ApiError("user not found" , 404));
    }

    const resetCode = String(Math.floor(100000 + Math.random() * 900000));
    console.log(resetCode)
    const hashedResetCode = crypto.createHash('sha256')
        .update(resetCode)
        .digest('hex');

    user.resetCode = hashedResetCode;
    user.resetCodeExpires = Date.now() + 1000 * 60 * 10;
    user.resetCodeVerify = false;
    try{
        await sendEmail({
        email : user.email,
        subject : "reset password code",
        text : `Reset Code ${resetCode} valid until 10 min`
    })
    }catch(error){
        user.resetCode = undefined;
        user.resetCodeExpires = undefined;
        user.resetCodeVerify = undefined;
        return next(new ApiError(error.message , 500));
    }

    await user.save();
    res.status(200).json({status : "Success" , message : "message sended via email"})

})


const verifyResetCode = asyncHandler(async (req , res , next) => {
    const hashedResetCode = crypto.createHash('sha256')
        .update(String(req.body.resetCode))
        .digest('hex');

    const user = await User.findOne({
        resetCode : hashedResetCode,
        resetCodeExpires : {$gt : Date.now()}
    });

    if(!user){
        return next(new ApiError("user not found" , 404));
    }

    user.resetCodeVerify = true;
    await user.save();

    res.status(200).json({status : "Success" , message : "verified"})

})

const resetPassword = asyncHandler(async (req , res , next) => {
    const user = await User.findOne({email : req.body.email});
    if(!user){
       return next(new ApiError("user not found" , 404)); 
    }

    if(!user.resetCodeVerify){
        return next(new ApiError("user not verifed" , 400)); 
    }

    user.password = await bcrypt.hash(req.body.password , 12);
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    user.resetCodeVerify = undefined;    
    await user.save();

    const token = await createToken({id : user._id});
    res.status(201).json({token , data : user})
})


module.exports = {signup , login , protect , allowTo , allowedTo , forgetPassword , verifyResetCode , resetPassword};