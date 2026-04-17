const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minLength : [2 , "Too short subCategory name"],
        maxLength : [32 , "Too long subCategory name"],
    },
    slug : {
        type : String,
        lowercase : true
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref : "Category",
        required : true
    }
} , {timestamps : true});

module.exports = mongoose.model("SubCategory" , subCategorySchema); 