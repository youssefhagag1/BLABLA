const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "category is required"],
        unique : [true , "category must be unique"],
        minLength : [3 , "Too short category name"],
        maxLength : [32 , "Too Long category name"]
    },
    slug : {
        type : String,
        lowercase : true
    },
    image : String
} , {timestamps : true})

const setImageUrl = (doc) => {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
}


categorySchema.post("init" , (doc) => {
    if(doc.image){
        setImageUrl(doc);
    }
})
categorySchema.post("save" , (doc) => {
    if(doc.image){
        setImageUrl(doc);
    }
})

module.exports =  mongoose.model("Category" , categorySchema)