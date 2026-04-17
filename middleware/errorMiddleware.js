const ApiError = require("../utils/ApiError")

const globalError = (err , req , res , next) => {
    if(process.env.NODE_ENV === "development"){
        sendToDev(err , res)
    }else{
        sendToProd(err , res)
    }
}

const sendToDev = (err , res) => {
    res.status(err.statusCode || 500).json({
        status : err.status || "error",
        message : err.message,
        stack : err.stack,
        error : err 
    })
}

const handleJsonWebTokenError = () => {
    return new ApiError("Invalid Token" , 401);
}
const handleTokenExpiredError = () => {
    return new ApiError("Token is Expired" , 401);
}

const sendToProd =(err , res) => {
    if(err.name === "JsonWebTokenError") err = handleJsonWebTokenError();
    if(err.name === "TokenExpiredError") err = handleTokenExpiredError();
    res.status(err.statusCode || 500).json({
        status : err.status ,
        message : err.message,
    })
}

module.exports = globalError;