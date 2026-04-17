const multer = require("multer");
const ApiError = require("../utils/ApiError");

const multerOptions = () => {
     const multerStorage = multer.memoryStorage();
    
    const multerFilter = (req , file , cb) => {
        if(file.mimetype.split("/")[0] === "image"){
            cb(null , true)
        }else{
            cb(new ApiError("File must be image only." , 400) , false)
        }
    }
    return multer({storage : multerStorage , fileFilter : multerFilter});
}

const uploadSingleImage = (fieldName) =>  multerOptions().single(fieldName);


const uploadMixImages = (fieldsName) => multerOptions().fields(fieldsName)

module.exports = {uploadSingleImage , uploadMixImages};